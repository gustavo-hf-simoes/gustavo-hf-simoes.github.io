/**
 * ============================================================================
 * PORTFÓLIO EXECUTIVO — GUSTAVO HENRIQUE FERREIRA SIMÕES
 * Motor Funcional Puro & Utilitários de Filtragem, Parser e Matemática
 * ============================================================================
 */

class PortfolioEngine {
  /**
   * Normaliza identificadores de categoria para compatibilidade entre slugs
   * @param {string} cat 
   * @returns {string}
   */
  static normalizeCategory(cat) {
    if (!cat || cat === "all" || cat === "todos" || cat === "*") {
      return "all";
    }

    const mapping = {
      "ia-automacao": "ai-agents",
      "ia": "ai-agents",
      "ai": "ai-agents",
      "ai-agents": "ai-agents",
      "telemetria-dados": "telemetry-data",
      "telemetria": "telemetry-data",
      "dados": "telemetry-data",
      "telemetry-data": "telemetry-data",
      "fullstack-pwa": "fullstack-pwa",
      "fullstack": "fullstack-pwa",
      "pwa": "fullstack-pwa"
    };

    const clean = String(cat).trim().toLowerCase();
    return mapping[clean] || clean;
  }

  /**
   * Filtra a coleção de projetos com base em categoria, termo de busca e estado de UI
   * @param {Array} projects 
   * @param {string} category 
   * @param {string} searchQuery 
   * @param {string} uiState 
   * @returns {Array}
   */
  static filterProjects(projects, category = "all", searchQuery = "", uiState = "success") {
    if (uiState === "empty") {
      return [];
    }

    if (!Array.isArray(projects)) {
      return [];
    }

    const normalizedCat = PortfolioEngine.normalizeCategory(category);
    const query = String(searchQuery || "").trim().toLowerCase();

    return projects.filter((project) => {
      if (!project) return false;

      // Filtro de Categoria
      const projectCat = PortfolioEngine.normalizeCategory(project.category);
      const matchesCategory = normalizedCat === "all" || projectCat === normalizedCat;
      if (!matchesCategory) return false;

      // Filtro de Busca Textual
      if (!query) return true;

      const tagText = Array.isArray(project.tags) ? project.tags.join(" ") : "";
      const resultsText = Array.isArray(project.results) ? project.results.join(" ") : "";
      const searchable = [
        project.title || "",
        project.shortDescription || "",
        project.categoryLabel || "",
        tagText,
        project.problem || "",
        project.architecture || "",
        resultsText,
        project.lessons || ""
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }

  /**
   * Formata a equação polinomial cúbica de progressão de nível de Tibia/Rubinot
   * @param {string} text 
   * @returns {string}
   */
  static formatFormulaText(text) {
    if (!text) return "";

    let formatted = String(text);
    const formulaTarget = `<code class="math-formula">XP(L) = (50 / 3) × (L³ - 6L² + 17L - 12)</code>`;

    // Substituições exatas e seguras
    formatted = formatted
      .split("$XP(L) = \\frac{50}{3}(L^3 - 6L^2 + 17L - 12)$").join(formulaTarget)
      .split("$XP(L) = \\\\frac{50}{3}(L^3 - 6L^2 + 17L - 12)$").join(formulaTarget)
      .split("$XP(L) = (50/3) * (L³ - 6L² + 17L - 12)$").join(formulaTarget);

    // Fallback regex para variações de espaçamento ou notação
    formatted = formatted.replace(
      /\$XP\(L\)\s*=\s*\\*frac\{50\}\{3\}\(L\^?3\s*-\s*6L\^?2\s*\+\s*17L\s*-\s*12\)\$/gi,
      formulaTarget
    );

    return formatted;
  }

  /**
   * Escapa caracteres sensíveis para evitar XSS em templates dinâmicos
   * @param {string} str 
   * @returns {string}
   */
  static escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /**
   * Transforma formatação leve em Markdown (bold, italic, code, quebra de linha) em HTML seguro
   * @param {string} str 
   * @returns {string}
   */
  static formatMarkdownBold(str) {
    if (!str) return "";

    // Primeiro escapa caracteres HTML brutos para preservar integridade
    const safe = PortfolioEngine.escapeHtml(str);

    return safe
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, '<code class="inline-code">$1</code>')
      .replace(/\n/g, "<br>");
  }
}

if (typeof window !== "undefined") {
  window.PortfolioEngine = PortfolioEngine;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = PortfolioEngine;
}
