import type { ChoiceKey, ExamCode, Question } from "./types";

const DENKEN_CHOICE_KEYS: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];

export function questionNumberLabel(q: Pick<Question, "qNumber" | "part">): string {
  return `${q.qNumber}${q.part ? `(${q.part})` : ""}`;
}

export function choiceDisplayLabel(exam: ExamCode, key: ChoiceKey): string {
  if (exam !== "denken3") return key;
  const index = DENKEN_CHOICE_KEYS.indexOf(key);
  return index >= 0 ? `(${index + 1})` : key;
}
