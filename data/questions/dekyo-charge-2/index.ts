import first2026 from "./2026-first-law.json";
import second2025 from "./2025-second-law.json";
import first2025 from "./2025-first-law.json";
import first2026BasicTechnology from "./2026-first-basic-technology.json";
import second2025BasicTechnology from "./2025-second-basic-technology.json";
import first2025BasicTechnology from "./2025-first-basic-technology.json";
import type { Question } from "@/lib/questions/types";

export const DEKYO_CHARGE_2_QUESTIONS = [
  ...first2026BasicTechnology, ...first2026,
  ...second2025BasicTechnology, ...second2025,
  ...first2025BasicTechnology, ...first2025,
] as Question[];
