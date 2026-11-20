import type { Question } from "@/lib/questions/types";
import general2022 from "./2022-annual-ippan.json";
import general2023 from "./2023-annual-ippan.json";
import general2024 from "./2024-annual-ippan.json";
import general2025 from "./2025-annual-ippan.json";
import air2025 from "./2025-annual-taiki-gairon.json";
import water2025 from "./2025-annual-suishitsu-gairon.json";

export const KOGAI_13_QUESTIONS: Question[] = [...general2025, ...air2025, ...water2025, ...general2024, ...general2023, ...general2022] as Question[];
