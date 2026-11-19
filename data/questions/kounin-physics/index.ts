import type { Question } from "@/lib/questions/types";
import second2024 from "./2024-second.json";

export const KOUNIN_PHYSICS_QUESTIONS: Question[] = [
  ...(second2024 as Question[]),
];
