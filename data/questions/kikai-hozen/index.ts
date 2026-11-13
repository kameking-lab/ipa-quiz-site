import type { ChoiceKey, Question } from "@/lib/questions/types";
import { KIKAI_HOZEN_STAGED_QUESTIONS, type KikaiHozenStagedQuestion } from "@/data/qualification-staging/kikai-hozen";
import { projectStagedQuestions } from "../batch4/project-staged";
import annual2023 from "./2023-annual.json";

const IMAGE_BASE = "/images/questions/kikai-hozen";
/** 真偽法（〇×）は2択のア・イに写す。表示は「正しい（〇）」「誤り（×）」で原本の記号を残す。 */
const TRUE_FALSE_KEY: Record<string, ChoiceKey> = { "〇": "ア", "×": "イ" };
const TRUE_FALSE_TEXT: Record<string, string> = { "〇": "正しい（〇）", "×": "誤り（×）" };

function toKey(symbol: string, trueFalse: boolean): ChoiceKey {
  return (trueFalse ? TRUE_FALSE_KEY[symbol] : symbol) as ChoiceKey;
}

function remap(source: Readonly<Partial<Record<string, string>>>, trueFalse: boolean, text?: Record<string, string>): Partial<Record<ChoiceKey, string>> {
  return Object.fromEntries(Object.entries(source).map(([symbol, value]) => [toKey(symbol, trueFalse), text?.[symbol] ?? value]));
}

function project(row: KikaiHozenStagedQuestion): Question {
  const [base] = projectStagedQuestions([row]);
  const trueFalse = row.answerFormat === "true-false";
  return {
    ...base,
    exam: "kikai-hozen",
    choices: remap(row.choices, trueFalse, trueFalse ? TRUE_FALSE_TEXT : undefined),
    choiceExplanations: remap(row.choiceExplanations, trueFalse),
    answer: toKey(row.officialAnswer, trueFalse),
    officialAnswerNumber: row.officialAnswer,
    topicTags: ["機械保全技能検定", row.category],
    difficulty: 3,
    explanationCoverage: "full",
    license: "JIPM-owner-decision",
    ...(row.images.length ? {
      hasImage: true,
      imageUrls: row.images.map((image) => `${IMAGE_BASE}/${image.path.split("/").pop()}`),
      imageAltTexts: row.images.map((image) => image.alt),
    } : {}),
  };
}

/** 2023〜2025年度 第2回 2級 機械系保全作業 学科 各50問。 */
export const KIKAI_HOZEN_QUESTIONS: Question[] = [
  ...KIKAI_HOZEN_STAGED_QUESTIONS.map(project),
  ...(annual2023 as Question[]),
];
