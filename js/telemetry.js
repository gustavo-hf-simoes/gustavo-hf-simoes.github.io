/**
 * ============================================================================
 * MOTOR DE TELEMETRIA PRIVADA & MÉTRICAS DE CONVERSÃO — GUSTAVO SIMÕES
 * Mini-pixel assíncrono (< 4 KB) | Zero cookies | Zero bloqueio de render
 * Captura: Pageviews, Cliques em WhatsApp/Currículo/Cases, Copiloto e Tempo
 * ============================================================================
 */

(function () {
  'use strict';

  // Chaves de controle local
  const STORAGE_KEY_SESSION = 'gs_telemetry_sid';
  const STORAGE_KEY_QUEUE = 'gs_telemetry_queue';
  const HEARTBEAT_INTERVAL_MS = 25000; // Heartbeat a cada 25s

  let sessionStartTime = Date.now();
  let cachedApiBase = null;
  let isResolving = false;
  let hasSentPageview = false;

  // Gerador de Session ID anônimo local
  function getSessionId() {
    try {
      let sid = sessionStorage.getItem(STORAGE_KEY_SESSION);
      if (!sid) {
        sid = 'sid_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
        sessionStorage.setItem(STORAGE_KEY_SESSION, sid);
      }
      return sid;
    } catch (_) {
      return 'sid_ephemeral_' + Date.now();
    }
  }

  // Descobre a URL do backend híbrido (localhost vs túnel Zero-Trust)
  async function resolveEndpoint() {
    if (cachedApiBase) return cachedApiBase;
    if (isResolving) return null;
    isResolving = true;

    try {
      const isLocal = ['localhost', '127.0.0.1', '0.0.0.0'].includes(window.location.hostname);
      if (isLocal) {
        cachedApiBase = window.location.origin;
        isResolving = false;
        return cachedApiBase;
      }

      // Em ambiente estático (GitHub Pages), lê tunnel-config.json
      const configRes = await fetch('assets/tunnel-config.json?t=' + Date.now(), { cache: 'no-store' });
      if (configRes.ok) {
        const config = await configRes.json();
        if (config && config.tunnelBaseUrl && typeof config.tunnelBaseUrl === 'string') {
          cachedApiBase = config.tunnelBaseUrl.replace(/\/+$/, '');
          isResolving = false;
          return cachedApiBase;
        }
      }
    } catch (_) {
      // Falha silenciosa
    }

    isResolving = false;
    return null;
  }

  // Fila local de contingência (para caso o PC / túnel esteja em standby)
  function enqueueEvent(payload) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_QUEUE);
      const queue = raw ? JSON.parse(raw) : [];
      queue.push(payload);
      if (queue.length > 50) queue.shift(); // Limite de 50 eventos
      localStorage.setItem(STORAGE_KEY_QUEUE, JSON.stringify(queue));
    } catch (_) {}
  }

  function getAndClearQueue() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_QUEUE);
      if (!raw) return [];
      localStorage.removeItem(STORAGE_KEY_QUEUE);
      return JSON.parse(raw) || [];
    } catch (_) {
      return [];
    }
  }

  // Envia evento de telemetria via beacon ou fetch com keepalive
  async function sendEvent(type, metadata = {}) {
    const elapsedSec = Math.round((Date.now() - sessionStartTime) / 1000);
    const payload = {
      type: type,
      page: window.location.pathname || '/',
      referrer: document.referrer || 'direto',
      sessionId: getSessionId(),
      screenRes: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language || 'pt-BR',
      timeOnPageSec: elapsedSec,
      timestamp: new Date().toISOString(),
      metadata: metadata
    };

    const apiBase = await resolveEndpoint();
    if (!apiBase) {
      // Backend temporariamente inacessível (guarda na fila local)
      enqueueEvent(payload);
      return;
    }

    const targetUrl = `${apiBase}/api/portfolio/telemetry`;
    const payloadString = JSON.stringify(payload);

    // Tenta primeiro enviar eventos pendentes da fila se existirem
    const queued = getAndClearQueue();
    if (queued.length > 0) {
      for (const item of queued) {
        try {
          fetch(targetUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
            keepalive: true
          }).catch(() => {});
        } catch (_) {}
      }
    }

    // Envia o evento atual
    if (navigator.sendBeacon) {
      const blob = new Blob([payloadString], { type: 'application/json' });
      const success = navigator.sendBeacon(targetUrl, blob);
      if (!success) {
        fetch(targetUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payloadString,
          keepalive: true
        }).catch(() => enqueueEvent(payload));
      }
    } else {
      fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payloadString,
        keepalive: true
      }).catch(() => enqueueEvent(payload));
    }
  }

  // Monitoramento automático de cliques estratégicos
  function setupClickTracking() {
    document.addEventListener('click', function (e) {
      const target = e.target.closest('a, button, [data-project-id], .project-card, .btn');
      if (!target) return;

      // 1. WhatsApp Clicks
      const href = target.getAttribute('href') || '';
      if (href.includes('wa.me') || href.includes('whatsapp.com')) {
        sendEvent('click_whatsapp', {
          source: target.getAttribute('id') || target.className || 'link_whatsapp',
          text: (target.innerText || target.getAttribute('aria-label') || '').trim().slice(0, 50)
        });
        return;
      }

      // 2. Currículo ATS Clicks
      if (href.includes('curriculo.html') || target.id === 'printCvBtn') {
        sendEvent('click_curriculo', {
          source: target.getAttribute('id') || 'link_curriculo',
          action: target.id === 'printCvBtn' ? 'print_or_pdf' : 'view_curriculo'
        });
        return;
      }

      // 3. Cliques em Cards de Projetos
      const projectCard = target.closest('.project-card, [data-project-id]');
      if (projectCard) {
        const projectId = projectCard.getAttribute('data-project-id') ||
                          projectCard.dataset.id ||
                          projectCard.querySelector('h3')?.innerText ||
                          'case_item';
        sendEvent('click_project', {
          projectId: String(projectId).slice(0, 50),
          title: (projectCard.querySelector('h3')?.innerText || '').slice(0, 60)
        });
        return;
      }

      // 4. Copiloto IA (Abertura da gaveta)
      if (target.id === 'copilotFab' || target.closest('#copilotFab')) {
        sendEvent('open_copilot', { source: 'fab_button' });
        return;
      }

      // 5. GitHub externo
      if (href.includes('github.com')) {
        sendEvent('click_github', { url: href });
      }
    }, true);
  }

  // Heartbeat de tempo de permanência e saída da página
  function setupHeartbeatTracking() {
    // Dispara a cada 25 segundos se o usuário estiver ativo na aba
    setInterval(() => {
      if (!document.hidden) {
        sendEvent('heartbeat', { active: true });
      }
    }, HEARTBEAT_INTERVAL_MS);

    // Dispara ao fechar ou trocar de aba
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        sendEvent('page_exit', { reason: 'visibility_hidden' });
      }
    });

    window.addEventListener('beforeunload', () => {
      sendEvent('page_exit', { reason: 'beforeunload' });
    });
  }

  // Inicialização
  function init() {
    if (hasSentPageview) return;
    hasSentPageview = true;

    // Dispara Pageview Inicial
    sendEvent('pageview', {
      title: document.title,
      userAgent: navigator.userAgent
    });

    setupClickTracking();
    setupHeartbeatTracking();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Exporta globalmente para integração com Copiloto ou UI se necessário
  window.PortfolioTelemetry = {
    sendEvent: sendEvent,
    resolveEndpoint: resolveEndpoint
  };
})();
