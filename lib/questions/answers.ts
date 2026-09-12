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
