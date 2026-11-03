import data from "./two-sittings.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

// Preserve these exact unresolved original IDs even if a review flag changes.
const CONTENT_HOLD_IDS = new Set([
  "radio21-general1-2026-03-tiri-q01",
  "radio21-general1-2026-03-tiri-q03",
  "radio21-general1-2026-03-tiri-q04",
  "radio21-general1-2026-03-tiri-q05",
  "radio21-general1-2026-03-tiri-q06",
  "radio21-general1-2026-09-tiri-q02",
  "radio21-general1-2026-09-tiri-q03",
  "radio21-general1-2026-09-tiri-q04",
  "radio21-general1-2026-09-tiri-q05",
  "radio21-general1-2026-09-tiri-q06",
]);

export const GENERAL1_ALL_QUESTIONS = data.map(normalizeQuestionData);
export const GENERAL1_QUESTIONS = GENERAL1_ALL_QUESTIONS.filter(
  (q) => isPracticeReadyQuestion(q) && !CONTENT_HOLD_IDS.has(q.id),
);
