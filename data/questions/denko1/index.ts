import plan7181 from "./official-2018-annual-gakka.json";

import official2017AnnualGakka from "./official-2017-annual-gakka.json";
import official2016AnnualGakka from "./official-2016-annual-gakka.json";


import type { ChoiceKey, Question, Season } from "@/lib/questions/types";


import p01 from "./reviewed/20260401-q01-05.json";


import p02 from "./reviewed/20260401-q06-10.json";


import p03 from "./reviewed/20260401-q11-15.json";


import p04 from "./reviewed/20260401-q16-20.json";


import p05 from "./reviewed/20260401-q21-25.json";


import p06 from "./reviewed/20260401-q26-30.json";


import p07 from "./reviewed/20260401-q31-35.json";


import p08 from "./reviewed/20260401-q36-40.json";


import p09 from "./reviewed/20260401-q41-45.json";


import p10 from "./reviewed/20260401-q46-50.json";


import s01 from "./reviewed/20251005-q01-10.json";


import s02 from "./reviewed/20251005-q11-20.json";


import s03 from "./reviewed/20251005-q21-30.json";


import s04 from "./reviewed/20251005-q31-40.json";


import s05 from "./reviewed/20251005-q41-50.json";


import afternoon2023 from "./reviewed/20231001-pm.json";


import morning2022 from "./reviewed/20221002-am.json";

import lower2026 from "./reviewed/20261004-q01-50.json";


import upper2025 from "./reviewed/20250401-q01-50.json";

import lower2024 from "./reviewed/20241006.json";

import morning2023 from "./reviewed/20231001-am.json";


import afternoon2022 from "./reviewed/20221002-pm.json";

import examples2024 from "./reviewed/20240401-q01-50.json";


import official2020AnnualGakka from "./official-2020-annual-gakka.json";

/**
 * 第一種電気工事士学科。2026年上期出題例、2025年下期、2023年度午後の各50問。
 * 2025年下期の原本・全肢査読・図版は
 * docs/evidence/denko1-2025-lower-hold に固定されている。
 */
type OfficialChoice = "イ" | "ロ" | "ハ" | "ニ";


type Reviewed = {
  number: number;
  pdfPage?: number;
  question: string;
  choices: Record<OfficialChoice, string>;
  officialAnswer: OfficialChoice;
  explanation: string;
  choiceExplanations: Record<OfficialChoice, string>;
  imageUrls?: string[];
  imageAltTexts?: string[];
  choiceImageUrls?: Partial<Record<OfficialChoice, string>>;
  officialReferenceUrls?: string[];
  lawReferenceDate?: string;
  isCalculation?: boolean;
};

const choiceMap: Record<OfficialChoice, ChoiceKey> = { イ: "ア", ロ: "イ", ハ: "ウ", ニ: "エ" };


const papers: {
  date: string;
  year: number;
  season: Season;
  session: "gakka" | "am" | "pm";
  booklet: "01" | "02";
  title: string;
  lastUpdated: string;
  batches: Reviewed[][];
}[] = [
  {
    date: "20260401",
    year: 2026,
    season: "first",
    session: "gakka",
    booklet: "01",
    title: "令和8年度第一種電気工事士上期学科試験（出題例）",
    lastUpdated: "2026-09-26",
    batches: [p01, p02, p03, p04, p05, p06, p07, p08, p09, p10] as Reviewed[][],
  },
  {
    date: "20251005",
    year: 2025,
    season: "second",
    session: "gakka",
    booklet: "01",
    title: "令和7年度下期第一種電気工事士学科試験",
    lastUpdated: "2026-09-28",
    batches: [s01, s02, s03, s04, s05] as Reviewed[][],
  },
  {
    date: "20231001",
    year: 2023,
    season: "annual",
    session: "pm",
    booklet: "02",
    title: "令和5年度第一種電気工事士学科試験【午後】",
    lastUpdated: "2026-11-18",
    batches: [afternoon2023 as Reviewed[]],
  },
  { date: "20221002", year: 2022, season: "annual", session: "am", booklet: "01", title: "令和4年度第一種電気工事士筆記試験【午前】", lastUpdated: "2026-11-18", batches: [morning2022 as Reviewed[]] },
  { date: "20221002", year: 2022, season: "annual", session: "pm", booklet: "02", title: "令和4年度第一種電気工事士筆記試験【午後】", lastUpdated: "2026-11-18", batches: [afternoon2022 as Reviewed[]] },
  { date: "20231001", year: 2023, season: "annual", session: "am", booklet: "01", title: "令和5年度第一種電気工事士学科試験【午前】", lastUpdated: "2026-11-18", batches: [morning2023 as Reviewed[]] },
  { date: "20240401", year: 2024, season: "first", session: "gakka", booklet: "01", title: "令和6年度第一種電気工事士上期学科試験（出題例）", lastUpdated: "2026-11-18", batches: [examples2024 as Reviewed[]] },
  { date: "20241006", year: 2024, season: "second", session: "gakka", booklet: "01", title: "令和6年度第一種電気工事士下期学科試験", lastUpdated: "2026-11-18", batches: [lower2024 as Reviewed[]] },
  { date: "20250401", year: 2025, season: "first", session: "gakka", booklet: "01", title: "令和7年度第一種電気工事士上期学科試験（出題例）", lastUpdated: "2026-11-18", batches: [upper2025 as Reviewed[]] },
  { date: "20261004", year: 2026, season: "second", session: "gakka", booklet: "01", title: "令和8年度第一種電気工事士下期学科試験", lastUpdated: "2026-11-18", batches: [lower2026 as Reviewed[]] },
];









function mapped<T>(values: Partial<Record<OfficialChoice, T>>): Partial<Record<ChoiceKey, T>> {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [choiceMap[key as OfficialChoice], value]),
  ) as Partial<Record<ChoiceKey, T>>;
}

function categoryFor(number: number, session: "gakka" | "am" | "pm"): string {
  if (number <= 10) return "電気理論・配電";
  if (number <= 20) return "電気機器・発変電";
  if (number <= 29) return "高圧設備・材料・施工";
  if (number <= 40) return "設備図・検査・法令";
  if (session !== "gakka" && number <= 45) return "配線図(制御回路)";
  return "配線図(単線結線図)";
}

function attribution(item: Reviewed, title: string): string {
  const figure = item.imageUrls?.length || item.choiceImageUrls
    ? "図・写真は問題PDFから該当部分を切り出し、選択肢の図からは記号の文字を除いた。"
    : "";
  return `出典：${title}問${item.number}（電気技術者試験センター）。改行・空白と表記を整え、元のイ・ロ・ハ・ニをア・イ・ウ・エに置換。図のみの選択肢は識別用説明を追加。${figure}`;
}

const reviewedQuestions: Question[] = papers.flatMap((edition) => edition.batches.flatMap((batch) =>
  batch.map((item): Question => ({
    id: `denko1-${edition.year}-${edition.season}-${edition.session}-q${item.number}`,
    exam: "denko1",
    session: edition.session,
    year: edition.year,
    season: edition.season,
    qNumber: item.number,
    examDate: edition.title.includes("出題例") && edition.year !== 2026 ? undefined : [edition.date.slice(0, 4), edition.date.slice(4, 6), edition.date.slice(6, 8)].join("-"),
    type: "multiple-choice",
    category: categoryFor(item.number, edition.session),
    topicTags: [categoryFor(item.number, edition.session)],
    difficulty: 2,
    question: item.question,
    choices: mapped(item.choices),
    answer: choiceMap[item.officialAnswer],
    explanation: item.explanation,
    choiceExplanations: mapped(item.choiceExplanations),
    explanationCoverage: "full",
    imageUrls: item.imageUrls,
    imageAltTexts: item.imageAltTexts,
    choiceImageUrls: item.choiceImageUrls ? mapped(item.choiceImageUrls) : undefined,
    hasImage: Boolean(item.imageUrls?.length || Object.keys(item.choiceImageUrls ?? {}).length),
    isCalculation: item.isCalculation,
    sourcePdfUrl: `https://www.shiken.or.jp/construction/upload/${edition.date}_co_first_q${edition.booklet}.pdf`,
    sourceAnswerUrl: `https://www.shiken.or.jp/construction/upload/${edition.date}_co_first_a${edition.booklet}.pdf`,
    sourceAttribution: edition.session === "gakka"
      ? attribution(item, edition.title)
      : `出典：${edition.title} 問${item.number}（電気技術者試験センター）`,
    officialReferenceUrls: item.officialReferenceUrls,
    lawReferenceDate: item.lawReferenceDate,
    license: "ECEE-educational-reuse",
    needsReview: false,
    lastUpdated: edition.lastUpdated,
  })),
));

export const DENKO1_QUESTIONS: Question[] = [
  ...reviewedQuestions, ...plan7181 as Question[], ...official2017AnnualGakka as Question[],
  ...official2016AnnualGakka as Question[], ...official2020AnnualGakka as Question[],
];
