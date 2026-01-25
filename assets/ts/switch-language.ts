const languageSwitcher = document.getElementById(
  "language-switcher",
) as HTMLSelectElement;

languageSwitcher?.addEventListener("change", () => {
  const value = languageSwitcher?.value;
  if (value) {
    window.location.href = value;
  }
});
