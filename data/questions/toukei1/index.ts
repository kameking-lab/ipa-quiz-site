import { appendReplenishedQuestions } from "../published";
import data from "./2025-suri-selected.json";

import suri from "./2025-suri-selected.json";


import ouyo from "./2025-ouyo.json";


import type { Question } from "@/lib/questions/types";

export const TOUKEI1_QUESTIONS = appendReplenishedQuestions(data as Question[], [
  ouyo,
]);
