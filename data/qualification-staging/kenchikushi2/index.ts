// Unpublished staging only. Do not import into the public question registry.
export { default as KENCHIKUSHI2_SOURCE_MANIFEST } from "./source-manifest.json";
import { KENCHIKUSHI2_2026_I } from "./2026-I";
import { KENCHIKUSHI2_2026_II } from "./2026-II";
export const KENCHIKUSHI2_STAGED_QUESTIONS = [...KENCHIKUSHI2_2026_I, ...KENCHIKUSHI2_2026_II] as const;
export type { StagedKenchikushiQuestion } from "./types";
