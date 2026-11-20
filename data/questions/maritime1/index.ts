import data from "./two-sittings.json";
import september2022Hoki from "./2022-september-hoki.json";
import september2025 from "./2025-september.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

/** Stored originals; practice export retains the shared readiness guard. */
export const MARITIME1_ALL_QUESTIONS = [...data, ...september2025, ...september2022Hoki].map(normalizeQuestionData);
export const MARITIME1_QUESTIONS = MARITIME1_ALL_QUESTIONS.filter(isPracticeReadyQuestion);
