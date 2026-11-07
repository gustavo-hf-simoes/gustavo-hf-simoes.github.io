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

## 3. Os 4 Cases Reais em Produção

1. **DJEN LegalTech & WhatsApp Jurídico MCP:**
   - Servidor MCP de 8 ferramentas integrando n8n e WhatsApp Business.
   - Geração automática de Kit de Procuração em PDF e triagem com -90% no tempo de atendimento.
2. **Rubinot Companion & Telemetry Analytics:**
   - Ingestão determinística de 4 fontes JSON em Python 3.
   - Derivação da equação polinomial cúbica de progressão de XP:
     $$\ XP(L) = \frac{50}{3}(L^3 - 6L^2 + 17L - 12) \$$
   - Algoritmo exclusivo Sio Split e testes automatizados E2E Caixa-Opaca em 4 camadas.
3. **Calc Coffee (CoffeeApp) PWA:**
   - PWA Offline-First construído sob normas da Specialty Coffee Association (SCA/BSCA).
   - Motor matemático reativo de extração, diagnóstico sensorial na Roda de Sabores e síntese de voz.
4. **Orquestração Multi-Agente SDD (Antigravity Autopilot):**
   - Esteira AI-First com 4 etapas, 2 checkpoints humanos de aprovação e roteamento inteligente com até 85% de economia de tokens via OmniRoute.

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

## 5. API de Chat (/api/portfolio/chat)

- **Método:** `POST`
- **Payload:**
```json
{
  "message": "Quais são as principais competências do Gustavo em automação e IA?",
  "history": []
}
```
- **Resposta:**
```json
{
  "success": true,
  "reply": "Gustavo possui experiência comprovada...",
  "model": "cascata-principal"
}
```
*Em caso de indisponibilidade do OmniRoute local, o endpoint responde `{ "success": false, "fallback": true }`, orientando a UI a ativar seu motor offline determinístico.*

---

## 6. Licença e Autoria
Desenvolvido por **Gustavo Henrique Ferreira Simões**. Todos os direitos reservados.
Governança por **Antigravity Autopilot & Spec-Driven Development (SDD)**.
