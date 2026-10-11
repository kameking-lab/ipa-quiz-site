import type { Question } from "@/lib/questions/types";
import questions2025 from "./2025.json";
import questions2024 from "./2024.json";

/** 各年度 午前11・午後22の原問。記述の解答は独自解答例。 */
export const CHOSASHI_QUESTIONS: Question[] = [...questions2025, ...questions2024] as Question[];
