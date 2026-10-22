import type { ExamCode } from "./types";

/** Preserve authored source bytes; translate only an internal editorial pointer. */
export function displayQuestionExplanation(exam: ExamCode, text: string | undefined): string {
  return exam === "kaikeishi"
    ? (text ?? "").replaceAll("個々の根拠はstatementAssessmentsを参照。", "各記述の解説を参照。")
    : text ?? "";
}
