import type { Question } from "@/lib/questions/types";

import candidate from "./pm-ready.json";

import laterCandidate from "./pm57-end-ready.json";

import amCandidate from "./am-ready.json";

import earlyPmCandidate from "./pm01-20-ready.json";

import localAm35 from "./am35-local-ready.json";

import plan5Imported from "./plan5-qd1-imported.json";

import plan5New from "./plan5-qd1-new.json";

import plan5Completion from "./plan5-184-completion.json";


import completion2025 from "./2024-am-plan5-completion15.json";

import paper2024Pm from "./2024-annual-pm-plan5-qe4.json";


import ot59Am from "./2024-february-am.json";

import afternoon2023 from "./2023-pm-01-20.json";

import afternoon2023Supplement from "./2023-pm-21-100.json";


import ot58Morning from "./ot58-morning-plan5.json";

import ot58Afternoon from "./2023-annual-pm-plan5.json";


import round57Am from "./2022-annual-am-plan5.json";

import round57Pm from "./2022-annual-pm.json";

import { OT13_RECOVERED_QUESTIONS } from "@/data/qualification-staging/sagyo-ryohoshi/ot13-recovered/questions";


import { OT61_PM_REMAINING14_QUESTIONS } from "@/data/qualification-staging/sagyo-ryohoshi/ot61-pm-remaining15";


/** 第61回午前は公式採点除外1問を除く99問。その他の回は部分収録。 */
export const SAGYO_RYOHOSHI_QUESTIONS: Question[] = [...(candidate as Question[]), ...(laterCandidate as Question[]), ...(amCandidate as Question[]), ...(earlyPmCandidate as Question[]), ...(localAm35 as Question[]), ...(paper2024Pm as Question[]), ...OT13_RECOVERED_QUESTIONS, ...OT61_PM_REMAINING14_QUESTIONS, ...(plan5Imported as Question[]), ...(plan5New as Question[]), ...(plan5Completion as Question[]), ...(completion2025 as Question[]), ...(ot59Am as Question[]), ...(afternoon2023 as Question[]), ...(afternoon2023Supplement as Question[]), ...(ot58Morning as Question[]), ...(ot58Afternoon as Question[]), ...(round57Am as Question[]), ...(round57Pm as Question[])]
  .filter(question => question.needsReview === false)
  .sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
