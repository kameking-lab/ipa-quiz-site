import type { ChoiceKey, Question, Season } from "@/lib/questions/types";
import source2025 from "./2025-late.json";
import source2026 from "./2026-early.json";

const keys: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ"];

type Kankoji2SourceItem = {
  number: number;
  pdfPage: number;
  category: string;
  topic: string;
  /** 公式正答肢（1〜4）。requiredSelections=2 なら二肢とも選んで正解。1なら訂正で追加された正答を含む。 */
  officialAnswerNumbers: number[];
  requiredSelections: number;
  officialCorrectionNote?: string;
  question: string;
  choices: string[];
  explanation: string;
  choiceExplanations: string[];
  imageUrl?: string;
  officialReferenceUrls?: string[];
};

type Kankoji2Source = {
  year: number;
  season: Season;
  edition: string;
  questionUrl: string;
  answerUrl: string;
  questions: Kankoji2SourceItem[];
};

function toQuestions(source: Kankoji2Source): Question[] {
  return source.questions.map((item) => {
    const answerKeys = item.officialAnswerNumbers.map((n) => keys[n - 1]);
    if (
      answerKeys.length === 0 ||
      answerKeys.some((key) => !key) ||
      item.choices.length !== 4 ||
      item.choiceExplanations.length !== 4 ||
      (item.requiredSelections > 1 && item.requiredSelections !== answerKeys.length)
    ) {
      throw new Error(`Invalid kankoji2 ${source.year}-${source.season} source record No.${item.number}`);
    }
    const answer = answerKeys.length === 1 ? answerKeys[0]! : (answerKeys as ChoiceKey[]);
    // 訂正の経緯は査読済み解説本文に含まれる（officialCorrectionNote は台帳用）。
    const explanation = item.explanation;

    return {
      id: `kankoji2-${source.year}-${source.season}-gakka-q${item.number}`,
      exam: "kankoji2",
      session: "gakka",
      year: source.year,
      season: source.season,
      qNumber: item.number,
      type: "multiple-choice",
      category: item.category,
      topicTags: [item.topic],
      difficulty: 2,
      question: item.question,
      choices: Object.fromEntries(keys.map((key, index) => [key, item.choices[index]])),
      answer,
      ...(item.requiredSelections > 1 ? { requiredSelections: item.requiredSelections } : {}),
      officialAnswerNumber: item.officialAnswerNumbers.join("・"),
      explanation,
      choiceExplanations: Object.fromEntries(keys.map((key, index) => [key, item.choiceExplanations[index]])),
      explanationCoverage: "full",
      hasImage: Boolean(item.imageUrl),
      imageUrls: item.imageUrl ? [item.imageUrl] : undefined,
      sourcePdfUrl: source.questionUrl,
      sourceAnswerUrl: source.answerUrl,
      sourceAttribution: `出典：一般財団法人全国建設研修センター ${source.edition} No.${item.number}。ルビ・改行・空白を整理し、原本の数字選択肢をア・イ・ウ・エに変換。解説は本サイト作成。`,
      officialReferenceUrls: item.officialReferenceUrls ?? [],
      license: "JCTC-authorized-reuse",
      lastUpdated: "2026-09-26",
    };
  });
}

/** 令和8年度前期・令和7年度後期の第一次検定とも全52問を公開。 */
export const KANKOJI2_2026_QUESTIONS = toQuestions(source2026 as Kankoji2Source);
export const KANKOJI2_2025_QUESTIONS = toQuestions(source2025 as Kankoji2Source);
export const KANKOJI2_QUESTIONS: Question[] = [...KANKOJI2_2026_QUESTIONS, ...KANKOJI2_2025_QUESTIONS];
