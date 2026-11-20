import type { Question } from "@/lib/questions/types";
import { KOBE_2026_KYOTSU } from "./2026-kyotsu";
import { KOBE_2026_SENMON } from "./2026-senmon";
import { KOBE_2025_KYOTSU } from "./2025-kyotsu";
import { KOBE_2024_KYOTSU } from "./2024-kyotsu";
import { KOBE_2022_KYOTSU } from "./2022-kyotsu";

export const KYOIN_KOBE_QUESTIONS: Question[] = [...KOBE_2026_KYOTSU, ...KOBE_2026_SENMON, ...KOBE_2025_KYOTSU, ...KOBE_2024_KYOTSU, ...KOBE_2022_KYOTSU];
