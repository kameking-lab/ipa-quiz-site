import { applyIpaCorrections } from "../corrections";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";
import choiceExplanations from "./choice-explanations-2024-2025.json";
import allYearChoiceExplanations from "./choice-explanations-all-years.json";
import allYearExplanationRepairs from "./explanation-repairs-all-years.json";

const RAW_ST_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

const explanationRepairs: Record<string, string> = allYearExplanationRepairs;

export const ST_QUESTIONS: Question[] = applyChoiceExplanationOverlay(
  applyChoiceExplanationOverlay(
    applyIpaCorrections("st", RAW_ST_QUESTIONS).map(question => ({
      ...question,
      ...(explanationRepairs[question.id] ? { explanation: explanationRepairs[question.id] } : {}),
    })),
    choiceExplanations,
  ),
  allYearChoiceExplanations,
);
