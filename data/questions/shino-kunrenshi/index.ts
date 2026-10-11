import type { Question } from "@/lib/questions/types";
import candidate from "./pm-ready.json";
import laterCandidate from "./pm57-end-ready.json";
import amCandidate from "./am-ready.json";
import earlyPmCandidate from "./pm01-20-ready.json";
import localAm54 from "./am54-local-ready.json";
import localAm15 from "./am15-formula-ready.json";

/** Source-ready AM and PM subsets; latest two sittings are incomplete. */
export const SHINO_KUNRENSHI_QUESTIONS: Question[] = [...(candidate as Question[]), ...(laterCandidate as Question[]), ...(amCandidate as Question[]), ...(earlyPmCandidate as Question[]), ...(localAm54 as Question[]), ...(localAm15 as Question[])]
  .filter(question => question.needsReview === false)
  .sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
