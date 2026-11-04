import { KENCHIKUSHI1_2026_KEIKAKU } from "./2026-keikaku";
import { KENCHIKUSHI1_2025_KEIKAKU } from "./2025-keikaku";
import { KENCHIKUSHI1_2026_KANKYO_SETSUBI } from "./2026-kankyo-setsubi";

/** 検証専用。公開レジストリからは参照しない。 */
export const KENCHIKUSHI1_CANDIDATES = [
  ...KENCHIKUSHI1_2026_KEIKAKU,
  ...KENCHIKUSHI1_2025_KEIKAKU,
  ...KENCHIKUSHI1_2026_KANKYO_SETSUBI,
];
