import type { Question } from "@/lib/questions/types";
import { KOBE_2026_KYOTSU } from "./2026-kyotsu";
import { KOBE_2025_KYOTSU } from "./2025-kyotsu";

export const KYOIN_KOBE_QUESTIONS: Question[] = [...KOBE_2026_KYOTSU, ...KOBE_2025_KYOTSU];
