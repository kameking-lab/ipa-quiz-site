import type { Question } from "@/lib/questions/types";

import ready from "./pm01-24-ready.json";

import followup from "./source-clean-followup.json";

import footerOnly from "./footer-only-followup.json";

import round36Morning from "./2022-am-official.json";

import afternoon36 from "./plan5-240-completion.json";


import morning2021 from "./2021-am-plan5.json";

import afternoon2021 from "./2021-pm-plan5-qj4.json";


import round39Am from "./2025-annual-am-plan5-imported.json";

import round39Pm from "./2025-annual-pm-qf10.json";


import round38Morning from "./2024-round38-am-official.json";

import round38Afternoon from "./38-pm-plan5-completion.json";


import round37Am from "./2023-round37-am-official.json";

import afternoon37 from "./2023-pm-official.json";


/** 確認済みの第36・38・39回の原問。 */
export const RINSHO_KOGISHI_QUESTIONS: Question[] = [
  ...(ready as Question[]),
  ...(followup as Question[]),
  ...(footerOnly as Question[]),
  ...(round36Morning as Question[]),
  ...(afternoon36 as Question[]),
  ...(morning2021 as Question[]),
  ...(afternoon2021 as Question[]),
  ...(round39Am as Question[]),
  ...(round39Pm as Question[]),
  ...(round38Morning as Question[]),
  ...(round38Afternoon as Question[]),
  ...(round37Am as Question[]),
  ...(afternoon37 as Question[]),
]
  .filter(question => question.needsReview === false)
  .sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
