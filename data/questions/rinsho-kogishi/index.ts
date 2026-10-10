import type { Question } from "@/lib/questions/types";
import ready from "./pm01-24-ready.json";

/** Verified afternoon subset of the 39th and 38th sittings; morning is not yet registered. */
export const RINSHO_KOGISHI_QUESTIONS: Question[] = (ready as Question[])
  .filter(question => question.needsReview === false)
  .sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
