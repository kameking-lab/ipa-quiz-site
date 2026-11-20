import type { Question } from "@/lib/questions/types";

import { isPracticeReadyQuestion } from "@/lib/questions/filter";

import { isExamPublished } from "@/lib/qualifications/catalog";

import latest from "./2026-annual.json";

import previous from "./2025-annual.json";

import round5Morning from "./2022-am.json";

import fifthAfternoon from "./2022-pm.json";


import round7Morning from "./2024-am-official.json";



import round7Pm from "./2024-pm-official.json";


import sixthMorning from "./2023-annual-am.json";

import sixthAfternoon from "./2023-annual-pm.json";


/** 第5〜9回の公式原問。全員加点の原問も検証対象に含める。 */
export const SHINRISHI_CANDIDATES = [...latest, ...previous, ...round5Morning, ...fifthAfternoon, ...round7Morning, ...round7Pm, ...sixthMorning, ...sixthAfternoon] as Question[];

export const SHINRISHI_QUESTIONS: Question[] = isExamPublished("shinrishi")
  ? SHINRISHI_CANDIDATES.filter(isPracticeReadyQuestion)
  : [];
