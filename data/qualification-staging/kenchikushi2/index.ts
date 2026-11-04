// Unpublished staging only. Do not import into the public question registry.
export { default as KENCHIKUSHI2_SOURCE_MANIFEST } from "./source-manifest.json";
import { KENCHIKUSHI2_2026_I } from "./2026-I";
import { KENCHIKUSHI2_2026_II } from "./2026-II";
import { KENCHIKUSHI2_2026_III } from "./2026-III";
import { KENCHIKUSHI2_2026_IV } from "./2026-IV";
import { KENCHIKUSHI2_2025_I } from "./2025-I";
import { KENCHIKUSHI2_2025_II } from "./2025-II";
import { KENCHIKUSHI2_2025_III } from "./2025-III";
import { KENCHIKUSHI2_2025_IV } from "./2025-IV";
import { MOKUZO_2026_I } from "./mokuzo-2026-I";
import { MOKUZO_2026_II } from "./mokuzo-2026-II";
import { MOKUZO_2026_III } from "./mokuzo-2026-III";
import { MOKUZO_2026_IV } from "./mokuzo-2026-IV";
import { MOKUZO_2025_I } from "./mokuzo-2025-I";
export const KENCHIKUSHI2_STAGED_QUESTIONS = [...KENCHIKUSHI2_2026_I, ...KENCHIKUSHI2_2026_II, ...KENCHIKUSHI2_2026_III, ...KENCHIKUSHI2_2026_IV, ...KENCHIKUSHI2_2025_I, ...KENCHIKUSHI2_2025_II, ...KENCHIKUSHI2_2025_III, ...KENCHIKUSHI2_2025_IV, ...MOKUZO_2026_I, ...MOKUZO_2026_II, ...MOKUZO_2026_III, ...MOKUZO_2026_IV, ...MOKUZO_2025_I] as const;
export type { StagedKenchikushiQuestion } from "./types";
