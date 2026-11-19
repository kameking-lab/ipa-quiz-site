import type { Question } from "@/lib/questions/types";
import questions2025 from "./2025.json";
import questions2024 from "./2024.json";
import questions2022Am from "./2022-am.json";
import questions2022Pm from "./2022-pm.json";

/** 午前・午後の原問。2022年度は公式正答のある多肢択一を収録。 */
export const CHOSASHI_QUESTIONS: Question[] = [...questions2025, ...questions2024, ...questions2022Am, ...questions2022Pm] as Question[];
