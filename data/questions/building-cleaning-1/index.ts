import { appendReplenishedQuestions } from "../published";
import data from "./2025.json";
import source from "./2024.json";

import type { Question } from "@/lib/questions/types";


export const BUILDING_CLEANING_1_QUESTIONS = appendReplenishedQuestions(data as Question[], [
  source,
]);
