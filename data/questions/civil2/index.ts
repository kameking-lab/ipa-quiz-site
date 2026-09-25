import type { ChoiceKey, Question } from "@/lib/questions/types";
import source from "./2026-early.json";

const keys: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ"];

/** 令和8年度2級土木施工管理技術検定・第一次検定（前期）土木の全66問。 */
export const CIVIL2_QUESTIONS: Question[] = source.questions.map((item) => {
  const answer = keys[item.officialAnswerNumber - 1];
  if (!answer || item.choices.length !== 4 || item.choiceExplanations.length !== 4) {
    throw new Error(`Invalid civil2 source record No.${item.number}`);
  }

  return {
    id: `civil2-2026-early-gakka-q${item.number}`,
    exam: "civil2",
    session: "gakka",
    year: 2026,
    season: "early",
    qNumber: item.number,
    type: "multiple-choice",
    category: item.category,
    topicTags: [item.topic],
    difficulty: 2,
    question: item.question,
    choices: Object.fromEntries(keys.map((key, index) => [key, item.choices[index]])),
    answer,
    officialAnswerNumber: String(item.officialAnswerNumber),
    explanation: item.explanation,
    choiceExplanations: Object.fromEntries(keys.map((key, index) => [key, item.choiceExplanations[index]])),
    explanationCoverage: "full",
    hasImage: Boolean(item.imageUrl),
    imageUrls: item.imageUrl ? [item.imageUrl] : undefined,
    sourcePdfUrl: source.questionUrl,
    sourceAnswerUrl: source.answerUrl,
    sourceAttribution: `出典：一般財団法人全国建設研修センター 令和8年度2級土木施工管理技術検定 第一次検定（前期・土木）No.${item.number}。ルビ・改行・空白を整理し、原本の数字選択肢をア・イ・ウ・エに変換。解説は本サイト作成。`,
    officialReferenceUrls: item.officialReferenceUrls,
    license: "JCTC-authorized-reuse",
    lastUpdated: "2026-09-26",
  };
});
