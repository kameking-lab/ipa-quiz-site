import { mergeStAccepted399 } from "./accepted399-20261024";
import { applyIpaCorrections } from "../corrections";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";
import choiceExplanations from "./choice-explanations-2024-2025.json";
import allYearChoiceExplanations from "./choice-explanations-all-years.json";
import allYearExplanationRepairs from "./explanation-repairs-all-years.json";

const RAW_ST_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

const CURRENT_ST_QUESTIONS: Question[] = mergeStAccepted399(applyChoiceExplanationOverlay(
  applyIpaCorrections("st", RAW_ST_QUESTIONS),
  choiceExplanations,
));

// The older PR predates accepted399. Fill its remaining gaps without replacing
// already accepted originals, official answers, or reviewed explanations.
const eligibleIds = new Set(CURRENT_ST_QUESTIONS.filter(q => !q.choiceExplanations).map(q => q.id));
const gapExplanations = Object.fromEntries(
  Object.entries(allYearChoiceExplanations).filter(([id]) => eligibleIds.has(id)),
);
const explanationRepairs: Record<string, string> = allYearExplanationRepairs;
export const ST_PR718_ADOPTED_IDS = Object.keys(gapExplanations);

export const ST_QUESTIONS: Question[] = applyChoiceExplanationOverlay(
  CURRENT_ST_QUESTIONS.map(q => gapExplanations[q.id] && explanationRepairs[q.id]
    ? { ...q, explanation: explanationRepairs[q.id] }
    : q),
  gapExplanations,
);
