import { appendReplenishedQuestions } from "../published";
import { applyIpaCorrections } from "../corrections";


import type { Question } from "@/lib/questions/types";


import { BY_YEAR_QUESTIONS } from "./by-year";


import officialQc12 from "./official-2026-cbt-am-qc12.json";


import official2021 from "./2021-cbt-am-official-qc14.json";

import official2016SpringAm from "./official-2016-spring-am.json";

const RAW_IP_QUESTIONS: Question[] = [...BY_YEAR_QUESTIONS, ...officialQc12 as Question[]];

export const IP_QUESTIONS: Question[] = appendReplenishedQuestions(applyIpaCorrections("ip", RAW_IP_QUESTIONS), [
  official2021,
  official2016SpringAm,
]);
