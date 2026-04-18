(function () {
  const THEME_KEY = "ascc-quiz-theme";

  const saved = localStorage.getItem(THEME_KEY);
  document.documentElement.setAttribute(
    "data-theme",
    saved === "light" ? "light" : "dark"
  );

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
      const isLight = theme === "light";
      themeToggle.textContent = isLight ? "Dark mode" : "Light mode";
      themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
      );
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
      const cur = document.documentElement.getAttribute("data-theme");
      applyTheme(cur === "light" ? "light" : "dark");
      themeToggle.addEventListener("click", () => {
        const next =
          document.documentElement.getAttribute("data-theme") === "light"
            ? "dark"
            : "light";
        applyTheme(next);
      });
    }
  });
})();
