import { appendReplenishedQuestions } from "../published";
import type { ChoiceKey, Question } from "@/lib/questions/types";

import y2024 from "@/data/qualification-staging/caremanager/2024.json";

import y2025 from "@/data/qualification-staging/caremanager/2025.json";

import y2023 from "./2023-annual.json";

import y2021 from "./2021.json";

import remainder2023 from "./2023-annual-remainder.json";


const KEYS: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];

type Numbered = Record<"1" | "2" | "3" | "4" | "5", string>;

interface Item {
  id: string; year: number; examDate: string; qNumber: number; lawAsOf: string;
  category: string; topicTags: string[]; question: string;
  choices: Numbered; requiredSelections: number; officialAnswerNumbers: number[]; summary: string;
  choiceExplanations: Numbered; lawSensitive: boolean;
  sourcePdfUrl: string; sourceAnswerUrls: string[]; sourceAttribution: string;
  originalContent?: Question["originalContent"];
  officialReferenceUrls?: string[];
  lastUpdated?: string;
}

const NOTICE = (date: string) => `\n※出題時点（${date}）の法令・基準に基づく解説です。その後の改正等で結論が変わる場合があります。`;

const byKey = (source: Numbered) => Object.fromEntries(KEYS.map((key, index) => [key, source[String(index + 1) as "1"]]));


function toQuestion(item: Item): Question {
  const answer = item.officialAnswerNumbers.map((n) => KEYS[n - 1]!) as ChoiceKey[];
  if (answer.length !== item.requiredSelections || answer.length < 2) throw new Error(`Invalid caremanager ${item.id}`);
  return {
    id: `caremanager-${item.year}-annual-gakka-q${item.qNumber}`,
    exam: "caremanager",
    session: "gakka",
    year: item.year,
    season: "annual",
    qNumber: item.qNumber,
    examDate: item.examDate,
    subject: item.category,
    officialAnswerNumber: item.officialAnswerNumbers.join(","),
    type: "multiple-choice",
    category: item.category,
    topicTags: item.topicTags.length ? item.topicTags : [item.category],
    difficulty: 2,
    question: item.question,
    choices: byKey(item.choices),
    answer,
    requiredSelections: answer.length,
    explanation: `${item.summary}${item.lawSensitive ? NOTICE(item.lawAsOf) : ""}`,
    choiceExplanations: byKey(item.choiceExplanations),
    explanationCoverage: "full",
    hasImage: false,
    sourcePdfUrl: item.sourcePdfUrl,
    sourceAnswerUrl: item.sourceAnswerUrls[0],
    sourceAttribution: item.sourceAttribution,
    originalContent: item.originalContent,
    officialReferenceUrls: item.officialReferenceUrls,
    license: "PREF-published",
    lawReferenceDate: item.lawAsOf,
    lastUpdated: item.lastUpdated ?? "2026-11-06",
  };
}


const fullPapers = [...(y2025 as unknown as Item[]), ...(y2024 as unknown as Item[])].map(toQuestion);


/** 全国共通の介護支援専門員実務研修受講試験。 */
export const CAREMANAGER_QUESTIONS: Question[] = appendReplenishedQuestions([
  ...(y2025 as unknown as Item[]),
  ...(y2024 as unknown as Item[]),
  ...(y2023 as unknown as Item[]),
].map(toQuestion), [
  remainder2023,
  y2021,
]);
