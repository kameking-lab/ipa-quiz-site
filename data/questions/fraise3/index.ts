import type { Question } from "@/lib/questions/types";
import questions0 from "./2024-early.json";
import questions1 from "./2023-early.json";

export const FRAISE3_QUESTIONS: Question[] = [...questions0, ...questions1] as Question[];
