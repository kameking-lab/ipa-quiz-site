import type { ChoiceKey, Question, Season } from "@/lib/questions/types";

import early from "./2026-early.json";

import late from "./2025-late.json";

import late2022 from "./2022-late.json";

import early2021 from "./2021-early.json";


import late2021 from "./2021-late.json";

import late2026 from "./2026-late.json";


import early2025 from "./2025-early.json";

import early2024 from "./2024-early.json";


import late2024 from "./2024-late.json";

import early2023 from "./2023-early.json";


import late2023 from "./2023-late.json";

import early2022 from "./2022-early.json";


const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];

type Source = {
  year: number;
  season: Season;
  examDate: string;
  questionUrl: string;
  answerPdfPage: number;
  additionalLawQuestions?: number[];
  lawQuestionNumbers?: number[];
  lastUpdated?: string;
  checkedAt?: string;
  questions: {
    number: number;
    pdfPage: number;
    question: string;
    choices: string[];
    officialAnswerNumber: number | number[];
    category: string;
    topic: string;
    explanation: string;
    choiceExplanations: string[];
    imageUrl?: string;
    figureDescription?: string;
    isLaw?: boolean;
    isCalculation?: boolean;
  }[];
};

function convert(source: Source, lawReferenceDate?: string): Question[] {
  return source.questions.map((item) => {
    const count = item.choices.length;
    const answerNumbers = Array.isArray(item.officialAnswerNumber) ? item.officialAnswerNumber : [item.officialAnswerNumber];
    const requiredSelections = answerNumbers.length;
    if (![4, 5].includes(count) || item.choiceExplanations.length !== count || !requiredSelections ||
        answerNumbers.length !== requiredSelections || new Set(answerNumbers).size !== requiredSelections ||
        answerNumbers.some((answer) => !Number.isInteger(answer) || answer < 1 || answer > count)) {
      throw new Error(`Invalid sekou-kenchiku2 ${source.year} No.${item.number}`);
    }
    const answers = answerNumbers.map((answer) => keys[answer - 1]);
    const isLaw = item.number >= 43 || (source.year === 2021
      ? [8, 38].includes(item.number)
      : [36, 37].includes(item.number) || (source.year === 2026 && item.number === 10));
    const questionNotice = isLaw ? "法令に関する解説は出題時点の法令に基づきます。" : undefined;
    return {
      id: `sekou-kenchiku2-${source.year}-${source.season}-gakka-q${item.number}`,
      exam: "sekou-kenchiku2", session: "gakka", year: source.year, season: source.season,
      examDate: source.examDate, qNumber: item.number, type: "multiple-choice",
      category: item.category, topicTags: [item.topic], difficulty: 2,
      question: item.question + (item.figureDescription ? `\n\n図の補足：${item.figureDescription}` : ""),
      choices: Object.fromEntries(item.choices.map((text, i) => [keys[i], text])),
      answer: requiredSelections === 1 ? answers[0] : answers,
      officialAnswerNumber: answerNumbers.join(","),
      ...(requiredSelections > 1 ? { requiredSelections } : {}),
      explanation: item.explanation + (questionNotice ? `\n${questionNotice}` : ""),
      choiceExplanations: Object.fromEntries(item.choiceExplanations.map((text, i) => [keys[i], text])),
      explanationCoverage: "full", questionNotice,
      lawReferenceDate: isLaw ? lawReferenceDate : undefined,
      hasImage: Boolean(item.imageUrl), imageUrls: item.imageUrl ? [item.imageUrl] : undefined,
      imageAltTexts: item.figureDescription ? [item.figureDescription] : undefined,
      sourcePdfUrl: source.questionUrl, sourceAnswerUrl: source.questionUrl,
      sourceAttribution: `出典：一般財団法人建設業振興基金 令和${source.year - 2018}年度（${source.season === "early" ? "前期" : "後期"}）2級建築施工管理技術検定 第一次検定 No.${item.number}（PDF ${item.pdfPage}ページ，正答 ${source.answerPdfPage}ページ）。ルビ・空白・改行を整理。数字選択肢はア〜オに対応。図選択肢の文字説明・図の補足および解説は本サイト作成。`,
      license: "FCIP-owner-authorized", lastUpdated: source.lastUpdated ?? "2026-11-03",
      isCalculation: (source.year === 2021 ? [9, 10] : [3, 11]).includes(item.number),
    };
  });
}

/** Staged originals: public registries and loaders must apply the catalog publication gate. */
// Official examination guides, PDF p5: r08_2KGz_tebiki.pdf / r07_2K_1jik_tebiki.pdf.
export const SEKOU_KENCHIKU2_2026_QUESTIONS = convert(early as Source, "2026-01-01");

export const SEKOU_KENCHIKU2_2025_QUESTIONS = convert(late as Source, "2025-01-01");

export const SEKOU_KENCHIKU2_2024_EARLY_QUESTIONS = convert(early2024 as Source, "2024-01-01");

export const SEKOU_KENCHIKU2_QUESTIONS: Question[] = [
  ...convert(late2026 as Source, "2026-01-01"),
  ...SEKOU_KENCHIKU2_2026_QUESTIONS,
  ...SEKOU_KENCHIKU2_2025_QUESTIONS,
  ...late2022 as Question[],
  ...(early2021 as Question[]),
  ...convert(late2021 as Source),
  ...convert(early2025 as Source, "2025-01-01"),
  ...SEKOU_KENCHIKU2_2024_EARLY_QUESTIONS,
  ...convert(late2024 as Source, "2024-01-01"),
  ...(early2023 as Question[]),
  ...convert(late2023 as Source),
  ...early2022 as Question[],
];
