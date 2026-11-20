import type { Question } from "@/lib/questions/types";
import line2024Second from "./2024-second-line.json";
import law2024Second from "./2024-second-law.json";
import transmission2024Second from "./2024-second-transmission.json";
import law2024First from "./2024-first-law.json";
import system2024First from "./2024-first-system.json";
import system2024Second from "./2024-second-system.json";

export const DEKYO_CHIEF_2_QUESTIONS: Question[] = [
  ...system2024Second as Question[],
  ...law2024Second as Question[],
  ...transmission2024Second as Question[],
  ...line2024Second as Question[],
  ...system2024First as Question[],
  ...law2024First as Question[],
];
