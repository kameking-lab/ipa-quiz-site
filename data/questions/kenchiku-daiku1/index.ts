import type { Question } from "@/lib/questions/types";
import questions0 from "./2023-late.json";
import questions1 from "./2024-late.json";

export const KENCHIKU_DAIKU1_QUESTIONS: Question[] = [...questions0, ...questions1] as Question[];
