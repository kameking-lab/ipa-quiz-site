"use client";

import * as React from "react";
import { LS_KEYS } from "@/lib/storage/keys";

type Theme = "light" | "dark" | "system";

interface ThemeCtx {
  theme: Theme;
  resolved: "light" | "dark";
  setTheme: (t: Theme) => void;
  toggle: () => void;
}

const ThemeContext = React.createContext<ThemeCtx | null>(null);

function resolve(theme: Theme): "light" | "dark" {
  if (theme === "system") {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return theme;
}

function apply(resolved: "light" | "dark") {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("system");
  const [resolved, setResolved] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    let initial: Theme = "system";
    try {
      const saved = window.localStorage.getItem(LS_KEYS.theme) as Theme | null;
      if (saved === "light" || saved === "dark" || saved === "system") initial = saved;
    } catch {
      // ignore
    }
     
    setThemeState(initial);
    const r = resolve(initial);
    setResolved(r);
    apply(r);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (theme === "system") {
        const r2 = resolve("system");
        setResolved(r2);
        apply(r2);
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = React.useCallback((t: Theme) => {
    setThemeState(t);
    try {
      window.localStorage.setItem(LS_KEYS.theme, t);
    } catch {
      // ignore
    }
    const r = resolve(t);
    setResolved(r);
    apply(r);
  }, []);

  const toggle = React.useCallback(() => {
    setTheme(resolved === "dark" ? "light" : "dark");
  }, [resolved, setTheme]);

  const value = React.useMemo(
    () => ({ theme, resolved, setTheme, toggle }),
    [theme, resolved, setTheme, toggle],
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeCtx {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

/** Runs before React hydrates, prevents FOUC */
export const THEME_BOOTSTRAP_SCRIPT = `
(function(){
  try {
    var key = "${LS_KEYS.theme}";
    var saved = localStorage.getItem(key);
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    var resolved = saved === "dark" ? "dark" : saved === "light" ? "light" : (prefersDark ? "dark" : "light");
    var root = document.documentElement;
    if (resolved === "dark") root.classList.add("dark");
    root.style.colorScheme = resolved;
  } catch(e) {}
})();
`;
