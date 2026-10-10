import type { Question } from "@/lib/questions/types";
import candidate from "./pm-ready.json";

/** Source-ready PM subset only; latest two sittings are incomplete. */
export const SAGYO_RYOHOSHI_QUESTIONS: Question[] = (candidate as Question[])
  .filter(question => question.needsReview === false)
  .sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
