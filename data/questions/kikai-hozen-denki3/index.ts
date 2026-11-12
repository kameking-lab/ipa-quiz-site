import type { Question } from "@/lib/questions/types";
import round1 from "./2025-round1.json";
import previousRound1 from "./2024-round1.json";

export const KIKAI_HOZEN_DENKI3_QUESTIONS: Question[] = [...round1, ...previousRound1] as Question[];
