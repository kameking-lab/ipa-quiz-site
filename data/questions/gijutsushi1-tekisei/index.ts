import { appendReplenishedQuestions } from "../published";
import data from "./2021.json";
import source from "./2022.json";
import rows from "./2023.json";
import type { Question } from "@/lib/questions/types";

export const GIJUTSUSHI1_TEKISEI_QUESTIONS = appendReplenishedQuestions(data as Question[], [
  source,
  rows,
]);

export const QUESTIONS = rows as Question[];
