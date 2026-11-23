import data from "./two-sittings.json";
import february2022 from "./2022-february.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

/** Stored originals; practice export retains the shared readiness guard. */
export const KAI_TOKU2_2022_FEBRUARY_QUESTIONS = february2022.map(normalizeQuestionData);
export const KAI_TOKU2_ALL_QUESTIONS = [
  ...data.map(normalizeQuestionData),
  ...KAI_TOKU2_2022_FEBRUARY_QUESTIONS,
];
export const KAI_TOKU2_QUESTIONS = KAI_TOKU2_ALL_QUESTIONS.filter(isPracticeReadyQuestion);
