import type { Question } from "@/lib/questions/types";
import general2025 from "./2025-kogai-general.json";
import airBasics2025 from "./2025-kogai-air-basics.json";
import airTechnology2025 from "./2025-kogai-air-technology.json";

export const KOGAI_QUESTIONS: Question[] = [...general2025, ...airBasics2025, ...airTechnology2025] as Question[];
