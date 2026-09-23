import { hasUnrenderableContent } from "./content-quality";
import type { Question, QuizFilter } from "./types";
import type { HistoryStore } from "@/lib/storage/history";



export function isPlaceholderExplanation(q: Question): boolean {
  const explanation = q.explanation.trim();
  return /^正解は[アイウエ]です[。.]?$/.test(explanation) || explanation === "";
}

/**
 * A question can be advertised in an IPA paper list only when the interactive
 * player can render and explain it. Keeping this predicate shared prevents a
 * paper page from promising more questions than the quiz can actually serve.
 */
export function isPracticeReadyQuestion(q: Question): boolean {
  return !hasUnrenderableContent(q) && !q.needsReview && !isPlaceholderExplanation(q);
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

  pool = pool.filter(isPracticeReadyQuestion);

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
  const prose = [q.question, q.explanation, ...Object.values(q.choices), ...Object.values(q.choiceExplanations ?? {})].join("\n");
  if (/(?:^|[^ァ-ヶー])[アイウエオカキクケコ](?![ァ-ヶー])/u.test(prose) || Array.isArray(q.answer) || Object.keys(q.choices).length !== 4) return q;
  const keys: Array<"ア" | "イ" | "ウ" | "エ"> = ["ア", "イ", "ウ", "エ"];
  const originalKeys = [...keys];
  shuffle(originalKeys);
  const values = originalKeys.map((k) => q.choices![k]!);
  const newChoices: Record<"ア" | "イ" | "ウ" | "エ", string> = {
    ア: values[0],
    イ: values[1],
    ウ: values[2],
    エ: values[3],
  };
  const originalAnswerKey = Array.isArray(q.answer) ? q.answer[0] : q.answer;
  const newAnswerKey = keys[originalKeys.indexOf(originalAnswerKey as "ア" | "イ" | "ウ" | "エ")];
  const choiceExplanations = q.choiceExplanations
    ? Object.fromEntries(keys.map((key, index) => [key, q.choiceExplanations![originalKeys[index]]]))
    : undefined;
  return { ...q, choices: newChoices, answer: newAnswerKey, choiceExplanations };
}
