import type { Question } from "@/lib/questions/types";
import { NAGANO_2026_KYOTSU } from "./2026-kyotsu";
import { NAGANO_2026_KYOTSU_KOKO } from "./2026-kyotsu-koko";
import { NAGANO_2026_SENMON } from "./2026-senmon";
import { NAGANO_2024_IPPAN } from "./2024-ippan";

export const KYOIN_NAGANO_QUESTIONS: Question[] = [...NAGANO_2026_KYOTSU, ...NAGANO_2026_KYOTSU_KOKO, ...NAGANO_2026_SENMON, ...NAGANO_2024_IPPAN];
