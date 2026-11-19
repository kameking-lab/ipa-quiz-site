import type { Question } from "@/lib/questions/types";
import third2024 from "./2024-third.json";

export const KANKEN_2_QUESTIONS: Question[] = [
  ...(third2024 as Question[]),
];
