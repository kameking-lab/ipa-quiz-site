import first2026 from "./2026-first.json";
import second2025 from "./2025-second.json";
import first2025 from "./2025-first.json";
import type { Question } from "@/lib/questions/types";

export const DEKYO_CHIEF_3_QUESTIONS = [...first2026, ...second2025, ...first2025] as Question[];
