import type { Question } from "@/lib/questions/types";
import fiscal2024 from "./2024.json";
import ready from "./ready.json";

/** JIA source questions; explanations are independently authored by this site. */
export const GAS_HEI_QUESTIONS: Question[] = ([...ready, ...fiscal2024] as Question[])
  .filter(question => question.needsReview === false)
  .sort((a, b) => b.year - a.year || a.session.localeCompare(b.session) || a.qNumber - b.qNumber);
