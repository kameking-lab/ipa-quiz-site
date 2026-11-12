import type { Question } from "@/lib/questions/types";
import round1 from "./2025-round1.json";
import round2 from "./2025-round2.json";
import previousRound1 from "./2024-round1.json";
import olderRound1 from "./2023-round1.json";

export const KIKAI_HOZEN3_QUESTIONS: Question[] = [...round1, ...round2, ...previousRound1, ...olderRound1] as Question[];
