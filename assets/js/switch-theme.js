const root = document.documentElement;
const checkbox = document.getElementById("checkbox-theme");
const THEME_KEY = "theme";
const lightTheme = "latte";
const darkTheme = "mocha";

/**
 * Apply a theme.
 *
 * @param {string} theme - Theme to be setted
 */
function applyTheme(theme) {
  if (theme !== lightTheme && theme !== darkTheme) {
    return;
  }

  root.classList.remove(lightTheme, darkTheme);
  root.classList.add(theme);
  if (checkbox) {
    checkbox.checked = theme === darkTheme;
  }
}

/**
 * Get user's preferred theme by querying `localStorage` or querying `prefers-color-scheme`.
 *
 * @returns {string} - Preferred theme
 */
function getPreferredTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === lightTheme || saved === darkTheme) {
    return saved;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? darkTheme
    : lightTheme;
}

// Event register.
document.addEventListener("DOMContentLoaded", () => {
  const theme = getPreferredTheme();
  applyTheme(theme);

  checkbox?.addEventListener("change", () => {
    const next = checkbox.checked ? darkTheme : lightTheme;
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });
});
