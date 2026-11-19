import type { Question } from "@/lib/questions/types";
import general2025 from "./2025-annual-ippan.json";
import air2025 from "./2025-annual-taiki-gairon.json";

export const KOGAI_13_QUESTIONS: Question[] = [...general2025, ...air2025] as Question[];
