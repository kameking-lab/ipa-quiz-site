import type { Question } from "@/lib/questions/types";
import { isExamPublished } from "@/lib/qualifications/catalog";
import release from "@/data/questions/riyoshi/release.json";

export function getReleasedRiyoshiQuestions(candidates: Question[]): Question[] {
  if (!release.approved || !isExamPublished("riyoshi")) return [];
  const reviewed = new Set<string>(release.reviewedQuestionIds);
  return candidates.filter(q => q.exam === "riyoshi" && reviewed.has(q.id) && q.needsReview === false);
}
