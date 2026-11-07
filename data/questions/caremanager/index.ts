import type { ChoiceKey, Question } from "@/lib/questions/types";
import y2024 from "@/data/qualification-staging/caremanager/2024.json";
import y2025 from "@/data/qualification-staging/caremanager/2025.json";

const KEYS: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];
type Numbered = Record<"1" | "2" | "3" | "4" | "5", string>;
interface Item {
  id: string; year: number; examDate: string; qNumber: number; lawAsOf: string;
  category: string; topicTags: string[]; question: string;
  choices: Numbered; requiredSelections: number; officialAnswerNumbers: number[]; summary: string;
  choiceExplanations: Numbered; lawSensitive: boolean;
  sourcePdfUrl: string; sourceAnswerUrls: string[]; sourceAttribution: string;
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
    license: "PREF-published",
    lawReferenceDate: item.lawAsOf,
    lastUpdated: "2026-11-06",
  };
}

/** 第28回（令和7年度）・第27回（令和6年度）各60問（独立レビュー PASS 済み）。 */
export const CAREMANAGER_QUESTIONS: Question[] = [...(y2025 as unknown as Item[]), ...(y2024 as unknown as Item[])].map(toQuestion);
