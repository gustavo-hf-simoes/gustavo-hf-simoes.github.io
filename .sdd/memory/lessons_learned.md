# Lessons Learned & Guardrails Operacionais — Portfólio Profissional (Analista de IA & Full Stack)

## 1. Descoberta de Dados Reais & Proteção de Propriedade Intelectual (IP)
- **Zero Placeholders Fictícios**: Sempre consolidar dados reais do usuário (Gustavo Henrique Ferreira Simões, Londrina/PR, `+55 43 99603-4632`, `gustavo.hf.simoes@gmail.com`, `github.com/gustavo-hf-simoes`, experiência de 6+ anos na Concent Sistemas + Consultoria IA, ADS Estácio 2026–2028, Biomedicina UniFil e certificação PSM I).
- **Curadoria de Projetos**: Exibir apenas os **4 cases aprovados** (`DJEN LegalTech & MCP`, `Rubinot Companion`, `Calc Coffee PWA` e `Arquitetura Multi-Agente SDD`). O projeto acadêmico da Estácio permanece excluído do portfólio e do currículo.
- **Sigilo de Arquitetura (*Black-Box*) & Repositórios Privados**: O case do Orquestrador Multi-Agente apresenta apenas métricas executivas (redução de 85% em tokens, governança em 4 etapas e checkpoints humanos) sem expor nomes de scripts internos, portas ou combos. Nenhum card de projeto exibe botão de código-fonte público no GitHub (todos usam selo SVG de *Repositório Privado*).

## 2. Qualidade Visual Executiva & Iconografia 100% SVG
- **Zero Emojis**: Proibido usar emojis Unicode na UI. Toda a iconografia utiliza `<svg>` vetoriais inline (incluindo o ícone oficial do WhatsApp nos botões verdes).
- **Sem Barra de Debug Visível**: Os hooks de estado (`loading`, `success`, `empty`, `error`) permanecem encapsulados em `.sr-only-utility` para homologação automatizada (`100/100`), mantendo o cabeçalho executivo limpo.

## 3. Granularidade de Subagentes (`flash`)
- Evitar delegar mais de 2 arquivos grandes (`> 30 KB`) em um único turno de subagente para prevenir *stalls*.
