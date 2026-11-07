/**
 * ============================================================================
 * PORTFÓLIO EXECUTIVO — GUSTAVO HENRIQUE FERREIRA SIMÕES
 * Controlador de Modo de Exibição do Currículo A4 / ATS
 * Alterna entre Modo ATS Puro (sem foto, 100% linear) e Modo Executivo (com foto)
 * ============================================================================
 */

function setResumeMode(withPhoto) {
  const btnAts = document.getElementById("btnModeAts");
  const btnPhoto = document.getElementById("btnModePhoto");
  const portraitBox = document.querySelector(".cv-portrait-box");

  if (withPhoto) {
    if (btnPhoto) btnPhoto.classList.add("active");
    if (btnAts) btnAts.classList.remove("active");
    if (portraitBox) portraitBox.style.display = "block";
    document.body.classList.add("mode-with-photo");
    document.body.classList.remove("mode-ats-pure");
  } else {
    if (btnAts) btnAts.classList.add("active");
    if (btnPhoto) btnPhoto.classList.remove("active");
    if (portraitBox) portraitBox.style.display = "none";
    document.body.classList.remove("mode-with-photo");
    document.body.classList.add("mode-ats-pure");
  }

  try {
    localStorage.setItem("resume_mode_with_photo", withPhoto ? "true" : "false");
  } catch {
    // Silently continue if localStorage is not accessible
  }
}

// Inicializa o modo ao carregar a página com base no storage ou default (sem foto / ATS puro)
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    let savedMode = false;
    try {
      savedMode = localStorage.getItem("resume_mode_with_photo") === "true";
    } catch {
      savedMode = false;
    }
    setResumeMode(savedMode);
  });
}

if (typeof window !== "undefined") {
  window.setResumeMode = setResumeMode;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { setResumeMode };
}
