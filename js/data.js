/**
 * ============================================================================
 * PORTFÓLIO EXECUTIVO — GUSTAVO HENRIQUE FERREIRA SIMÕES
 * Módulo de Dados, Iconografia Vetorial SVG & Especificações Técnicas
 * ============================================================================
 */

const SVG_ICONS = {
  cpu: `<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
  zap: `<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  code: `<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  shield: `<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  lock: `<svg class="svg-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  arrowUpRight: `<svg class="svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>`,
  checkCircle: `<svg class="svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  clock: `<svg class="svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  circleDot: `<svg class="svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>`,
  target: `<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  layers: `<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  terminal: `<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
  barChart: `<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`,
  award: `<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  check: `<svg class="svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  chevronRight: `<svg class="svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  send: `<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  sparkles: `<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
  refresh: `<svg class="svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>`,
  whatsapp: `<svg class="svg-icon whatsapp-svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`
};

const PORTFOLIO_DATA = {
  profile: {
    name: "Gustavo Simões",
    fullName: "Gustavo Henrique Ferreira Simões",
    role: "Analista de IA & Desenvolvedor Full Stack",
    headline: "Engenheiro Full Stack & Especialista em Automação e Inteligência Artificial",
    location: "Londrina, Paraná, Brasil",
    email: "gustavo.hf.simoes@gmail.com",
    whatsappNumber: "5543996034632",
    whatsappDisplay: "+55 (43) 99603-4632",
    linkedinUrl: "https://linkedin.com/in/ghfs",
    githubUrl: "https://github.com/gustavo-hf-simoes",
    resumeUrl: "curriculo.html",
    availability: "Disponível para contratação PJ ou CLT em regime Remoto, Híbrido ou Presencial (Londrina/PR)"
  },

  skillAxes: [
    {
      id: "axis-1",
      title: "Engenharia de IA & MCP",
      icon: SVG_ICONS.cpu,
      badge: "Core Focus",
      skills: [
        "Agentes Autônomos & Orquestração Multi-Agente",
        "Model Context Protocol (MCP Servers & Tools)",
        "Roteamento Inteligente de LLMs & FinOps",
        "Engenharia de Prompt Estruturada & Guardrails",
        "RAG, Memória Contextual & Function Calling"
      ]
    },
    {
      id: "axis-2",
      title: "Automação & Integrações",
      icon: SVG_ICONS.zap,
      badge: "Workflows & Protocolos",
      skills: [
        "Orquestração Avançada com n8n & Webhooks",
        "WhatsApp Business API & Bots Transacionais",
        "Protocolos TCP/IP & RS-232 (Automação LIS/HIS)",
        "Ingestão de Telemetria & Parsers Determinísticos",
        "Integrações RESTful, OAuth2 & Filas Assíncronas"
      ]
    },
    {
      id: "axis-3",
      title: "Full Stack & Dados",
      icon: SVG_ICONS.code,
      badge: "6+ Anos Produção",
      skills: [
        "C# / .NET Core, Node.js, Python & TypeScript",
        "Angular, React, HTML5/CSS3 & PWAs Offline-First",
        "PostgreSQL, SQL Server, MySQL, Supabase & Firebase",
        "Modelagem Relacional, Views, Triggers & Tuning SQL",
        "Algoritmos Matemáticos, Cálculos Jurídicos & Analytics"
      ]
    },
    {
      id: "axis-4",
      title: "Governança, DevOps & Ágil",
      icon: SVG_ICONS.shield,
      badge: "PSM I Certified",
      skills: [
        "Spec-Driven Development (SDD) & Contratos API-First",
        "Professional Scrum Master™ I (PSM I - Scrum.org)",
        "Computação em Nuvem AWS, Docker & Linux",
        "Testes E2E Caixa-Opaca & Auditoria de Qualidade",
        "Gestão de Equipes, Requisitos & Compliance (LGPD)"
      ]
    }
  ],

  pipelineSteps: [
    {
      step: "01",
      stage: "00_inbox & 01_product",
      title: "Descoberta & PRD Estruturado",
      agent: "Agente de Produto",
      description: "Transforma demandas de negócio em Product Requirements Documents (PRD) com personas, métricas de valor e critérios BDD verificáveis antes de qualquer linha de código."
    },
    {
      step: "02",
      stage: "Checkpoint Humano 1",
      title: "Validação de Escopo & Negócio",
      agent: "Human-in-the-Loop",
      description: "Revisão executiva assistida para alinhar regras de negócio, prioridades e retorno sobre investimento (ROI), eliminando retrabalho na origem."
    },
    {
      step: "03",
      stage: "02_architecture",
      title: "Arquitetura API-First & Dados",
      agent: "Agente Arquiteto",
      description: "Geração de especificações técnicas (SPEC), diagramas Entidade-Relacionamento, modelagem SQL e contratos RESTful com validação estrita de schema."
    },
    {
      step: "04",
      stage: "Checkpoint Humano 2",
      title: "Homologação de Stack & Segurança",
      agent: "Human-in-the-Loop",
      description: "Aprovação da arquitetura técnica, isolamento de credenciais, limites de infraestrutura e conformidade com LGPD."
    },
    {
      step: "05",
      stage: "03_development & 04_qa",
      title: "Implementação & Auditoria QA",
      agent: "Engenharia & QA",
      description: "Desenvolvimento Full Stack com os 4 estados visuais obrigatórios (Loading, Sucesso, Empty, Erro) seguido de bateria automatizada de testes E2E."
    }
  ],

  projects: [
    {
      id: "djen-mcp",
      title: "DJEN LegalTech — Automação Jurídica & Atendimento via MCP",
      category: "ai-agents",
      categoryLabel: "Agentes IA & LegalTech",
      featured: true,
      shortDescription: "Plataforma jurídica integrada ao Diário de Justiça Eletrônico Nacional (DJEN) e servidor MCP para atendimento automatizado no WhatsApp Business, geração de kits de procuração em PDF e cálculos de revisão contratual.",
      metrics: [
        { value: "-90%", label: "Tempo de Triagem & Kit PDF" },
        { value: "MCP", label: "Integração Nativa WhatsApp" },
        { value: "24/7", label: "Monitoramento DJEN & Prazos" }
      ],
      tags: ["Model Context Protocol (MCP)", "Node.js / TypeScript", "WhatsApp Business API", "Automação Jurídica", "PostgreSQL / Supabase", "Geração PDF"],
      problem: "Escritórios jurídicos perdiam horas diárias monitorando publicações no Diário de Justiça Eletrônico Nacional (DJEN), qualificando clientes manualmente no WhatsApp, coletando documentos em pastas dispersas e preenchendo procurações e cálculos de revisão veicular repetitivos.",
      architecture: "Arquitetura orientada a ferramentas MCP (`whatsapp-juridico`) acoplada a uma aplicação Full Stack. O agente monitora conversas, consulta e estrutura o histórico do cliente, gera automaticamente o Kit de Procuração em PDF pronto para assinatura digital, organiza os documentos na pasta estruturada do cliente e executa algoritmos matemáticos de amortização e revisão de contratos veiculares.",
      architectureMermaid: `graph LR
        WA[WhatsApp Business] --> MCP[Servidor MCP Jurídico]
        DJEN[API Publicações DJEN] --> CORE[Motor LegalTech & Prazos]
        MCP --> PDF[Gerador Procuração & Kit PDF]
        MCP --> DOCS[Organizador de Pasta do Cliente]
        CORE --> DB[(PostgreSQL / Supabase)]`,
      results: [
        "Redução superior a 90% no tempo entre o primeiro contato do cliente no WhatsApp e a emissão do Kit de Procuração em PDF.",
        "Organização automatizada de documentos recebidos (áudio, imagem, PDF) diretamente no diretório estruturado do cliente.",
        "Motor de cálculo financeiro/jurídico preciso para teses de Revisão de Contrato Veicular e acompanhamento de publicações DJEN."
      ],
      lessons: "Projetar ferramentas MCP com schemas JSON estritos e responsabilidades atômicas (listar conversas, gerar PDF, alimentar pasta) garante zero alucinação no manuseio de dados sensíveis de clientes."
    },
    {
      id: "rubinot-ai",
      title: "Rubinot Companion — Motor de Telemetria, Derivação Matemática Cúbica & Analytics",
      category: "telemetry-data",
      categoryLabel: "Telemetria & Engenharia de Dados",
      featured: true,
      shortDescription: "Plataforma local-first em Python e Chart.js para ingestão determinística de 4 fontes de telemetria JSON, derivação matemática de curva cúbica de XP, separação algorítmica de cura (Sio Split) e notificação Discord.",
      metrics: [
        { value: "4 Fontes", label: "Ingestão JSON Determinística" },
        { value: "+22 Cols", label: "Schema CSV/JSON Retrocompatível" },
        { value: "4-Tier", label: "Suíte de Testes E2E Caixa-Opaca" }
      ],
      tags: ["Python 3", "Modelagem Matemática Cúbica", "ThreadingHTTPServer", "Chart.js SPA", "Discord Webhooks", "Testes E2E 4-Tier"],
      problem: "Logs de sessão do cliente Tibia/Rubinot eram gerados em 4 arquivos JSON fragmentados (`partyhistory.json`, `impactanalyser.json`, `itemtracking.json` e `itemprices.json`) com formatações numéricas inconsistentes e sem cruzamento analítico de eficiência de combate, cura dedicada ao grupo ou projeção matemática de progressão.",
      architecture: "Pipeline analítico 100% determinístico em Python (`rubinot_Queries.py` + `server.py` sobre `ThreadingHTTPServer`) que normaliza os 4 JSONs brutos, aplica a equação polinomial cúbica oficial $XP(L) = \\frac{50}{3}(L^3 - 6L^2 + 17L - 12)$ para derivar Raw/Net XP/h e estimativa exata até o Level 720, calcula DPS/Peak Hit, realiza o Sio Split (isolando cura em aliados `Friend Sio` de auto-cura `Self-Healing`), precifica loot/supplies e serve um dashboard SPA em Chart.js com envio de resumo rico em 2 embeds (`< 1.500 chars`) para Discord.",
      architectureMermaid: `graph LR
        J1[partyhistory + impactanalyser] --> PY[Motor Python & Parser Determinístico]
        J2[itemtracking + itemprices] --> PY
        PY --> MATH[Derivação Cúbica XP & Sio Split]
        MATH --> EXP[CSV +22 Cols & JSON Aninhado]
        MATH --> SPA[SPA Chart.js & Discord 2-Embed]`,
      results: [
        "Derivação matemática exata de XP/h (Raw e Net), Level Estimation e projeção de horas restantes para a meta de Level 720.",
        "Algoritmo exclusivo de Sio Split que separa com precisão a cura dedicada ao grupo (`Heal Friend`) da auto-cura, além de métricas de DPS, HPS, Peak Hit e Peak Cast.",
        "Exportação retrocompatível adicionando +22 colunas analíticas ao CSV histórico e estrutura JSON aninhada (`combat`, `healing`, `xp`, `loot_valuation`, `supplies_used`).",
        "Validação de qualidade com suíte automatizada E2E Caixa-Opaca em 4 camadas (Consistência Matemática, Invariantes de Negócio, Contratos HTTP/API e Paridade Visual DOM)."
      ],
      lessons: "Separar a camada de parsing/matemática pura da camada de apresentação e cobri-la com invariantes matemáticas automatizadas permite evoluir o schema analítico (+22 variáveis) com zero regressão nos dados históricos."
    },
    {
      id: "calc-coffee",
      title: "Calc Coffee — PWA Offline-First & Copiloto Sensorial (Padrão SCA)",
      category: "fullstack-pwa",
      categoryLabel: "Full Stack & PWA",
      featured: true,
      shortDescription: "Aplicação Web Progressiva (PWA) de estética Editorial Dark Luxury com motor matemático de proporção áurea de extração, diagnóstico sensorial interativo baseado na Roda de Sabores SCA e persistência Offline-First.",
      metrics: [
        { value: "100%", label: "Operação Offline-First" },
        { value: "SCA", label: "Diagnóstico Roda Sensorial" },
        { value: "< 15ms", label: "Cálculo Reativo em Tempo Real" }
      ],
      tags: ["JavaScript ES6+", "PWA / Service Workers", "CSS3 Dark Luxury", "Algoritmo de Extração SCA", "LocalStorage Engine", "Mobile-First UI"],
      problem: "Baristas e entusiastas de cafés especiais dependiam de planilhas ou aplicativos lentos para recalcular proporções de água, café, moagem e despejos em métodos coados (V60, Origami, Chemex, Prensa, Espresso), além de não terem um guia rápido para corrigir extrações sub-extraídas (ácidas) ou super-extraídas (amargas).",
      architecture: "Arquitetura SPA modular zero-dependência com Service Worker para cache offline integral. Inclui motor dinâmico de receitas por método de preparo, cronômetro de despejos faseado, módulo de Diagnóstico Sensorial interativo (Bússola de Extração SCA que ajusta moagem, temperatura e ratio conforme o feedback sensorial na xícara) e Diário de Extrações persistente.",
      architectureMermaid: `graph LR
        UI[Interface Mobile-First Dark Luxury] --> ENG[Motor de Proporção & Despejos]
        UI --> SCA[Copiloto de Diagnóstico Sensorial SCA]
        ENG --> SW[Service Worker Offline Cache]
        SCA --> DB[(Persistência Local Instantânea)]`,
      results: [
        "Cálculo instantâneo de receitas personalizadas (ratio 1:10 a 1:18) com divisão automática de ataques de água (bloom + despejos).",
        "Copiloto Sensorial que traduz percepções na xícara (acidez aguda, adstringência, corpo ralo) em ajustes práticos de granulometria e temperatura.",
        "Experiência nativa instalável em iOS e Android com carregamento instantâneo mesmo sem conexão de rede."
      ],
      lessons: "Interfaces utilitárias usadas durante tarefas físicas (como preparar café com balança e cronômetro) exigem alto contraste tipográfico, alvos de toque amplos e zero latência de rede."
    },
    {
      id: "sdd-factory",
      title: "Arquitetura de Orquestração Multi-Agente & Governança AI-First",
      category: "ai-agents",
      categoryLabel: "Arquitetura & FinOps IA",
      featured: true,
      shortDescription: "Framework proprietário de Engenharia de Software orientada a especificações (Spec-Driven Development) com roteamento inteligente de LLMs, isolamento de contexto por estágio e checkpoints executivos.",
      metrics: [
        { value: "-85%", label: "Custo Operacional de Tokens" },
        { value: "4 Etapas", label: "Esteira Governada c/ QA" },
        { value: "100%", label: "Rastreabilidade PRD → Código" }
      ],
      tags: ["Arquitetura Multi-Agente", "Spec-Driven Development (SDD)", "FinOps de LLMs", "Governança AI-First", "Automação de QA"],
      problem: "O uso ad-hoc de LLMs no desenvolvimento de software gera perda de contexto em projetos médios/grandes, alto custo financeiro com modelos de fronteira em tarefas repetitivas e código que diverge das regras de negócio originais.",
      architecture: "Arquitetura executiva estruturada em esteira de 4 estágios (Produto, Arquitetura, Engenharia Full Stack e Auditoria de QA) intercalados por 2 Checkpoints Humanos de aprovação. Cada agente especialista recebe exclusivamente o artefato homologado da etapa anterior, combinado a um roteador inteligente de modelos que aloca LLMs de alta velocidade para execução e reserva modelos de raciocínio profundo para decisões arquiteturais.",
      architectureMermaid: `graph LR
        IN[Demanda de Negócio] --> S1[1. Descoberta & PRD]
        S1 --> CP1{Checkpoint Humano}
        CP1 --> S2[2. Arquitetura API-First]
        S2 --> CP2{Checkpoint Técnico}
        CP2 --> S3[3. Dev Full Stack & 4. QA]`,
      results: [
        "Redução média de 85% no consumo de créditos de API através de roteamento inteligente por complexidade de tarefa e isolamento de janela de contexto.",
        "Padronização de entregas com documentação viva (PRD, Especificação Técnica, Schema de Dados e Relatório de Auditoria QA).",
        "Eliminação de código desalinhado ao negócio graças aos gates obrigatórios de homologação humana antes da codificação."
      ],
      lessons: "A verdadeira produtividade com IA generativa na engenharia de software não vem de prompts isolados, mas de governança de estado, contratos claros entre agentes e validação determinística."
    }
  ],

  careerExperience: [
    {
      company: "Concent Sistemas",
      role: "Analista de Desenvolvimento de Sistemas",
      period: "2019 – 2025 (6 anos e 5 meses)",
      location: "Londrina, Paraná, Brasil",
      summary: "Liderou desenvolvimento e sustentação de sistemas laboratoriais (LIS/HIS), automação industrial com protocolos de baixo nível TCP/IP e RS-232, além de APIs em C# / .NET Core, Angular e bancos relacionais em alta volumetria."
    },
    {
      company: "Consultoria em IA & Desenvolvimento Full Stack",
      role: "Especialista em Automação, Agentes de IA & Full Stack",
      period: "2025 – Presente",
      location: "Londrina, Paraná (Remoto / Híbrido)",
      summary: "Arquitetura e implantação de Agentes Autônomos, servidores MCP (Model Context Protocol), automações avançadas no n8n com WhatsApp Business API, pipelines de esteira SDD e soluções Full Stack sob medida."
    }
  ],

  education: [
    {
      institution: "Centro Universitário Estácio de Ribeirão Preto",
      degree: "Tecnólogo em Análise e Desenvolvimento de Sistemas (ADS)",
      period: "2026 – 2028 (Em andamento)",
      details: "Matriz curricular moderna 2026 com ênfase em Computação em Nuvem AWS, Engenharia de Prompt & IA, Microsserviços e Python."
    },
    {
      institution: "Centro Universitário Filadélfia (UniFil)",
      degree: "Bacharelado em Biomedicina",
      period: "2017 – 2021 (Concluído)",
      details: "Formação analítica rigorosa com base em estatística, método científico, controle de qualidade e validação de processos críticos."
    }
  ],

  certifications: [
    {
      name: "Professional Scrum Master™ I (PSM I)",
      issuer: "Scrum.org",
      badge: "Credencial Internacional Verificada",
      description: "Certificação internacional de domínio do framework Scrum, facilitação ágil, refinamento contínuo de backlog e maximização de valor de entrega."
    }
  ],

  chatbotKnowledge: {
    architecture: {
      title: "Experiência em Arquitetura Full Stack & Integrações Críticas",
      answer: "Gustavo Simões possui mais de **6 anos de experiência sólida** construindo sistemas de missão crítica:\n\n• **Concent Sistemas (2019–2025 | 6 anos e 5 meses):** Atuou como Analista de Desenvolvimento de Sistemas em Londrina/PR, liderando integrações de automação laboratorial com sistemas **LIS e HIS** via protocolos de baixo nível (**TCP/IP e RS-232**), além de desenvolvimento Full Stack em **C# / .NET Core, Angular e SQL (PostgreSQL, MySQL, SQL Server)**.\n• **Consultoria em IA & Automação (2025–Presente):** Arquitetura de Agentes de IA, servidores **MCP**, fluxos avançados em **n8n**, integrações com **WhatsApp Business API** e sistemas para o setor jurídico (**DJEN**) e financeiro."
    },
    finops: {
      title: "Engenharia de IA, MCP & Otimização de Custos (FinOps)",
      answer: "Na frente de Inteligência Artificial Aplicada, Gustavo combina engenharia de software tradicional com orquestração moderna de LLMs:\n\n• **Model Context Protocol (MCP):** Criação de servidores e ferramentas estruturadas para conectar agentes de IA a bancos de dados, WhatsApp Business e geradores de documentos PDF sem alucinação.\n• **Governança Spec-Driven & FinOps:** Uso de pipelines multi-agente com contexto isolado por etapa e roteamento inteligente de modelos — reduzindo em até **85% o consumo de tokens** enquanto mantém 100% de fidelidade às regras de negócio."
    },
    stack: {
      title: "Stack Tecnológica, Formação & Certificações",
      answer: "Resumo técnico e acadêmico de **Gustavo Henrique Ferreira Simões** (Londrina, PR):\n\n• **Linguagens & Backend:** C# (.NET Core), Python, TypeScript, JavaScript (Node.js), SQL.\n• **Frontend & Mobile:** Angular, React, HTML5/CSS3, PWAs Offline-First.\n• **IA & Automação:** Agentes de IA, MCP, n8n, OpenAI/Gemini/Claude APIs, Webhooks, WhatsApp Business API.\n• **Bancos de Dados & Cloud:** PostgreSQL, SQL Server, MySQL, Supabase, Firebase, AWS.\n• **Certificação & Formação:** **Professional Scrum Master™ I (PSM I - Scrum.org)** | Graduando em **Análise e Desenvolvimento de Sistemas (Estácio, 2026–2028)** | Bacharel em **Biomedicina (UniFil, 2017–2021)**."
    },
    rubinot: {
      title: "Arquitetura Matemática do Rubinot Companion",
      answer: "O **Rubinot Companion** é uma plataforma analítica em Python 3 + Chart.js que ingere 4 JSONs brutos (`partyhistory.json`, `impactanalyser.json`, `itemtracking.json`, `itemprices.json`):\n\n• **Curva Cúbica Oficial de XP:** Aplica `XP(L) = (50/3) * (L³ - 6L² + 17L - 12)` para derivar Raw/Net XP/h e projeção exata de horas até o Level 720.\n• **Algoritmo Sio Split:** Separa matematicamente a cura dedicada ao grupo (`Heal Friend`) da auto-cura (`Self-Healing`), além de DPS, HPS, Peak Hit e Peak Cast.\n• **Qualidade 4-Tier E2E:** Exporta CSV retrocompatível (+22 colunas) e resumo Discord em 2 embeds (`< 1.500 chars`), validado por suíte E2E Caixa-Opaca em 4 camadas."
    },
    whatsapp: {
      title: "Agendar Entrevista ou Conversar no WhatsApp",
      answer: "Você pode falar diretamente com o Gustavo Simões agora mesmo:\n\n• **WhatsApp Direto:** `+55 (43) 99603-4632`\n• **E-mail:** `gustavo.hf.simoes@gmail.com`\n• **Localização:** Londrina, Paraná (Disponível para atuação Remota, Híbrida ou Presencial)\n\nClique no botão verde de WhatsApp no menu lateral ou abra o **Currículo ATS / A4**!"
    }
  }
};

if (typeof window !== "undefined") {
  window.SVG_ICONS = SVG_ICONS;
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { SVG_ICONS, PORTFOLIO_DATA };
}
