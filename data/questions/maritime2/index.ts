import data from "./two-sittings.json";
import september2022Kiso from "./2022-september-kiso.json";
import september2022KogakuA from "./2022-september-kogaku-a.json";
import september2022KogakuB from "./2022-september-kogaku-b.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

/** Stored originals; practice export retains the shared readiness guard. */
export const MARITIME2_ALL_QUESTIONS = [...data, ...september2022Kiso, ...september2022KogakuA, ...september2022KogakuB].map(normalizeQuestionData);
export const MARITIME2_QUESTIONS = MARITIME2_ALL_QUESTIONS.filter(isPracticeReadyQuestion);
