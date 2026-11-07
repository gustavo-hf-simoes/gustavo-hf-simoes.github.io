# Memória Contínua do Projeto — Portfólio Profissional (Analista de IA)

Este documento mantém o alinhamento estratégico, decisões permanentes e contexto do projeto para todos os agentes da esteira SDD (PO, Arquiteto, Backend, Frontend e QA).

---

## 📌 Propósito Essencial
Criar uma aplicação web interativa de portfólio profissional de alto impacto visual e técnico, posicionando Gustavo para posições de **Analista de Inteligência Artificial Júnior / Pleno**.
O projeto demonstra domínio prático e avançado de:
- **Google Antigravity** & **Spec-Driven Development (SDD)** AI-First.
- **Orquestração Multi-Agente** autônoma com governança orientada a eventos.
- **Protocolo MCP (Model Context Protocol)** com servidores customizados em produção.
- **Roteamento Inteligente de Modelos de Linguagem** (OmniRoute, economia extrema de tokens).
- **Engenharia Full-Stack & PWA Offline-First**.

---

## 👥 Personas Validadas
1. **Mariana (Tech Recruiter / Talent Acquisition)**:
   - Foco: Escaneabilidade rápida (< 45s), clareza de competências reais de Analista de IA, links funcionais e contato imediato em 1 clique (WhatsApp / LinkedIn / Currículo em PDF).
2. **Carlos (AI Tech Lead / Engineering Manager)**:
   - Foco: Rigor arquitetural, diagramas de dados, contratos de API, código limpo, simulador da esteira de IA e auditoria de testes.

---

## 🚀 Os 5 Cases Reais Mapeados no Portfólio
1. **SDD Factory & Antigravity Autopilot**: Fábrica de software AI-First com 6 agentes especializados, esteira orientada a eventos via daemon (porta 20129) e roteador multi-LLM (OmniRoute 20128). Economia de até 85% de tokens.
2. **DJEN LegalTech & WhatsApp Jurídico MCP**: Automação jurídica full-stack (Node.js/TS, React, PostgreSQL) com servidor MCP customizado (`whatsapp-juridico`), intake flow de clientes, geração de procuração e kit PDF com estrita conformidade OAB/LGPD.
3. **CoffeeApp (Calc Coffee)**: PWA Offline-First de alta precisão para barismo profissional seguindo normas SCA/BSCA, com WakeLock API, assistente de voz via Web Speech API e design system mobile-first.
4. **Rubinot Analytics & Coaching AI**: Pipeline Python de telemetria de partidas, parsing de logs em tempo real e motor analítico de coaching de desempenho estratégico.
5. **Estácio SAVA Bridge**: Automação educacional híbrida (Browser Extension/UserScript + Python Bridge + geração automatizada de dossiês acadêmicos em PDF).

---

## 🏛️ Diretrizes Globais & Decisões Arquiteturais
- **Governança SDD**: 4 etapas (`00_inbox`, `01_product`, `02_architecture`, `03_development`, `04_qa`) com checkpoints humanos obrigatórios.
- **Documentos de Referência**:
  - PRD: `.sdd/01_product/PRD.md` (Aprovado no Checkpoint 1)
  - SPEC: `.sdd/02_architecture/SPEC.md` (Concluído)
  - DB_SCHEMA: `.sdd/02_architecture/DB_SCHEMA.md` (Concluído)
  - TASKS: `.sdd/02_architecture/TASKS.md` (Concluído)
  - ADRs: `.sdd/memory/ADR.md`
- **Stack Aprovada**:
  - Frontend: HTML5 Semântico + Tailwind CSS v3 Dark Mode Cyber-Minimalista + Vanilla ESModules JS.
  - Backend/API: Servidor REST Node.js opcional / Mock Server com suporte a SQLite e JSON Schemas em `data/`.
  - PWA: Offline-First via Service Worker nativo.
- **UI/UX**: Todos os componentes interativos devem obrigatoriamente tratar os 4 estados visuais: **Loading**, **Sucesso**, **Empty** e **Erro**.
