/**
 * ============================================================================
 * SUÍTE DE TESTES AUTOMATIZADOS — PORTFÓLIO GUSTAVO HENRIQUE SIMÕES
 * Validação Rigorosa de Arquitetura Modular, Dados, Motores e Governança SDD
 * ============================================================================
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

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

console.log("\n=======================================================");
console.log(" SUÍTE DE TESTES UNITÁRIOS & GOVERNANÇA SDD — PORTFÓLIO");
console.log("=======================================================\n");

// ---------------------------------------------------------------------------
// 1. VALIDAÇÃO DA ESTRUTURA MODULAR DE ARQUIVOS
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
    assert.ok(fs.existsSync(fullPath), `Arquivo obrigatório ausente: ${relPath}`);
    const stat = fs.statSync(fullPath);
    assert.ok(stat.size > 20, `Arquivo vazio ou corrompido: ${relPath} (${stat.size} bytes)`);
  });
});

// ---------------------------------------------------------------------------
// 2. HIGIENIZAÇÃO DO CURRÍCULO ATS E AUSÊNCIA DE CSS INLINE
// ---------------------------------------------------------------------------
console.log("\n2. Auditoria do Currículo ATS & Conformidade de Estilização:");

it("curriculo.html NÃO deve conter blocos <style> inline (estilos 100% modulares em css/curriculo.css)", () => {
  const cvContent = fs.readFileSync(path.join(ROOT_DIR, "curriculo.html"), "utf-8");
  const hasInlineStyle = /<style\b[^>]*>/i.test(cvContent);
  assert.strictEqual(hasInlineStyle, false, "curriculo.html contém tags <style> inline residuais que violam a modularização.");
});

it("curriculo.html deve importar css/curriculo.css e js/resume-ats.js", () => {
  const cvContent = fs.readFileSync(path.join(ROOT_DIR, "curriculo.html"), "utf-8");
  assert.ok(cvContent.includes('href="css/curriculo.css"'), "Tag link para css/curriculo.css não encontrada.");
  assert.ok(cvContent.includes('src="js/resume-ats.js"'), "Tag script para js/resume-ats.js não encontrada.");
});

it("curriculo.html deve conter dados de contato e localização oficial (Londrina, PR / WhatsApp)", () => {
  const cvContent = fs.readFileSync(path.join(ROOT_DIR, "curriculo.html"), "utf-8");
  assert.ok(cvContent.includes("Londrina"), "Localização Londrina ausente em curriculo.html");
  assert.ok(cvContent.includes("99603-4632") || cvContent.includes("5543996034632"), "WhatsApp ausente em curriculo.html");
  assert.ok(cvContent.includes("gustavo.hf.simoes@gmail.com"), "E-mail ausente em curriculo.html");
});

// ---------------------------------------------------------------------------
// 3. INTEGRIDADE DOS DADOS EM JS/DATA.JS
// ---------------------------------------------------------------------------
console.log("\n3. Integridade dos Dados de Produção (js/data.js):");

const { PORTFOLIO_DATA, SVG_ICONS } = require(path.join(ROOT_DIR, "js/data.js"));

it("Deve exportar PORTFOLIO_DATA e SVG_ICONS válidos via CommonJS", () => {
  assert.ok(PORTFOLIO_DATA, "PORTFOLIO_DATA não foi exportado.");
  assert.ok(SVG_ICONS, "SVG_ICONS não foi exportado.");
  assert.strictEqual(typeof PORTFOLIO_DATA, "object");
  assert.strictEqual(typeof SVG_ICONS, "object");
});

it("Deve conter exatamente os 4 cases reais em produção (excluindo Estácio SAVA)", () => {
  assert.ok(Array.isArray(PORTFOLIO_DATA.projects), "PORTFOLIO_DATA.projects deve ser um Array.");
  const ids = PORTFOLIO_DATA.projects.map((p) => p.id);

  assert.strictEqual(ids.length, 4, `Esperados exatamente 4 cases, encontrados: ${ids.length}`);
  assert.ok(ids.includes("djen-mcp"), "Case DJEN LegalTech deve estar presente.");
  assert.ok(ids.includes("rubinot-ai"), "Case Rubinot Companion deve estar presente.");
  assert.ok(ids.includes("calc-coffee"), "Case Calc Coffee PWA deve estar presente.");
  assert.ok(ids.includes("sdd-factory"), "Case Orquestração Multi-Agente SDD deve estar presente.");

  // Validação explícita de exclusão do projeto legado Estácio SAVA
  assert.strictEqual(ids.includes("estacio-sava"), false, "O case legado Estácio SAVA NÃO deve estar presente nos projetos.");
  assert.strictEqual(ids.includes("estacio"), false, "Nenhum projeto com id 'estacio' deve estar presente.");
});

it("Perfil profissional deve conter Londrina/PR e WhatsApp oficial formatado", () => {
  const profile = PORTFOLIO_DATA.profile;
  assert.ok(profile, "profile ausente em PORTFOLIO_DATA");
  assert.ok(profile.location.includes("Londrina"), "Localização deve ser Londrina, Paraná");
  assert.strictEqual(profile.whatsappDisplay, "+55 (43) 99603-4632", "WhatsApp formatado deve ser +55 (43) 99603-4632");
  assert.strictEqual(profile.whatsappNumber, "5543996034632", "whatsappNumber deve ser 5543996034632");
  assert.strictEqual(profile.email, "gustavo.hf.simoes@gmail.com", "E-mail incorreto");
});

it("Ícone SVG do WhatsApp deve ser o oficial vetorial vazado contendo path 'M17.472 14.382'", () => {
  assert.ok(SVG_ICONS.whatsapp, "SVG_ICONS.whatsapp não definido.");
  assert.ok(
    SVG_ICONS.whatsapp.includes("M17.472 14.382"),
    "SVG do WhatsApp deve conter o traçado oficial vazado (M17.472 14.382)."
  );
  assert.strictEqual(SVG_ICONS.whatsapp.includes("🟢"), false, "SVG do WhatsApp não deve conter emojis.");
});

// ---------------------------------------------------------------------------
// 4. MOTOR FUNCIONAL PURO (PortfolioEngine)
// ---------------------------------------------------------------------------
console.log("\n4. Validação Funcional do PortfolioEngine (js/engine.js):");

const PortfolioEngine = require(path.join(ROOT_DIR, "js/engine.js"));

it("Deve filtrar os 4 projetos com categoria 'all'", () => {
  const allProjects = PortfolioEngine.filterProjects(PORTFOLIO_DATA.projects, "all");
  assert.strictEqual(allProjects.length, 4, "Filtro 'all' deve retornar todos os 4 cases.");
});

it("Deve filtrar por categoria específica (telemetry-data, ai-agents, fullstack-pwa)", () => {
  const telemetry = PortfolioEngine.filterProjects(PORTFOLIO_DATA.projects, "telemetry-data");
  assert.strictEqual(telemetry.length, 1);
  assert.strictEqual(telemetry[0].id, "rubinot-ai");

  const aiAgents = PortfolioEngine.filterProjects(PORTFOLIO_DATA.projects, "ai-agents");
  assert.strictEqual(aiAgents.length, 2);

  const pwa = PortfolioEngine.filterProjects(PORTFOLIO_DATA.projects, "fullstack-pwa");
  assert.strictEqual(pwa.length, 1);
  assert.strictEqual(pwa[0].id, "calc-coffee");
});

it("Deve retornar array vazio quando uiState for 'empty'", () => {
  const result = PortfolioEngine.filterProjects(PORTFOLIO_DATA.projects, "all", "", "empty");
  assert.deepStrictEqual(result, [], "Estado 'empty' deve retornar array vazio.");
});

it("Deve buscar projetos por texto livre (case-insensitive)", () => {
  const rubinotSearch = PortfolioEngine.filterProjects(PORTFOLIO_DATA.projects, "all", "cúbica");
  assert.strictEqual(rubinotSearch.length, 1);
  assert.strictEqual(rubinotSearch[0].id, "rubinot-ai");

  const mcpSearch = PortfolioEngine.filterProjects(PORTFOLIO_DATA.projects, "all", "MCP");
  assert.ok(mcpSearch.length >= 1, "Busca por MCP deve encontrar projetos relacionados.");
});

it("Deve formatar corretamente a equação cúbica de progressão do Rubinot", () => {
  const rubinot = PORTFOLIO_DATA.projects.find((p) => p.id === "rubinot-ai");
  assert.ok(rubinot, "rubinot-ai não encontrado");
  const formatted = PortfolioEngine.formatFormulaText(rubinot.architecture);
  assert.ok(
    formatted.includes('<code class="math-formula">XP(L) = (50 / 3) × (L³ - 6L² + 17L - 12)</code>'),
    "A fórmula cúbica de XP deve ser formatada com a classe math-formula."
  );
});

// ---------------------------------------------------------------------------
// 5. MOTOR CONVERSACIONAL CONTEXTUAL (CopilotChatEngine)
// ---------------------------------------------------------------------------
console.log("\n5. Validação do Motor de Chat Contextual (js/copilot-chat.js):");

const CopilotChatEngine = require(path.join(ROOT_DIR, "js/copilot-chat.js"));
const chatEngine = new CopilotChatEngine({ data: PORTFOLIO_DATA });

it("Deve responder contextualizadamente sobre stack técnica e linguagens", () => {
  const reply = chatEngine.generateContextualReply("Quais são as linguagens e a stack técnica do Gustavo?");
  assert.ok(reply.includes("C#"), "Resposta deve mencionar C#");
  assert.ok(reply.includes(".NET"), "Resposta deve mencionar .NET");
  assert.ok(reply.includes("Python"), "Resposta deve mencionar Python");
  assert.ok(reply.includes("TypeScript"), "Resposta deve mencionar TypeScript");
  assert.ok(reply.includes("SQL"), "Resposta deve mencionar SQL");
});

it("Deve responder contextualizadamente sobre a matemática do Rubinot Companion", () => {
  const reply = chatEngine.generateContextualReply("Explique a fórmula cúbica de XP e o Rubinot");
  assert.ok(reply.includes("Rubinot Companion"), "Resposta deve citar Rubinot");
  assert.ok(reply.includes("XP(L)"), "Resposta deve citar equação de XP");
  assert.ok(reply.includes("Sio Split"), "Resposta deve citar o algoritmo Sio Split");
});

it("Deve responder contextualizadamente sobre o DJEN e MCP LegalTech", () => {
  const reply = chatEngine.generateContextualReply("Como funciona o projeto DJEN e MCP no WhatsApp?");
  assert.ok(reply.includes("DJEN"), "Resposta deve citar DJEN");
  assert.ok(reply.includes("MCP"), "Resposta deve citar MCP");
  assert.ok(reply.includes("WhatsApp"), "Resposta deve citar WhatsApp");
});

it("Deve responder sobre Certificação PSM I e Formação Acadêmica", () => {
  const reply = chatEngine.generateContextualReply("Qual sua formação e certificações ágeis?");
  assert.ok(reply.includes("PSM I") || reply.includes("Professional Scrum Master"), "Deve citar PSM I");
  assert.ok(reply.includes("Estácio"), "Deve citar Estácio ADS");
  assert.ok(reply.includes("UniFil"), "Deve citar UniFil");
});

it("Deve responder sobre contato direto e WhatsApp com DDD 43", () => {
  const reply = chatEngine.generateContextualReply("Qual seu WhatsApp para contato?");
  assert.ok(reply.includes("99603-4632") || reply.includes("5543996034632"), "Deve fornecer WhatsApp com DDD 43");
});

// ---------------------------------------------------------------------------
// 6. SERVIDOR NODE.JS E PROXY OMNIROUTE (serve.js)
// ---------------------------------------------------------------------------
console.log("\n6. Validação do Servidor HTTP & Governança da API (serve.js):");

const { server, SYSTEM_PROMPT_EXECUTIVO } = require(path.join(ROOT_DIR, "serve.js"));

it("serve.js deve exportar instância de servidor HTTP e prompt executivo", () => {
  assert.ok(server, "Instância server não exportada em serve.js");
  assert.ok(SYSTEM_PROMPT_EXECUTIVO, "SYSTEM_PROMPT_EXECUTIVO não exportado");
  assert.strictEqual(typeof SYSTEM_PROMPT_EXECUTIVO, "string");
});

it("SYSTEM_PROMPT_EXECUTIVO deve conter perfil verificado de Gustavo Simões (+6 anos, Concent, ADS, PSM I, 4 cases)", () => {
  assert.ok(SYSTEM_PROMPT_EXECUTIVO.includes("Gustavo Henrique Ferreira Simões"), "Nome completo ausente no prompt.");
  assert.ok(SYSTEM_PROMPT_EXECUTIVO.includes("Londrina, Paraná"), "Localização Londrina ausente no prompt.");
  assert.ok(SYSTEM_PROMPT_EXECUTIVO.includes("Concent Sistemas"), "Trajetória Concent Sistemas ausente.");
  assert.ok(SYSTEM_PROMPT_EXECUTIVO.includes("PSM I"), "Certificação PSM I ausente.");
  assert.ok(SYSTEM_PROMPT_EXECUTIVO.includes("DJEN LegalTech"), "Case DJEN ausente.");
  assert.ok(SYSTEM_PROMPT_EXECUTIVO.includes("Rubinot Companion"), "Case Rubinot ausente.");
  assert.ok(SYSTEM_PROMPT_EXECUTIVO.includes("Calc Coffee"), "Case Calc Coffee ausente.");
  assert.ok(SYSTEM_PROMPT_EXECUTIVO.includes("Orquestração Multi-Agente SDD"), "Case SDD ausente.");
});

it("package.json deve ter scripts 'start' e 'test' configurados", () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, "package.json"), "utf-8"));
  assert.strictEqual(pkg.name, "portfolio-profissional-analista-de-ia");
  assert.strictEqual(pkg.scripts.start, "node serve.js");
  assert.strictEqual(pkg.scripts.test, "node tests/test-suite.js");
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
