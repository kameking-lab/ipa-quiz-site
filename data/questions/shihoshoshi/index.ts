import type { Question } from "@/lib/questions/types";
import questions2026 from "./2026.json";
import questions2025 from "./2025.json";
import questions2024am from "./2024-am.json";
import batch1Holds from "./batch1-holds.json";

/** 2025・2026年度の択一式と2024年度午前35問。 */
export const SHIHOSHOSHI_QUESTIONS: Question[] = [
  ...questions2026, ...questions2025, ...questions2024am,
] as Question[];

/** INT1's frozen release scope keeps all ten originally held questions unscored. */
export const SHIHOSHOSHI_BATCH1_QUESTIONS: Question[] = SHIHOSHOSHI_QUESTIONS.map(question =>
  batch1Holds.includes(question.id) ? { ...question, needsReview: true } : question,
);
