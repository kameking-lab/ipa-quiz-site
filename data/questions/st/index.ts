import { applyIpaCorrections } from "../corrections";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";
import choiceExplanations from "./choice-explanations-2024-2025.json";
import savedAllYearsReasons from "./choice-explanations-all-years.json";
import savedMainRepairs from "./explanation-repairs-all-years.json";
import { applyResidualEight } from "./residual-eight-corrections-20261014";

const RAW_ST_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

const CURRENT_ST_QUESTIONS = applyChoiceExplanationOverlay(
  applyIpaCorrections("st", RAW_ST_QUESTIONS),
  choiceExplanations,
);

const mainRepairs: Record<string, string> = savedMainRepairs;
const savedIDs = new Set(Object.keys(savedAllYearsReasons));
if (savedIDs.size !== 559 || Object.keys(mainRepairs).length !== 80 ||
    Object.keys(mainRepairs).some((id) => !savedIDs.has(id))) {
  throw new Error("ST saved explanation scope mismatch");
}

const AFTER_SAVED559: Question[] = applyChoiceExplanationOverlay(
  CURRENT_ST_QUESTIONS,
  savedAllYearsReasons,
).map((question) => {
  const explanation = mainRepairs[question.id];
  return explanation === undefined ? question : { ...question, explanation };
});

export const ST_QUESTIONS: Question[] = applyResidualEight(AFTER_SAVED559);
