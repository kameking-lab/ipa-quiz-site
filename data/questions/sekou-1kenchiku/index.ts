import type { ChoiceKey, Question } from "@/lib/questions/types";
import r3 from "./2021-june.json";
import r4 from "./2022-june.json";
import r5 from "./2023-june.json";
import r6 from "./2024-july.json";
import r7 from "./2025-july.json";
import r8 from "./2026-july.json";

const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];
type Source = {
  year: number; officialLabel: string; questionUrl: string; answerPage: number; examDate?: string; lastUpdated?: string;
  questions: { number: number; pdfPage: number; category: string; question: string;
    choices: string[]; officialAnswerNumbers: number[]; explanation: string;
    choiceExplanations: string[]; requiredSelections?: number;
    imageUrls?: string[]; imageAltTexts?: string[]; choiceImageUrls?: Partial<Record<ChoiceKey, string>>;
    sourcePdfUrl: string; sourceAnswerUrl: string; officialReferenceUrls?: string[];
    isCalculation?: boolean }[];
};

function convert(source: Source, season: "june" | "july" = "july"): Question[] {
  if (source.questions.length !== 72) throw new Error("建築施工管理: 72原問が必要です");
  return source.questions.map((q, index) => {
    const firstFiveChoiceNumber = season === "june" ? 55 : 51;
    const count = q.number >= firstFiveChoiceNumber && q.number <= 60 ? 5 : 4;
    const requiredSelections = q.requiredSelections ?? 1;
    if (q.number !== index + 1 || q.choices.length !== count || q.choiceExplanations.length !== count ||
        requiredSelections < 1 || requiredSelections > q.officialAnswerNumbers.length ||
        new Set(q.officialAnswerNumbers).size !== q.officialAnswerNumbers.length ||
        q.officialAnswerNumbers.some(n => !Number.isInteger(n) || n < 1 || n > count)) {
      throw new Error(`建築施工管理 ${source.year} No.${q.number}: データ不整合`);
    }
    const usedKeys = keys.slice(0, count);
    const answers = q.officialAnswerNumbers.map(n => keys[n - 1]!);
    return {
      id: `sekou-1kenchiku-${source.year}-${season}-${q.number <= 44 ? "am" : "pm"}-q${q.number}`,
      exam: "sekou-1kenchiku", year: source.year, season, session: q.number <= 44 ? "am" : "pm",
      qNumber: q.number, type: "multiple-choice", category: q.category, topicTags: [q.category], difficulty: 3,
      question: q.question, choices: Object.fromEntries(usedKeys.map((k, i) => [k, q.choices[i]!])),
      answer: answers.length === 1 ? answers[0]! : answers,
      requiredSelections,
      officialAnswerNumber: q.officialAnswerNumbers.join(requiredSelections > 1 ? "・" : "または"),
      explanation: q.explanation,
      choiceExplanations: Object.fromEntries(usedKeys.map((k, i) => [k, q.choiceExplanations[i]!])),
      explanationCoverage: "full", hasImage: Boolean(q.imageUrls?.length || Object.values(q.choiceImageUrls ?? {}).some(Boolean)), imageUrls: q.imageUrls,
      sourcePdfUrl: q.sourcePdfUrl, sourceAnswerUrl: q.sourceAnswerUrl,
      ...(source.examDate && { examDate: source.examDate }),
      ...(q.imageAltTexts && { imageAltTexts: q.imageAltTexts }),
      ...(q.choiceImageUrls && { choiceImageUrls: q.choiceImageUrls }),
      ...(q.officialReferenceUrls && { officialReferenceUrls: q.officialReferenceUrls }),
      ...(q.isCalculation && { isCalculation: q.isCalculation }),
      sourceAttribution: `出典：一般財団法人建設業振興基金 ${source.officialLabel}1級建築施工管理技術検定 第一次検定 No.${q.number}（PDF ${q.pdfPage}頁／正答${source.answerPage}頁）。ルビ・改行・空白を整理し、分数を横書き、数字選択肢をア～オに変換。図選択肢は公式原図を併用。解説は過去問AI独自作成。`,
      license: "FCIP-owner-authorized", lastUpdated: source.lastUpdated ?? (season === "june" ? "2026-11-18" : "2026-11-03"),
    };
  });
}
/** 公開判定は資格台帳に従う。ここは公開前検証でも直接読み込む。 */
export const SEKOU_1KENCHIKU_QUESTIONS: Question[] = [...convert(r8), ...convert(r7), ...convert(r6), ...convert(r5, "june"), ...convert(r4, "june"), ...(r3 as Question[])];
