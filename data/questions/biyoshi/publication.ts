import type { Question } from "@/lib/questions/types";
import { isExamPublished } from "@/lib/qualifications/catalog";
import release from "./release.json";

/** Publication still requires explicit reviewed IDs and all existing holds resolved. */
export function getReleasedBiyoshiQuestions(candidates: Question[]): Question[] {
  if (!release.approved || !isExamPublished("biyoshi")) return [];
  const accepted = new Set<string>(release.reviewedQuestionIds);
  return candidates.filter(q => q.exam === "biyoshi" && accepted.has(q.id) && !q.needsReview);
}
