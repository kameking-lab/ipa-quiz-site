import type { Question } from "@/lib/questions/types";
import line2023Second from "./2023-second-line.json";
import line2024First from "./2024-first-line.json";
import line2024Second from "./2024-second-line.json";
import law2024Second from "./2024-second-law.json";
import transmission2023Second from "./2023-second-transmission.json";
import transmission2024Second from "./2024-second-transmission.json";
import transmission2024First from "./2024-first-transmission.json";
import law2023Second from "./2023-second-law.json";
import law2024First from "./2024-first-law.json";
import system2023Second from "./2023-second-system.json";
import system2024First from "./2024-first-system.json";
import system2024Second from "./2024-second-system.json";

export const DEKYO_CHIEF_2_QUESTIONS: Question[] = [
  ...system2024Second as Question[],
  ...law2024Second as Question[],
  ...transmission2024Second as Question[],
  ...line2024Second as Question[],
  ...system2024First as Question[],
  ...law2024First as Question[],
  ...transmission2024First as Question[],
  ...line2024First as Question[],
  ...system2023Second as Question[],
  ...law2023Second as Question[],
  ...transmission2023Second as Question[],
  ...line2023Second as Question[],
];
