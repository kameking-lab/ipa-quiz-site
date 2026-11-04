import type { ChoiceKey, Question } from "@/lib/questions/types";
import source2026 from "./2026-annual.json";
import source2025 from "./2025-annual.json";

const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];
type Source = typeof source2026;

function convert(source: Source): Question[] {
  if (source.questions.length !== 89 || new Set(source.questions.map(q => q.number)).size !== 89) {
    throw new Error(`Invalid denki1 ${source.year} coverage`);
  }
  return source.questions.map((item) => {
    const count = item.number >= 55 && item.number <= 60 ? 5 : 4;
    const official = item.officialAnswerNumbers;
    if (item.choices.length !== count || item.choiceExplanations.length !== count ||
        official.length !== 1 || !Number.isInteger(official[0]) || official[0] < 1 || official[0] > count) {
      throw new Error(`Invalid denki1 ${source.year} No.${item.number}`);
    }
    const figure = item as typeof item & { imageUrl?: string; figureDescription?: string };
    return {
      id: `denki1-${source.year}-annual-gakka-q${item.number}`,
      exam: "denki1", session: "gakka", year: source.year, season: "annual",
      examDate: source.examDate, qNumber: item.number, type: "multiple-choice",
      category: item.category, topicTags: [item.topic], difficulty: 2,
      question: item.question,
      choices: Object.fromEntries(item.choices.map((text, i) => [keys[i], text])),
      answer: keys[official[0] - 1], officialAnswerNumber: String(official[0]),
      explanation: item.explanation + `\n${source.lawNote}`,
      choiceExplanations: Object.fromEntries(item.choiceExplanations.map((text, i) => [keys[i], text])),
      explanationCoverage: "full",
      hasImage: Boolean(figure.imageUrl), imageUrls: figure.imageUrl ? [figure.imageUrl] : undefined,
      imageAltTexts: figure.figureDescription ? [figure.figureDescription] : undefined,
      sourcePdfUrl: source.questionUrl, sourceAnswerUrl: source.answerUrl,
      officialReferenceUrls: item.officialReferenceUrls,
      sourceAttribution: `出典：一般財団法人建設業振興基金 令和${source.year - 2018}年度 1級電気工事施工管理技術検定 第一次検定 No.${item.number}（問題PDF ${item.pdfPage}ページ、正答 ${source.answerPdfPage}ページ）。${source.transcriptionNote}数字選択肢1～5はア～オに対応。図の説明と解説は本サイト独自作成。`,
      license: "FCIP-owner-confirmed", lastUpdated: "2026-11-04", isCalculation: item.isCalculation,
    } satisfies Question;
  });
}

/** Unpublished originals. All public consumers must use the catalog publication gate. */
export const DENKI1_2026_QUESTIONS = convert(source2026);
export const DENKI1_2025_QUESTIONS = convert(source2025 as Source);
export const DENKI1_QUESTIONS: Question[] = [...DENKI1_2026_QUESTIONS, ...DENKI1_2025_QUESTIONS];
