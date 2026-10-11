import { applyIpaCorrections } from "../corrections";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";
import choiceExplanations from "./choice-explanations-2024-2025.json";
import allYearChoiceExplanations from "./choice-explanations-all-years.json";
import allYearExplanationRepairs from "./explanation-repairs-all-years.json";
import residualCorrections from "./residual-source-corrections-20261011.json";
import residualChoiceExplanations from "./choice-explanations-residual-20261011.json";
import residualConflictNotices from "./residual-source-conflict-notices-20261011.json";

const RAW_ST_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;
const explanationRepairs: Record<string, string> = allYearExplanationRepairs;
const sourceCorrections: Record<string, Partial<Question>> = residualCorrections;
const sourceConflictNotices: Record<string, Partial<Question>> = residualConflictNotices;

export const ST_QUESTIONS: Question[] = applyChoiceExplanationOverlay(
  applyChoiceExplanationOverlay(
    applyChoiceExplanationOverlay(
      applyIpaCorrections("st", RAW_ST_QUESTIONS).map(question => ({
        ...question,
        ...(explanationRepairs[question.id] ? { explanation: explanationRepairs[question.id] } : {}),
        ...sourceCorrections[question.id],
        ...sourceConflictNotices[question.id],
      })),
      choiceExplanations,
    ),
    allYearChoiceExplanations,
  ),
  residualChoiceExplanations,
);
