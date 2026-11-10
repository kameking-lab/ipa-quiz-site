import text2024 from "./2024-annual-text.json";
import type { Question } from "@/lib/questions/types";
import latestTwo from "./latest-two.json";

/** Only independently reviewed questions are eligible for publication. */
export const SHIKA_ISHI_QUESTIONS: Question[] = ([...text2024, ...latestTwo] as Question[]).filter(question => question.needsReview === false);
