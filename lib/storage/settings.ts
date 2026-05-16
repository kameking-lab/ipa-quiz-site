import { LS_KEYS } from "./keys";

export interface AppSettings {
  randomizeChoices: boolean;
  excludeRecent: boolean;
  calculationOnly: boolean;
  recordHistory: boolean;
}

const DEFAULTS: AppSettings = {
  randomizeChoices: false,
  excludeRecent: false,
  calculationOnly: false,
  recordHistory: true,
};

export function readSettings(): AppSettings {
  if (typeof window === "undefined") return { ...DEFAULTS };
  try {
    const raw = window.localStorage.getItem(LS_KEYS.settings);
    if (!raw) return { ...DEFAULTS };
    const parsed = JSON.parse(raw) as Partial<AppSettings>;
    return {
      randomizeChoices: parsed.randomizeChoices ?? DEFAULTS.randomizeChoices,
      excludeRecent: parsed.excludeRecent ?? DEFAULTS.excludeRecent,
      calculationOnly: parsed.calculationOnly ?? DEFAULTS.calculationOnly,
      recordHistory: parsed.recordHistory ?? DEFAULTS.recordHistory,
    };
  } catch {
    return { ...DEFAULTS };
  }
}

export function writeSettings(s: AppSettings): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.settings, JSON.stringify(s));
  } catch {
    // ignore quota errors
  }
}
