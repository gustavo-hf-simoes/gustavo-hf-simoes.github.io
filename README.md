# Portfólio Profissional & Currículo ATS — Gustavo Henrique Ferreira Simões

> **Analista de Inteligência Artificial & Engenheiro de Software Full Stack**  
> Londrina, Paraná, Brasil • [+55 (43) 99603-4632](https://wa.me/5543996034632) • [gustavo.hf.simoes@gmail.com](mailto:gustavo.hf.simoes@gmail.com) • [GitHub](https://github.com/gustavo-hf-simoes)

---

## 1. Visão Geral do Projeto

Aplicação de alta performance, modular e offline-first construída sob governança **Spec-Driven Development (SDD)**. O portfólio apresenta a trajetória de mais de 6 anos de experiência em engenharia de software (Concent Sistemas 2019–2025 em C#/.NET, Angular, SQL e automação LIS/HIS) e consultoria em IA (n8n, Model Context Protocol, LLMs e WhatsApp Business API), além de formação em ADS (Estácio) e certificação internacional **Professional Scrum Master™ I (PSM I - Scrum.org)**.

### Destaques Técnicos
- **Zero-Dependência em Runtime:** Servidor HTTP nativo em Node.js (`serve.js`) e interface vanilla ES6+ ultrarrápida.
- **Roteamento Híbrido de IA:** Endpoint `POST /api/portfolio/chat` conectado ao pool local do **OmniRoute** com fallback gracioso para motor conversacional local (`CopilotChatEngine`).
- **Currículo ATS Linear A4:** Página dedicada (`curriculo.html`) com estrutura semântica otimizada para robôs de triagem (Gupy, Greenhouse, Workday, Lever) e impressão A4 perfeita.
- **Conformidade de Design:** 100% ícones vetoriais SVG oficiais, zero emojis amadores em produção, 4 estados visuais governados (Loading, Sucesso, Empty, Erro).

---

## 2. Estrutura de Pastas e Modularização

O projeto segue a mesma estrutura modular adotada em projetos de referência (`coffee-app`), separando estilização, dados, motores puros e camadas de apresentação:

```text
portfolio-profissional-analista-de-ia/
├── css/
│   ├── style.css             # Estilização do portfólio executivo (Cyber-Minimalist Dark Mode)
│   └── curriculo.css         # Estilização modular do currículo ATS e regras @media print (A4)
├── js/
│   ├── data.js               # Catálogo de dados, ícones SVG vetoriais, 4 cases e perfil
│   ├── engine.js             # Funções puras de filtragem, normalização e formatação matemática
│   ├── copilot-chat.js       # Motor conversacional offline/online com suporte ao OmniRoute
│   ├── resume-ats.js         # Gerenciamento de modos (ATS Puro vs Executivo) no currículo
│   └── app.js                # Orquestração do DOM, eventos, modais e barra de estados SDD
├── tests/
│   └── test-suite.js         # Bateria automatizada de testes unitários e de integração em Node.js
├── assets/
│   └── foto_perfil.png       # Fotografia executiva profissional
├── .sdd/                     # Governança viva da Esteira Spec-Driven Development
│   ├── 00_inbox/             # Registro inicial de requisitos
│   ├── 01_product/           # PRD.md (Product Requirements Document)
│   ├── 02_architecture/      # SPEC.md, DB_SCHEMA.md, TASKS.md
│   ├── 03_development/       # BACKEND_HANDOFF.md, FRONTEND_HANDOFF.md
│   ├── 04_qa/                # QA_REPORT.md com auditoria e scores
│   └── memory/               # ADR.md e memória viva do projeto
├── curriculo.html            # Página de currículo ATS linear A4 (sem CSS inline)
├── index.html                # Aplicação SPA executiva com deep-dive de arquitetura
├── package.json              # Metadados e scripts de inicialização e teste
├── serve.js                  # Servidor HTTP nativo e router da API de chat
├── .gitignore                # Regras de exclusão de arquivos transitórios
└── README.md                 # Documentação técnica completa
```

---

## 3. Os 3 Projetos em Destaque

1. **Calc Coffee (CoffeeApp) PWA:**
   - Progressive Web App offline-first desenvolvido sob as normas internacionais da Specialty Coffee Association (SCA).
   - Motor matemático reativo de extração, diagnóstico sensorial na Roda de Sabores e persistência local.

2. **DJEN LegalTech — Automação de Processos Jurídicos:**
   - Solução desenvolvida para escritório de advocacia para automação de triagem de clientes via WhatsApp.
   - Integração com diários oficiais (DJEN), organização automática de documentos e geração de kits de procuração em PDF prontos para assinatura digital.

3. **Esteira de Engenharia com Agentes de IA (Spec-Driven Development):**
   - Pipeline de desenvolvimento em 5 etapas (Produto, Arquitetura, Desenvolvimento, Segurança e QA) com checkpoints de aprovação humana.
   - Otimização de contexto e redução de até 85% no consumo de tokens com roteamento inteligente de modelos.

---

## 4. Como Executar

### Pré-requisitos
- Node.js v18 ou superior instalado.

### 1. Iniciar o Servidor
```bash
npm start
# ou: node serve.js
```
Acesse no navegador:
- **Portfólio Executivo:** [http://localhost:3001/](http://localhost:3001/)
- **Currículo ATS / A4:** [http://localhost:3001/curriculo.html](http://localhost:3001/curriculo.html)

### 2. Executar a Suíte de Testes Automatizados
```bash
npm test
# ou: node tests/test-suite.js
```

---

## 5. Licença & Autor
Desenvolvido por **Gustavo Henrique Ferreira Simões** sob licença MIT.
