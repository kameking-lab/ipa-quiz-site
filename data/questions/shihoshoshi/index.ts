import type { Question } from "@/lib/questions/types";
import questions2026 from "./2026.json";
import questions2025 from "./2025.json";

/** 未公開。全肢の法的理由を収録し、根拠未確認の問題は needsReview で保留。 */
export const SHIHOSHOSHI_QUESTIONS: Question[] = [...questions2026, ...questions2025] as Question[];
