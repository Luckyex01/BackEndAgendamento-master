document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;

  // ===== Criação dinâmica do botão de alternância =====
  let themeToggleContainer = document.createElement("div");
  themeToggleContainer.classList.add("theme-toggle");

  let themeToggleButton = document.createElement("button");
  themeToggleButton.textContent = "🌙 Modo Escuro";
  themeToggleContainer.appendChild(themeToggleButton);

  // Adiciona no topo do Swagger (na topbar)
  const topbar = document.querySelector(".swagger-ui .topbar");
  if (topbar) {
    topbar.appendChild(themeToggleContainer);
  }

  // ===== Função para aplicar tema =====
  function applyTheme(theme) {
    if (theme === "dark") {
      body.classList.add("dark-mode");
      body.classList.remove("light-mode");
      themeToggleButton.textContent = "🌞 Modo Claro";
    } else {
      body.classList.add("light-mode");
      body.classList.remove("dark-mode");
      themeToggleButton.textContent = "🌙 Modo Escuro";
    }
  }

  // ===== Carrega preferência salva =====
  let savedTheme = localStorage.getItem("swagger-theme") || "light";
  applyTheme(savedTheme);

  // ===== Alterna ao clicar =====
  themeToggleButton.addEventListener("click", function () {
    let currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
    let newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("swagger-theme", newTheme);
  });

  // ===== Observa mudanças dinâmicas no Swagger e aplica tema =====
  const observer = new MutationObserver(() => {
    const theme = body.classList.contains("dark-mode") ? "dark" : "light";
    applyTheme(theme);
  });

  observer.observe(document.querySelector(".swagger-ui"), {
    childList: true,
    subtree: true
  });
});
