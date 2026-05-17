import { getSuccessStoriesByExam } from "@/data/success-stories";
import type { SuccessStorySummary } from "@/data/success-stories/types";
import type { ExamCode } from "@/lib/questions/types";

/**
 * Returns up to `limit` success stories for the given exam, newest-first.
 * Designed for quiz/exam hub pages to surface motivational sidebars.
 */
export function getRelatedSuccessStoriesByExam(
  exam: ExamCode,
  limit = 3,
): SuccessStorySummary[] {
  return getSuccessStoriesByExam(exam).slice(0, limit);
}
