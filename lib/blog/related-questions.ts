import { ALL_QUESTIONS } from "@/data/questions";
import { isPlaceholderExplanation } from "@/lib/questions/filter";
import type { ExamCode, Question } from "@/lib/questions/types";

/**
 * Pick a few concrete /q/* questions to link from a blog post body, so the
 * article funnels readers directly into individual indexable question pages
 * (internal-link network — phase 7 task ②-3). Deterministic so SSG output is
 * stable: rank by tag/category overlap with the post, then newest-first.
 */
export function getRelatedQuestionsForPost(
  exam: ExamCode | undefined,
  tags: string[],
  limit = 3,
): Question[] {
  if (!exam) return [];
  const tagSet = new Set(tags);
  const pool = ALL_QUESTIONS.filter(
    (q) =>
      q.exam === exam &&
      !q.needsReview &&
      !!q.choices &&
      !isPlaceholderExplanation(q),
  );
  const scored = pool.map((q) => {
    let score = 0;
    if (tagSet.has(q.category)) score += 2;
    score += q.topicTags.filter((t) => tagSet.has(t)).length;
    return { q, score };
  });
  scored.sort(
    (a, b) =>
      b.score - a.score ||
      b.q.year - a.q.year ||
      a.q.qNumber - b.q.qNumber,
  );
  return scored.slice(0, limit).map((s) => s.q);
}
