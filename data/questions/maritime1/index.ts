import data from "./two-sittings.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

/** Stored originals; practice export retains the shared readiness guard. */
export const MARITIME1_ALL_QUESTIONS = data.map(normalizeQuestionData);
export const MARITIME1_QUESTIONS = MARITIME1_ALL_QUESTIONS.filter(isPracticeReadyQuestion);
