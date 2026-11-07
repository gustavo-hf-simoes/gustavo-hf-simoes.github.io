<#
.SYNOPSIS
  start-hybrid-tunnel.ps1 - Orquestrador Hands-Free da Publicacao Hibrida 24/7
  Portfolio Profissional de Analista de IA e Full Stack (Gustavo H. F. Simoes)

.DESCRIPTION
  1. Verifica se o backend local (serve.js) esta rodando na porta 3001. Se nao, inicia em background.
  2. Detecta utilitarios de tunelamento Zero-Trust instalados (Cloudflare Tunnel ou Tailscale Funnel).
  3. Se Cloudflared estiver disponivel, cria tunel temporario/permanente, extrai a URL publica https://*.trycloudflare.com
     e atualiza automaticamente 'assets/tunnel-config.json'.
  4. Exibe resumo executivo no terminal com todos os acessos (Local, GitHub Pages e Tunel OmniRoute).
#>

[CmdletBinding()]
param(
    [int]$Port = 3001,
    [string]$TunnelConfigFile = ""
)

$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "==========================================================================" -ForegroundColor Cyan
Write-Host "   ESTEIRA DEVOPS HIBRIDA 24/7 - PORTFOLIO ANALISTA DE IA E FULL STACK   " -ForegroundColor Cyan
Write-Host "==========================================================================" -ForegroundColor Cyan
Write-Host ""

# Resolver diretorio raiz com maxima compatibilidade (PowerShell 5.1/7+)
$scriptDir = $PSScriptRoot
if (-not $scriptDir) {
    $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
}
if (-not $scriptDir) {
    $scriptDir = (Get-Location).Path
}

$rootItem = Get-Item (Join-Path $scriptDir "..")
$rootPath = $rootItem.FullName
Set-Location $rootPath

if (-not $TunnelConfigFile) {
    $TunnelConfigFile = Join-Path $rootPath "assets\tunnel-config.json"
}

# 1. VERIFICAR SE O BACKEND LOCAL JA ESTA RODANDO NA PORTA 3001
Write-Host "[1/3] Verificando servidor local na porta $Port..." -ForegroundColor Yellow
$portOpen = $false
try {
    $tcpConn = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
    if ($tcpConn) {
        $portOpen = $true
    }
} catch {
    $test = Test-NetConnection -ComputerName 127.0.0.1 -Port $Port -WarningAction SilentlyContinue
    if ($test.TcpTestSucceeded) {
        $portOpen = $true
    }
}

if ($portOpen) {
    Write-Host " -> Servidor backend ativo na porta $Port." -ForegroundColor Green
} else {
    Write-Host " -> Backend inativo. Iniciando 'node serve.js' em background..." -ForegroundColor Yellow
    $nodeProcess = Start-Process -FilePath "node" -ArgumentList "serve.js" -WorkingDirectory $rootPath -PassThru
    Start-Sleep -Seconds 2
    Write-Host " -> Servidor iniciado (PID: $($nodeProcess.Id))." -ForegroundColor Green
}

# 2. IDENTIFICAR BINARIOS DE TUNEL (CLOUDFLARED / TAILSCALE)
Write-Host ""
Write-Host "[2/3] Verificando ferramentas de Tunel Zero-Trust..." -ForegroundColor Yellow

$cloudflaredCmd = Get-Command cloudflared -ErrorAction SilentlyContinue
$tailscaleCmd = Get-Command tailscale -ErrorAction SilentlyContinue

if (-not $cloudflaredCmd) {
    $altPaths = @(
        "C:\Program Files\cloudflared\cloudflared.exe",
        "$env:LOCALAPPDATA\cloudflared\cloudflared.exe",
        "$env:USERPROFILE\bin\cloudflared.exe"
    )
    foreach ($cand in $altPaths) {
        if (Test-Path $cand) {
            $cloudflaredCmd = $cand
            break
        }
    }
}

$tunnelUrl = ""

if ($cloudflaredCmd) {
    $cfExe = if ($cloudflaredCmd.Source) { $cloudflaredCmd.Source } else { "$cloudflaredCmd" }
    Write-Host " -> Cloudflared detectado: $cfExe" -ForegroundColor Green
    $logPath = Join-Path $scriptDir "tunnel.log"
    $outPath = Join-Path $scriptDir "tunnel-out.log"
    if (Test-Path $logPath) { Remove-Item $logPath -Force -ErrorAction SilentlyContinue }
    if (Test-Path $outPath) { Remove-Item $outPath -Force -ErrorAction SilentlyContinue }

    Write-Host " -> Iniciando tunel rapido Cloudflare para http://127.0.0.1:$Port..." -ForegroundColor Yellow

    $cfProcess = Start-Process -FilePath "$cfExe" `
        -ArgumentList "tunnel --url http://127.0.0.1:$Port --no-autoupdate" `
        -RedirectStandardError $logPath `
        -RedirectStandardOutput $outPath `
        -PassThru `
        -WindowStyle Hidden

    Write-Host " -> Aguardando alocacao do dominio seguro trycloudflare.com (ate 15s)..." -ForegroundColor Gray

    $attempts = 0
    $maxAttempts = 30
    while ($attempts -lt $maxAttempts) {
        Start-Sleep -Milliseconds 500
        $attempts++
        if (Test-Path $logPath) {
            $logContent = Get-Content $logPath -Raw -ErrorAction SilentlyContinue
            if ($logContent -match "(https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com)") {
                $tunnelUrl = $matches[1]
                break
            }
        }
    }

    if ($tunnelUrl) {
        Write-Host " -> TUNEL ESTABELECIDO COM SUCESSO: $tunnelUrl" -ForegroundColor Green
    } else {
        Write-Host " [!] Nao foi possivel capturar a URL nos primeiros 15s. Verifique $logPath." -ForegroundColor Yellow
    }

} elseif ($tailscaleCmd) {
    Write-Host " -> Tailscale Funnel detectado: $tailscaleCmd" -ForegroundColor Green
    Write-Host " -> Dica: Para expor permanentemente via Tailscale Funnel (DNS fixo):" -ForegroundColor Cyan
    Write-Host "    tailscale funnel --bg $Port" -ForegroundColor Gray
    Write-Host "    Ele fornecera URL fixa no formato: https://<sua-maquina>.<tailnet>.ts.net" -ForegroundColor Gray
} else {
    Write-Host " [!] Nenhum utilitario de tunel (Cloudflared ou Tailscale) encontrado no PATH." -ForegroundColor DarkYellow
    Write-Host " -> Para instalar o Cloudflared hands-free via Winget, execute:" -ForegroundColor Cyan
    Write-Host "    winget install --id Cloudflare.cloudflared -e --source winget" -ForegroundColor White
    Write-Host " -> Ou para Tailscale:" -ForegroundColor Cyan
    Write-Host "    winget install --id Tailscale.Tailscale -e --source winget" -ForegroundColor White
    Write-Host " -> O site funcionara perfeitamente via GitHub Pages 24/7 com fallback inteligente para o motor local Copilot." -ForegroundColor Gray
}

# 3. ATUALIZAR ASSETS/TUNNEL-CONFIG.JSON
Write-Host ""
Write-Host "[3/3] Sincronizando metadados em assets/tunnel-config.json..." -ForegroundColor Yellow

if (Test-Path $TunnelConfigFile) {
    try {
        $jsonRaw = Get-Content $TunnelConfigFile -Raw | ConvertFrom-Json
        if ($tunnelUrl) {
            $jsonRaw.tunnelBaseUrl = $tunnelUrl
        }
        $jsonRaw.updatedAt = (Get-Date).ToString("yyyy-MM-ddTHH:mm:sszzz")
        $newJson = $jsonRaw | ConvertTo-Json -Depth 5
        $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
        [System.IO.File]::WriteAllText($TunnelConfigFile, $newJson, $utf8NoBom)
        Write-Host " -> 'tunnel-config.json' atualizado com sucesso ($TunnelConfigFile)." -ForegroundColor Green

        # Sincronizar automaticamente tunnel-config.json no GitHub Pages via gh api (se autenticado)
        $ghCmd = Get-Command gh -ErrorAction SilentlyContinue
        if ($ghCmd -and $tunnelUrl) {
            $b64Content = [Convert]::ToBase64String($utf8NoBom.GetBytes($newJson))
            foreach ($repoName in @("gustavo-hf-simoes/gustavo-hf-simoes.github.io", "gustavo-hf-simoes/portfolio-profissional-analista-de-ia")) {
                try {
                    $existingFile = gh api "repos/$repoName/contents/assets/tunnel-config.json" 2>$null | ConvertFrom-Json
                    if ($existingFile -and $existingFile.sha) {
                        gh api --method PUT "repos/$repoName/contents/assets/tunnel-config.json" `
                            -f message="chore(tunnel): sync active Zero-Trust tunnel URL" `
                            -f content="$b64Content" `
                            -f sha="$($existingFile.sha)" >$null 2>&1
                        Write-Host " -> Sincronizado com GitHub Pages ($repoName)." -ForegroundColor Cyan
                    }
                } catch {}
            }
        }
    } catch {
        Write-Host " [!] Erro ao atualizar tunnel-config.json: $_" -ForegroundColor Red
    }
} else {
    Write-Host " [!] Arquivo $TunnelConfigFile nao encontrado para atualizacao." -ForegroundColor Yellow
}

# 4. RESUMO EXECUTIVO DE DISPONIBILIDADE
Write-Host ""
Write-Host "==========================================================================" -ForegroundColor Green
Write-Host "               STATUS DA ARQUITETURA HIBRIDA 24/7                        " -ForegroundColor Green
Write-Host "==========================================================================" -ForegroundColor Green
Write-Host " * Servidor Local:        http://127.0.0.1:$Port" -ForegroundColor White
Write-Host " * GitHub Pages Estatico: https://gustavo-hf-simoes.github.io/portfolio-profissional-analista-de-ia/" -ForegroundColor White

if ($tunnelUrl) {
    Write-Host " * Tunel OmniRoute Ativo:  $tunnelUrl" -ForegroundColor Cyan
    Write-Host " * Status IA no Pages:    CONECTADO 24/7 AO SEU PC (OmniRoute Online)" -ForegroundColor Green
} else {
    Write-Host " * Tunel OmniRoute:        Inativo (Aguardando Cloudflared ou Tailscale)" -ForegroundColor Yellow
    Write-Host " * Status IA no Pages:    Modo Copilot IA Estatico Inteligente (Zero Queda)" -ForegroundColor Gray
}

Write-Host "==========================================================================" -ForegroundColor Green
Write-Host "Dica: Voce pode rodar 'npm run tunnel:start' a qualquer momento para reabrir." -ForegroundColor Gray
Write-Host ""
