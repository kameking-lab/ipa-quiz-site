import type { Question } from "./types";

/** Entry formats use whole strings; never parse or round a user's partial value. */
export function normalizeNumericAnswer(input: string, specification?: Question["numericAnswer"]): string | undefined {
  let digits = input.trim().replace(/[０-９]/g, (digit) => String.fromCharCode(digit.charCodeAt(0) - 0xfee0));
  if (specification?.format === "decimal") {
    if (![1, 2].includes(specification.precision)) return undefined;
    digits = digits.replace(/．/g, ".");
    if (!new RegExp(`^[0-9]+(?:\\.[0-9]{1,${specification.precision}})?$`).test(digits)) return undefined;
    const [whole, fraction = ""] = digits.split(".");
    return `${whole!.replace(/^0+(?=\d)/, "")}.${fraction.padEnd(specification.precision, "0")}`;
  }
  if (specification && specification.format !== "integer") return undefined;
  if (!/^[0-9]+$/.test(digits)) return undefined;
  // String normalization preserves arbitrarily large integers without rounding.
  return digits.replace(/^0+(?=\d)/, "");
}

/** Shared fail-closed contract for publishing validation and practice pools. */
export function numericQuestionIssue(question: Question): string | undefined {
  if (question.type !== "numeric") return undefined;
  const specification = question.numericAnswer;
  if (!specification || !["integer", "decimal"].includes(specification.format) || typeof specification.unit !== "string" || !specification.unit.trim()) {
    return "numeric requires a supported format and a nonempty unit or quantity label";
  }
  if (specification.fixedSign !== undefined && specification.fixedSign !== "negative") {
    return "numeric fixedSign must be a supported printed sign";
  }
  if (specification.format === "decimal" && ![1, 2].includes(specification.precision)) {
    return "decimal numeric requires precision 1 or 2";
  }
  if (typeof question.answer !== "string" || normalizeNumericAnswer(question.answer, specification) !== question.answer) {
    return "numeric answer must be a canonical nonnegative string in the specified format";
  }
  if (question.choices !== undefined || question.choiceExplanations !== undefined || question.choiceImageUrls !== undefined || question.requiredSelections !== undefined) {
    return "numeric must preserve the original entry format without choices or requiredSelections";
  }
  return undefined;
}

export function isNumericAnswerCorrect(question: Question, input: string): boolean {
  if (question.type !== "numeric" || numericQuestionIssue(question)) return false;
  const normalized = normalizeNumericAnswer(input, question.numericAnswer);
  return normalized !== undefined && normalized === question.answer;
}

export function formatNumericAnswer(question: Question, value: string = String(question.answer)): string {
  const sign = question.numericAnswer?.fixedSign === "negative" ? "−" : "";
  return `${sign}${value} ${question.numericAnswer?.unit ?? ""}`.trim();
}
