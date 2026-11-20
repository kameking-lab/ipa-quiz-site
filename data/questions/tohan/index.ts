import tokyo2025Am from "./2025-tokyo-am.json";

import tokyo2022Pm from "./2022-tokyo-pm.json";


import type { ChoiceKey, Question, Season } from "@/lib/questions/types";


import source2023Kansai from "./2023-kansai.json";


import source2023KansaiPm from "./2023-kansai-pm.json";


import source2022Kansai from "./2022-kansai.json";


import source2024Kansai from "./2024-kansai.json";


import source2025Kansai from "./2025-kansai.json";

import tokyo2024 from "./2024-tokyo-am.json";


import source2024TokyoPm from "./2024-tokyo-pm.json";

import source2026KansaiAm from "./2026-kansai-plan6.json";
import source2026Kansai from "./2026-kansai.json";
import tokyo2023Am from "./2023-tokyo-am.json";

import source2023Tokyo from "./2023-tokyo-plan6.json";

import source2026TokyoAm from "./2026-tokyo-am.json";

import source2022KansaiPm from "./2022-kansai-pm.json";


import source2022Tokyo from "./2022-tokyo-am.json";


import source2026Tokyo from "./2026-tokyo-pm.json";


import source2025TokyoPm from "./2025-tokyo-pm.json";

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
  officialAnswerNumber: number | null;
  officialScoringReason?: string;
  officialScoringUrl?: string;
  question: string;
  choices: string[];
  explanation: string;
  choiceExplanations: string[];
  tebikiPages: number[];
  imageUrls?: string[];
  imageAltTexts?: string[];
  officialReferenceUrls?: string[];
};

type TohanSource = {
  year: number;
  season: Season;
  examDate: string;
  administrator: string;
  sourcePageUrl: string;
  questionUrls: Partial<Record<"前半" | "後半", string>>;
  answerUrl: string;
  guideline: { title: string; url: string };
  questions: TohanSourceItem[];
};

function toQuestions(source: TohanSource): Question[] {
  const reiwa = source.year - 2018;
  return source.questions.map((item) => {
    const availableKeys = keys.slice(0, item.choices.length);
    const unscored = item.officialAnswerNumber === null && item.officialScoringReason && item.officialScoringUrl;
    const answer = item.officialAnswerNumber === null ? undefined : availableKeys[item.officialAnswerNumber - 1];
    const sourcePdfUrl = source.questionUrls[item.pdfPart];
    if (
      (!answer && !unscored) ||
      !sourcePdfUrl
      || ![4, 5].includes(item.choices.length)
      || item.choiceExplanations.length !== item.choices.length
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
      choices: Object.fromEntries(availableKeys.map((key, index) => [key, item.choices[index]])),
      answer: answer ?? [],
      officialAnswerNumber: item.officialAnswerNumber === null ? null : String(item.officialAnswerNumber),
      ...(unscored && item.officialScoringReason ? {
        officialScoring: { kind: "credit-for-all", reason: item.officialScoringReason },
      } : {}),
      explanation: item.explanation,
      choiceExplanations: Object.fromEntries(availableKeys.map((key, index) => [key, item.choiceExplanations[index]])),
      explanationCoverage: "full",
      hasImage: (item.imageUrls?.length ?? 0) > 0,
      ...(item.imageUrls ? { imageUrls: item.imageUrls, imageAltTexts: item.imageAltTexts } : {}),
      sourcePdfUrl: source.year === 2023 ? `${sourcePdfUrl}#page=${item.pdfPage}` : sourcePdfUrl,
      sourceAnswerUrl: source.answerUrl,
      sourceAttribution: `出典：関西広域連合 令和${reiwa}年度 登録販売者試験（${item.pdfPart}）問${item.number}。ルビ・改行・表組みを整理。解説は本サイト作成。`,
      officialReferenceUrls: item.officialReferenceUrls ?? [source.guideline.url, ...(item.officialScoringUrl ? [item.officialScoringUrl] : [])],
      license: "KANSAI-UNION-reuse",
      lastUpdated: source.year === 2023 ? "2026-11-18" : source.year === 2024 ? "2026-11-06" : "2026-09-26",
    };
  });
}

/** 令和7年度（2025年8月23日実施）関西広域連合 登録販売者試験 全120問。 */
export const TOHAN_2025_KANSAI_QUESTIONS = toQuestions(source2025Kansai as TohanSource);


/** 令和6年度（2024年8月31日実施）関西広域連合 登録販売者試験 全120問。 */
export const TOHAN_2024_KANSAI_QUESTIONS = toQuestions(source2024Kansai as TohanSource);


/** 令和5年度（2023年8月27日実施）関西広域連合 登録販売者試験 前半60問。 */
export const TOHAN_2023_KANSAI_QUESTIONS = toQuestions(source2023Kansai as TohanSource);


export const TOHAN_2023_KANSAI_PM_QUESTIONS = toQuestions(source2023KansaiPm as TohanSource);


/** 令和8年度 関西広域連合 登録販売者試験 後半（問61〜120）。 */
export const TOHAN_2026_KANSAI_QUESTIONS = toQuestions(source2026Kansai as TohanSource);

/** 令和4年度 関西広域連合 登録販売者試験 前半（問1〜60）。 */
export const TOHAN_2022_KANSAI_QUESTIONS = toQuestions(source2022Kansai as TohanSource);


export const TOHAN_QUESTIONS: Question[] = [
  ...TOHAN_2026_KANSAI_QUESTIONS,
  ...TOHAN_2025_KANSAI_QUESTIONS,
  ...(source2026Tokyo as Question[]),
  ...(source2022Tokyo as Question[]),
  ...TOHAN_2024_KANSAI_QUESTIONS,
  ...TOHAN_2023_KANSAI_QUESTIONS,
  ...TOHAN_2023_KANSAI_PM_QUESTIONS,
  ...(tokyo2024 as Question[]),
  ...(source2024TokyoPm as Question[]),
  ...(source2026KansaiAm as Question[]),
  ...(tokyo2023Am as Question[]),
  ...(source2023Tokyo as Question[]),
  ...TOHAN_2022_KANSAI_QUESTIONS,
  ...(source2026TokyoAm as Question[]),
  ...(source2022KansaiPm as Question[]),
  ...(tokyo2025Am as Question[]),
  ...(tokyo2022Pm as Question[]),
  ...(source2025TokyoPm as Question[]),
];
