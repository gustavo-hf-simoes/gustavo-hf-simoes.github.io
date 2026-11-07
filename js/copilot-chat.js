/**
 * ============================================================================
 * PORTFÓLIO EXECUTIVO — GUSTAVO HENRIQUE FERREIRA SIMÕES
 * Motor Conversacional de IA Real & Fallback Heurístico Contextual Inteligente
 * ============================================================================
 */

class CopilotChatEngine {
  /**
   * Inicializa o Copiloto Conversacional
   * @param {Object} options 
   */
  constructor(options = {}) {
    this.history = options.history || [];
    this.primaryApiUrl = options.primaryApiUrl || "/api/portfolio/chat";
    this.timeoutMs = options.timeoutMs || 5000;
    this.data = options.data || (typeof window !== "undefined" && window.PORTFOLIO_DATA) || null;
    this.discoveredApiUrl = null;
  }

  /**
   * Descoberta Automática de Endpoint Híbrido (Localhost vs. Nuvem Estática + Túnel)
   * @returns {Promise<string|null>}
   */
  async resolveApiEndpoint() {
    if (this.discoveredApiUrl !== null) {
      return this.discoveredApiUrl;
    }

    if (typeof window === "undefined" || !window.location) {
      this.discoveredApiUrl = this.primaryApiUrl;
      return this.discoveredApiUrl;
    }

    const host = window.location.hostname;
    const isLocal = host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0";

    // 1. Em ambiente local, utiliza diretamente o endpoint relativo do servidor
    if (isLocal) {
      this.discoveredApiUrl = this.primaryApiUrl;
      return this.discoveredApiUrl;
    }

    // 2. Em domínio estático público (GitHub Pages, Cloudflare Pages), lê assets/tunnel-config.json
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(`assets/tunnel-config.json?_t=${Date.now()}`, {
        signal: controller.signal
      });
      clearTimeout(timer);

      if (res.ok) {
        const config = await res.json();
        const base = (config && typeof config.tunnelBaseUrl === "string") ? config.tunnelBaseUrl.trim() : "";
        if (base && (base.startsWith("http://") || base.startsWith("https://"))) {
          this.discoveredApiUrl = `${base.replace(/\/+$/, "")}/api/portfolio/chat`;
          return this.discoveredApiUrl;
        }
      }
    } catch {
      // Ignora falhas de leitura do config de túnel
    }

    // Se túnel não estiver configurado ou PC estiver desligado, aciona motor local sem erro
    this.discoveredApiUrl = "";
    return null;
  }

  /**
   * Envia uma mensagem ao Copiloto IA (tenta API real primeiro; aciona fallback contextual se offline)
   * @param {string} userMessage 
   * @returns {Promise<{reply: string, model: string, source: string}>}
   */
  async ask(userMessage) {
    const prompt = String(userMessage || "").trim();
    if (!prompt) {
      return {
        reply: "Por favor, digite uma dúvida ou selecione uma das perguntas sugeridas.",
        model: "Validador",
        source: "system"
      };
    }

    // Registra a mensagem do usuário no histórico local
    this.history.push({
      role: "user",
      content: prompt,
      timestamp: Date.now()
    });

    // 1. TENTA CONSULTAR A API DE IA REAL (Local/Cloud Server)
    try {
      const apiResult = await this.tryFetchLlm(prompt);
      if (apiResult && apiResult.reply) {
        this.history.push({
          role: "assistant",
          content: apiResult.reply,
          model: apiResult.model || "LLM Real",
          source: "api",
          timestamp: Date.now()
        });

        return {
          reply: apiResult.reply,
          model: apiResult.model || "LLM Real (SDD Live Preview)",
          source: "api"
        };
      }
    } catch {
      // Ignora e cai suavemente no motor contextual inteligente
    }

    // 2. MOTOR CONVERSACIONAL CONTEXTUAL INTELIGENTE (Offline/Fallback)
    const contextualReply = this.generateContextualReply(prompt, this.history);
    this.history.push({
      role: "assistant",
      content: contextualReply,
      model: "Motor Heurístico Contextual",
      source: "local",
      timestamp: Date.now()
    });

    return {
      reply: contextualReply,
      model: "Copiloto IA Local • Contexto Verificado",
      source: "local"
    };
  }

  /**
   * Tenta fazer requisição para a API Híbrida com timeout controlado de 5s
   * @param {string} prompt 
   * @returns {Promise<{reply: string, model?: string} | null>}
   */
  async tryFetchLlm(prompt) {
    if (typeof fetch === "undefined") return null;

    const endpoint = await this.resolveApiEndpoint();
    if (!endpoint) return null;

    const payload = JSON.stringify({
      message: prompt,
      history: this.history.slice(-8)
    });

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), this.timeoutMs);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: payload,
        signal: controller.signal
      });

      clearTimeout(timer);

      if (res.ok) {
        const data = await res.json();
        if (data && (data.reply || (data.success && data.reply))) {
          return {
            reply: data.reply,
            model: data.model || "LLM Server (Híbrido 24/7)"
          };
        }
      }
    } catch {
      // Falha suave de rede / timeout / CORS: reavalia futuramente
      this.discoveredApiUrl = null;
    }

    return null;
  }

  /**
   * Motor Conversacional Contextual que analisa múltiplas intenções e formula respostas completas
   * @param {string} userMessage 
   * @param {Array} history 
   * @returns {string}
   */
  generateContextualReply(userMessage, history = []) {
    const raw = String(userMessage || "").trim();
    const q = raw.toLowerCase();

    // Mapeamento de intenções
    const isGreeting = /^(oi|ol[aá]|bom dia|boa tarde|boa noite|opa|hey|saudações|salve)\b/i.test(q) ||
      q.includes("quem e voce") || q.includes("quem é você") || q.includes("quem e vc") ||
      q.includes("o que voce faz") || q.includes("o que você faz");

    const isWhyHire = q.includes("por que contratar") || q.includes("porque contratar") ||
      q.includes("diferencial") || q.includes("diferenciais") || q.includes("pontos fortes") ||
      q.includes("motivos para contratar") || q.includes("por que o gustavo");

    const isConcent = q.includes("concent") || q.includes("lis") || q.includes("his") ||
      q.includes("laborat") || q.includes("hospital") || q.includes("tcp/ip") || q.includes("tcp") ||
      q.includes("rs-232") || q.includes("rs232") || q.includes("serial");

    const isCSharp = q.includes("c#") || q.includes("csharp") || q.includes(".net") || q.includes("dotnet");
    const isPython = q.includes("python") || q.includes("threadinghttpserver") || q.includes("scripts");
    const isFrontend = q.includes("angular") || q.includes("react") || q.includes("typescript") ||
      q.includes("javascript") || q.includes("frontend") || q.includes("front-end") || q.includes("pwa");

    const isSQL = q.includes("sql") || q.includes("postgres") || q.includes("mysql") ||
      q.includes("banco de dados") || q.includes("supabase") || q.includes("firebase");

    const isAiAgents = q.includes("agente") || q.includes("agentes") || q.includes("ia") ||
      q.includes("inteligencia artificial") || q.includes("inteligência artificial") ||
      q.includes("llm") || q.includes("finops") || q.includes("tokens") || q.includes("guardrails");

    const isMcp = q.includes("mcp") || q.includes("model context protocol");
    const isN8n = q.includes("n8n") || q.includes("webhook") || q.includes("fluxo");

    const isDjen = q.includes("djen") || q.includes("jurid") || q.includes("procura") ||
      q.includes("revisao veicular") || q.includes("revisão contratual") || q.includes("tribunal");

    const isRubinot = q.includes("rubinot") || q.includes("cubica") || q.includes("cúbica") ||
      q.includes("sio split") || q.includes("sio") || q.includes("tibia") || q.includes("telemetria") ||
      q.includes("chart.js") || q.includes("matematica") || q.includes("matemática");

    const isCalcCoffee = q.includes("calc coffee") || q.includes("cafe") || q.includes("café") ||
      q.includes("sca") || q.includes("sensorial") || q.includes("extrac") || q.includes("extraç");

    const isSdd = q.includes("sdd") || q.includes("spec-driven") || q.includes("governan") ||
      q.includes("esteira") || q.includes("checkpoint") || q.includes("prd");

    const isScrum = q.includes("scrum") || q.includes("psm") || q.includes("agil") || q.includes("ágil");

    const isEducation = q.includes("estacio") || q.includes("estácio") || q.includes("ads") ||
      q.includes("faculdade") || q.includes("unifil") || q.includes("biomedicina") ||
      q.includes("gradua") || q.includes("formação") || q.includes("formacao");

    const isHiring = q.includes("contrata") || q.includes("pj") || q.includes("clt") ||
      q.includes("regime") || q.includes("pretens") || q.includes("salario") || q.includes("salário") ||
      q.includes("vaga") || q.includes("proposta");

    const isLocation = q.includes("londrina") || q.includes("parana") || q.includes("paranÁ") ||
      q.includes("remoto") || q.includes("hibrido") || q.includes("híbrido") || q.includes("presencial") ||
      q.includes("mora") || q.includes("onde");

    const isContact = q.includes("whatsapp") || q.includes("whats") || q.includes("wpp") ||
      q.includes("email") || q.includes("e-mail") || q.includes("telefone") || q.includes("contato") ||
      q.includes("conversar") || q.includes("agendar") || q.includes("entrevista");

    // Resposta contextual baseada na combinação de intenções:

    // 1. Saudações Simples
    if (isGreeting && !isWhyHire && !isRubinot && !isConcent && !isAiAgents && !isDjen) {
      return (
        "Olá! Sou o **Copiloto Técnico de Gustavo Simões**.\n\n" +
        "Estou aqui para apresentar a trajetória de mais de **6 anos em desenvolvimento de sistemas críticos**, " +
        "suas especializações em **Engenharia de IA, MCP, n8n, C#/.NET, Python, Angular e SQL**, além dos 4 cases práticos em produção.\n\n" +
        "Você pode me perguntar sobre os projetos (**Rubinot Companion**, **DJEN LegalTech**, **Calc Coffee PWA**, **Esteira SDD**), " +
        "sua experiência na **Concent Sistemas**, certificação **PSM I** ou como **entrar em contato direto**!"
      );
    }

    // 2. Por que contratar o Gustavo?
    if (isWhyHire) {
      return (
        "**Por que contratar Gustavo Henrique Ferreira Simões?**\n\n" +
        "Gustavo reúne um perfil raro no mercado que une **duas forças complementares**:\n\n" +
        "1. **Maturidade Técnica de Produção (6+ anos):** Não é um entusiasta recente de IA. Possui 6 anos e 5 meses de bagagem profunda na **Concent Sistemas**, lidando com sistemas hospitalares/laboratoriais (**LIS/HIS**), automação de protocolos de baixo nível (**TCP/IP, RS-232**), bancos de dados relacionais e APIs em **C# / .NET Core, Angular e SQL**.\n" +
        "2. **Engenharia de IA Moderna & FinOps:** Domina a criação de **Servidores MCP (Model Context Protocol)**, fluxos complexos em **n8n com WhatsApp Business**, arquitetura multi-agente e redução de até **85% de custo de tokens** com governança SDD.\n" +
        "3. **Rigor Ágil & Entrega Contínua:** Certificado internacionalmente como **Professional Scrum Master™ I (PSM I - Scrum.org)** e com base analítica sólida (graduando em ADS na Estácio com matriz AWS/IA e bacharel em Biomedicina pela UniFil).\n\n" +
        "Ele está disponível para início imediato nos modelos **PJ ou CLT** (Remoto ou Londrina/PR)."
      );
    }

    // 3. Rubinot Companion & Matemática Cúbica
    if (isRubinot) {
      return (
        "**Arquitetura Matemática & Engenharia do Rubinot Companion:**\n\n" +
        "O Rubinot Companion é uma plataforma local-first em Python 3 + Chart.js desenvolvida para resolver a fragmentação de 4 arquivos JSON de telemetria:\n\n" +
        "• **Equação Cúbica Oficial:** Aplica o polinômio oficial `$XP(L) = \\frac{50}{3}(L^3 - 6L^2 + 17L - 12)$` para derivar Raw/Net XP/h com exatidão matemática absoluta e projetar horas restantes até o Level 720.\n" +
        "• **Algoritmo Sio Split:** Separa de forma determinística a cura dedicada ao grupo (`Friend Sio`) da auto-cura (`Self-Healing`), gerando métricas precisas de DPS, HPS, Peak Hit e Peak Cast.\n" +
        "• **Pipeline Analítico:** Normaliza os dados brutos em servidor `ThreadingHTTPServer`, exporta CSV retrocompatível (+22 colunas) e envia resumos de 2 embeds para Discord.\n" +
        "• **Qualidade 4-Tier:** Homologado por suíte automatizada de testes E2E Caixa-Opaca em 4 camadas (Consistência Matemática, Invariantes de Negócio, Contratos HTTP e Paridade DOM)."
      );
    }

    // 4. DJEN LegalTech & MCP
    if (isDjen) {
      return (
        "**Case DJEN LegalTech — Automação Jurídica via MCP:**\n\n" +
        "Solução completa construída para otimizar a rotina de escritórios jurídicos:\n\n" +
        "• **Model Context Protocol (MCP):** Criação do servidor `whatsapp-juridico` com ferramentas atômicas para consulta de conversas, leitura de documentos e alimentação estruturada da pasta do cliente.\n" +
        "• **Kit de Procuração em PDF:** Redução de mais de **90% no tempo de atendimento**, gerando o kit de procuração e declarações em PDF pronto para assinatura digital durante a própria conversa no WhatsApp.\n" +
        "• **Integração DJEN & Cálculos:** Monitoramento automatizado de intimações no Diário de Justiça Eletrônico Nacional e motor de cálculo para teses de Revisão Contratual Veicular."
      );
    }

    // 5. Calc Coffee PWA
    if (isCalcCoffee) {
      return (
        "**Calc Coffee — PWA Offline-First & Copiloto Sensorial SCA:**\n\n" +
        "Aplicação focada em baristas e apreciadores de cafés especiais com interface Editorial Dark Luxury:\n\n" +
        "• **Motor de Proporções Reativo:** Cálculo dinâmico de doses e ataques faseados de água (bloom + despejos) com ratios de 1:10 a 1:18 em menos de 15ms.\n" +
        "• **Bússola Sensorial SCA:** Copiloto que recebe o feedback gustativo na xícara (amargor, adstringência, sub-extração ácida) e instrui os ajustes finos de granulometria, temperatura e ratio.\n" +
        "• **100% Offline-First:** Arquitetura SPA Vanilla sem dependências externas, Service Worker para cache total e persistência local instantânea."
      );
    }

    // 6. Governança SDD & FinOps de IA
    if (isSdd || (isAiAgents && (q.includes("finops") || q.includes("governan") || q.includes("orquestra")))) {
      return (
        "**Esteira SDD (Spec-Driven Development) & Governança de IA:**\n\n" +
        "Metodologia proprietária que resolve os três maiores problemas do uso corporativo de LLMs (alucinação, estouro de orçamento e desalinhamento de negócio):\n\n" +
        "• **Esteira em 4 Fases:** 01_Produto (PRD) → 02_Arquitetura (SPEC, DB Schema, APIs) → 03_Desenvolvimento Full Stack → 04_Auditoria QA.\n" +
        "• **2 Checkpoints Humanos (Human-in-the-Loop):** Validação executiva de escopo e homologação técnica de arquitetura antes de qualquer código ser gerado.\n" +
        "• **Economia de até 85% em Tokens (FinOps):** Cada estágio opera com janela de contexto estritamente isolada e roteamento automático: modelos rápidos e econômicos para rotinas e modelos de fronteira apenas para decisões críticas."
      );
    }

    // 7. Concent Sistemas & Experiência de 6+ Anos
    if (isConcent || (isCSharp && isConcent)) {
      return (
        "**Trajetória na Concent Sistemas (2019 – 2025 | 6 anos e 5 meses):**\n\n" +
        "Gustavo atuou como **Analista de Desenvolvimento de Sistemas** em Londrina/PR com foco em ambientes clínicos e laboratoriais de alta criticidade:\n\n" +
        "• **Automação Laboratorial de Baixo Nível:** Desenvolvimento de integrações com analisadores clínicos e sistemas **LIS/HIS** via protocolos seriais e de rede (**TCP/IP e RS-232**), garantindo recebimento e parser determinístico de dados biomédicos.\n" +
        "• **Engenharia Full Stack:** Construção e sustentação de módulos em **C# / .NET Core, Angular e TypeScript**.\n" +
        "• **Bancos de Dados Relacionais:** Modelagem avançada, stored procedures, triggers e tuning de queries em **PostgreSQL, SQL Server e MySQL** para suportar grande volumetria diária."
      );
    }

    // 8. MCP (Model Context Protocol) & n8n
    if (isMcp || isN8n || (isAiAgents && !isWhyHire)) {
      return (
        "**Engenharia de IA, Servidores MCP & Automações n8n:**\n\n" +
        "• **Model Context Protocol (MCP):** Desenvolvimento de servidores locais e em nuvem com schemas de ferramentas estritos em JSON Schema, permitindo que LLMs interajam de forma segura com bancos de dados, APIs do WhatsApp e sistemas de arquivos sem alucinação.\n" +
        "• **Workflows Avançados no n8n:** Criação de rotinas com tratamento robusto de webhooks, roteamento condicional, rate limits, retry com backoff e integração com a **WhatsApp Business API**.\n" +
        "• **Engenharia de Prompt & Guardrails:** Proteção contra prompt injection, validação determinística de saídas e uso de context caching para redução de latência e custo."
      );
    }

    // 9. Stack Tecnológica (Linguagens, Frontend, Backend, Banco)
    if (isCSharp || isPython || isFrontend || isSQL || q.includes("stack") || q.includes("tecnologias")) {
      return (
        "**Stack Tecnológica Dominada por Gustavo Simões:**\n\n" +
        "• **Linguagens & Backend:** C# (.NET Core), Python 3, TypeScript, JavaScript (Node.js ES6+), APIs RESTful, Webhooks, TCP/IP e RS-232.\n" +
        "• **Frontend & Mobile:** Angular, React, PWAs Offline-First, HTML5 semântico, CSS3 Moderno (sem dependência de frameworks pesados).\n" +
        "• **IA & Automação:** Agentes Autônomos, Servidores MCP, n8n, APIs OpenAI/Gemini/Anthropic, FinOps de LLMs, Guardrails.\n" +
        "• **Bancos de Dados & Nuvem:** PostgreSQL, SQL Server, MySQL, Supabase, Firebase, AWS Cloud e Docker.\n" +
        "• **Metodologia:** Professional Scrum Master™ I (PSM I), Spec-Driven Development (SDD) e Testes E2E Caixa-Opaca."
      );
    }

    // 10. Formação Acadêmica & Certificação PSM I
    if (isEducation || isScrum) {
      return (
        "**Formação Acadêmica & Certificações Internacionais:**\n\n" +
        "• **Professional Scrum Master™ I (PSM I - Scrum.org):** Certificação internacional que comprova capacidade de liderar cerimônias ágeis, refinamento de backlog e entrega contínua com previsibilidade.\n" +
        "• **Tecnólogo em Análise e Desenvolvimento de Sistemas (Estácio, 2026–2028):** Matriz moderna 2026 focada em Computação em Nuvem AWS, Engenharia de Prompt, Inteligência Artificial, Microsserviços e Python.\n" +
        "• **Bacharelado em Biomedicina (UniFil, 2017–2021):** Graduação com forte rigor analítico, estatística e validação de processos críticos — facilitando a atuação técnica em sistemas de saúde (LIS/HIS)."
      );
    }

    // 11. Contratação, Regime, Salário & Disponibilidade
    if (isHiring || isLocation) {
      return (
        "**Disponibilidade, Modelos de Contratação & Localização:**\n\n" +
        "• **Modelos:** Aberto a contratação tanto em regime **PJ** quanto **CLT**.\n" +
        "• **Modalidades:** 100% **Remoto** (para empresas de todo o Brasil e exterior), **Híbrido** ou **Presencial** em Londrina/PR e região.\n" +
        "• **Disponibilidade:** Imediata para novas oportunidades técnicas.\n\n" +
        "Para conversar sobre propostas ou agendar uma entrevista técnica:\n" +
        "• **WhatsApp:** `+55 (43) 99603-4632`\n" +
        "• **E-mail:** `gustavo.hf.simoes@gmail.com`"
      );
    }

    // 12. Contato Direto & WhatsApp
    if (isContact) {
      return (
        "**Canais de Contato Direto com Gustavo Simões:**\n\n" +
        "• **WhatsApp:** [+55 (43) 99603-4632](https://wa.me/5543996034632)\n" +
        "• **E-mail:** [gustavo.hf.simoes@gmail.com](mailto:gustavo.hf.simoes@gmail.com)\n" +
        "• **GitHub:** [github.com/gustavo-hf-simoes](https://github.com/gustavo-hf-simoes)\n" +
        "• **Currículo A4 / ATS:** Disponível no menu lateral da página (`curriculo.html`).\n\n" +
        "Fique à vontade para mandar uma mensagem no WhatsApp para agendarmos uma conversa técnica!"
      );
    }

    // 13. Resposta Contextual Geral
    return (
      `Entendi sua pergunta sobre "${raw}".\n\n` +
      "Gustavo Simões atua como **Analista de IA & Desenvolvedor Full Stack**, somando mais de **6 anos de experiência em produção** (Concent Sistemas, C#/.NET, Angular, LIS/HIS, TCP-IP, SQL) com especialização avançada em **Agentes de IA, Model Context Protocol (MCP), n8n e esteiras SDD**.\n\n" +
      "Recomendo explorar os 4 cases em destaque ou me perguntar especificamente sobre:\n" +
      "• A matemática cúbica e telemetria do **Rubinot Companion**\n" +
      "• O servidor MCP e triagem WhatsApp do **DJEN LegalTech**\n" +
      "• A arquitetura PWA offline-first do **Calc Coffee**\n" +
      "• A governança e economia de tokens da **Esteira SDD**\n" +
      "• Sua disponibilidade para **contratação PJ/CLT** em Londrina ou Remoto."
    );
  }

  /**
   * Limpa o histórico de mensagens mantido na sessão
   */
  clearHistory() {
    this.history = [];
  }

  /**
   * Retorna cópia rasa do histórico atual
   * @returns {Array}
   */
  getHistory() {
    return [...this.history];
  }
}

if (typeof window !== "undefined") {
  window.CopilotChatEngine = CopilotChatEngine;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = CopilotChatEngine;
}
