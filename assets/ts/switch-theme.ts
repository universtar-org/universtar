const root = document.documentElement;
const checkbox = document.getElementById(
  "checkbox-theme",
) as HTMLInputElement | null;
const THEME_KEY = "theme";
const lightTheme = "latte";
const darkTheme = "mocha";

function applyTheme(theme: string) {
  if (theme !== lightTheme && theme !== darkTheme) {
    return;
  }

  root.classList.remove(lightTheme, darkTheme);
  root.classList.add(theme);
  if (checkbox) {
    checkbox.checked = theme === darkTheme;
  }
}

function getPreferredTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === lightTheme || saved === darkTheme) {
    return saved;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? darkTheme
    : lightTheme;
}

document.addEventListener("DOMContentLoaded", () => {
  const theme = getPreferredTheme();
  applyTheme(theme);

  checkbox?.addEventListener("change", () => {
    const next = checkbox.checked ? darkTheme : lightTheme;
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });
});
