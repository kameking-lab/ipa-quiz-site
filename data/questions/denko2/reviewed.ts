import type { ChoiceKey, Question } from "@/lib/questions/types";
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

type OfficialChoice = "イ" | "ロ" | "ハ" | "ニ";
type Reviewed = {
  number: number;
  question: string;
  choices: Record<OfficialChoice, string>;
  officialAnswer: OfficialChoice;
  explanation: string;
  choiceExplanations: Record<OfficialChoice, string>;
  imageUrls?: string[];
  choiceImageUrls?: Partial<Record<OfficialChoice, string>>;
  officialReferenceUrls?: string[];
  lawReferenceDate?: string;
};

const choiceMap: Record<OfficialChoice, ChoiceKey> = {
  イ: "ア", ロ: "イ", ハ: "ウ", ニ: "エ",
};

const papers = [
  {
    date: "20240526", year: 2024, season: "first" as const,
    batches: [p2401, p2402, p2403, p2404, p2405, p2406, p2407, p2408, p2409, p2410],
  },
  {
    date: "20250525", year: 2025, season: "first" as const,
    batches: [p2501, p2502, p2503, p2504, p2505, p2506, p2507, p2508, p2509, p2510],
  },
  {
    date: "20251026", year: 2025, season: "second" as const,
    batches: [p2521, p2522, p2523, p2524],
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
    id: `denko2-${paper.year}-${paper.season}-gakka-q${item.number}`,
    exam: "denko2",
    session: "gakka",
    year: paper.year,
    season: paper.season,
    qNumber: item.number,
    type: "multiple-choice",
    category: categoryFor(item.number),
    topicTags: [categoryFor(item.number)],
    difficulty: 2,
    question: item.question,
    choices: mapped(item.choices),
    answer: choiceMap[item.officialAnswer],
    explanation: item.explanation,
    choiceExplanations: mapped(item.choiceExplanations),
    imageUrls: item.imageUrls,
    choiceImageUrls: item.choiceImageUrls ? mapped(item.choiceImageUrls) : undefined,
    hasImage: Boolean(item.imageUrls?.length || Object.keys(item.choiceImageUrls ?? {}).length),
    sourcePdfUrl: `https://www.shiken.or.jp/construction/upload/${paper.date}_co_second_q01.pdf`,
    sourceAnswerUrl: `https://www.shiken.or.jp/construction/upload/${paper.date}_co_second_a01.pdf`,
    sourceAttribution: `出典：令和${paper.year - 2018}年度${paper.season === "first" ? "上期" : "下期"}第二種電気工事士学科試験 問${item.number}（電気技術者試験センター）。原本のイ・ロ・ハ・ニをア・イ・ウ・エに置換。`,
    officialReferenceUrls: item.officialReferenceUrls,
    lawReferenceDate: item.lawReferenceDate,
    license: "ECEE-educational-reuse",
    needsReview: false,
    lastUpdated: "2026-09-23",
  }))),
);
