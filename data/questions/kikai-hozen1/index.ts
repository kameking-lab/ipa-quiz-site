import type { Question } from "@/lib/questions/types";
import questions from "./2024-round2.json";
import round2023 from "./2023-round2.json";

export const QUESTIONS: Question[] = [...questions, ...round2023] as Question[];
