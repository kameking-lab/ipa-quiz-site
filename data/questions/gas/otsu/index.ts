import type { Question } from "@/lib/questions/types";
import ready from "./ready.json";
import paper2024 from "./2024.json";

/** JIA source questions; explanations are independently authored by this site. */
export const GAS_OTSU_QUESTIONS: Question[] = ([...ready, ...paper2024] as Question[])
  .filter(question => question.needsReview === false)
  .sort((a, b) => b.year - a.year || a.session.localeCompare(b.session) || a.qNumber - b.qNumber);
