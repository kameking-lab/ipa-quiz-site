import type { ChoiceKey, Question } from "@/lib/questions/types";
import candidate from "./drafts/20260524.json";

type OfficialChoice = "イ" | "ロ" | "ハ" | "ニ";
type Candidate = {
  number: number;
  question: string;
  choices: Record<OfficialChoice, string>;
  officialAnswer: OfficialChoice;
  explanation: string;
  choiceExplanations: Record<OfficialChoice, string>;
  nativeExplanation: string;
  nativeChoiceExplanations: Record<OfficialChoice, string>;
  imageUrls?: string[];
  choiceImageUrls?: Partial<Record<OfficialChoice, string>>;
  draftFigurePaths?: string[];
  draftChoiceFigurePaths?: Partial<Record<OfficialChoice, string>>;
  officialReferenceUrls?: string[];
  isCalculation?: boolean;
  needsReview: boolean;
  diagramDescription?: string;
};
const choiceMap: Record<OfficialChoice, ChoiceKey> = { イ: "ア", ロ: "イ", ハ: "ウ", ニ: "エ" };
function mapped<T>(values: Partial<Record<OfficialChoice, T>>): Partial<Record<ChoiceKey, T>> {
  return Object.fromEntries(Object.entries(values).map(([key, value]) => [choiceMap[key as OfficialChoice], value]));
}
const imagePath = (path: string): string => path.startsWith("docs/evidence/denko2-20260524/figures/")
  ? `/images/denko2/2026-first/${path.split("/").at(-1)}` : path;

/** Native schema adapter for the complete source-checked 2026 sitting. */
export function createDenko22026Questions(pilot: Question[]): Question[] {
  return (candidate as Candidate[]).map((q): Question => {
    const previous = pilot.find((p) => p.qNumber === q.number);
    const imageUrls = (q.draftFigurePaths ?? q.imageUrls ?? []).map(imagePath);
    const choiceImageUrls = mapped<string>(Object.fromEntries(Object.entries(q.draftChoiceFigurePaths ?? q.choiceImageUrls ?? {}).map(([key, value]) => [key, imagePath(value)])));
    const category = previous?.category ?? (q.number <= 20 ? "電気機器・材料・工具" : q.number <= 30 ? "施工・法規・検査" : "配線図");
    return {
      id: `denko2-2026-first-gakka-q${q.number}`,
      exam: "denko2", session: "gakka", year: 2026, season: "first", qNumber: q.number,
      examDate: "2026-05-24", type: "multiple-choice", category,
      topicTags: previous?.topicTags ?? [category], difficulty: previous?.difficulty ?? 2,
      question: q.question, choices: mapped(q.choices), answer: choiceMap[q.officialAnswer],
      explanation: q.nativeExplanation, choiceExplanations: mapped(q.nativeChoiceExplanations), explanationCoverage: "full",
      imageUrls, choiceImageUrls,
      imageAltTexts: imageUrls.map((_, i) => q.number >= 31 ? (i === 0 ? "設問31〜50共通の建物平面図。番号①〜⑲と配線経路を示す。" : i === 1 ? "共通配線図の分電盤結線図。回路記号と電圧・遮断器・負荷を示す。" : "配線図の共通施工条件1〜7。VVF工事、漏電遮断器、図記号、全接続、3路0端子の条件を示す。") : (q.diagramDescription ?? `公式問${q.number}の図または写真`)),
      hasImage: Boolean(imageUrls.length || Object.keys(choiceImageUrls).length),
      sourcePdfUrl: "https://www.shiken.or.jp/construction/upload/20260524_co_second_q01.pdf",
      sourceAnswerUrl: "https://www.shiken.or.jp/construction/upload/20260524_co_second_a01.pdf",
      sourceAttribution: `出典：令和8年度上期第二種電気工事士学科試験 問${q.number}（電気技術者試験センター）。原本のイ・ロ・ハ・ニをア・イ・ウ・エに順序どおり置換。写真・図の肢は原本画像と識別用説明を併記。`,
      // Existing ECEE schema category; this change asserts no new permission receipt.
      license: "ECEE-educational-reuse", needsReview: q.needsReview,
      officialReferenceUrls: q.officialReferenceUrls,
      isCalculation: q.isCalculation, lastUpdated: "2026-10-11",
    };
  });
}
