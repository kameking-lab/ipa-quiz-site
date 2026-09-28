import type { ChoiceKey, Question } from "@/lib/questions/types";
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

/**
 * 第一種電気工事士学科。2026年上期出題例と2025年下期の各50問。
 * 2025年下期の原本・全肢査読・図版は
 * docs/evidence/denko1-2025-lower-hold に固定されている。
 */
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
  isCalculation?: boolean;
};

const choiceMap: Record<OfficialChoice, ChoiceKey> = { イ: "ア", ロ: "イ", ハ: "ウ", ニ: "エ" };
const paper = {
  date: "20260401",
  year: 2026,
  season: "first" as const,
  title: "令和8年度第一種電気工事士上期学科試験（出題例）",
  batches: [p01, p02, p03, p04, p05, p06, p07, p08, p09, p10],
};
const secondPaper = {
  date: "20251005",
  year: 2025,
  season: "second" as const,
  title: "令和7年度下期第一種電気工事士学科試験",
  batches: [s01, s02, s03, s04, s05],
};

function mapped<T>(values: Partial<Record<OfficialChoice, T>>): Partial<Record<ChoiceKey, T>> {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [choiceMap[key as OfficialChoice], value]),
  ) as Partial<Record<ChoiceKey, T>>;
}

function categoryFor(number: number): string {
  if (number <= 10) return "電気理論・配電";
  if (number <= 20) return "電気機器・発変電";
  if (number <= 29) return "高圧設備・材料・施工";
  if (number <= 40) return "設備図・検査・法令";
  return "配線図(単線結線図)";
}

function attribution(item: Reviewed, title: string): string {
  const figure = item.imageUrls?.length || item.choiceImageUrls
    ? "図・写真は問題PDFから該当部分を切り出し、選択肢の図からは記号の文字を除いた。"
    : "";
  return `出典：${title}問${item.number}（電気技術者試験センター）。改行・空白と表記を整え、元のイ・ロ・ハ・ニをア・イ・ウ・エに置換。図のみの選択肢は識別用説明を追加。${figure}`;
}

export const DENKO1_QUESTIONS: Question[] = [paper, secondPaper].flatMap((edition) => edition.batches.flatMap((batch) =>
  (batch as Reviewed[]).map((item): Question => ({
    id: `denko1-${edition.year}-${edition.season}-gakka-q${item.number}`,
    exam: "denko1",
    session: "gakka",
    year: edition.year,
    season: edition.season,
    qNumber: item.number,
    examDate: `${edition.date.slice(0, 4)}-${edition.date.slice(4, 6)}-${edition.date.slice(6, 8)}`,
    type: "multiple-choice",
    category: categoryFor(item.number),
    topicTags: [categoryFor(item.number)],
    difficulty: 2,
    question: item.question,
    choices: mapped(item.choices),
    answer: choiceMap[item.officialAnswer],
    explanation: item.explanation,
    choiceExplanations: mapped(item.choiceExplanations),
    explanationCoverage: "full",
    imageUrls: item.imageUrls,
    choiceImageUrls: item.choiceImageUrls ? mapped(item.choiceImageUrls) : undefined,
    hasImage: Boolean(item.imageUrls?.length || Object.keys(item.choiceImageUrls ?? {}).length),
    isCalculation: item.isCalculation,
    sourcePdfUrl: `https://www.shiken.or.jp/construction/upload/${edition.date}_co_first_q01.pdf`,
    sourceAnswerUrl: `https://www.shiken.or.jp/construction/upload/${edition.date}_co_first_a01.pdf`,
    sourceAttribution: attribution(item, edition.title),
    officialReferenceUrls: item.officialReferenceUrls,
    lawReferenceDate: item.lawReferenceDate,
    license: "ECEE-educational-reuse",
    needsReview: false,
    lastUpdated: edition.year === 2025 ? "2026-09-28" : "2026-09-26",
  })),
));
