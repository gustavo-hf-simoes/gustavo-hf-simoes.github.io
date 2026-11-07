/**
 * ============================================================================
 * SERVIDOR EXECUTIVO & API ROUTER — PORTFÓLIO GUSTAVO SIMÕES
 * Node.js Zero-Dependência | Static Files + OmniRoute Proxy (/api/portfolio/chat)
 * ============================================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = parseInt(process.env.PORT, 10) || 3001;
const PUBLIC_DIR = __dirname;
const OMNIROUTE_URL = process.env.OMNIROUTE_URL || 'http://127.0.0.1:20128/v1/chat/completions';
const OMNIROUTE_TIMEOUT_MS = 8000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.mp3': 'audio/mpeg',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const SYSTEM_PROMPT_EXECUTIVO = `Você é o Copiloto Executivo Oficial de Gustavo Henrique Ferreira Simões.
Sua missão é responder a recrutadores, gestores técnicos, CTOs e clientes com precisão sênior, postura executiva e dados verificáveis de engenharia.

PERFIL DO PROFISSIONAL:
- Nome: Gustavo Henrique Ferreira Simões (Gustavo Simões)
- Cargo: Analista de Inteligência Artificial & Engenheiro de Software Full Stack
- Localização: Londrina, Paraná, Brasil (disponível para regimes Remoto, Híbrido ou Presencial em Londrina/PR)
- Experiência: Mais de 6 anos de experiência sólida em engenharia de software e automação com IA.
- Contato: WhatsApp +55 (43) 99603-4632 | E-mail: gustavo.hf.simoes@gmail.com | GitHub: https://github.com/gustavo-hf-simoes

FORMAÇÃO ACADÊMICA & CERTIFICAÇÕES:
- Graduação em Análise e Desenvolvimento de Sistemas (ADS) — Faculdade Estácio de Sá (Londrina/PR, Set 2026 – Dez 2028, Cursando).
- Certificação Internacional: Professional Scrum Master™ I (PSM I) — Scrum.org (Emitida em Maio/2024, credencial vitalícia de liderança ágil).
- Bacharelado em Biomedicina — Centro Universitário Filadélfia (UniFil, Londrina/PR, 2017–2021). Base analítica, estatística e laboratorial aplicada à área hospitalar.

TRAJETÓRIA PROFISSIONAL:
1. Concent Sistemas (2019 – 2025 | 6 anos e 5 meses):
   - Atuação: Analista de Desenvolvimento de Sistemas Pleno / Tech Lead em Londrina/PR.
   - Stack: C#, .NET / .NET Core, Angular, SQL Server, PostgreSQL, MySQL.
   - Destaques: Liderou integrações críticas de automação clínica com sistemas LIS e HIS via protocolos de baixo nível TCP/IP e RS-232 comunicando diretamente com equipamentos de automação médica. Modelagem relacional avançada, tuning de queries e alta disponibilidade.
2. Consultor Full Stack & Engenheiro de IA (2025 – Presente):
   - Atuação: Desenvolvimento de soluções de alta conversão, agentes autônomos e automação de fluxos corporativos.
   - Stack: Model Context Protocol (MCP), n8n avançado, Python 3, TypeScript, Node.js, WhatsApp Business API, LLMs locais e de fronteira, Docker, arquiteturas Offline-First.

OS 4 CASES REAIS EM PRODUÇÃO (SEM PROJETOS LEGADOS):
1. DJEN LegalTech & WhatsApp Jurídico MCP:
   - Plataforma jurídica conectada ao Diário de Justiça Eletrônico Nacional (DJEN).
   - Servidor MCP customizado com 8 ferramentas ativas integrando n8n, triagem automática no WhatsApp, geração de Kit de Procuração em PDF pronto para assinatura e conformidade OAB/LGPD.
   - Métricas: -90% no tempo de triagem, disponibilidade 24/7.
2. Rubinot Companion & Telemetry Analytics:
   - Pipeline de telemetria em Python para ingestão de 4 fontes JSON brutos (Tibia/Rubinot).
   - Derivação matemática com equação polinomial cúbica oficial XP(L) = (50/3) * (L³ - 6L² + 17L - 12) para Raw/Net XP/h e projeção exata até o Level 720.
   - Algoritmo exclusivo Sio Split (separação de cura dedicada ao grupo vs auto-cura), exportação retrocompatível com +22 colunas e resumo Discord em 2 embeds (< 1.500 chars).
   - Bateria de testes E2E Caixa-Opaca em 4 camadas.
3. Calc Coffee (CoffeeApp) PWA:
   - Aplicação Web Progressiva Offline-First baseada nos padrões internacionais SCA/BSCA.
   - Motor matemático reativo de extração, diagnóstico sensorial na Roda de Sabores, WakeLock API e Web Speech API para barismo prático.
4. Orquestração Multi-Agente SDD (Antigravity Autopilot):
   - Fábrica de software AI-First estruturada em 4 etapas (Inbox, PRD, Especificação Técnica SPEC, Dev, QA) intercaladas por 2 Checkpoints Humanos de aprovação.
   - Roteamento inteligente de modelos (FinOps) gerando até 85% de economia de tokens e 100% de rastreabilidade.

DIRETRIZES DE RESPOSTA:
- Seja conciso, profissional e objetivo (1 a 3 parágrafos curtos).
- Realce competências técnicas comprovadas, métricas quantitativas e impacto de negócio.
- Nunca invente experiências fora deste perfil. Ao final, convide cordialmente para conversar no WhatsApp ou agendar uma entrevista técnica.`;

function getLocalIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

async function handleChatEndpoint(req, res) {
  setCorsHeaders(res);

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > 1024 * 64) {
      req.destroy();
    }
  });

  req.on('end', async () => {
    try {
      const parsed = JSON.parse(body || '{}');
      const userMessage = parsed.message || parsed.prompt || '';
      const clientHistory = Array.isArray(parsed.history) ? parsed.history : [];

      if (!userMessage || typeof userMessage !== 'string' || !userMessage.trim()) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({ success: false, error: 'Mensagem vazia ou inválida.' }));
      }

      // Monta mensagens no formato OpenAI ChatCompletions compatível com OmniRoute
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT_EXECUTIVO }
      ];

      for (const item of clientHistory.slice(-6)) {
        if (item && item.role && item.content) {
          messages.push({
            role: item.role === 'user' ? 'user' : 'assistant',
            content: String(item.content).slice(0, 1000)
          });
        }
      }

      messages.push({ role: 'user', content: userMessage.trim().slice(0, 2000) });

      // Chama o OmniRoute local com timeout seguro
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), OMNIROUTE_TIMEOUT_MS);

      try {
        const response = await fetch(OMNIROUTE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer omniroute-local'
          },
          body: JSON.stringify({
            model: parsed.model || 'cascata-principal',
            messages: messages,
            temperature: 0.3,
            max_tokens: 600
          }),
          signal: controller.signal
        });

        clearTimeout(timer);

        if (!response.ok) {
          throw new Error(`OmniRoute HTTP ${response.status}`);
        }

        const data = await response.json();
        const reply = data?.choices?.[0]?.message?.content;

        if (reply && typeof reply === 'string') {
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          return res.end(JSON.stringify({
            success: true,
            reply: reply.trim(),
            model: data.model || 'omniroute-pool'
          }));
        }

        throw new Error('Formato inesperado na resposta do OmniRoute');
      } catch (omniErr) {
        clearTimeout(timer);
        // Fallback gracioso: sinaliza que o frontend deve usar o motor conversacional local (CopilotChatEngine)
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({
          success: false,
          fallback: true,
          notice: 'OmniRoute local offline ou sem resposta; fallback acionado para motor local.'
        }));
      }
    } catch (parseErr) {
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ success: false, error: 'JSON malformado.' }));
    }
  });
}

function serveStaticFile(req, res) {
  setCorsHeaders(res);

  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(PUBLIC_DIR, safePath);

  // Evita travessia de diretório
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('403 Acesso Negado');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Arquivo Não Encontrado');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Content-Type-Options': 'nosniff'
    });

    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res);
    res.writeHead(204);
    return res.end();
  }

  const cleanUrl = req.url.split('?')[0];

  if (cleanUrl === '/api/portfolio/chat' && req.method === 'POST') {
    return handleChatEndpoint(req, res);
  }

  return serveStaticFile(req, res);
});

if (require.main === module) {
  server.listen(PORT, '0.0.0.0', () => {
    const ip = getLocalIp();
    console.log(`\n======================================================`);
    console.log(` PORTFÓLIO EXECUTIVO — GUSTAVO HENRIQUE SIMÕES`);
    console.log(`======================================================`);
    console.log(` Servidor HTTP Node.js Zero-Dependência ativo!`);
    console.log(` - Local:      http://localhost:${PORT}/`);
    console.log(` - Currículo:  http://localhost:${PORT}/curriculo.html`);
    console.log(` - Rede Local: http://${ip}:${PORT}/`);
    console.log(` - Chat API:   POST http://localhost:${PORT}/api/portfolio/chat`);
    console.log(`======================================================\n`);
  });
}

module.exports = { server, handleChatEndpoint, SYSTEM_PROMPT_EXECUTIVO };
