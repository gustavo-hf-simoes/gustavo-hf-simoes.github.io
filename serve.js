/**
 * SERVIDOR EXECUTIVO & API ROUTER — PORTFÓLIO GUSTAVO SIMÕES
 * Node.js Zero-Dependência | Blindagem Zero-Trust & OmniRoute Proxy
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = parseInt(process.env.PORT, 10) || 3001;
const PUBLIC_DIR = __dirname;
const DATA_DIR = path.join(PUBLIC_DIR, 'data');
const TELEMETRY_FILE = path.join(DATA_DIR, 'telemetry_events.jsonl');
const OMNIROUTE_URL = process.env.OMNIROUTE_URL || 'http://127.0.0.1:20128/v1/chat/completions';
const OMNIROUTE_TIMEOUT_MS = 8000;
const MAX_PAYLOAD_BYTES = 16 * 1024; // 16 KB

if (!fs.existsSync(DATA_DIR)) {
  try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch (_) {}
}

const ALLOWED_MODELS = ['cascata-principal', 'rapido-flash', 'gratis-lote'];
const INJECTION_PATTERNS = [
  /ignore\s+(all|previous)\s+instructions/i,
  /system\s+prompt/i,
  /<script\b/i,
  /prompt\s+de\s+sistema/i,
  /desconsidere\s+(as\s+)?instruções/i,
  /esqueça\s+(as\s+)?instruções/i
];

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 15;
const ipRequestTimestamps = new Map();

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
      if (net.family === 'IPv4' && !net.internal) return net.address;
    }
  }
  return 'localhost';
}

function applySecurityAndCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('X-XSS-Protection', '1; mode=block');
}

function getClientIp(req) {
  const cfIp = req.headers['cf-connecting-ip'];
  if (cfIp) return cfIp.trim();
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.socket.remoteAddress || '127.0.0.1';
}

function checkRateLimit(ip) {
  const now = Date.now();
  const list = (ipRequestTimestamps.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  if (list.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipRequestTimestamps.set(ip, list);
    return false;
  }
  list.push(now);
  ipRequestTimestamps.set(ip, list);
  return true;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, list] of ipRequestTimestamps.entries()) {
    const valid = list.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (!valid.length) ipRequestTimestamps.delete(ip);
    else ipRequestTimestamps.set(ip, valid);
  }
}, 300000).unref();

async function handleChatEndpoint(req, res) {
  applySecurityAndCorsHeaders(res);

  const clientIp = getClientIp(req);
  if (!checkRateLimit(clientIp)) {
    res.writeHead(429, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({
      success: false,
      fallback: true,
      error: 'Limite de requisições excedido. Acionando motor local.'
    }));
  }

  let body = '';
  let payloadExceeded = false;

  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > MAX_PAYLOAD_BYTES) {
      payloadExceeded = true;
      req.destroy();
    }
  });

  req.on('end', async () => {
    if (payloadExceeded) {
      res.writeHead(413, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ success: false, error: 'Payload excede 16 KB.' }));
    }

    try {
      const parsed = JSON.parse(body || '{}');
      const userMessage = parsed.message || parsed.prompt || '';
      const clientHistory = Array.isArray(parsed.history) ? parsed.history : [];

      if (!userMessage || typeof userMessage !== 'string' || !userMessage.trim()) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({ success: false, error: 'Mensagem vazia ou inválida.' }));
      }

      if (INJECTION_PATTERNS.some(p => p.test(userMessage))) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({
          success: true,
          reply: 'Como Copiloto Executivo Oficial de Gustavo Simões, meu compromisso é responder exclusivamente sobre sua trajetória de mais de 6 anos de engenharia, seus 4 cases reais em produção (Concent Sistemas, DJEN MCP, Rubinot, Calc Coffee e SDD) e disponibilidade para contratação técnica.',
          model: 'blindagem-anti-injection',
          fallback: false
        }));
      }

      const selectedModel = ALLOWED_MODELS.includes(parsed.model) ? parsed.model : 'cascata-principal';
      const messages = [{ role: 'system', content: SYSTEM_PROMPT_EXECUTIVO }];

      for (const item of clientHistory.slice(-6)) {
        if (item && item.role && item.content) {
          messages.push({
            role: item.role === 'user' ? 'user' : 'assistant',
            content: String(item.content).slice(0, 1000)
          });
        }
      }

      messages.push({ role: 'user', content: userMessage.trim().slice(0, 2000) });

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
            model: selectedModel,
            messages,
            temperature: 0.3,
            max_tokens: 600
          }),
          signal: controller.signal
        });

        clearTimeout(timer);

        if (!response.ok) throw new Error(`OmniRoute HTTP ${response.status}`);

        const data = await response.json();
        const reply = data?.choices?.[0]?.message?.content;

        if (reply && typeof reply === 'string') {
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          return res.end(JSON.stringify({
            success: true,
            reply: reply.trim(),
            model: data.model || selectedModel
          }));
        }

        throw new Error('Formato inesperado na resposta');
      } catch {
        clearTimeout(timer);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({
          success: false,
          fallback: true,
          notice: 'OmniRoute local offline; fallback acionado para motor local.'
        }));
      }
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ success: false, error: 'JSON malformado.' }));
    }
  });
}

function handleTelemetryEndpoint(req, res) {
  applySecurityAndCorsHeaders(res);
  const clientIp = getClientIp(req);

  let body = '';
  req.on('data', chunk => {
    body += chunk;
    if (body.length > MAX_PAYLOAD_BYTES) req.destroy();
  });

  req.on('end', () => {
    try {
      const parsed = JSON.parse(body || '{}');
      const eventType = String(parsed.type || 'pageview').slice(0, 50);

      const eventRecord = {
        type: eventType,
        page: String(parsed.page || '/').slice(0, 100),
        referrer: String(parsed.referrer || 'direto').slice(0, 200),
        sessionId: String(parsed.sessionId || '').slice(0, 50),
        screenRes: String(parsed.screenRes || '').slice(0, 20),
        timeOnPageSec: parseInt(parsed.timeOnPageSec, 10) || 0,
        timestamp: parsed.timestamp || new Date().toISOString(),
        receivedAt: new Date().toISOString(),
        ip: clientIp,
        country: (req.headers['cf-ipcountry'] || '').slice(0, 10),
        city: (req.headers['cf-ipcity'] || '').slice(0, 50),
        region: (req.headers['cf-region'] || '').slice(0, 50),
        metadata: typeof parsed.metadata === 'object' && parsed.metadata !== null ? parsed.metadata : {}
      };

      const line = JSON.stringify(eventRecord) + '\n';
      fs.appendFile(TELEMETRY_FILE, line, 'utf-8', () => {});

      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ success: true }));
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ success: false, error: 'JSON malformado' }));
    }
  });
}

function handleMetricsEndpoint(req, res) {
  applySecurityAndCorsHeaders(res);

  if (!fs.existsSync(TELEMETRY_FILE)) {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({
      totalEvents: 0,
      totalPageviews: 0,
      uniqueVisitors: 0,
      whatsappClicks: 0,
      curriculoViews: 0,
      copilotOpens: 0,
      projectClicks: {},
      topReferrers: [],
      topCities: [],
      recentEvents: []
    }));
  }

  fs.readFile(TELEMETRY_FILE, 'utf-8', (err, rawData) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ success: false, error: 'Erro ao ler telemetria' }));
    }

    const lines = rawData.split('\n').filter(Boolean);
    const events = [];
    const ipSet = new Set();
    const referrerMap = new Map();
    const cityMap = new Map();
    const projectClickMap = {
      'djen-mcp': 0,
      'rubinot-ai': 0,
      'calc-coffee': 0,
      'sdd-factory': 0
    };

    let totalPageviews = 0;
    let whatsappClicks = 0;
    let curriculoViews = 0;
    let copilotOpens = 0;

    for (let i = 0; i < lines.length; i++) {
      try {
        const ev = JSON.parse(lines[i]);
        events.push(ev);
        if (ev.ip) ipSet.add(ev.ip);

        if (ev.type === 'pageview') {
          totalPageviews++;
          if (ev.page && ev.page.includes('curriculo')) curriculoViews++;
        } else if (ev.type === 'click_whatsapp') {
          whatsappClicks++;
        } else if (ev.type === 'click_curriculo') {
          curriculoViews++;
        } else if (ev.type === 'open_copilot') {
          copilotOpens++;
        } else if (ev.type === 'click_project') {
          const pId = ev.metadata?.projectId || '';
          if (projectClickMap[pId] !== undefined) projectClickMap[pId]++;
          else projectClickMap[pId] = (projectClickMap[pId] || 0) + 1;
        }

        const ref = (ev.referrer && ev.referrer !== 'direto') ? new URL(ev.referrer, 'http://localhost').hostname : 'Direto / Link';
        referrerMap.set(ref, (referrerMap.get(ref) || 0) + 1);

        const loc = [ev.city, ev.country].filter(Boolean).join(', ') || 'Local / Direto';
        cityMap.set(loc, (cityMap.get(loc) || 0) + 1);
      } catch (_) {}
    }

    const topReferrers = Array.from(referrerMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const topCities = Array.from(cityMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const recentEvents = events.slice(-50).reverse();

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({
      totalEvents: events.length,
      totalPageviews,
      uniqueVisitors: ipSet.size,
      whatsappClicks,
      curriculoViews,
      copilotOpens,
      projectClicks: projectClickMap,
      topReferrers,
      topCities,
      recentEvents
    }));
  });
}

function serveStaticFile(req, res) {
  applySecurityAndCorsHeaders(res);

  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  const segments = safePath.split(/[\/\\]+/).filter(Boolean);

  // 1. Bloqueio Estrito de Dotfiles e travessia
  if (segments.some(seg => seg.startsWith('.')) || safePath.includes('..')) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('403 Acesso Negado');
  }

  // 2. Bloqueio de arquivos internos e infraestrutura
  const lowerSegments = segments.map(s => s.toLowerCase());
  const blockedRoots = ['tests', 'scripts', 'node_modules', '.agents', '.sdd', '.git', 'data'];
  const blockedFiles = ['serve.js', 'package.json', 'package-lock.json', 'readme.md'];

  if (blockedRoots.includes(lowerSegments[0]) || (lowerSegments.length === 1 && blockedFiles.includes(lowerSegments[0]))) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('403 Acesso Negado');
  }

  // 3. Whitelist Estrita de recursos públicos
  const allowedRootFiles = ['index.html', 'curriculo.html', 'metrics.html', 'robots.txt', 'favicon.ico'];
  const allowedDirs = ['css', 'js', 'assets'];

  const isAllowedRoot = lowerSegments.length === 1 && allowedRootFiles.includes(lowerSegments[0]);
  const isAllowedDir = lowerSegments.length >= 2 && allowedDirs.includes(lowerSegments[0]);

  if (!isAllowedRoot && !isAllowedDir) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('403 Acesso Negado');
  }

  const filePath = path.join(PUBLIC_DIR, safePath);
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
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });

    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    applySecurityAndCorsHeaders(res);
    res.writeHead(204);
    return res.end();
  }

  const cleanUrl = req.url.split('?')[0];

  if (cleanUrl === '/api/health' && req.method === 'GET') {
    applySecurityAndCorsHeaders(res);
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({
      status: 'ok',
      architecture: 'hybrid-zero-trust',
      service: 'portfolio-gustavo-simoes',
      timestamp: new Date().toISOString()
    }));
  }

  if (cleanUrl === '/api/portfolio/chat' && req.method === 'POST') {
    return handleChatEndpoint(req, res);
  }

  if (cleanUrl === '/api/portfolio/telemetry' && req.method === 'POST') {
    return handleTelemetryEndpoint(req, res);
  }

  if (cleanUrl === '/api/portfolio/metrics' && req.method === 'GET') {
    return handleMetricsEndpoint(req, res);
  }

  return serveStaticFile(req, res);
});

if (require.main === module) {
  server.listen(PORT, '0.0.0.0', () => {
    const ip = getLocalIp();
    console.log(`Portfólio Executivo ativo: http://localhost:${PORT}/ (Rede: http://${ip}:${PORT}/)`);
    console.log(`Painel de Métricas:        http://localhost:${PORT}/metrics.html`);
  });
}

module.exports = {
  server,
  handleChatEndpoint,
  handleTelemetryEndpoint,
  handleMetricsEndpoint,
  SYSTEM_PROMPT_EXECUTIVO
};
