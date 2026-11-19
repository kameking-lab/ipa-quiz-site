import type { ChoiceKey, Question } from "@/lib/questions/types";

import source2026 from "./2026-annual.json";

import source2025 from "./2025-annual.json";

import source2021 from "./2021-annual.json";

import source2023 from "./2023-annual.json";

import source2024 from "./2024-annual.json";

import source2022 from "./2022-annual.json";


const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];

interface SourceQuestion {
  number: number;
  pdfPage: number;
  question: string;
  choices: string[];
  officialAnswerNumbers: number[];
  category: string;
  topic: string;
  explanation: string;
  choiceExplanations: string[];
  imageUrl?: string;
  figureDescription?: string;
  officialReferenceUrls: string[];
  isCalculation: boolean;
}

type Source = Omit<typeof source2026, "questions"> & {
  selectionGroups?: typeof source2021.selectionGroups;
  questions: (Omit<(typeof source2026.questions)[number], "imageUrl" | "figureDescription"> & {
    imageUrl?: string;
    figureDescription?: string;
  })[];
};


function convert(source: Source): Question[] {
  if (source.questions.length !== source.publishedCount ||
      source.questions.some((question, index) => question.number !== index + 1)) {
    throw new Error(`Invalid denki1 ${source.year} coverage`);
  }
  return source.questions.map((item) => {
    const count = item.choices.length;
    const official = item.officialAnswerNumbers;
    if (![4, 5].includes(count) || item.choiceExplanations.length !== count ||
        !official.length || new Set(official).size !== official.length ||
        official.some(number => !Number.isInteger(number) || number < 1 || number > count)) {
      throw new Error(`Invalid denki1 ${source.year} No.${item.number}`);
    }
    const answers = official.map(number => keys[number - 1]);
    const group = source.selectionGroups?.find(section => section.from <= item.number && item.number <= section.to);
    const questionNotice = group && `本試験（${group.part}）の問${group.from}〜${group.to}は、${group.select === group.to - group.from + 1 ? "全問解答" : `${group.select}問を選択して解答`}します。`;
    return {
      id: `denki1-${source.year}-annual-gakka-q${item.number}`,
      exam: "denki1", session: "gakka", year: source.year, season: "annual",
      examDate: source.examDate, qNumber: item.number, type: "multiple-choice",
      category: item.category, topicTags: [item.topic], difficulty: 2,
      question: item.question,
      questionNotice,
      choices: Object.fromEntries(item.choices.map((text, i) => [keys[i], text])),
      answer: answers.length === 1 ? answers[0] : answers, officialAnswerNumber: official.join("または"),
      explanation: item.explanation + `\n${source.lawNote}`,
      choiceExplanations: Object.fromEntries(item.choiceExplanations.map((text, i) => [keys[i], text])),
      explanationCoverage: "full",
      hasImage: Boolean(item.imageUrl), imageUrls: item.imageUrl ? [item.imageUrl] : undefined,
      imageAltTexts: item.figureDescription ? [item.figureDescription] : undefined,
      sourcePdfUrl: group ? `${source.questionUrl}#page=${item.pdfPage}` : source.questionUrl,
      sourceAnswerUrl: source.answerUrl,
      officialReferenceUrls: item.officialReferenceUrls,
      sourceAttribution: `出典：一般財団法人建設業振興基金 令和${source.year - 2018}年度 1級電気工事施工管理技術検定 第一次検定 No.${item.number}（問題PDF ${item.pdfPage}ページ、正答 ${source.answerPdfPage}ページ）。${source.transcriptionNote}数字選択肢1～5はア～オに対応。図の説明と解説は本サイト独自作成。`,
      license: "FCIP-owner-confirmed", lastUpdated: source.year === 2021 ? "2026-11-18" : "2026-11-04",
      isCalculation: item.isCalculation,
    } satisfies Question;
  });
}


export const DENKI1_2026_QUESTIONS = convert(source2026);

export const DENKI1_2025_QUESTIONS = convert(source2025);

export const DENKI1_2021_QUESTIONS = convert(source2021);

export const DENKI1_2023_QUESTIONS = convert(source2023);

export const DENKI1_2024_QUESTIONS = convert(source2024);

export const DENKI1_2022_QUESTIONS = convert(source2022);

export const DENKI1_QUESTIONS: Question[] = [...DENKI1_2026_QUESTIONS, ...DENKI1_2025_QUESTIONS, ...DENKI1_2021_QUESTIONS, ...DENKI1_2023_QUESTIONS, ...DENKI1_2024_QUESTIONS, ...DENKI1_2022_QUESTIONS];


export const DENKI1_2021_SECTIONS = source2021.sections;


export const DENKI1_2021_REQUIRED_ANSWERS = source2021.requiredAnswers;
