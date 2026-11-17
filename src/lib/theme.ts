export const THEME_STORAGE_KEY = "theme";

/**
 * Runs in <head> before first paint so a saved dark preference never flashes light.
 * Light is the default; only an explicit "dark" choice switches it.
 */
export const themeInitScript = `
try {
  if (localStorage.getItem("${THEME_STORAGE_KEY}") === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
} catch (e) {}
`;
