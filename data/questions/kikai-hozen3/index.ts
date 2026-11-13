import type { Question } from "@/lib/questions/types";
import round2023 from "./2023-round2.json";
import questions from "./2024-round2.json";

export const QUESTIONS: Question[] = [...questions as Question[], ...round2023 as Question[]];
