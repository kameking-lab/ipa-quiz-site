"use client";

import * as React from "react";
import {
  DEFAULT_LOCALE,
  getStoredLocale,
  setStoredLocale,
  translate,
  type Locale,
} from "./dictionaries";

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, fallback?: string) => string;
}

const I18nContext = React.createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>(DEFAULT_LOCALE);

  React.useEffect(() => {
    const stored = getStoredLocale();
    setLocaleState(stored);
    if (typeof document !== "undefined") {
      document.documentElement.lang = stored;
    }
  }, []);

  const setLocale = React.useCallback((l: Locale) => {
    setLocaleState(l);
    setStoredLocale(l);
    if (typeof document !== "undefined") {
      document.documentElement.lang = l;
    }
  }, []);

  const t = React.useCallback(
    (key: string, fallback?: string) => translate(locale, key, fallback),
    [locale],
  );

  const value = React.useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = React.useContext(I18nContext);
  if (ctx) return ctx;
  return {
    locale: DEFAULT_LOCALE,
    setLocale: () => {},
    t: (key, fallback) => translate(DEFAULT_LOCALE, key, fallback),
  };
}

export function useTranslation() {
  return useI18n();
}
