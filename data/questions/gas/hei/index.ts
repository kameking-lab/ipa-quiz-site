import type { Question } from "@/lib/questions/types";
import ready from "./ready.json";

/** JIA source questions; explanations are independently authored by this site. */
export const GAS_HEI_QUESTIONS: Question[] = (ready as Question[])
  .filter(question => question.needsReview === false)
  .sort((a, b) => b.year - a.year || a.session.localeCompare(b.session) || a.qNumber - b.qNumber);
