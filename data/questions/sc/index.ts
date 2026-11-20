import { appendReplenishedQuestions } from "../published";
import officialWrittenQuestions from "./official-2025-spring-pm.json";

import { SC_OFFICIAL_2023_SPRING_PM1 } from "./official-2023-spring-pm1";


import { SC_QUESTIONS_2023_SPRING_PM2 } from "./by-year/2023-spring-pm2";

import official2022SpringPM1 from "./official-2022-spring-pm1.json";

import officialQb12 from "./official-2021-autumn-pm1-qb12.json";


import officialQb13 from "./official-2021-autumn-pm2.json";


import official2017AutumnPm1 from "./official-2017-autumn-pm1.json";


import official2018AutumnPm2 from "./official-2018-autumn-pm2.json";

import official2020AutumnPm1 from "./official-2020-autumn-pm1.json";

import { applyIpaCorrections } from "../corrections";

import { applyIpaChoiceExplanationAdditions } from "../corrections/choice-explanations-20261118";

import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";

import type { Question } from "@/lib/questions/types";

import { BY_YEAR_QUESTIONS } from "./by-year";

import { SC_2023_AUTUMN_PM_QUESTIONS } from "./2023-autumn-pm";


import official2017SpringPm1 from "./official-2017-spring-pm1.json";

import choiceExplanations from "./choice-explanations-2024-2025.json";

import cxK2ChoiceExplanations from "./choice-explanations-cx-k2.json";

import cxK7ChoiceExplanations from "./choice-explanations-cx-k7.json";

import official2025Autumn from "./2025-autumn-pm-official-qb1.json";

import official2021Spring from "./2021-spring-pm2-official-qb1.json";

import official2024AutumnPm from "./official-2024-autumn-pm.json";


import afternoonPlan5 from "./2024-spring-pm-plan5-qb4.json";

import official2022SpringPm2 from "./sc-2022h-pm2-official.json";


import official2021SpringPm1 from "./2021-spring-pm1-official-qb14.json";

import official2016SpringPm2 from "./official-2016-spring-pm2.json";


import plan7_004 from "./plan7-004.json";

import official2016AutumnPm2 from "./official-2016-autumn-pm2.json";


import { SC_2019_AUTUMN_PM1_QUESTIONS } from "./2019-autumn-pm1";


import official2019SpringPm1 from "./official-2019-spring-pm1.json";


import official2019SpringPm2 from "./official-2019-spring-pm2.json";

import official2018AutumnPm1 from "./official-2018-autumn-pm1.json";


import official2018SpringPm1 from "./official-2018-spring-pm1.json";


import official2020AutumnPm2 from "./official-2020-autumn-pm2.json";


const RAW_SC_QUESTIONS: Question[] = [...BY_YEAR_QUESTIONS, ...(officialWrittenQuestions as Question[])];


const QB13_OFFICIAL_QUESTIONS: Question[] = applyChoiceExplanationOverlay(
  applyChoiceExplanationOverlay(
    applyIpaCorrections("sc", RAW_SC_QUESTIONS),
    { ...choiceExplanations, ...cxK7ChoiceExplanations },
  ),
  cxK2ChoiceExplanations,
);


const EXPLAINED_SC_QUESTIONS: Question[] = applyChoiceExplanationOverlay(
  applyChoiceExplanationOverlay(
    applyIpaCorrections("sc", RAW_SC_QUESTIONS),
    { ...choiceExplanations, ...cxK7ChoiceExplanations },
  ),
  cxK2ChoiceExplanations,
);


export const SC_QUESTIONS: Question[] = appendReplenishedQuestions([...applyChoiceExplanationOverlay(
  applyChoiceExplanationOverlay(
    applyIpaCorrections("sc", RAW_SC_QUESTIONS),
    { ...choiceExplanations, ...cxK7ChoiceExplanations },
  ),
  cxK2ChoiceExplanations,
), ...official2025Autumn as Question[], ...official2021Spring as Question[]], [
  SC_OFFICIAL_2023_SPRING_PM1,
  SC_QUESTIONS_2023_SPRING_PM2,
  official2022SpringPM1,
  officialQb12,
  officialQb13,
  official2017AutumnPm1,
  official2018AutumnPm2,
  official2020AutumnPm1,
  SC_2023_AUTUMN_PM_QUESTIONS,
  official2017SpringPm1,
  official2024AutumnPm,
  afternoonPlan5,
  official2022SpringPm2,
  official2021SpringPm1,
  official2016SpringPm2,
  plan7_004,
  official2016AutumnPm2,
  SC_2019_AUTUMN_PM1_QUESTIONS,
  official2019SpringPm1,
  official2019SpringPm2,
  official2018AutumnPm1,
  official2018SpringPm1,
  official2020AutumnPm2,
]);
