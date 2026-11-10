# Regra Local de Governança SDD — Portfólio Profissional (Analista de IA)

Este repositório é governado pela esteira **Spec-Driven Development AI-First**.

1. **Consulta Prévia Sob Demanda (Progressive Disclosure)**:
   - Leia `.sdd/state.json` para checar o estágio atual antes de alterar código.
   - Consulte `.sdd/memory/project_memory.md` (regras de negócio do domínio) e `.sdd/memory/lessons_learned.md` (erros passados que não devem se repetir).
2. **Fonte Única da Verdade & Fidelidade à SPEC**:
   - O arquivo físico em `.sdd/` (incluindo edições manuais do usuário em `PRD.md` ou `SPEC.md`) tem precedência absoluta.
   - Todo código deve seguir estritamente `.sdd/02_architecture/SPEC.md` e `.sdd/02_architecture/DB_SCHEMA.md`. Mudanças arquiteturais exigem registro em `.sdd/memory/ADR.md`.
3. **Auditoria Contínua & Retroalimentação**:
   - Todo desenvolvimento deve ser validado contra a SPEC (`sdd-qa-auditor`).
   - Sempre que o usuário corrigir uma implementação ou requisito, grave o aprendizado em `.sdd/memory/lessons_learned.md`.
4. **Catálogo de Projetos Dinâmico & Zero Hardcoding de Contadores**:
   - `PORTFOLIO_DATA.projects` (em `js/data.js`) é a ÚNICA fonte da verdade para o catálogo de cases.
   - **PROIBIDO CHUMBAR NÚMEROS DE PROJETOS NO HTML OU SCRIPTS**: O badge da sidebar (`.sidebar-link-badge`), as abas de filtro (`Todos os Cases (N)`) e os scripts de teste/auditoria DEVEM calcular dinamicamente via `data.projects.length` (vetor).
   - Inserir ou remover qualquer projeto do vetor deve refletir instantaneamente em toda a aplicação sem exigir alteração manual de marcações estáticas no `index.html`.
