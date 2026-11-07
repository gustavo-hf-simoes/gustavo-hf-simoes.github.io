# BACKEND_HANDOFF — Portfólio Executivo & Servidor de Governança SDD

- **Responsável:** `sdd-backend-dev` (Esteira SDD & Antigravity Autopilot)  
- **Data da Homologação:** 2026-11-07T08:38:00.000Z  
- **Status:** Concluído, Modularizado & Homologado (Versão 2.0.0)  
- **Ambiente:** Node.js v24.19.0 / Windows 11 / Zero Dependências NPM em Runtime  

---

## 1. Visão Geral da Arquitetura de Servidor & Backend

Em consonância com a skill `adotar-sdd` e os padrões consolidados no projeto de referência `coffee-app`, o backend do portfólio foi estruturado em um servidor HTTP nativo Node.js zero-dependência (`serve.js`), complementado por módulos puros exportáveis tanto para navegadores quanto para ambientes CommonJS.

### Principais Entregas de Backend & Governança:
1. **Servidor HTTP Zero-Dependência (`serve.js`):**
   - Porta padrão configurável: `process.env.PORT || 3001`.
   - Suporte completo a MIME types (`.html`, `.css`, `.js`, `.json`, `.svg`, `.png`, `.jpg`, `.pdf`, `.mp3`, `.woff2`, etc.).
   - Proteção de segurança contra Path Traversal (`path.normalize` com validação de prefixo `PUBLIC_DIR`).
   - Headers CORS abertos (`Access-Control-Allow-Origin: *`) e handling de preflight `OPTIONS`.

2. **Endpoint de IA Híbrida (`POST /api/portfolio/chat`):**
   - Recebe `{ message, history }` via JSON.
   - Comunica com o pool local do **OmniRoute** (`http://127.0.0.1:20128/v1/chat/completions`) com timeout de segurança (AbortController de 8.000ms).
   - Injeta o **System Prompt Executivo Oficial** detalhando toda a bagagem de Gustavo Simões (Londrina/PR, +6 anos na Concent Sistemas, C#/.NET, Angular, SQL, LIS/HIS, TCP-IP/RS-232, n8n, MCP, 4 cases reais e certificação PSM I).
   - Responde `{ success: true, reply, model }` se o OmniRoute retornar dados válidos.
   - Retorna `{ success: false, fallback: true }` em caso de indisponibilidade de rede ou falha do roteador local, permitindo que o `CopilotChatEngine` assuma instantaneamente a conversa de forma determinística sem quebrar a experiência do usuário.

3. **Arquitetura de Testes Automatizados (`tests/test-suite.js`):**
   - Suíte de 33 testes unitários e de integração utilizando apenas o módulo nativo `assert`.
   - Executável diretamente via `npm test` ou `node tests/test-suite.js`.
   - Score atual: **100/100 (33/33 Aprovados)**.

---

## 2. Matriz de Endpoints & Contratos do Servidor

| Rota / Endpoint | Método | Descrição | Status |
| :--- | :--- | :--- | :--- |
| `GET /` | `GET` | Serve a aplicação SPA principal (`index.html`) | ✅ Ativo |
| `GET /curriculo.html` | `GET` | Serve o Currículo ATS linear A4 modular | ✅ Ativo |
| `GET /css/*` | `GET` | Serve folhas de estilo modulares (`style.css`, `curriculo.css`) | ✅ Ativo |
| `GET /js/*` | `GET` | Serve os módulos ES6+ (`data.js`, `engine.js`, `copilot-chat.js`, etc.) | ✅ Ativo |
| `POST /api/portfolio/chat` | `POST` | Proxy inteligente para o pool OmniRoute com fallback gracioso | ✅ Ativo |
| `OPTIONS *` | `OPTIONS` | Handshake CORS preflight com status 204 | ✅ Ativo |

---

## 3. Comandos de Inicialização e Validação

```bash
# Iniciar o servidor HTTP
npm start
# -> http://localhost:3001/

# Executar a bateria de testes automatizados
npm test
# -> RESULTADO FINAL: 33/33 TESTES APROVADOS (100%)
```
