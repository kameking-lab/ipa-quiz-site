import type { ChoiceKey, Question, Season } from "@/lib/questions/types";
import source2025 from "./2025-october-batch-06-10.json";
import source2025b from "./2025-october-batch-11-16.json";
import source2026 from "./2026-early.json";

const keys: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ"];

type Civil2SourceItem = {
  number: number;
  pdfPage: number;
  category: string;
  topic: string;
  officialAnswerNumber: number;
  question: string;
  choices: string[];
  explanation: string;
  choiceExplanations: string[];
  imageUrl?: string;
  officialReferenceUrls?: string[];
};

type Civil2Source = {
  year: number;
  season: Season;
  questionUrl: string;
  answerUrl: string;
  questions: Civil2SourceItem[];
};

function toQuestions(source: Civil2Source): Question[] {
  return source.questions.map((item) => {
    const answer = keys[item.officialAnswerNumber - 1];
    if (!answer || item.choices.length !== 4 || item.choiceExplanations.length !== 4) {
      throw new Error(`Invalid civil2 ${source.year}-${source.season} source record No.${item.number}`);
    }

    const edition = source.year === 2026
      ? "令和8年度2級土木施工管理技術検定 第一次検定（前期・土木）"
      : "令和7年度2級土木施工管理技術検定 第一次検定（10月実施・土木）";

    return {
      id: `civil2-${source.year}-${source.season}-gakka-q${item.number}`,
      exam: "civil2",
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
      officialAnswerNumber: String(item.officialAnswerNumber),
      explanation: item.explanation,
      choiceExplanations: Object.fromEntries(keys.map((key, index) => [key, item.choiceExplanations[index]])),
      explanationCoverage: "full",
      hasImage: Boolean(item.imageUrl),
      imageUrls: item.imageUrl ? [item.imageUrl] : undefined,
      sourcePdfUrl: source.questionUrl,
      sourceAnswerUrl: source.answerUrl,
      sourceAttribution: `出典：一般財団法人全国建設研修センター ${edition}No.${item.number}。ルビ・改行・空白を整理し、原本の数字選択肢をア・イ・ウ・エに変換。解説は本サイト作成。`,
      officialReferenceUrls: item.officialReferenceUrls ?? [],
      license: "JCTC-authorized-reuse",
      lastUpdated: "2026-09-26",
    };
  });
}

/** 令和8年度前期は全66問、令和7年度10月実施は照合済みNo.6〜16を公開。 */
export const CIVIL2_2026_QUESTIONS = toQuestions(source2026 as Civil2Source);
export const CIVIL2_2025_QUESTIONS = [
  ...toQuestions(source2025 as Civil2Source),
  ...toQuestions(source2025b as Civil2Source),
];
export const CIVIL2_QUESTIONS: Question[] = [...CIVIL2_2026_QUESTIONS, ...CIVIL2_2025_QUESTIONS];
