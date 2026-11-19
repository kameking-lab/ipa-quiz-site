import type { ChoiceKey, Question } from "@/lib/questions/types";
import p231029am from "./reviewed/20231029-q01.json";
import p231029pm from "./reviewed/20231029-q02.json";
import p230528am from "./reviewed/20230528-q01.json";
import p230528pm from "./reviewed/20230528-q02.json";
import p221030am from "./reviewed/20221030-q01.json";
import p2401 from "./reviewed/20240526-q01-05.json";
import p2402 from "./reviewed/20240526-q06-10.json";
import p2403 from "./reviewed/20240526-q11-15.json";
import p2404 from "./reviewed/20240526-q16-20.json";
import p2405 from "./reviewed/20240526-q21-25.json";
import p2406 from "./reviewed/20240526-q26-30.json";
import p2407 from "./reviewed/20240526-q31-35.json";
import p2408 from "./reviewed/20240526-q36-40.json";
import p2409 from "./reviewed/20240526-q41-45.json";
import p2410 from "./reviewed/20240526-q46-50.json";
import p24s01 from "./reviewed/20241027-q01-05.json";
import p24s02 from "./reviewed/20241027-q06-10.json";
import p24s03 from "./reviewed/20241027-q11-15.json";
import p24s04 from "./reviewed/20241027-q16-20.json";
import p24s05 from "./reviewed/20241027-q21-25.json";
import p24s06 from "./reviewed/20241027-q26-30.json";
import p24s07 from "./reviewed/20241027-q31-35.json";
import p24s08 from "./reviewed/20241027-q36-40.json";
import p24s09 from "./reviewed/20241027-q41-45.json";
import p24s10 from "./reviewed/20241027-q46-50.json";
import p2501 from "./reviewed/20250525-q01-05.json";
import p2502 from "./reviewed/20250525-q06-10.json";
import p2503 from "./reviewed/20250525-q11-15.json";
import p2504 from "./reviewed/20250525-q16-20.json";
import p2505 from "./reviewed/20250525-q21-25.json";
import p2506 from "./reviewed/20250525-q26-30.json";
import p2507 from "./reviewed/20250525-q31-35.json";
import p2508 from "./reviewed/20250525-q36-40.json";
import p2509 from "./reviewed/20250525-q41-45.json";
import p2510 from "./reviewed/20250525-q46-50.json";
import p2521 from "./reviewed/20251026-q01-05.json";
import p2522 from "./reviewed/20251026-q06-10.json";
import p2523 from "./reviewed/20251026-q11-15.json";
import p2524 from "./reviewed/20251026-q16-20.json";
import p2525 from "./reviewed/20251026-q21-25.json";
import p2526 from "./reviewed/20251026-q26-30.json";
import p2527 from "./reviewed/20251026-q31-35.json";
import p2528 from "./reviewed/20251026-q36-40.json";
import p2529 from "./reviewed/20251026-q41-45.json";
import p2530 from "./reviewed/20251026-q46-50.json";

type OfficialChoice = "イ" | "ロ" | "ハ" | "ニ";
type Reviewed = {
  number: number;
  question: string;
  choices: Record<OfficialChoice, string>;
  officialAnswer: OfficialChoice;
  explanation: string;
  choiceExplanations: Record<OfficialChoice, string>;
  imageUrls?: string[];
  imageAltTexts?: string[];
  choiceImageUrls?: Partial<Record<OfficialChoice, string>>;
  sharedPassages?: NonNullable<Question["originalContent"]>["sharedPassages"];
  officialReferenceUrls?: string[];
  lawReferenceDate?: string;
};

const choiceMap: Record<OfficialChoice, ChoiceKey> = {
  イ: "ア", ロ: "イ", ハ: "ウ", ニ: "エ",
};

const papers: {
  date: string;
  year: number;
  season: "first" | "second";
  sitting?: "am" | "pm";
  batches: unknown[][];
}[] = [
  {
    date: "20231029", year: 2023, season: "second", sitting: "am",
    batches: [p231029am],
  },
  {
    date: "20231029", year: 2023, season: "second", sitting: "pm",
    batches: [p231029pm],
  },
  {
    date: "20230528", year: 2023, season: "first", sitting: "am",
    batches: [p230528am],
  },
  {
    date: "20230528", year: 2023, season: "first", sitting: "pm",
    batches: [p230528pm],
  },
  {
    date: "20221030", year: 2022, season: "second", sitting: "am",
    batches: [p221030am],
  },
  {
    date: "20240526", year: 2024, season: "first" as const,
    batches: [p2401, p2402, p2403, p2404, p2405, p2406, p2407, p2408, p2409, p2410],
  },
  {
    date: "20241027", year: 2024, season: "second" as const,
    batches: [p24s01, p24s02, p24s03, p24s04, p24s05, p24s06, p24s07, p24s08, p24s09, p24s10],
  },
  {
    date: "20250525", year: 2025, season: "first" as const,
    batches: [p2501, p2502, p2503, p2504, p2505, p2506, p2507, p2508, p2509, p2510],
  },
  {
    date: "20251026", year: 2025, season: "second" as const,
    batches: [p2521, p2522, p2523, p2524, p2525, p2526, p2527, p2528, p2529, p2530],
  },
];

function mapped<T>(values: Partial<Record<OfficialChoice, T>>): Partial<Record<ChoiceKey, T>> {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [choiceMap[key as OfficialChoice], value]),
  ) as Partial<Record<ChoiceKey, T>>;
}

function categoryFor(number: number): string {
  if (number <= 10) return "電気理論・配電";
  if (number <= 20) return "電気機器・材料・工具";
  if (number <= 30) return "施工・法規・検査";
  return "配線図";
}

export const DENKO2_REVIEWED_QUESTIONS: Question[] = papers.flatMap((paper) =>
  paper.batches.flatMap((batch) => (batch as Reviewed[]).map((item): Question => ({
    id: `denko2-${paper.year}-${paper.season}-${paper.sitting === "pm" ? "pm" : "gakka"}-q${item.number}`,
    exam: "denko2",
    session: paper.sitting === "pm" ? "pm" : "gakka",
    year: paper.year,
    season: paper.season,
    qNumber: item.number,
    type: "multiple-choice",
    category: categoryFor(item.number),
    topicTags: [categoryFor(item.number)],
    difficulty: 2,
    question: item.question,
    originalContent: item.sharedPassages ? { body: item.question, sharedPassages: item.sharedPassages } : undefined,
    choices: mapped(item.choices),
    answer: choiceMap[item.officialAnswer],
    explanation: item.explanation,
    choiceExplanations: mapped(item.choiceExplanations),
    imageUrls: item.imageUrls,
    imageAltTexts: item.imageAltTexts,
    choiceImageUrls: item.choiceImageUrls ? mapped(item.choiceImageUrls) : undefined,
    hasImage: Boolean(item.imageUrls?.length || Object.keys(item.choiceImageUrls ?? {}).length),
    sourcePdfUrl: `https://www.shiken.or.jp/construction/upload/${paper.date}_co_second_q${paper.sitting === "pm" ? "02" : "01"}.pdf`,
    sourceAnswerUrl: `https://www.shiken.or.jp/construction/upload/${paper.date}_co_second_a${paper.sitting === "pm" ? "02" : "01"}.pdf`,
    sourceExamSession: paper.sitting === "am" ? "午前" : paper.sitting === "pm" ? "午後" : undefined,
    sourceAttribution: `出典：令和${paper.year - 2018}年度${paper.season === "first" ? "上期" : "下期"}第二種電気工事士${paper.year <= 2022 ? "筆記" : "学科"}試験${paper.sitting === "am" ? "【午前】" : paper.sitting === "pm" ? "【午後】" : ""} 問${item.number}（電気技術者試験センター）。原本のイ・ロ・ハ・ニをア・イ・ウ・エに置換。`,
    officialReferenceUrls: item.officialReferenceUrls,
    lawReferenceDate: item.lawReferenceDate,
    license: "ECEE-educational-reuse",
    needsReview: false,
    lastUpdated: paper.sitting ? "2026-11-19" : "2026-09-23",
  }))),
);
