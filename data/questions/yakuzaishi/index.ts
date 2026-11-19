import type { ChoiceKey, Question } from "@/lib/questions/types";

import paper2026 from "./2026-annual.json";


import practical2026Day2Part2 from "./2026-day2-2-official.json";

import paper2025 from "./2025-annual.json";


import required2023 from "./2023-required-official.json";

import theory2025Q127 from "./2025-theory-q127-local.json";

import reviewed52 from "./2025-2026-reviewed52.json";

import round110Day1Part3 from "./2025-day1-3-official-import.json";

import round108Day2Part2 from "./2023-day2-2-official.json";

import practical110Day2First from "./plan5-212-completion.json";

import practical108Day2Third from "./plan5-226-completion.json";


import practical2025Day2Paper2 from "./2025-day2-2-plan5.json";


import required2022 from "./2022-day1-1-plan5.json";

import dayTwoThird2025 from "./2025-day2-3-plan5-qe4.json";

import dayOneSecond2022 from "./2022-day1-2-plan5-qf4.json";


import required2024 from "./2024-required.json";


import theory2022 from "./2022-theory-day1-3.json";

import theory2024Day1Part2 from "./2024-day1-2-plan5.json";

import practical2022Day2Part1 from "./2022-day2-1-plan5.json";


import required2026 from "./2026-required-plan5.json";


import theory2024Day1Third from "./2024-day1-3-plan5.json";


import practical2022Day2Second from "./2022-day2-2-plan5.json";

import theory2026DayOne from "./2026-day1-2-plan5-imported.json";

import practical2024DayTwo from "./2024-day2-1-plan5.json";

import practical2022DayTwo from "./2022-day2-3-plan5.json";


import dayOneTheory from "./2026-day1-3-plan5-imported.json";


import dayTwoPractice2024 from "./2024-day2-2-plan5.json";

import round111Day2Part1 from "./2026-day2-1-qf10.json";

import round109Day2Part3 from "./2024-day2-3-qf10.json";

import dayTwoThirdPaper2026 from "./2026-day2-3-completion.json";

import dayOneSecondPaper2023 from "./2023-day1-2-completion.json";


import required2025 from "./2025-required-imported-plan5.json";


import theory2023Day1Booklet3 from "./2023-day1-3-official.json";

import day1Part2_2025 from "./2025-day1-2-official-import.json";

import day2Part1_2023 from "./2023-day2-1-official.json";


/** 第108・110・111回の確認済み原問。 */
export const YAKUZAISHI_QUESTIONS: Question[] = [
  ...(paper2026 as Question[]),
  ...(practical2026Day2Part2 as Question[]),
  ...(paper2025 as Question[]),
  ...(required2023 as Question[]),
  ...(theory2025Q127 as Question[]),
  ...(reviewed52 as Question[]),
  ...(round110Day1Part3 as Question[]),
  ...(round108Day2Part2 as Question[]),
  ...(practical110Day2First as Question[]),
  ...(practical108Day2Third as Question[]),
  ...(practical2025Day2Paper2 as Question[]),
  ...(required2022 as Question[]),
  ...(dayTwoThird2025 as Question[]).map(question => ({
    ...question,
    answer: typeof question.answer === "string" && question.answer.includes(",")
      ? question.answer.split(",").map(choice => choice.trim() as ChoiceKey)
      : question.answer,
  })),
  ...(dayOneSecond2022 as Question[]),
  ...(required2024 as Question[]),
  ...(theory2022 as Question[]),
  ...(theory2024Day1Part2 as Question[]),
  ...(practical2022Day2Part1 as Question[]),
  ...(required2026 as Question[]),
  ...(theory2024Day1Third as Question[]),
  ...(practical2022Day2Second as Question[]),
  ...(theory2026DayOne as Question[]),
  ...(practical2024DayTwo as Question[]),
  ...(practical2022DayTwo as Question[]),
  ...(dayOneTheory as Question[]),
  ...(dayTwoPractice2024 as Question[]),
  ...(round111Day2Part1 as Question[]),
  ...(round109Day2Part3 as Question[]),
  ...(dayTwoThirdPaper2026 as Question[]),
  ...(dayOneSecondPaper2023 as Question[]),
  ...(required2025 as Question[]),
  ...(theory2023Day1Booklet3 as Question[]),
  ...(day1Part2_2025 as Question[]),
  ...(day2Part1_2023 as Question[]),
].sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
