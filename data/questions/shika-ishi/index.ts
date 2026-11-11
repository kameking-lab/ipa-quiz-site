import text2022 from "./2022-annual-text.json";
import text2024 from "./2024-annual-text.json";
import text2023 from "./2023-annual-text.json";
import type { Question } from "@/lib/questions/types";
import latestTwo from "./latest-two.json";

/** Only independently reviewed questions are eligible for publication. */
export const SHIKA_ISHI_QUESTIONS: Question[] = ([...text2024, ...text2023, ...text2022, ...latestTwo] as Question[]).filter(question => question.needsReview === false);
