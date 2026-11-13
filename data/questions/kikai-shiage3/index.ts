import type { Question } from "@/lib/questions/types";
import questions0 from "./2023-early.json";
import questions1 from "./2025-early.json";

export const KIKAI_SHIAGE3_QUESTIONS: Question[] = [...questions1, ...questions0] as Question[];
