import ja from "../../messages/ja.json";
import en from "../../messages/en.json";
import zh from "../../messages/zh.json";
import { LS_KEYS } from "@/lib/storage/keys";

export type Locale = "ja" | "en" | "zh";

export const SUPPORTED_LOCALES: Locale[] = ["ja", "en", "zh"];
export const DEFAULT_LOCALE: Locale = "ja";

type Dictionary = Record<string, string>;

export const DICTIONARIES: Record<Locale, Dictionary> = {
  ja: ja as Dictionary,
  en: en as Dictionary,
  zh: zh as Dictionary,
};

export const LOCALE_LABELS: Record<Locale, string> = {
  ja: "日本語",
  en: "English",
  zh: "中文（简体）",
};

export const LOCALE_FLAG: Record<Locale, string> = {
  ja: "🇯🇵",
  en: "🇺🇸",
  zh: "🇨🇳",
};

export function getStoredLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const v = window.localStorage.getItem(LS_KEYS.language) as Locale | null;
    if (v && SUPPORTED_LOCALES.includes(v)) return v;
  } catch {
    // ignore
  }
  return DEFAULT_LOCALE;
}

export function setStoredLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.language, locale);
  } catch {
    // ignore
  }
}

export function translate(locale: Locale, key: string, fallback?: string): string {
  const dict = DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
  return dict[key] ?? DICTIONARIES[DEFAULT_LOCALE][key] ?? fallback ?? key;
}
