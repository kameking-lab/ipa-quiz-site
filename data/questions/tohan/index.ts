import type { ChoiceKey, Question, Season } from "@/lib/questions/types";
import source2025Kansai from "./2025-kansai.json";

const keys: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];

/** 手引き（厚生労働省「試験問題の作成に関する手引き」）の章順。category はこの5項目のいずれか。 */
export const TOHAN_CATEGORIES = [
  "医薬品に共通する特性と基本的な知識",
  "人体の働きと医薬品",
  "主な医薬品とその作用",
  "薬事に関する法規と制度",
  "医薬品の適正使用と安全対策",
] as const;

type TohanSourceItem = {
  number: number;
  pdfPart: "前半" | "後半";
  pdfPage: number;
  category: string;
  topic: string;
  officialAnswerNumber: number;
  question: string;
  choices: string[];
  explanation: string;
  choiceExplanations: string[];
  tebikiPages: number[];
};

type TohanSource = {
  year: number;
  season: Season;
  examDate: string;
  administrator: string;
  sourcePageUrl: string;
  termsUrl: string;
  questionUrls: Record<"前半" | "後半", string>;
  answerUrl: string;
  guideline: { title: string; url: string };
  questions: TohanSourceItem[];
};

function toQuestions(source: TohanSource): Question[] {
  const reiwa = source.year - 2018;
  return source.questions.map((item) => {
    const answer = keys[item.officialAnswerNumber - 1];
    if (
      !answer
      || item.choices.length !== 5
      || item.choiceExplanations.length !== 5
      || !(TOHAN_CATEGORIES as readonly string[]).includes(item.category)
    ) {
      throw new Error(`Invalid tohan ${source.year}-${source.season} source record 問${item.number}`);
    }

    return {
      id: `tohan-${source.year}-${source.season}-gakka-q${item.number}`,
      exam: "tohan",
      session: "gakka",
      year: source.year,
      season: source.season,
      qNumber: item.number,
      examDate: source.examDate,
      subject: item.category,
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
      hasImage: false,
      sourcePdfUrl: source.questionUrls[item.pdfPart],
      sourceAnswerUrl: source.answerUrl,
      sourceAttribution: `出典：関西広域連合「令和${reiwa}年度 登録販売者試験問題（${item.pdfPart}）」問${item.number}・「令和${reiwa}年度 登録販売者試験 解答」（${source.sourcePageUrl}）を加工して作成。ルビ・改行・表組みを整理し、選択肢は原本の番号(1)〜(5)で表示。解説は本サイト（過去問AI）が作成したもので、関西広域連合が作成・監修したものではない。`,
      officialReferenceUrls: [source.guideline.url, source.termsUrl],
      license: "KANSAI-UNION-CC-BY-compatible",
      lastUpdated: "2026-09-26",
    };
  });
}

/** 令和7年度（2025年8月23日実施）関西広域連合 登録販売者試験 全120問。 */
export const TOHAN_2025_KANSAI_QUESTIONS = toQuestions(source2025Kansai as TohanSource);
export const TOHAN_QUESTIONS: Question[] = [...TOHAN_2025_KANSAI_QUESTIONS];
