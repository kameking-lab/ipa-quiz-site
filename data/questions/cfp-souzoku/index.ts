import type { Question } from "@/lib/questions/types";
import first2025 from "./2025-first.json";
import second2025 from "./2025-second.json";
import second2024 from "./2024-second.json";

export const CFP_SOUZOKU_QUESTIONS: Question[] = [
  ...second2025 as Question[],
  ...first2025 as Question[],
  ...second2024 as Question[],
];
