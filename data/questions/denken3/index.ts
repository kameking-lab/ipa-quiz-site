import { appendReplenishedQuestions } from "../published";
import official2017Power from "./official-2017-primary-power.json";


import plan7159 from "./official-2017-annual-kikai.json";

import official2017PrimaryTheory from "./official-2017-primary-theory.json";


import official2019Machine from "./official-2019-primary-machine.json";

import official2019Law from "./official-2019-primary-law.json";

import official2016PrimaryKikai from "./official-2016-primary-kikai.json";
import official2016PrimaryTheory from "./official-2016-primary-theory.json";

import type { Question } from "@/lib/questions/types";

import { DENKEN3_2016_HOUKI } from "./2016-annual-houki";

import { DENKEN3_2019_DENRYOKU } from "./2019-annual-denryoku";

import launch from "./launch.json";


/** 2024/2025年度の公式出典に固定した320解答単位。 */
export const DENKEN3_LEGACY_QUESTIONS: Question[] = launch as Question[];

export const DENKEN3_HISTORICAL_QUESTIONS: Question[] = official2017Power as Question[];

import law2018 from "./plan7-154.json";

import theory2019 from "./plan7-153.json";


import paper2017 from "./2017-law.json";


import paper2020 from "./2020-power.json";

import { DENKEN3_2016_DENRYOKU_QUESTIONS } from "./2016-annual-denryoku";

import { DENKEN3_2020_KIKAI_QUESTIONS } from "./2020-annual-kikai";

/** 2024/2025年度の公式出典に固定した320解答単位。 */
export const DENKEN3_LAUNCH_QUESTIONS: Question[] = launch as Question[];


import official2018AnnualPower from "./official-2018-annual-power.json";


import official2020Theory from "./2020-annual-riron.json";


import official2020Law from "./2020-annual-houki.json";

import official2018AnnualKikai from "./official-2018-annual-kikai.json";


import official2018AnnualRiron from "./official-2018-annual-riron.json";

export const DENKEN3_QUESTIONS: Question[] = [...DENKEN3_LEGACY_QUESTIONS, ...DENKEN3_HISTORICAL_QUESTIONS];


export const DENKEN3_ANNUAL_QUESTIONS: Question[] = [
  ...DENKEN3_2019_DENRYOKU,
  ...DENKEN3_2016_HOUKI,
];


export const DENKEN3_YEAR_PAPERS = appendReplenishedQuestions([...DENKEN3_QUESTIONS, ...DENKEN3_ANNUAL_QUESTIONS], [
  plan7159,
  official2017PrimaryTheory,
  official2019Machine,
  official2019Law,
  official2016PrimaryKikai,
  official2016PrimaryTheory,
  law2018,
  theory2019,
  paper2017,
  paper2020,
  DENKEN3_2016_DENRYOKU_QUESTIONS,
  DENKEN3_2020_KIKAI_QUESTIONS,
  official2018AnnualPower,
  official2018AnnualRiron,
]);

export const DENKEN3_ARCHIVE_QUESTIONS: Question[] = [...official2020Law, ...official2020Theory] as Question[];


export const DENKEN3_PRACTICE_QUESTIONS: Question[] = [...DENKEN3_QUESTIONS, ...DENKEN3_ARCHIVE_QUESTIONS];


export const ALL_DENKEN3_QUESTIONS: Question[] = [
  ...DENKEN3_QUESTIONS,
  ...(official2018AnnualKikai as Question[]),
];
