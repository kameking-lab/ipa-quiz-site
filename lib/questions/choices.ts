import type { ChoiceKey, Question } from "./types";

export const ALL_CHOICE_KEYS: readonly ChoiceKey[] = [
  "ア",
  "イ",
  "ウ",
  "エ",
  "オ",
  "カ",
  "キ",
  "ク",
  "コ",
] as const;

export function getChoiceKeys(
  choices: Question["choices"] | undefined,
): ChoiceKey[] {
  if (!choices) return [];
  return ALL_CHOICE_KEYS.filter((key) => typeof choices[key] === "string");
}

export function keyboardChoiceIndex(key: string): number {
  return /^[1-9]$/.test(key) ? Number(key) - 1 : -1;
}
