import type { Question } from "@/lib/questions/types";
import questions2025 from "./2025.json";
import questions2024 from "./2024.json";
import questions2023Am from "./2023-am.json";

/** 2025・2024年度の全原問と2023年度午前11問。記述の解答は独自解答例。 */
export const CHOSASHI_QUESTIONS: Question[] = [...questions2025, ...questions2024, ...questions2023Am] as Question[];
