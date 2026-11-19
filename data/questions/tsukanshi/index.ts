import type { ChoiceKey, Question } from "@/lib/questions/types";
import y2025 from "@/data/qualification-staging/tsukanshi/2025.json";
import y2024 from "./2024.json";
import y2023 from "./2023.json";
import { projectStagedQuestions } from "../batch4/project-staged";

/**
 * 択一式の「該当なし＝０」は staging では6番目の内部キー「カ」。語群問題（part あり）の6番目「カ」と
 * 区別できるよう、公開時は語群で使わない内部キー「タ」に移し、choiceDisplayLabel で「0」と表示する。
 */
export const TSUKANSHI_NONE_KEY: ChoiceKey = "タ";

function moveNoneChoice(question: Question): Question {
  if (question.part || !question.choices?.カ?.startsWith("０")) return question;
  const rename = <T,>(record: Partial<Record<ChoiceKey, T>> | undefined) => record && Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key === "カ" ? TSUKANSHI_NONE_KEY : key, value]),
  ) as Partial<Record<ChoiceKey, T>>;
  const answer = Array.isArray(question.answer)
    ? question.answer.map((key) => key === "カ" ? TSUKANSHI_NONE_KEY : key)
    : question.answer === "カ" ? TSUKANSHI_NONE_KEY : question.answer;
  return { ...question, choices: rename(question.choices), choiceExplanations: rename(question.choiceExplanations), answer };
}

export const TSUKANSHI_QUESTIONS: Question[] = [
  ...projectStagedQuestions(y2025).map(moveNoneChoice),
  ...projectStagedQuestions([...y2024, ...y2023]),
];
