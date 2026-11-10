import type { Question } from "@/lib/questions/types";
import candidate from "./pm-ready.json";
import laterCandidate from "./pm57-end-ready.json";
import amCandidate from "./am-ready.json";
import earlyPmCandidate from "./pm01-20-ready.json";
import localAm35 from "./am35-local-ready.json";
import { OT13_RECOVERED_QUESTIONS } from "@/data/qualification-staging/sagyo-ryohoshi/ot13-recovered/questions";

import { OT61_PM_REMAINING14_QUESTIONS } from "@/data/qualification-staging/sagyo-ryohoshi/ot61-pm-remaining15";

/** Source-ready AM and PM subsets; latest two sittings are incomplete. */
export const SAGYO_RYOHOSHI_QUESTIONS: Question[] = [...(candidate as Question[]), ...(laterCandidate as Question[]), ...(amCandidate as Question[]), ...(earlyPmCandidate as Question[]), ...(localAm35 as Question[]), ...OT13_RECOVERED_QUESTIONS, ...OT61_PM_REMAINING14_QUESTIONS]
  .filter(question => question.needsReview === false)
  .sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
