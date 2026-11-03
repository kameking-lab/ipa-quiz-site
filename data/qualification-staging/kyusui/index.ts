/**
 * PRIVATE staging corpus. No runtime/public registry imports this module.
 * PDF-region images and saved official PDFs are authoritative; extracted text
 * preserves the PDF layout and is supplied for search and editorial review.
 */
import source2026 from "./2026-annual.json";
import source2025 from "./2025-annual.json";

export type KyusuiScoring =
  | { kind: "single-choice"; correctChoice: number }
  | {
      kind: "all-correct";
      correctChoice: null;
      notice: string;
      reason: string;
      correctionPdfPage: number;
    };

export interface KyusuiStagedQuestion {
  id: string;
  exam: "kyusui";
  year: number;
  season: "annual";
  edition: string;
  examDate: string;
  session: "gakka1" | "gakka2";
  qNumber: number;
  category: string;
  question: string;
  /** Original numeric order: index 0 = printed choice 1. */
  choices: readonly string[];
  choiceRepresentation: "text" | "diagram-labels";
  postOptionContent: string;
  originalText: string;
  textRepresentation: "pdf-extraction-with-layout";
  /** Repository paths, intentionally outside public/. Includes all continuation pages. */
  sourceImages: readonly string[];
  sourcePdfUrl: string;
  sourceAnswerUrl: string;
  scoring: KyusuiScoring;
  explanationCoverage: "official-summary";
  explanation: string;
  sourceAttribution: string;
  lastUpdated: string;
}

// JSON imports widen literal types; validate their structure before narrowing.
function readSource(rows: unknown): readonly KyusuiStagedQuestion[] {
  if (!Array.isArray(rows) || rows.length !== 60) throw new Error("Invalid kyusui edition");
  for (const [index, row] of rows.entries()) {
    const score = row.scoring;
    if (
      row.exam !== "kyusui" || row.season !== "annual" || row.qNumber !== index + 1 ||
      ![2025, 2026].includes(row.year) || row.session !== (row.qNumber <= 40 ? "gakka1" : "gakka2") ||
      !row.question || !row.originalText || !Array.isArray(row.choices) ||
      ![4, 5].includes(row.choices.length) || row.choices.some((text: unknown) => typeof text !== "string" || !text.trim()) ||
      !Array.isArray(row.sourceImages) || !row.sourceImages.length ||
      row.textRepresentation !== "pdf-extraction-with-layout" || row.explanationCoverage !== "official-summary" ||
      !["text", "diagram-labels"].includes(row.choiceRepresentation) || typeof row.postOptionContent !== "string" ||
      !score || !["single-choice", "all-correct"].includes(score.kind) ||
      (score.kind === "single-choice" && (!Number.isInteger(score.correctChoice) || score.correctChoice < 1 || score.correctChoice > row.choices.length)) ||
      (score.kind === "all-correct" && (row.year !== 2025 || row.qNumber !== 18 || score.correctChoice !== null || !score.notice || !score.reason || score.correctionPdfPage !== 2))
    ) throw new Error(`Invalid kyusui source record ${row.id ?? index}`);
  }
  return rows as KyusuiStagedQuestion[];
}

export const KYUSUI_STAGED_QUESTIONS: readonly KyusuiStagedQuestion[] = [
  ...readSource(source2026),
  ...readSource(source2025),
];

/** Official treatment, including credit for Q18 even without a selected answer. */
export function scoreKyusuiStagedQuestion(question: KyusuiStagedQuestion, selectedNumber: number | null): boolean {
  return question.scoring.kind === "all-correct" || question.scoring.correctChoice === selectedNumber;
}
