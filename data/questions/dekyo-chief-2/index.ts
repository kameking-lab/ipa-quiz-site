import type { Question } from "@/lib/questions/types";
import law2024Second from "./2024-second-law.json";
import system2024Second from "./2024-second-system.json";

export const DEKYO_CHIEF_2_QUESTIONS: Question[] = [
  ...system2024Second as Question[],
  ...law2024Second as Question[],
];
