import data from "./two-sittings.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

/** Private candidate only; root owns catalog/runtime and public authorization. */
export const GENERAL2_ALL_QUESTIONS = data.map(normalizeQuestionData);
export const GENERAL2_QUESTIONS = GENERAL2_ALL_QUESTIONS.filter(isPracticeReadyQuestion);
