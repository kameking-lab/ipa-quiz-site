import { appendReplenishedQuestions } from "../published";
import official2022Secondary from "./official-2022-second-power-management.json";

import official2021Secondary from "./official-2021-second-machine-control.json";

import plan7273 from "./official-2023-secondary-machine-control.json";


import official2022SecondMachineControl from "./official-2022-second-machine-control.json";

import official2025SecondPowerManagement from "./official-2025-second-power-management.json";


import official2024Secondary from "./official-2024-second-power-management.json";
import official2025SecondMachineControl from "./official-2025-second-machine-control.json";

import type { Question } from "@/lib/questions/types";

import launch from "./launch.json";

import theoryAq02 from "./theory-aq02.json";

import theoryAq03 from "./theory-aq03.json";




/** 令和8年度第一種電気主任技術者一次試験の5原問・25空欄。 */
export const DENKEN1_PRIMARY_QUESTIONS = [...launch, ...theoryAq02, ...theoryAq03] as Question[];


import official2023SecondDenryoku from "./official-2023-second-denryoku.json";

import official2024SecondKikai from "./official-2024-second-kikai.json";


export const DENKEN1_QUESTIONS = [
  ...DENKEN1_PRIMARY_QUESTIONS,
  ...official2021Secondary,
  ...official2022SecondMachineControl,
  ...official2022Secondary,
  ...official2023SecondDenryoku,
  ...official2024SecondKikai,
  ...official2024Secondary,
  ...official2025SecondMachineControl,
  ...official2025SecondPowerManagement,
] as Question[];

export const ALL_DENKEN1_QUESTIONS = appendReplenishedQuestions(DENKEN1_QUESTIONS, [
  plan7273,
]);
