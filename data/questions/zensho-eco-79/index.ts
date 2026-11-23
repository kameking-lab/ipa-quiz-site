import { appendReplenishedQuestions } from "../published";
import annual2025 from "./2025-annual.json";

import annual2024 from "./2024-annual.json";
import type { Question } from "@/lib/questions/types";

import year2025 from "./2025.json";

import year2024 from "./2024.json";


export const ZENSHO_ECO_79_QUESTIONS: Question[] = appendReplenishedQuestions([...year2025, ...year2024] as Question[], [
  annual2025,
  annual2024,
]);
