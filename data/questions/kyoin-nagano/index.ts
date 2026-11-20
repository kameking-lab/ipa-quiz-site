import type { Question } from "@/lib/questions/types";
import { NAGANO_2026_KYOTSU } from "./2026-kyotsu";
import { NAGANO_2026_KYOTSU_KOKO } from "./2026-kyotsu-koko";
import { NAGANO_2026_SENMON } from "./2026-senmon";
import { NAGANO_2026_SENMON_SHAKAI } from "./2026-senmon-shakai";
import { NAGANO_2026_SENMON_SUGAKU } from "./2026-senmon-sugaku";
import { NAGANO_2024_IPPAN } from "./2024-ippan";

export const KYOIN_NAGANO_QUESTIONS: Question[] = [
  ...NAGANO_2026_KYOTSU,
  ...NAGANO_2026_KYOTSU_KOKO,
  ...NAGANO_2026_SENMON,
  ...NAGANO_2026_SENMON_SHAKAI,
  ...NAGANO_2026_SENMON_SUGAKU,
  ...NAGANO_2024_IPPAN,
];
