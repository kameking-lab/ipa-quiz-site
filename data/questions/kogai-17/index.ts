import type { Question } from "@/lib/questions/types";
import annual2025 from "./2025-annual.json";

export const KOGAI_17_QUESTIONS: Question[] = [
  ...(annual2025 as Question[]),
];
