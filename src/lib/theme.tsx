import { createContext, useContext, createSignal, onMount, type JSX } from "solid-js";
import { createEffect } from "solid-js";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: () => Theme;
  hue: () => number;
  setTheme: (t: Theme) => void;
  setHue: (h: number) => void;
  toggleTheme: () => void;
}

const HUE_KEY = "soliddash:hue";
const THEME_KEY = "soliddash:theme";
const DEFAULT_HUE = 200;

const ThemeContext = createContext<ThemeContextValue>();

/**
 * Holds the active accent `hue` (a plain number) and light/dark `theme`.
 * Both are persisted to localStorage and restored on load. The hue is written
 * to `document.body` as the CSS variable `--hue` (the stylesheet falls back to
 * 200 when absent). All accent colors in app.css are derived from `--hue`.
 */
export function ThemeProvider(props: { children: JSX.Element }) {
  const [theme, setThemeSig] = createSignal<Theme>("light");
  const [hue, setHueSig] = createSignal<number>(DEFAULT_HUE);

  onMount(() => {
    const savedHue = Number(localStorage.getItem(HUE_KEY));
    if (!Number.isNaN(savedHue) && savedHue >= 0 && savedHue <= 360) setHueSig(savedHue);
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === "dark" || savedTheme === "light") setThemeSig(savedTheme);

    // Apply whatever we ended up with. Set on <html> (same element as :root)
    // so the inline value overrides the `--hue` declared in the stylesheet.
    document.documentElement.style.setProperty("--hue", String(hue()));
    document.documentElement.classList.toggle("dark", theme() === "dark");
  });

  const applyHue = (h: number) => {
    const v = Math.max(0, Math.min(360, Math.round(h)));
    setHueSig(v);
    document.documentElement.style.setProperty("--hue", String(v));
    localStorage.setItem(HUE_KEY, String(v));
  };

  const applyTheme = (t: Theme) => {
    setThemeSig(t);
    document.documentElement.classList.toggle("dark", t === "dark");
    localStorage.setItem(THEME_KEY, t);
  };

  const value: ThemeContextValue = {
    theme,
    hue,
    setTheme: applyTheme,
    setHue: applyHue,
    toggleTheme: () => applyTheme(theme() === "dark" ? "light" : "dark")
  };

  return <ThemeContext.Provider value={value}>{props.children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
