import type { Question } from "@/lib/questions/types";
import originals from "./questions.json";

/** Only source-verified originals with all four explanations enter practice. */
export const JUDO_SEIFUKUSHI_QUESTIONS: Question[] = (originals as Question[])
  .filter(question => question.needsReview === false)
  .sort((a, b) => b.year - a.year || a.session.localeCompare(b.session) || a.qNumber - b.qNumber);
