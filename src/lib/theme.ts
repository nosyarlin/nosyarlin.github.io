/** Must match the key read by the inline script in BaseLayout.astro. */
export const THEME_STORAGE_KEY = "raysonlim-theme";

export type Theme = "light" | "dark";

export function readDomTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies.
  }
}
