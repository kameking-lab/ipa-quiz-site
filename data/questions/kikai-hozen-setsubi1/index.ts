import type { Question } from "@/lib/questions/types";
import round2 from "./2024-round2.json";
import previousRound2 from "./2023-round2.json";

export const QUESTIONS: Question[] = [...round2, ...previousRound2] as Question[];
