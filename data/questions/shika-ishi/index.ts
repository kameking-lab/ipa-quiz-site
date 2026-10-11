import type { Question } from "@/lib/questions/types";
import latestTwo from "./latest-two.json";

/** Only independently reviewed questions are eligible for publication. */
export const SHIKA_ISHI_QUESTIONS: Question[] = (latestTwo as Question[]).filter(question => question.needsReview === false);
