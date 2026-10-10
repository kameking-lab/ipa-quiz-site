import type { Question } from "@/lib/questions/types";
import candidate from "./pm-ready.json";
import laterCandidate from "./pm57-end-ready.json";
import amCandidate from "./am-ready.json";
import earlyPmCandidate from "./pm01-20-ready.json";
import localAm35 from "./am35-local-ready.json";

/** Source-ready AM and PM subsets; latest two sittings are incomplete. */
export const SAGYO_RYOHOSHI_QUESTIONS: Question[] = [...(candidate as Question[]), ...(laterCandidate as Question[]), ...(amCandidate as Question[]), ...(earlyPmCandidate as Question[]), ...(localAm35 as Question[])]
  .filter(question => question.needsReview === false)
  .sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
