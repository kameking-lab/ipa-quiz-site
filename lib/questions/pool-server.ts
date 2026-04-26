import "server-only";

import type { ExamCode, Question, QuizFilter } from "./types";
import { getAllQuestionsLazy, getQuestionsForExam } from "./get-questions";
import { isPlaceholderExplanation } from "./filter";

function hasUnrenderableContent(q: Question): boolean {
  const tableOrFigurePattern = /次の表|以下の表|下の表|表のように|表に示す|次の図|以下の図|下の図|図のように|図に示す|図中の|次の条件|以下の条件/;
  return tableOrFigurePattern.test(q.question) && !q.hasImage;
}

/**
 * Apply non-history filters server-side. Does not shuffle or slice — the client
 * handles those after layering on history/excludeRecent filters.
 */
async function loadServerPool(filter: QuizFilter): Promise<Question[]> {
  let pool: Question[];
  if (filter.examGroup && filter.examGroup.length > 0) {
    const chunks = await Promise.all(
      filter.examGroup.map((e) => getQuestionsForExam(e)),
    );
    pool = chunks.flat();
  } else if (filter.exam) {
    pool = await getQuestionsForExam(filter.exam);
  } else {
    pool = await getAllQuestionsLazy();
  }

  if (filter.year) pool = pool.filter((q) => q.year === filter.year);
  if (filter.season) pool = pool.filter((q) => q.season === filter.season);
  if (filter.session) pool = pool.filter((q) => q.session === filter.session);
  if (filter.topicTag) {
    pool = pool.filter((q) => q.topicTags.includes(filter.topicTag!));
  }
  if (filter.categoryGroup && filter.categoryGroup.length > 0) {
    const set = new Set(filter.categoryGroup);
    pool = pool.filter((q) => set.has(q.category));
  } else if (filter.category) {
    pool = pool.filter((q) => q.category === filter.category);
  }
  if (filter.calculationOnly) pool = pool.filter((q) => q.isCalculation === true);

  pool = pool.filter((q) => !hasUnrenderableContent(q));
  pool = pool.filter((q) => !q.needsReview);

  const withReal = pool.filter((q) => !isPlaceholderExplanation(q));
  if (withReal.length > 0) pool = withReal;

  if (filter.inOrder) {
    pool = [...pool].sort((a, b) => a.qNumber - b.qNumber);
  }

  return pool;
}

/** Pool of question IDs matching the filter (no history applied). */
export async function getPoolIds(filter: QuizFilter): Promise<string[]> {
  const pool = await loadServerPool(filter);
  return pool.map((q) => q.id);
}

/** Look up a single question by ID (server-only). */
export async function findQuestionById(id: string): Promise<Question | undefined> {
  const examCode = id.split("-")[0] as ExamCode;
  const pool = await getQuestionsForExam(examCode);
  const hit = pool.find((q) => q.id === id);
  if (hit) return hit;
  // Fall back to a cross-exam search (handles odd ID formats).
  const all = await getAllQuestionsLazy();
  return all.find((q) => q.id === id);
}
