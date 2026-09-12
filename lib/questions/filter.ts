import { hasUnrenderableContent } from "./content-quality";
import type { Question, QuizFilter } from "./types";
import type { HistoryStore } from "@/lib/storage/history";



export function isPlaceholderExplanation(q: Question): boolean {
  return /^正解は[アイウエ]です[。.]/.test(q.explanation) || q.explanation.trim() === "";
}

export function filterQuestions(
  all: Question[],
  filter: QuizFilter,
  history?: HistoryStore,
): Question[] {
  let pool = [...all];

  if (filter.examGroup && filter.examGroup.length > 0) {
    const set = new Set(filter.examGroup);
    pool = pool.filter((q) => set.has(q.exam));
  } else if (filter.exam) {
    pool = pool.filter((q) => q.exam === filter.exam);
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
  if (filter.calculationOnly) {
    pool = pool.filter((q) => q.isCalculation === true);
  }
  if (filter.mode === "review" && history) {
    const wrongIds = new Set(history.getWrongIds());
    const starredIds = new Set(history.getStarredIds());
    pool = pool.filter((q) => wrongIds.has(q.id) || starredIds.has(q.id));
  }
  if (filter.mode === "unanswered" && history) {
    const answered = new Set(history.getAnsweredIds());
    pool = pool.filter((q) => !answered.has(q.id));
  }
  if (filter.excludeRecent && history) {
    const recent = new Set(history.getRecentIds(2));
    pool = pool.filter((q) => !recent.has(q.id));
  }

  // Exclude questions that reference tables/figures but have no image data
  pool = pool.filter((q) => !hasUnrenderableContent(q));

  // Exclude questions flagged for review (low-quality explanations, etc.)
  pool = pool.filter((q) => !q.needsReview);

  // Remove placeholder explanations if real explanations are available
  const withReal = pool.filter((q) => !isPlaceholderExplanation(q));
  if (withReal.length > 0) pool = withReal;

  if (filter.mode === "random") {
    shuffle(pool);
  } else if (filter.inOrder) {
    pool.sort((a, b) => a.qNumber - b.qNumber);
  }

  return pool;
}

export function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function shuffleChoices(q: Question): Question {
  if (!q.choices) return q;
  // Labels in authored prose refer to the original choices. Reordering only the
  // answer map would silently contradict the explanation (for example AP 2017秋 問2).
  const prose = [q.question, q.explanation, ...Object.values(q.choices)].join("\n");
  if (/(?:^|[^ァ-ヶー])[アイウエ](?![ァ-ヶー])/u.test(prose) || Array.isArray(q.answer)) return q;
  const keys: Array<"ア" | "イ" | "ウ" | "エ"> = ["ア", "イ", "ウ", "エ"];
  const values = keys.map((k) => q.choices![k]!);
  shuffle(values);
  const newChoices: Record<"ア" | "イ" | "ウ" | "エ", string> = {
    ア: values[0],
    イ: values[1],
    ウ: values[2],
    エ: values[3],
  };
  const originalAnswerKey = Array.isArray(q.answer) ? q.answer[0] : q.answer;
  const originalAnswerValue = q.choices[originalAnswerKey as "ア" | "イ" | "ウ" | "エ"]!;
  const newAnswerKey = keys[values.indexOf(originalAnswerValue)];
  return { ...q, choices: newChoices, answer: newAnswerKey };
}
