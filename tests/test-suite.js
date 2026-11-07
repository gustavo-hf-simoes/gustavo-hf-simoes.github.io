/**
 * ============================================================================
 * SUÍTE DE TESTES AUTOMATIZADOS — PORTFÓLIO GUSTAVO HENRIQUE SIMÕES
 * Validação Rigorosa de Arquitetura Modular, Dados, Motores, HTTP & SecOps
 * ============================================================================
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const http = require("http");

const ROOT_DIR = path.resolve(__dirname, "..");

let totalTests = 0;
let passedTests = 0;

function it(description, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ PASS: ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${description}`);
    console.error(`    Detalhe do erro: ${err.message}`);
    process.exitCode = 1;
  }
}

async function itAsync(description, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  ✓ PASS: ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${description}`);
    console.error(`    Detalhe do erro: ${err.message}`);
    process.exitCode = 1;
  }
}

function makeRequest(port, reqPath, method = "GET") {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: "127.0.0.1",
        port: port,
        path: reqPath,
        method: method
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: body
          });
        });
      }
    );
    req.on("error", reject);
    req.end();
  });
}

async function runTestSuite() {
  console.log("\n=======================================================");
  console.log(" SUÍTE DE TESTES UNITÁRIOS & GOVERNANÇA SDD — PORTFÓLIO");
  console.log("=======================================================\n");

  // ---------------------------------------------------------------------------
  // 1. ESTRUTURA MODULAR
  // ---------------------------------------------------------------------------
  console.log("1. Validação da Estrutura Modular de Arquivos e Assets:");
  const requiredFiles = [
    "css/style.css",
    "css/curriculo.css",
    "js/data.js",
    "js/engine.js",
    "js/copilot-chat.js",
    "js/resume-ats.js",
    "js/app.js",
    "serve.js",
    "package.json",
    ".gitignore",
    "README.md",
    "index.html",
    "curriculo.html"
  ];

  requiredFiles.forEach((relPath) => {
    it(`Deve existir o arquivo modular: ${relPath}`, () => {
      const fullPath = path.join(ROOT_DIR, relPath);
      assert.ok(fs.existsSync(fullPath), `Arquivo ausente: ${relPath}`);
      const stat = fs.statSync(fullPath);
      assert.ok(stat.size > 20, `Arquivo corrompido: ${relPath}`);
    });
  });

  // ---------------------------------------------------------------------------
  // 2. CURRÍCULO ATS
  // ---------------------------------------------------------------------------
  console.log("\n2. Auditoria do Currículo ATS & Conformidade de Estilização:");
  it("curriculo.html NÃO deve conter blocos <style> inline (100% modular)", () => {
    const cv = fs.readFileSync(path.join(ROOT_DIR, "curriculo.html"), "utf-8");
    assert.strictEqual(/<style\b[^>]*>/i.test(cv), false);
  });

  it("curriculo.html deve importar css/curriculo.css e js/resume-ats.js", () => {
    const cv = fs.readFileSync(path.join(ROOT_DIR, "curriculo.html"), "utf-8");
    assert.ok(cv.includes('href="css/curriculo.css"'));
    assert.ok(cv.includes('src="js/resume-ats.js"'));
  });

  it("curriculo.html deve conter dados de contato e localização oficial (Londrina/PR)", () => {
    const cv = fs.readFileSync(path.join(ROOT_DIR, "curriculo.html"), "utf-8");
    assert.ok(cv.includes("Londrina"));
    assert.ok(cv.includes("99603-4632") || cv.includes("5543996034632"));
    assert.ok(cv.includes("gustavo.hf.simoes@gmail.com"));
  });

  // ---------------------------------------------------------------------------
  // 3. DADOS DE PRODUÇÃO
  // ---------------------------------------------------------------------------
  console.log("\n3. Integridade dos Dados de Produção (js/data.js):");
  const { PORTFOLIO_DATA, SVG_ICONS } = require(path.join(ROOT_DIR, "js/data.js"));

  it("Deve exportar PORTFOLIO_DATA e SVG_ICONS válidos", () => {
    assert.ok(PORTFOLIO_DATA && SVG_ICONS);
    assert.strictEqual(typeof PORTFOLIO_DATA, "object");
  });

  it("Deve conter exatamente os 4 cases reais em produção (sem Estácio SAVA)", () => {
    const ids = PORTFOLIO_DATA.projects.map((p) => p.id);
    assert.strictEqual(ids.length, 4);
    assert.ok(ids.includes("djen-mcp"));
    assert.ok(ids.includes("rubinot-ai"));
    assert.ok(ids.includes("calc-coffee"));
    assert.ok(ids.includes("sdd-factory"));
    assert.strictEqual(ids.includes("estacio-sava"), false);
  });

  it("Perfil profissional deve conter Londrina/PR e WhatsApp oficial formatado", () => {
    const profile = PORTFOLIO_DATA.profile;
    assert.ok(profile.location.includes("Londrina"));
    assert.strictEqual(profile.whatsappDisplay, "+55 (43) 99603-4632");
    assert.strictEqual(profile.whatsappNumber, "5543996034632");
    assert.strictEqual(profile.email, "gustavo.hf.simoes@gmail.com");
  });

  it("Ícone SVG do WhatsApp deve ser vetorial vazado contendo path 'M17.472 14.382'", () => {
    assert.ok(SVG_ICONS.whatsapp.includes("M17.472 14.382"));
    assert.strictEqual(SVG_ICONS.whatsapp.includes("🟢"), false);
  });

  // ---------------------------------------------------------------------------
  // 4. MOTOR FUNCIONAL PURO (PortfolioEngine)
  // ---------------------------------------------------------------------------
  console.log("\n4. Validação Funcional do PortfolioEngine (js/engine.js):");
  const PortfolioEngine = require(path.join(ROOT_DIR, "js/engine.js"));

  it("Deve filtrar os 4 projetos com categoria 'all'", () => {
    const all = PortfolioEngine.filterProjects(PORTFOLIO_DATA.projects, "all");
    assert.strictEqual(all.length, 4);
  });

  it("Deve filtrar por categoria específica", () => {
    assert.strictEqual(PortfolioEngine.filterProjects(PORTFOLIO_DATA.projects, "telemetry-data").length, 1);
    assert.strictEqual(PortfolioEngine.filterProjects(PORTFOLIO_DATA.projects, "ai-agents").length, 2);
    assert.strictEqual(PortfolioEngine.filterProjects(PORTFOLIO_DATA.projects, "fullstack-pwa").length, 1);
  });

  it("Deve retornar array vazio quando uiState for 'empty'", () => {
    assert.deepStrictEqual(PortfolioEngine.filterProjects(PORTFOLIO_DATA.projects, "all", "", "empty"), []);
  });

  it("Deve buscar projetos por texto livre (case-insensitive)", () => {
    const res = PortfolioEngine.filterProjects(PORTFOLIO_DATA.projects, "all", "cúbica");
    assert.strictEqual(res.length, 1);
    assert.strictEqual(res[0].id, "rubinot-ai");
  });

  it("Deve formatar corretamente a equação cúbica de progressão do Rubinot", () => {
    const rubinot = PORTFOLIO_DATA.projects.find((p) => p.id === "rubinot-ai");
    const formatted = PortfolioEngine.formatFormulaText(rubinot.architecture);
    assert.ok(formatted.includes('<code class="math-formula">XP(L) = (50 / 3) × (L³ - 6L² + 17L - 12)</code>'));
  });

  // ---------------------------------------------------------------------------
  // 5. MOTOR CONVERSACIONAL CONTEXTUAL
  // ---------------------------------------------------------------------------
  console.log("\n5. Validação do Motor de Chat Contextual (js/copilot-chat.js):");
  const CopilotChatEngine = require(path.join(ROOT_DIR, "js/copilot-chat.js"));
  const chatEngine = new CopilotChatEngine({ data: PORTFOLIO_DATA });

  it("Deve responder contextualizadamente sobre stack técnica e linguagens", () => {
    const reply = chatEngine.generateContextualReply("Quais são as linguagens e a stack técnica do Gustavo?");
    assert.ok(reply.includes("C#") && reply.includes("Python") && reply.includes("TypeScript"));
  });

  it("Deve responder contextualizadamente sobre a matemática do Rubinot Companion", () => {
    const reply = chatEngine.generateContextualReply("Explique a fórmula cúbica de XP e o Rubinot");
    assert.ok(reply.includes("Rubinot Companion") && reply.includes("XP(L)"));
  });

  it("Deve responder contextualizadamente sobre o DJEN e MCP LegalTech", () => {
    const reply = chatEngine.generateContextualReply("Como funciona o projeto DJEN e MCP no WhatsApp?");
    assert.ok(reply.includes("DJEN") && reply.includes("MCP") && reply.includes("WhatsApp"));
  });

  it("Deve responder sobre Certificação PSM I e Formação Acadêmica", () => {
    const reply = chatEngine.generateContextualReply("Qual sua formação e certificações ágeis?");
    assert.ok(reply.includes("PSM I") && reply.includes("Estácio"));
  });

  it("Deve responder sobre contato direto e WhatsApp com DDD 43", () => {
    const reply = chatEngine.generateContextualReply("Qual seu WhatsApp para contato?");
    assert.ok(reply.includes("99603-4632") || reply.includes("5543996034632"));
  });

  // ---------------------------------------------------------------------------
  // 6. SERVIDOR NODE.JS E PROXY OMNIROUTE (serve.js)
  // ---------------------------------------------------------------------------
  console.log("\n6. Validação do Servidor HTTP & Governança da API (serve.js):");
  const { server, SYSTEM_PROMPT_EXECUTIVO } = require(path.join(ROOT_DIR, "serve.js"));

  it("serve.js deve exportar instância de servidor HTTP e prompt executivo", () => {
    assert.ok(server && SYSTEM_PROMPT_EXECUTIVO);
    assert.strictEqual(typeof SYSTEM_PROMPT_EXECUTIVO, "string");
  });

  it("SYSTEM_PROMPT_EXECUTIVO deve conter perfil verificado de Gustavo Simões (+6 anos, Concent, ADS, PSM I, 4 cases)", () => {
    assert.ok(SYSTEM_PROMPT_EXECUTIVO.includes("Gustavo Henrique Ferreira Simões"));
    assert.ok(SYSTEM_PROMPT_EXECUTIVO.includes("Londrina, Paraná"));
    assert.ok(SYSTEM_PROMPT_EXECUTIVO.includes("Concent Sistemas"));
    assert.ok(SYSTEM_PROMPT_EXECUTIVO.includes("PSM I"));
    assert.ok(SYSTEM_PROMPT_EXECUTIVO.includes("DJEN LegalTech"));
    assert.ok(SYSTEM_PROMPT_EXECUTIVO.includes("Rubinot Companion"));
    assert.ok(SYSTEM_PROMPT_EXECUTIVO.includes("Calc Coffee"));
    assert.ok(SYSTEM_PROMPT_EXECUTIVO.includes("Orquestração Multi-Agente SDD"));
  });

  it("package.json deve ter scripts 'start' e 'test' configurados", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, "package.json"), "utf-8"));
    assert.strictEqual(pkg.scripts.start, "node serve.js");
    assert.strictEqual(pkg.scripts.test, "node tests/test-suite.js");
  });

  // ---------------------------------------------------------------------------
  // 7. BLINDAGEM DE PRODUÇÃO ZERO-TRUST & ENDPOINTS HTTP
  // ---------------------------------------------------------------------------
  console.log("\n7. Auditoria de Endpoints HTTP, Zero-Trust & Headers OWASP:");

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const testPort = server.address().port;

  await itAsync("GET /.sdd/state.json deve retornar 403 Acesso Negado (bloqueio de dotfiles)", async () => {
    const res = await makeRequest(testPort, "/.sdd/state.json");
    assert.strictEqual(res.statusCode, 403, `Esperado 403, recebido ${res.statusCode}`);
    assert.ok(res.body.includes("403 Acesso Negado"), "Resposta deve conter '403 Acesso Negado'");
  });

  await itAsync("GET /serve.js deve retornar 403 Acesso Negado (bloqueio de código-fonte)", async () => {
    const res = await makeRequest(testPort, "/serve.js");
    assert.strictEqual(res.statusCode, 403, `Esperado 403, recebido ${res.statusCode}`);
    assert.ok(res.body.includes("403 Acesso Negado"), "Resposta deve conter '403 Acesso Negado'");
  });

  await itAsync("GET /package.json deve retornar 403 Acesso Negado (bloqueio de infraestrutura)", async () => {
    const res = await makeRequest(testPort, "/package.json");
    assert.strictEqual(res.statusCode, 403, `Esperado 403, recebido ${res.statusCode}`);
  });

  await itAsync("GET /api/health deve retornar 200 com payload JSON da arquitetura hybrid-zero-trust", async () => {
    const res = await makeRequest(testPort, "/api/health");
    assert.strictEqual(res.statusCode, 200, `Esperado 200, recebido ${res.statusCode}`);
    const data = JSON.parse(res.body);
    assert.strictEqual(data.status, "ok");
    assert.strictEqual(data.architecture, "hybrid-zero-trust");
    assert.strictEqual(data.service, "portfolio-gustavo-simoes");
    assert.ok(data.timestamp);
  });

  await itAsync("Todas as respostas devem conter Security Headers OWASP (X-Frame-Options, nosniff, etc)", async () => {
    const res = await makeRequest(testPort, "/index.html");
    assert.strictEqual(res.headers["x-frame-options"], "SAMEORIGIN");
    assert.strictEqual(res.headers["x-content-type-options"], "nosniff");
    assert.strictEqual(res.headers["referrer-policy"], "strict-origin-when-cross-origin");
    assert.strictEqual(res.headers["x-xss-protection"], "1; mode=block");
    assert.ok(res.headers["permissions-policy"].includes("camera=()"));
  });

  await new Promise((resolve) => server.close(resolve));

  // ---------------------------------------------------------------------------
  // 8. AUDITORIA SECOPS & DOCUMENTAÇÃO
  // ---------------------------------------------------------------------------
  console.log("\n8. Auditoria SecOps & Blindagem de Segurança (.sdd/04_security):");

  it("SECURITY_REPORT.md deve existir e certificar conformidade SecOps", () => {
    const secPath = path.join(ROOT_DIR, ".sdd", "04_security", "SECURITY_REPORT.md");
    assert.ok(fs.existsSync(secPath), "SECURITY_REPORT.md ausente");
    const content = fs.readFileSync(secPath, "utf-8");
    assert.ok(content.length > 200);
    assert.ok(content.includes("100/100") || content.includes("APROVADO"));
    assert.ok(content.includes("Prompt Injection"));
    assert.ok(content.includes("SQL"));
  });

  // ---------------------------------------------------------------------------
  // RESUMO FINAL DOS TESTES
  // ---------------------------------------------------------------------------
  console.log("\n=======================================================");
  console.log(` RESULTADO FINAL: ${passedTests}/${totalTests} TESTES APROVADOS (${Math.round((passedTests / totalTests) * 100)}%)`);
  console.log("=======================================================\n");

  if (passedTests === totalTests) {
    console.log(" 🎉 Todos os testes foram concluídos com SUCESSO! Score: 100/100.\n");
    process.exitCode = 0;
  } else {
    console.error(" ❌ Houve falhas na suíte de testes. Verifique os logs acima.\n");
    process.exitCode = 1;
  }
}

runTestSuite().catch((err) => {
  console.error("Erro fatal na execução da suíte de testes:", err);
  process.exit(1);
});
