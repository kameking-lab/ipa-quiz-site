import type { Question } from "@/lib/questions/types";
import questions0 from "./2023-late.json";
import questions1 from "./2025-late.json";

export const PAN_SEIZO1_QUESTIONS: Question[] = [...questions1, ...questions0] as Question[];
