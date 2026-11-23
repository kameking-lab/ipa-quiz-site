import { appendReplenishedQuestions } from "../published";
import official2019AutumnPm from "./official-2019-autumn-pm.json";

import { applyIpaCorrections } from "../corrections";

import type { Question } from "@/lib/questions/types";

import { BY_YEAR_QUESTIONS } from "./by-year";

import plan7_048 from "./plan7-048.json";


import official2017AutumnPm from "./official-2017-autumn-pm.json";

import { FE_2017_SPRING_PM_QUESTIONS } from "./2017-spring-pm";


import official2016AutumnPm from "./official-2016-autumn-pm.json";

import official2016SpringPm from "./official-2016-spring-pm.json";


const RAW_FE_QUESTIONS: Question[] = [...BY_YEAR_QUESTIONS, ...(official2019AutumnPm as Question[])];


export const FE_QUESTIONS: Question[] = appendReplenishedQuestions(applyIpaCorrections("fe", RAW_FE_QUESTIONS), [
  plan7_048,
  official2017AutumnPm,
  FE_2017_SPRING_PM_QUESTIONS,
  official2016AutumnPm,
  official2016SpringPm,
]);
