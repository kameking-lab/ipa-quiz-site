import { appendReplenishedQuestions } from "../published";
import officialWrittenQuestions from "./official-2021-autumn-pm.json";

import official2024AutumnPM from "./official-2024-autumn-pm.json";

import officialQb12 from "./official-2023-autumn-pm-qb12.json";


import officialQb13 from "./official-2023-spring-pm.json";


import official2019SpringPm from "./official-2019-spring-pm.json";

import official2020AutumnPm from "./official-2020-autumn-pm.json";
import official2019AutumnPm from "./official-2019-autumn-pm.json";

import cxK4ChoiceExplanations from "./choice-explanations-cx-k4.json";

import { applyIpaCorrections } from "../corrections";

import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";

import type { Question } from "@/lib/questions/types";

import { AP_BY_YEAR_QUESTIONS } from "./by-year";

import { AP_SAMPLE_QUESTIONS } from "./sample-questions";

import cxK3ChoiceExplanations from "./choice-explanations-cx-k3.json";

import eAp1ChoiceExplanations from "./choice-explanations-e-ap-1.json";

import eAp2ChoiceExplanations from "./choice-explanations-e-ap-2.json";

import eAp3ChoiceExplanations from "./choice-explanations-e-ap-3.json";

import eAp4ChoiceExplanations from "./choice-explanations-e-ap-4.json";

import official2022Spring from "./2022-spring-pm-official-qb1.json";

import official2021SpringPm from "./official-2021-spring-pm.json";

import official2024SpringPm from "./ap-2024h-pm-official.json";


import official2022AutumnPm from "./2022-autumn-pm-official-qb14.json";


import plan7_022 from "./plan7-022.json";

import official2017SpringPm from "./official-2017-spring-pm.json";


import { AP_2016_AUTUMN_PM_QUESTIONS } from "./2016-autumn-pm";

import official2016SpringPm from "./official-2016-spring-pm.json";


// Use real parsed data when available, fall back to curated samples.
const RAW_AP_QUESTIONS: Question[] =
  [...(AP_BY_YEAR_QUESTIONS.length > 0 ? AP_BY_YEAR_QUESTIONS : AP_SAMPLE_QUESTIONS), ...(officialWrittenQuestions as Question[])];


const choiceExplanationOverlays: unknown[] = [
  cxK4ChoiceExplanations,
  cxK3ChoiceExplanations, eAp1ChoiceExplanations, eAp2ChoiceExplanations, eAp3ChoiceExplanations,
  eAp4ChoiceExplanations,
];


const QB13_OFFICIAL_QUESTIONS: Question[] = choiceExplanationOverlays.reduce<Question[]>(
  (questions, overlay) => applyChoiceExplanationOverlay(questions, overlay),
  applyIpaCorrections("ap", RAW_AP_QUESTIONS),
);


export const AP_QUESTIONS: Question[] = appendReplenishedQuestions([...choiceExplanationOverlays.reduce<Question[]>(
  (questions, overlay) => applyChoiceExplanationOverlay(questions, overlay),
  applyIpaCorrections("ap", RAW_AP_QUESTIONS),
), ...official2022Spring as Question[]], [
  official2024AutumnPM,
  officialQb12,
  officialQb13,
  official2019SpringPm,
  official2020AutumnPm,
  official2019AutumnPm,
  official2021SpringPm,
  official2024SpringPm,
  official2022AutumnPm,
  plan7_022,
  official2017SpringPm,
  AP_2016_AUTUMN_PM_QUESTIONS,
  official2016SpringPm,
]);
