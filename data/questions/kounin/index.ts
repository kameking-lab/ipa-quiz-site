import type { Question } from "@/lib/questions/types";
import round2024Second from "./2024-round2.json";

export const KOUNIN_QUESTIONS: Question[] = [
  ...(round2024Second as Question[]),
];
