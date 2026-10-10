import type { ChoiceKey, Question } from "./types";

export const CHOICE_KEYS: ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ", "サ", "シ", "ス", "セ", "ソ"];
export const CHOICE_SHORTCUTS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export function getChoiceKeys(choices: Question["choices"]): ChoiceKey[] {
  return CHOICE_KEYS.filter(key => choices?.[key] !== undefined);
}

/** An array lists independently accepted choices, not a required multi-selection. */
export function isAcceptedAnswer(answer: Question["answer"], selected: string | undefined): boolean {
  return selected !== undefined && (Array.isArray(answer) ? answer.some(key => key === selected) : answer === selected);
}

export function formatAcceptedAnswers(answer: Question["answer"]): string {
  return Array.isArray(answer) ? answer.join("・") : answer;
}

/** 1問で選ぶ肢の数。「二つとも答えなさい」形式は2、それ以外は1。 */
export function requiredSelectionCount(question: Pick<Question, "requiredSelections">): number {
  const count = question.requiredSelections ?? 1;
  return Number.isInteger(count) && count > 1 ? count : 1;
}

/** 許容された正答肢から指定数を選ぶ。指定数の省略時は従来の全肢一致を保つ。 */
export function isCompleteSelectionCorrect(answer: Question["answer"], selected: readonly string[], requiredSelections?: number): boolean {
  const keys: readonly string[] = Array.isArray(answer) ? answer : [answer];
  const count = requiredSelections ?? keys.length;
  return Number.isInteger(count) && count > 0 && count <= keys.length &&
    new Set(keys).size === keys.length && selected.length === count &&
    new Set(selected).size === count && selected.every(key => keys.includes(key));
}

export function selectionInstruction(answer: Question["answer"], count: number): string {
  const accepted = Array.isArray(answer) ? answer.length : 1;
  return accepted > count
    ? "正答として認められる" + accepted + "肢のうち、" + count + "肢選ぶと採点します"
    : "正解は" + count + "つあります。" + count + "つ選ぶと採点します";
}

/** 解答記録用に、選んだ肢を肢の並び順で連結する（例: "イ・エ"）。 */
export function formatSelection(selected: readonly string[]): string {
  return CHOICE_KEYS.filter(key => selected.includes(key)).join("・");
}
