import round2025 from "./2025.json";
import round2026 from "./2026.json";
import manifest from "./manifest.json";
import officialAnswers from "./official-answers.json";

/**
 * 測量士補（国土地理院）未公開ステージングデータ。
 * Editorial data only. Do not import from public registries, loaders, routes or search.
 */
export const SOKURYOSHIHO_STAGING = {
  slug: "sokuryoshiho",
  publicAllowed: false,
  manifest,
  officialAnswers,
  rounds: { 2025: round2025, 2026: round2026 },
} as const;

export const SOKURYOSHIHO_STAGED_QUESTIONS = [...round2025, ...round2026];
