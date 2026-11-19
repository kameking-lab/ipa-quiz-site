import type { Question } from "@/lib/questions/types";
import round2024Second from "./2024-round2.json";
import round2024First from "./2024-round1.json";

export const KOUNIN_QUESTIONS: Question[] = [
  ...(round2024Second as Question[]),
  ...(round2024First as Question[]),
];
