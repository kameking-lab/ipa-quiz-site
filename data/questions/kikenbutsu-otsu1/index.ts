import type { Question } from "@/lib/questions/types";
import published2026 from "./published-202606.json";
import published2025 from "./published-202506.json";
export const QUESTIONS: Question[] = [
  ...(published2026 as Question[]),
  ...(published2025 as Question[]),
];
