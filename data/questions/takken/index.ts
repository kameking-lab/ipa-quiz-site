import official2020 from "./official-2020-october-gakka.json";

import official2018OctoberGakka from "./official-2018-october-gakka.json";
import official2019OctoberGakka from "./official-2019-october-gakka.json";


import type { Question } from "@/lib/questions/types";


import { TAKKEN_2023_QUESTIONS } from "./2023";


import { TAKKEN_2022_QUESTIONS } from "./2022";

import { TAKKEN_2021_DECEMBER_QUESTIONS } from "./2021-december";


import { TAKKEN_2021_OCTOBER_QUESTIONS } from "./2021-october";

import { TAKKEN_2017_QUESTIONS } from "./2017";


import { TAKKEN_2016_QUESTIONS } from "./2016";


import { TAKKEN_2024_QUESTIONS } from "./2024";


import { TAKKEN_2025_QUESTIONS } from "./2025";

import official2020LateGakka from "./official-2020-late-gakka.json";

export const TAKKEN_QUESTIONS: Question[] = [
  ...(official2020LateGakka as Question[]),
  ...TAKKEN_2025_QUESTIONS,
  ...TAKKEN_2024_QUESTIONS,
  ...TAKKEN_2023_QUESTIONS,
  ...TAKKEN_2022_QUESTIONS,
  ...TAKKEN_2021_DECEMBER_QUESTIONS,
  ...TAKKEN_2021_OCTOBER_QUESTIONS,
  ...TAKKEN_2017_QUESTIONS,
  ...TAKKEN_2016_QUESTIONS,
  ...(official2020 as Question[]),
  ...(official2018OctoberGakka as Question[]),
  ...(official2019OctoberGakka as Question[]),
];
