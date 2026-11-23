import first2026 from "./2026-round1.json";
import second2025 from "./2025-round2.json";
import first2025 from "./2025-round1.json";
import type { Question } from "@/lib/questions/types";

export const DEKYO_CHIEF_2_QUESTIONS = [...first2026, ...second2025, ...first2025] as Question[];
