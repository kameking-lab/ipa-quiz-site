import type { Question, QuizFilter } from "./types";
import type { HistoryStore } from "@/lib/storage/history";

function hasUnrenderableContent(q: Question): boolean {
  const tableOrFigurePattern = /次の表|以下の表|下の表|次の図|以下の図|下の図|次の条件|以下の条件/;
  return tableOrFigurePattern.test(q.question) && !q.hasImage;
}

export function filterQuestions(
  all: Question[],
  filter: QuizFilter,
  history?: HistoryStore,
): Question[] {
  let pool = [...all];

  if (filter.exam) pool = pool.filter((q) => q.exam === filter.exam);
  if (filter.year) pool = pool.filter((q) => q.year === filter.year);
  if (filter.season) pool = pool.filter((q) => q.season === filter.season);
  if (filter.topicTag) {
    pool = pool.filter((q) => q.topicTags.includes(filter.topicTag!));
  }
  if (filter.category) {
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
  const keys: Array<"ア" | "イ" | "ウ" | "エ"> = ["ア", "イ", "ウ", "エ"];
  const values = keys.map((k) => q.choices![k]);
  shuffle(values);
  const newChoices: Record<"ア" | "イ" | "ウ" | "エ", string> = {
    ア: values[0],
    イ: values[1],
    ウ: values[2],
    エ: values[3],
  };
  const originalAnswerKey = Array.isArray(q.answer) ? q.answer[0] : q.answer;
  const originalAnswerValue = q.choices[originalAnswerKey as "ア" | "イ" | "ウ" | "エ"];
  const newAnswerKey = keys[values.indexOf(originalAnswerValue)];
  return { ...q, choices: newChoices, answer: newAnswerKey };
}
