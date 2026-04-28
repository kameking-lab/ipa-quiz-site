import { LS_KEYS } from "./keys";

export type AvatarStyle =
  | "adventurer"
  | "avataaars"
  | "bottts"
  | "lorelei"
  | "notionists"
  | "pixel-art"
  | "shapes"
  | "thumbs"
  | "fun-emoji"
  | "icons";

export interface AvatarConfig {
  style: AvatarStyle;
  seed: string;
}

const DEFAULT: AvatarConfig = { style: "adventurer", seed: "ipa-quiz" };

export const AVATAR_STYLES: AvatarStyle[] = [
  "adventurer",
  "avataaars",
  "bottts",
  "lorelei",
  "notionists",
  "pixel-art",
  "shapes",
  "thumbs",
  "fun-emoji",
  "icons",
];

export function readAvatar(): AvatarConfig {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = window.localStorage.getItem(LS_KEYS.avatar);
    if (!raw) return DEFAULT;
    const parsed = JSON.parse(raw) as Partial<AvatarConfig>;
    return {
      style: AVATAR_STYLES.includes(parsed.style as AvatarStyle)
        ? (parsed.style as AvatarStyle)
        : DEFAULT.style,
      seed: typeof parsed.seed === "string" && parsed.seed.length > 0 ? parsed.seed : DEFAULT.seed,
    };
  } catch {
    return DEFAULT;
  }
}

export function writeAvatar(cfg: AvatarConfig): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.avatar, JSON.stringify(cfg));
  } catch {
    // ignore
  }
}

export function buildAvatarUrl(cfg: AvatarConfig): string {
  const seed = encodeURIComponent(cfg.seed);
  return `https://api.dicebear.com/9.x/${cfg.style}/svg?seed=${seed}`;
}
