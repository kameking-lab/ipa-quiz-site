import type { ChoiceKey, Question } from "./types";

export const CHOICE_KEYS: ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ"];
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

/** 複数肢をそろえて選ぶ形式の採点。選んだ肢の集合が正答の集合と完全に一致した場合だけ正解。 */
export function isCompleteSelectionCorrect(answer: Question["answer"], selected: readonly string[]): boolean {
  const keys = Array.isArray(answer) ? answer : [answer];
  return selected.length === keys.length && new Set(selected).size === selected.length && keys.every(key => selected.includes(key));
}

/** 解答記録用に、選んだ肢を肢の並び順で連結する（例: "イ・エ"）。 */
export function formatSelection(selected: readonly string[]): string {
  return CHOICE_KEYS.filter(key => selected.includes(key)).join("・");
}
