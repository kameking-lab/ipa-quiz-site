import type { Question } from "@/lib/questions/types";

import candidate from "./pm-ready.json";

import laterCandidate from "./pm57-end-ready.json";

import amCandidate from "./am-ready.json";

import earlyPmCandidate from "./pm01-20-ready.json";

import localAm54 from "./am54-local-ready.json";

import localAm15 from "./am15-formula-ready.json";

import savedGo34 from "./saved-go34-20261011.json";

import round54Morning from "./2023-annual-am-official.json";

import plan5Completion from "./plan5-198-completion.json";


import morning53 from "./2022-am-plan5.json";

import paper2022Pm from "./2022-annual-pm-plan5-qe4.json";


import shino52Am from "./2022-february-am.json";

import afternoon2021 from "./2021-pm-plan5.json";


import branchAm2026 from "./2026-am-branch-completion.json";

import afternoon2026 from "./2026-pm-branch-completion.json";


import morning2024 from "./2024-annual-am-imported-plan5.json";

import paper55PmCompletion from "./2024-annual-pm-completion.json";


/** 第54回の午前と、第55・56回の確認済み原問。 */
export const SHINO_KUNRENSHI_QUESTIONS: Question[] = [...(candidate as Question[]), ...(laterCandidate as Question[]), ...(amCandidate as Question[]), ...(earlyPmCandidate as Question[]), ...(localAm54 as Question[]), ...(localAm15 as Question[]), ...(savedGo34 as Question[]), ...(round54Morning as Question[]), ...(plan5Completion as Question[]), ...(morning53 as Question[]), ...(paper2022Pm as Question[]), ...(shino52Am as Question[]), ...(afternoon2021 as Question[]), ...(branchAm2026 as Question[]), ...(afternoon2026 as Question[]), ...(morning2024 as Question[]), ...(paper55PmCompletion as Question[])]
  .filter(question => question.needsReview === false)
  .sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
