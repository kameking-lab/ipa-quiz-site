import type { ChoiceKey, ExamCode, Question } from "./types";

const DENKEN_CHOICE_KEYS: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];

export function questionNumberLabel(q: Pick<Question, "qNumber" | "part">): string {
  return `${q.qNumber}${q.part ? `(${q.part})` : ""}`;
}

/** 原本が(1)〜(5)の番号で選択肢を示す試験。内部キーはア〜オのまま、表示だけ番号にする。 */
export function usesNumericChoiceLabels(exam: ExamCode): boolean {
  return exam === "denken3" || exam === "tohan";
}

export function choiceDisplayLabel(exam: ExamCode, key: ChoiceKey): string {
  if (!usesNumericChoiceLabels(exam)) return key;
  const index = DENKEN_CHOICE_KEYS.indexOf(key);
  return index >= 0 ? `(${index + 1})` : key;
}
