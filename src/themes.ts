export const THEMES = [
  {
    id: "white",
    label: "White",
    primary: "#ffffff",
    contrast: "#363636",
    secondary: "#5c5c5c",
  },
  {
    id: "cream",
    label: "Cream",
    primary: "#ede6d3",
    contrast: "#2c2c2c",
    secondary: "#a83800",
  },
  {
    id: "blue",
    label: "Blue",
    primary: "#002180",
    contrast: "#e8fbff",
    secondary: "#4aa0ff",
  },
  {
    id: "green",
    label: "Green",
    primary: "#003d12",
    contrast: "#f3ffc2",
    secondary: "#c6ff00",
  },
  {
    id: "purple",
    label: "Purple",
    primary: "#3c0350",
    contrast: "#fce9ff",
    secondary: "#ee6cff",
  },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const DEFAULT_THEME: ThemeId = "blue";
export const THEME_STORAGE_KEY = "site-theme-v3";

export function isThemeId(value: string | null): value is ThemeId {
  return THEMES.some((theme) => theme.id === value);
}

export function applyTheme(id: ThemeId) {
  document.documentElement.setAttribute("data-theme", id);
  localStorage.setItem(THEME_STORAGE_KEY, id);
}

export function readStoredTheme(): ThemeId {
  if (typeof localStorage === "undefined") return DEFAULT_THEME;
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return isThemeId(stored) ? stored : DEFAULT_THEME;
}
