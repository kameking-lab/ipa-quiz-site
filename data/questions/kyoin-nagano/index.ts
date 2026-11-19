import type { Question } from "@/lib/questions/types";
import { NAGANO_2026_KYOTSU } from "./2026-kyotsu";
import { NAGANO_2026_KYOTSU_KOKO } from "./2026-kyotsu-koko";

export const KYOIN_NAGANO_QUESTIONS: Question[] = [...NAGANO_2026_KYOTSU, ...NAGANO_2026_KYOTSU_KOKO];
