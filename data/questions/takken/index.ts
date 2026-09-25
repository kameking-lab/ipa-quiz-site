import type { Question } from "@/lib/questions/types";
import { TAKKEN_2024_QUESTIONS } from "./2024";
import { TAKKEN_2025_QUESTIONS } from "./2025";

export const TAKKEN_QUESTIONS: Question[] = [
  ...TAKKEN_2025_QUESTIONS,
  ...TAKKEN_2024_QUESTIONS,
];
