# Product Requirements Document (PRD) — Portfólio Profissional (Analista de IA)

- **Versão**: 1.0.0
- **Data de Aprovação do Checkpoint 1**: 2026-11-07
- **Autor / Agente Responsável**: `sdd-po-market` (Fábrica SDD & Antigravity Autopilot)
- **Status da Etapa**: Concluída (Checkpoint 1 Aprovado)

---

## 1. Visão Geral e Proposta de Valor

### 1.1 Nome do Produto
**Portfólio Profissional Interativo — Gustavo | Analista de Inteligência Artificial Júnior/Pleno**

### 1.2 Elevator Pitch
Uma aplicação web interativa de alto impacto que comprova na prática o domínio avançado de **Engenharia de IA, Orquestração Multi-Agente, Protocolo MCP (Model Context Protocol) e Governança SDD (Spec-Driven Development)**, posicionando Gustavo como o candidato ideal para posições de **Analista de IA Júnior/Pleno** com capacidade de execução técnica muito acima da média do mercado.

### 1.3 O Problema Central
- **Mercado saturado de promessas rasas**: Recrutadores técnicos e líderes de IA recebem centenas de currículos com alegações genéricas de "engenharia de prompt" ou certificados básicos sem nenhum código de produção ou sistema autônomo funcional.
- **Dificuldade de avaliar sênioridade prática**: Portfólios estáticos em PDF não comprovam capacidade de arquitetar sistemas, lidar com restrições orçamentárias de tokens, integrar servidores MCP locais ou implementar pipelines de agentes resilientes com checkpoints humanos.
- **Falta de demonstração ao vivo da stack moderna**: Raríssimos candidatos possuem cases reais integrando roteadores de LLM de custo zero (OmniRoute), automação de processos regulados (Jurídico OAB/LGPD) e PWAs de alta precisão com APIs modernas do navegador.

### 1.4 A Solução Proposta
Uma plataforma web moderna, fluida e com estética Cyber-Minimalista Dark Mode que funciona como vitrine técnica viva e interativa:
1. **Posicionamento Estratégico Claro**: Foco cirúrgico em Analista de IA Júnior/Pleno, demonstrando domínio de ponta a ponta: da modelagem de negócio até o deploy e observabilidade.
2. **Vitrine dos 5 Cases de Alta Complexidade do PC**:
   - **SDD Factory & Antigravity Autopilot**: Fábrica de software AI-First autônoma governada por 6 agentes, watcher em daemon e roteador OmniRoute.
   - **DJEN LegalTech & WhatsApp Jurídico MCP**: Plataforma jurídica com servidor MCP proprietário, intake automático e geração de peças com compliance OAB/LGPD.
   - **CoffeeApp (Calc Coffee)**: PWA Offline-First de barismo de precisão com Web Speech API, WakeLock e padrão internacional SCA.
   - **Rubinot Analytics & Coaching AI**: Pipeline em Python de telemetria e análise de partidas em tempo real com motor de coaching analítico.
   - **Estácio SAVA Bridge**: Automação educacional híbrida via browser extension e bridge Python com extração estruturada de dossiês acadêmicos.
3. **Simulador Interativo da Esteira SDD**: Widget visual onde o visitante pode simular a passagem de uma ideia pelas 4 fases (Inbox -> PRD -> SPEC -> Código -> QA Audit).
4. **AI Pitch Assistant / Chatbot de Carreira**: Assistente interativo embutido que responde dúvidas de recrutadores sobre o background, projetos, stack e disponibilidade de Gustavo.
5. **Download Rápido de Currículo e Contato 1-Click**: Acesso instantâneo a WhatsApp, LinkedIn, GitHub e versão PDF consolidada.

---

## 2. Personas e Público-Alvo

### 2.1 Persona Primária: Mariana — Tech Recruiter & Talent Acquisition (Especialista em Dados/IA)
- **Perfil**: Recrutadora em consultorias, fintechs, legaltechs ou scale-ups de tecnologia. Recebe mais de 50 currículos/dia para vagas de IA.
- **Dores**:
  - Perde tempo com candidatos que só sabem fazer perguntas no ChatGPT e não entendem de código, git, arquitetura ou banco de dados.
  - Precisa validar rapidamente se o candidato cumpre os requisitos da vaga antes de enviar para a triagem do gestor técnico.
- **Objetivos**:
  - Identificar em menos de 30 segundos se Gustavo tem experiência real e aplicável.
  - Baixar o currículo em PDF formatado ou abrir uma conversa no WhatsApp com um único clique.
- **Cenário de Uso Típico**:
  - Abre o link pelo LinkedIn ou indicação no celular ou desktop, escaneia as tags de stack e cases, vê os números de impacto e clica no botão "Falar no WhatsApp".

### 2.2 Persona Secundária: Carlos — AI Tech Lead / Engineering Manager
- **Perfil**: Líder técnico experiente gerenciando times de software e produtos de inteligência artificial generativa.
- **Dores**:
  - Frustrado com custos astronômicos de APIs proprietárias (OpenAI/Anthropic) por falta de arquitetura de cache, fallback e roteamento inteligente.
  - Dificuldade de encontrar profissionais que entendam de Tool Calling, Model Context Protocol (MCP) e governança para evitar alucinações.
- **Objetivos**:
  - Avaliar a solidez arquitetural dos projetos, os diagramas ER, a estrutura de código e o raciocínio de engenharia.
  - Interagir com o Simulador SDD e o Chatbot para testar a robustez técnica da solução.
- **Cenário de Uso Típico**:
  - Abre o portfólio no desktop durante a entrevista técnica ou pré-triagem, inspeciona o DevTools, visualiza os schemas de API e audita o repositório no GitHub.

---

## 3. Jornadas do Usuário (User Journeys)

### 3.1 Jornada do Tech Recruiter (Happy Path — 45 Segundos para Conversão)
1. **Entrada**: Recrutadora acessa a URL raiz. A interface carrega em menos de 800ms sem travamentos.
2. **Impacto Imediato**: Vê o cabeçalho com badge pulsante `"Disponível para Oportunidades | Analista de IA Júnior/Pleno"`, foto/avatar profissional, links rápidos e pitch objetivo.
3. **Exploração Rápida**: Rola para a seção "Cases em Produção", clica no filtro "Multi-Agent & SDD" e vê o case da Fábrica SDD e DJEN LegalTech.
4. **Conversão**: Clica em "Baixar CV Completo" ou "Conversar via WhatsApp".

### 3.2 Jornada do Tech Lead (Deep Dive Técnico)
1. **Entrada**: Tech Lead clica na seção "Arquitetura & Cases".
2. **Inspeção**: Abre o Drawer/Modal do projeto "DJEN LegalTech + WhatsApp MCP", examina o diagrama de arquitetura do servidor MCP, as métricas de latência e o stack (Node.js, TypeScript, PostgreSQL, Baileys/WhatsApp).
3. **Interação com a SDD Factory**: Interage com o mini-simulador de Esteira SDD na página, visualizando como a governança com checkpoints humanos reduz em 80% o retrabalho de código.
4. **Verificação de Código**: Clica no botão "Ver Repositório / Documentação Técnica" para checar o código limpo e padrões de projeto.

### 3.3 Jornada de Exceção (Offline / Falha de Rede)
1. **Cenário**: Recrutador abre a página em trânsito com conexão oscilante.
2. **Comportamento do Sistema**: O Service Worker / cache estático intercepta a requisição, carrega todo o conteúdo visual, dados de projetos e currículo localmente sem tela de erro ("Dinossauro").
3. **Formulário de Contato**: Caso envie uma mensagem sem internet, o sistema armazena a mensagem no `localStorage` com status pendente e oferece botão direto para abrir no aplicativo nativo do WhatsApp.

---

## 4. Requisitos Funcionais (RF) com Critérios BDD (Gherkin)

### RF-01: Hero Section & Posicionamento Estratégico
- **Descrição**: Apresentar claramente quem é Gustavo, seu foco como Analista de IA (Júnior/Pleno) e chamada para ação imediata.
- **Critérios de Aceite**:
  - **Cenário 1: Visualização do Hero em Desktop e Mobile**
    - **Dado** que um visitante acessa a página inicial
    - **Quando** a página renderiza
    - **Então** deve exibir: Título profissional ("Gustavo | Analista de Inteligência Artificial"), Badges de Especialidade (Google Antigravity, Multi-Agent SDD, MCP Protocols, OmniRoute LLM), Pitch de 2 linhas e botões de ação ("Ver Projetos", "Baixar CV", "WhatsApp").
  - **Cenário 2: Clique no Botão de WhatsApp**
    - **Dado** que o visitante clica no botão "Conversar via WhatsApp"
    - **Quando** o link for acionado
    - **Então** deve abrir uma nova aba com a URL do WhatsApp Web/App com mensagem pré-configurada amigável direcionada para contratação.

### RF-02: Vitrine de Cases com Filtros por Stack e Drawer de Detalhes
- **Descrição**: Exibir os 5 projetos de ponta de Gustavo com tags dinâmicas, métricas reais e drawer modal detalhado.
- **Critérios de Aceite**:
  - **Cenário 1: Filtragem dinâmica de cases**
    - **Dado** que a lista de projetos possui 5 cases cadastrados
    - **Quando** o usuário clica na tag "MCP & Automação"
    - **Então** apenas os projetos com essa tag são exibidos (DJEN LegalTech e SDD Factory) com animação suave de transição.
  - **Cenário 2: Abertura do Drawer de Detalhes**
    - **Dado** que o usuário clica no card "SDD Factory & Antigravity Autopilot"
    - **Quando** o modal se abre
    - **Então** deve apresentar: Visão geral do problema, Arquitetura dos 6 agentes, Papel do OmniRoute (economia de créditos), Tecnologias empregadas, Lições aprendidas e links funcionais.

### RF-03: Simulador Visual da Esteira SDD (Spec-Driven Development)
- **Descrição**: Componente interativo que demonstra didaticamente como funciona a fábrica de agentes SDD utilizada por Gustavo.
- **Critérios de Aceite**:
  - **Cenário 1: Execução da Simulação Interativa**
    - **Dado** que o usuário está na seção "Como Trabalho: Esteira SDD"
    - **Quando** clica em "Iniciar Demonstração da Esteira"
    - **Então** o componente avança passo a passo pelos estágios (00_inbox -> 01_product -> Checkpoint 1 -> 02_architecture -> Checkpoint 2 -> 03_dev -> 04_qa), destacando os agentes responsáveis (`sdd-po-market`, `sdd-architect`, `sdd-qa-auditor`) e exibindo o tempo e economia de tokens gerada.

### RF-04: Chatbot de Carreira / AI Pitch Simulator
- **Descrição**: Assistente interativo embutido (com respostas instantâneas locais baseadas no perfil e dados do Gustavo) para responder dúvidas frequentes de recrutadores.
- **Critérios de Aceite**:
  - **Cenário 1: Pergunta sobre disponibilidade e senioridade**
    - **Dado** que o recrutador clica no botão "Perguntar à IA do Gustavo"
    - **Quando** seleciona ou digita "Qual é a sua disponibilidade e modelo de contratação?"
    - **Então** o chat responde com tom profissional, informando disponibilidade para modelos Híbrido/Remoto, regime CLT/PJ e foco em vagas Júnior/Pleno.
  - **Cenário 2: Pergunta técnica sobre MCP ou Antigravity**
    - **Dado** que o recrutador pergunta "O que você desenvolveu com MCP?"
    - **Quando** envia a mensagem
    - **Então** o bot sintetiza o case do servidor `whatsapp-juridico` com 8 ferramentas ativas e integração no Antigravity.

### RF-05: Radar de Habilidades & Matriz de Competências
- **Descrição**: Exibir competências técnicas organizadas por categorias: IA & Automação (Antigravity, MCP, Multi-Agent, LLM Router), Backend (Node.js, TypeScript, Python, REST APIs, SQLite, PostgreSQL), Frontend (HTML5, Tailwind, React, PWA, Acessibilidade) e Engenharia de Software (Git, SDD, BDD, Testes).
- **Critérios de Aceite**:
  - **Cenário 1: Renderização dos 4 pilares de competências**
    - **Dado** que a seção de habilidades é visualizada
    - **Quando** o usuário passa o mouse ou clica em uma competência
    - **Então** exibe um tooltip com a aplicação prática daquela habilidade nos projetos do portfólio.

### RF-06: Formulário de Contato com Validação e Fallback WhatsApp
- **Descrição**: Permitir envio de mensagem de contato com persistência e encaminhamento para WhatsApp.
- **Critérios de Aceite**:
  - **Cenário 1: Envio bem-sucedido**
    - **Dado** que o formulário possui nome, email/telefone e mensagem válidos
    - **Quando** o usuário clica em "Enviar Mensagem"
    - **Então** exibe feedback de sucesso imediato, salva localmente e oferece botão para continuar a conversa direto no WhatsApp.

---

## 5. Requisitos Não-Funcionais (RNF)

1. **Performance**:
   - First Contentful Paint (FCP) < 1.0s em conexões 4G.
   - Pontuação Lighthouse: Performance >= 95, Acessibilidade >= 95, Melhores Práticas >= 95, SEO >= 95.
2. **Acessibilidade & Usabilidade (WCAG AA)**:
   - Contraste de cores mínimo 4.5:1 para texto padrão.
   - Navegação completa por teclado (foco visível) e suporte a leitores de tela com tags semânticas e atributos ARIA.
   - Quatro estados de interface obrigatórios em todos os componentes dinâmicos: *Loading*, *Sucesso*, *Empty* e *Erro*.
3. **Arquitetura & Resiliência (Offline-First)**:
   - Aplicação empacotada como PWA com manifesto e Service Worker para funcionamento 100% offline.
   - Zero dependência obrigatória de serviços externos de IA pagos para carregar o portfólio (todos os dados do chat e projetos contam com fallback estático ultrarrápido).
4. **Segurança**:
   - Sanitização rigorosa de qualquer entrada do usuário (proteção contra XSS).
   - Sem exposição de chaves privadas ou credenciais sensíveis nos arquivos client-side.

---

## 6. Métricas de Sucesso & Conversão (KPIs)

- **KPI-01 (Taxa de Conversão de Contato)**: >= 15% dos visitantes clicam em "WhatsApp", "LinkedIn" ou "Baixar CV".
- **KPI-02 (Tempo de Permanência Técnico)**: Tempo médio de sessão de visitantes técnicos >= 2 minutos e 30 segundos.
- **KPI-03 (Engajamento com os Cases)**: Pelo menos 60% dos visitantes abrem ao menos 1 drawer de projeto ou interagem com o Simulador SDD.
- **KPI-04 (Conformidade SDD)**: 100% de cobertura dos requisitos funcionais validados pela suíte de QA.

---

## 7. Escopo Negativo (Out-of-Scope para o MVP)

- ❌ Não haverá painel de login fechado com senha para recrutadores (o acesso é 100% livre e sem barreiras).
- ❌ Não haverá gateway de pagamento ou monetização direta.
- ❌ Não haverá backend em nuvem custoso; a aplicação será uma SPA ultra-otimizada pronta para deploy estático (GitHub Pages, Vercel, Netlify) com API opcional em Node.js para modo full-stack.

---

## 8. Alinhamento com a Memória e Governança SDD
- Checkpoint 1 já registrado como aprovado pelo usuário.
- Próximo passo autorizado: **Etapa 02 (Arquitetura, Especificação Técnica e Modelagem de Dados)**.
