import type { ExamCode } from "@/lib/questions/types";
import { getIndexableQuestions } from "@/lib/seo/sitemap-pagination";

/**
 * Single source of truth for per-exam question counts (致命傷④ / F-6).
 *
 * Counts the published, usable questions per exam — the same set that drives
 * TOTAL_QUESTIONS_PUBLISHED — so the home grid badges sum exactly to the
 * headline total instead of to the raw module length. The canonical-only
 * sitemap is intentionally smaller because shared morning-I pages stay usable
 * in every exam context. (The raw
 * length included ~1,742 placeholder-explanation + 10 needsReview questions
 * that are noindex / 404 and must not be advertised.)
 */
export const EXAM_QUESTION_COUNTS: Partial<Record<ExamCode, number>> = (() => {
  const counts: Partial<Record<ExamCode, number>> = {};
  for (const q of getIndexableQuestions()) {
    counts[q.exam] = (counts[q.exam] ?? 0) + 1;
  }
  return counts;
})();

/** Question count for a single exam (0 if the exam has no indexable questions). */
export function getExamQuestionCount(exam: ExamCode): number {
  return EXAM_QUESTION_COUNTS[exam] ?? 0;
}
