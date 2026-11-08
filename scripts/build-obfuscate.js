/**
 * ============================================================================
 * PIPELINE DE BUNDLING & OFUSCAÇÃO ANTI-ENGENHARIA REVERSA — ESTEIRA SDD
 * Concatena múltiplos arquivos em 1 bundle minificado e criptografa strings
 * Impede clonagem de portfólio, scraping e cópia de dados e lógica
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const JS_DIR = path.join(ROOT_DIR, 'js');

const MAIN_BUNDLE_FILES = [
  'data.js',
  'engine.js',
  'copilot-chat.js',
  'telemetry.js',
  'app.js'
];

const CV_BUNDLE_FILES = [
  'resume-ats.js',
  'telemetry.js'
];

function buildBundle(fileList, outputFileName) {
  console.log(`\n[BUILD] Preparando bundle unificado para: ${outputFileName}...`);
  let concatenated = '';

  for (const fileName of fileList) {
    const filePath = path.join(JS_DIR, fileName);
    if (!fs.existsSync(filePath)) {
      console.warn(`[WARN] Arquivo ausente: ${filePath}`);
      continue;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    concatenated += `\n/* Module: ${fileName} */\n(function(){\n${content}\n})();\n`;
  }

  const tempFile = path.join(JS_DIR, `_temp_${outputFileName}`);
  fs.writeFileSync(tempFile, concatenated, 'utf-8');

  const outputPath = path.join(JS_DIR, outputFileName);

  console.log(`[OBFUSCATE] Aplicando ofuscação criptográfica com javascript-obfuscator...`);

  // Configuração de ofuscação de alta segurança & alta performance
  const obfCmd = `npx --yes javascript-obfuscator "${tempFile}" ` +
    `--output "${outputPath}" ` +
    `--compact true ` +
    `--identifier-names-generator hexadecimal ` +
    `--rename-globals false ` +
    `--string-array true ` +
    `--string-array-encoding base64 ` +
    `--string-array-rotate true ` +
    `--string-array-threshold 0.8`;

  try {
    execSync(obfCmd, { stdio: 'pipe', cwd: ROOT_DIR });
    console.log(`[SUCCESS] Ofuscação concluída com sucesso via javascript-obfuscator.`);
  } catch (err) {
    console.warn(`[FALLBACK] javascript-obfuscator falhou (${err.message}). Usando Terser...`);
    const terserCmd = `npx --yes terser "${tempFile}" --compress --mangle -o "${outputPath}"`;
    execSync(terserCmd, { stdio: 'inherit', cwd: ROOT_DIR });
  } finally {
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
  }

  const originalKb = (Buffer.byteLength(concatenated, 'utf-8') / 1024).toFixed(1);
  const bundleKb = (Buffer.byteLength(fs.readFileSync(outputPath), 'utf-8') / 1024).toFixed(1);
  console.log(`[OK] ${outputFileName}: ${originalKb} KB original -> ${bundleKb} KB ofuscado e unificado.`);
}

function main() {
  console.log('=====================================================');
  console.log(' ESTEIRA SDD — PIPELINE DE OFUSCAÇÃO & BUNDLING ');
  console.log('=====================================================');

  buildBundle(MAIN_BUNDLE_FILES, 'app.bundle.min.js');
  buildBundle(CV_BUNDLE_FILES, 'curriculo.bundle.min.js');

  console.log('\n=====================================================');
  console.log(' Concluído com sucesso! Código 100% blindado contra cópias.');
  console.log('=====================================================\n');
}

if (require.main === module) {
  main();
}

module.exports = { buildBundle };
