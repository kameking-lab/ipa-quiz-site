import { appendReplenishedQuestions } from "../published";
import data from "./2026-kiso-selected.json";
import kiso2025 from "./2025-kiso.json";

import kiso2026 from "./2026-kiso.json";

import type { Question } from "@/lib/questions/types";


export const KOKKA_SOGO_DAI_QUESTIONS = appendReplenishedQuestions(data as Question[], [
  kiso2025,
  kiso2026,
]);
