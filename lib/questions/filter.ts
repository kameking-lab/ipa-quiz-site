import { isReferenceOnlyQuestionId } from "./assessment";
import { nativeBQuestionIssue } from "./native-b";
import { numericQuestionIssue } from "./numeric";
import { orderingQuestionIssue } from "./ordering";
import { hasUnrenderableContent } from "./content-quality";
import type { Question, QuizFilter } from "./types";
import type { HistoryStore } from "@/lib/storage/history";
import { usesNumberedChoices } from "./display";



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
  return !q.officialScoring && q.publicAllowed !== false && !isReferenceOnlyQuestionId(q.id) && !nativeBQuestionIssue(q) && !numericQuestionIssue(q) && !orderingQuestionIssue(q) && !hasUnrenderableContent(q) && !q.needsReview && !isPlaceholderExplanation(q);
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
    pool.sort((a, b) => a.qNumber - b.qNumber || (a.part ?? "").localeCompare(b.part ?? ""));
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
  // Printed numbers and official answer fields refer to the original order.
  if (usesNumberedChoices(q.exam) || q.officialAnswerNumber !== undefined) return q;
  if (["chintai", "kyusui", "biru-kan", "gijutsushi1-kikai", "hoshasen-1", "hoshasen-2", "khk-kikai-kou", "khk-kikai-otsu", "energy-kanri", "reform-mgr", "shohi-sodan"].includes(q.exam)) return q;
  if (["denki1","kisho","kenchiku-setsubishi","chizai2","kanteishi","kaikeishi","judo-seifukushi","riku-toku-kokunai","kai-toku2","kai-toku3","koku-toku","land-special1","riku-tech1","maritime4","aviation-comm","amateur1","maritime-special1","riku-tech2","amateur2","maritime-radar","maritime3","maritime2","maritime1","general3","general2","general1","land-special2","land-special3","biyoshi","tsushin2","shuwa","shinrishi"].includes(q.exam) || q.exam.startsWith("kikenbutsu-otsu")) return q;
  if (q.exam === "kikenbutsu-otsu4") return q;
  if (q.exam === "unko-kanrisha-kamotsu") return q;
  if (q.exam === "shobo-setsubishi-otsu6") return q;
  if (q.exam === "shobo-setsubishi-kou4") return q;
  if (q.exam === "kikenbutsu-hei") return q;
  if (q.exam === "kikenbutsu-kou") return q;
  if (q.exam === "shobo-setsubishi-kou1") return q;
  if (q.exam === "unko-kanrisha-ryokaku") return q;
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
  const choiceImageUrls = q.choiceImageUrls
    ? Object.fromEntries(keys.map((key, index) => [key, q.choiceImageUrls![originalKeys[index]]]))
    : undefined;
  return { ...q, choices: newChoices, answer: newAnswerKey, choiceExplanations, choiceImageUrls };
}
