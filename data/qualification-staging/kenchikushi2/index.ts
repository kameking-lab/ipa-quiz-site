// Unpublished staging only. Do not import into the public question registry.
export { default as KENCHIKUSHI2_SOURCE_MANIFEST } from "./source-manifest.json";
import { KENCHIKUSHI2_2026_I } from "./2026-I";
import { KENCHIKUSHI2_2026_II } from "./2026-II";
import { KENCHIKUSHI2_2026_III } from "./2026-III";
export const KENCHIKUSHI2_STAGED_QUESTIONS = [...KENCHIKUSHI2_2026_I, ...KENCHIKUSHI2_2026_II, ...KENCHIKUSHI2_2026_III] as const;
export type { StagedKenchikushiQuestion } from "./types";
