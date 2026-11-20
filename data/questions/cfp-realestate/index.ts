import type { Question } from "@/lib/questions/types";
import round2_2024 from "./2024-round2-gakka.json";
import round1_2025 from "./2025-round1-gakka.json";
import round2_2025 from "./2025-round2-gakka.json";

export const CFP_REALESTATE_QUESTIONS = [...round2_2025, ...round1_2025, ...round2_2024] as Question[];
