import type { Question } from "@/lib/questions/types";
import { GIFU_2025_KYOTSU } from "./2025-kyotsu";
import { GIFU_2025_SENMON } from "./2025-senmon";

export const KYOIN_GIFU_QUESTIONS: Question[] = [...GIFU_2025_KYOTSU, ...GIFU_2025_SENMON];
