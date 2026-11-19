import type { Question } from "@/lib/questions/types";
import second2024 from "./2024-second.json";
import first2024 from "./2024-first.json";
import second2023 from "./2023-second.json";

export const KOUNIN_PHYSICS_QUESTIONS: Question[] = [
  ...(second2024 as Question[]),
  ...(first2024 as Question[]),
  ...(second2023 as Question[]),
];
