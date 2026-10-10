import type { Question } from "@/lib/questions/types";
import ready from "./pm01-24-ready.json";
import followup from "./source-clean-followup.json";

/** Source-clean subsets of the 39th and 38th sittings; both sessions remain incomplete. */
export const RINSHO_KOGISHI_QUESTIONS: Question[] = [...(ready as Question[]), ...(followup as Question[])]
  .filter(question => question.needsReview === false)
  .sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
