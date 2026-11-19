import type { Question } from "@/lib/questions/types";
import general2023 from "./2023-annual-ippan.json";
import general2024 from "./2024-annual-ippan.json";
import general2025 from "./2025-annual-ippan.json";
import air2025 from "./2025-annual-taiki-gairon.json";

export const KOGAI_13_QUESTIONS: Question[] = [...general2025, ...air2025, ...general2024, ...general2023] as Question[];
