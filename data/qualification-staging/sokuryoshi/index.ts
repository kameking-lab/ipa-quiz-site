import round2025 from "./2025.json";
import round2026 from "./2026.json";
import manifest from "./manifest.json";

/** Editorial data only. Do not import from public registries, routes or search. */
export const SOKURYOSHI_STAGING = {
  slug: "sokuryoshi",
  publicAllowed: false,
  manifest,
  rounds: [round2025, round2026],
} as const;

export const SOKURYOSHI_STAGED_QUESTIONS = SOKURYOSHI_STAGING.rounds.flatMap(
  (round) => round.questions,
);
