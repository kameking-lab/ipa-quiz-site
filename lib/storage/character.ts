import { LS_KEYS } from "./keys";
import {
  DEFAULT_CHARACTER_ID,
  isCharacterId,
  type CharacterId,
} from "@/lib/ai/characters";

export interface CharacterState {
  id: CharacterId;
  enabled: boolean;
}

const DEFAULTS: CharacterState = {
  id: DEFAULT_CHARACTER_ID,
  enabled: false,
};

export function readCharacterState(): CharacterState {
  if (typeof window === "undefined") return { ...DEFAULTS };
  try {
    const rawId = window.localStorage.getItem(LS_KEYS.character);
    const rawEnabled = window.localStorage.getItem(LS_KEYS.characterEnabled);
    return {
      id: isCharacterId(rawId) ? rawId : DEFAULTS.id,
      enabled: rawEnabled === null ? DEFAULTS.enabled : rawEnabled === "true",
    };
  } catch {
    return { ...DEFAULTS };
  }
}

export function writeCharacterId(id: CharacterId): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.character, id);
  } catch {
    // ignore quota errors
  }
}

export function writeCharacterEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.characterEnabled, String(enabled));
  } catch {
    // ignore quota errors
  }
}
