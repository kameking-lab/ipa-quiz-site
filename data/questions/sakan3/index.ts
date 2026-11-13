import type { Question } from "@/lib/questions/types";
import questions0 from "./2023-early.json";
import questions1 from "./2025-early.json";

export const SAKAN3_QUESTIONS: Question[] = [...questions0, ...questions1] as Question[];
