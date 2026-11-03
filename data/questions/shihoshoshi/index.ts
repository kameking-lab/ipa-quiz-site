import type { Question } from "@/lib/questions/types";
import questions2026 from "./2026.json";
import questions2025 from "./2025.json";

/** 未公開。公式正答の要約解説段階であり、法的理由のレビュー前。 */
export const SHIHOSHOSHI_QUESTIONS: Question[] = [...questions2026, ...questions2025] as Question[];
