import type { Question } from "./types";

/** Integer-entry questions accept digits, not JavaScript number syntax or units. */
export function normalizeNumericAnswer(input: string): string | undefined {
  const digits = input.trim().replace(/[０-９]/g, (digit) => String.fromCharCode(digit.charCodeAt(0) - 0xfee0));
  if (!/^[0-9]+$/.test(digits)) return undefined;
  // String normalization preserves arbitrarily large integers without rounding.
  return digits.replace(/^0+(?=\d)/, "");
}

/** Shared fail-closed contract for publishing validation and practice pools. */
export function numericQuestionIssue(question: Question): string | undefined {
  if (question.type !== "numeric") return undefined;
  if (question.numericAnswer?.format !== "integer" || typeof question.numericAnswer.unit !== "string" || !question.numericAnswer.unit.trim()) {
    return "numeric requires integer format and a nonempty unit";
  }
  if (typeof question.answer !== "string" || normalizeNumericAnswer(question.answer) !== question.answer) {
    return "numeric answer must be a canonical nonnegative integer string";
  }
  if (question.choices !== undefined || question.choiceExplanations !== undefined || question.choiceImageUrls !== undefined || question.requiredSelections !== undefined) {
    return "numeric must preserve the original entry format without choices or requiredSelections";
  }
  return undefined;
}

export function isNumericAnswerCorrect(question: Question, input: string): boolean {
  if (question.type !== "numeric" || numericQuestionIssue(question)) return false;
  const normalized = normalizeNumericAnswer(input);
  return normalized !== undefined && normalized === question.answer;
}

export function formatNumericAnswer(question: Question, value: string = String(question.answer)): string {
  return `${value} ${question.numericAnswer?.unit ?? ""}`.trim();
}
