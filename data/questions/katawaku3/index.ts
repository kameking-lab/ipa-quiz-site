import type { Question } from "@/lib/questions/types";
import questions0 from "./2024-late.json";
import questions1 from "./2025-late.json";
import questions2 from "./2023-late.json";

export const KATAWAKU3_QUESTIONS: Question[] = [...questions0, ...questions1, ...questions2] as Question[];
