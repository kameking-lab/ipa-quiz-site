import type { Question } from "@/lib/questions/types";
import questions0 from "./2024-early.json";
import questions1 from "./2025-early.json";

export const KIKAI_SHIAGE1_QUESTIONS: Question[] = [...questions1, ...questions0] as Question[];
