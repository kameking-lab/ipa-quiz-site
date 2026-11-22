import { appendReplenishedQuestions } from "../published";
import year2021 from "./2021-36-business.json";
import year2025 from "./2025-annual.json";

import year2024 from "./2024-annual.json";

import data from "./2022-37-business.json";

import type { Question } from "@/lib/questions/types";

import year2023 from "./2023-annual.json";


export const ZENSHO_ECO_77_QUESTIONS = appendReplenishedQuestions([...year2025, ...year2024] as Question[], [
  data,
  year2023,
  year2021,
]);
