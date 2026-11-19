import type { Question } from "@/lib/questions/types";
import { KYOIN_TOKYO_2025 } from "./2025";
import { KYOIN_TOKYO_2026 } from "./2026";

export const KYOIN_TOKYO_QUESTIONS: Question[] = [...KYOIN_TOKYO_2026, ...KYOIN_TOKYO_2025];
