import type { ChoiceKey, Question } from "./types";
import { getChoiceKeys } from "./answers";
import { choiceDisplayLabel } from "./display";

export function orderingQuestionIssue(question: Question): string | undefined {
  if (question.type !== "ordering") return undefined;
  const keys = getChoiceKeys(question.choices);
  if (keys.length < 2) return "ordering requires at least two choices";
  if (keys.some((key) => !question.choices?.[key]?.trim())) return "ordering choices must contain nonempty text";
  if (!Array.isArray(question.answer) || question.answer.length !== keys.length) return "ordering answer must contain every choice exactly once";
  if (question.requiredSelections !== undefined || question.numericAnswer !== undefined) return "ordering cannot use selection count or numeric answer";
  if (new Set(question.answer).size !== keys.length || question.answer.some((key) => !keys.includes(key))) return "ordering answer must be a permutation of choice keys";
  return undefined;
}

export function isOrderingAnswerComplete(selected: readonly (ChoiceKey | "")[], choices: Question["choices"]): boolean {
  const keys = getChoiceKeys(choices);
  return selected.length === keys.length && selected.every((key): key is ChoiceKey => key !== "" && keys.includes(key)) && new Set(selected).size === keys.length;
}

export function isOrderingAnswerCorrect(question: Question, selected: readonly (ChoiceKey | "")[]): boolean {
  return question.type === "ordering" && !orderingQuestionIssue(question) &&
    isOrderingAnswerComplete(selected, question.choices) &&
    (question.answer as ChoiceKey[]).every((key, index) => selected[index] === key);
}

export function formatOrderingAnswer(exam: Question["exam"], selected: readonly (ChoiceKey | "")[]): string {
  return selected.filter((key): key is ChoiceKey => key !== "").map((key) => choiceDisplayLabel(exam, key)).join("→");
}
