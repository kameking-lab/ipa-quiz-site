import type { ChoiceKey, Question, Season } from "@/lib/questions/types";
import early from "./2026-early.json";
import late from "./2025-late.json";

const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];
type Source = {
  year: number; season: Season; examDate: string; questionUrl: string; answerPdfPage: number;
  questions: {
    number: number; pdfPage: number; question: string; choices: string[];
    officialAnswerNumber: number; category: string; topic: string;
    explanation: string; choiceExplanations: string[];
    imageUrl?: string; figureDescription?: string;
  }[];
};
function convert(source: Source): Question[] {
  return source.questions.map((item) => {
    const count = item.number >= 38 && item.number <= 42 ? 5 : 4;
    if (item.choices.length !== count || item.choiceExplanations.length !== count ||
        !Number.isInteger(item.officialAnswerNumber) || item.officialAnswerNumber < 1 || item.officialAnswerNumber > count) {
      throw new Error(`Invalid sekou-kenchiku2 ${source.year} No.${item.number}`);
    }
    const isLaw = item.number >= 43 || [10, 36, 37].includes(item.number);
    const questionNotice = isLaw ? "法令に関する解説は出題時点の法令に基づきます。" : undefined;
    return {
      id: `sekou-kenchiku2-${source.year}-${source.season}-gakka-q${item.number}`,
      exam: "sekou-kenchiku2", session: "gakka", year: source.year, season: source.season,
      examDate: source.examDate, qNumber: item.number, type: "multiple-choice",
      category: item.category, topicTags: [item.topic], difficulty: 2,
      question: item.question + (item.figureDescription ? `\n\n図の補足：${item.figureDescription}` : ""),
      choices: Object.fromEntries(item.choices.map((text, i) => [keys[i], text])),
      answer: keys[item.officialAnswerNumber - 1], officialAnswerNumber: String(item.officialAnswerNumber),
      explanation: item.explanation + (questionNotice ? `\n${questionNotice}` : ""),
      choiceExplanations: Object.fromEntries(item.choiceExplanations.map((text, i) => [keys[i], text])),
      explanationCoverage: "full", questionNotice,
      lawReferenceDate: isLaw ? source.examDate : undefined,
      hasImage: Boolean(item.imageUrl), imageUrls: item.imageUrl ? [item.imageUrl] : undefined,
      imageAltTexts: item.figureDescription ? [item.figureDescription] : undefined,
      sourcePdfUrl: source.questionUrl, sourceAnswerUrl: source.questionUrl,
      sourceAttribution: `出典：一般財団法人建設業振興基金 令和${source.year - 2018}年度（${source.season === "early" ? "前期" : "後期"}）2級建築施工管理技術検定 第一次検定 No.${item.number}（PDF ${item.pdfPage}ページ，正答 ${source.answerPdfPage}ページ）。ルビ・空白・改行を整理。数字選択肢はア〜オに対応。図選択肢の文字説明・図の補足および解説は本サイト作成。`,
      license: "FCIP-owner-authorized", lastUpdated: "2026-11-03",
      isCalculation: [3, 11].includes(item.number),
    };
  });
}
/** Staged originals: public registries and loaders must apply the catalog publication gate. */
export const SEKOU_KENCHIKU2_2026_QUESTIONS = convert(early as Source);
export const SEKOU_KENCHIKU2_2025_QUESTIONS = convert(late as Source);
export const SEKOU_KENCHIKU2_QUESTIONS: Question[] = [
  ...SEKOU_KENCHIKU2_2026_QUESTIONS, ...SEKOU_KENCHIKU2_2025_QUESTIONS,
];
