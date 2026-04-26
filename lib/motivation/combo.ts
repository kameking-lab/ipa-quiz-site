import { LS_KEYS } from "@/lib/storage/keys";

export interface MotivationSettings {
  soundEnabled: boolean;
  reduceMotion: boolean;
}

const DEFAULTS: MotivationSettings = {
  soundEnabled: true,
  reduceMotion: false,
};

export function readMotivationSettings(): MotivationSettings {
  if (typeof window === "undefined") return { ...DEFAULTS };
  try {
    const raw = window.localStorage.getItem(LS_KEYS.motivation);
    if (!raw) return { ...DEFAULTS };
    const parsed = JSON.parse(raw) as Partial<MotivationSettings>;
    return {
      soundEnabled: parsed.soundEnabled ?? DEFAULTS.soundEnabled,
      reduceMotion: parsed.reduceMotion ?? DEFAULTS.reduceMotion,
    };
  } catch {
    return { ...DEFAULTS };
  }
}

export function writeMotivationSettings(s: MotivationSettings): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.motivation, JSON.stringify(s));
  } catch {
    // ignore quota errors
  }
}

export type ComboLevel = "none" | "small" | "big";

export function comboLevel(combo: number): ComboLevel {
  if (combo >= 5) return "big";
  if (combo >= 3) return "small";
  return "none";
}
