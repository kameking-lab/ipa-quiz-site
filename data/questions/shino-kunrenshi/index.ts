import type { Question } from "@/lib/questions/types";
import candidate from "./pm-ready.json";
import laterCandidate from "./pm57-end-ready.json";

/** Source-ready PM subset only; latest two sittings are incomplete. */
export const SHINO_KUNRENSHI_QUESTIONS: Question[] = [...(candidate as Question[]), ...(laterCandidate as Question[])]
  .filter(question => question.needsReview === false)
  .sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
