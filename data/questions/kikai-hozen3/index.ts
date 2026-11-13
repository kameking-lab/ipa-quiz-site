import type { Question } from "@/lib/questions/types";
import questions0 from "./2023-round2.json";
import questions1 from "./2024-round2.json";
import questions2 from "./2025-round1.json";
import questions3 from "./2025-round2.json";
import questions4 from "./2024-round1.json";
import questions5 from "./2023-round1.json";

export const QUESTIONS: Question[] = [...questions0, ...questions1, ...questions2, ...questions3, ...questions4, ...questions5] as Question[];

export const KIKAI_HOZEN3_QUESTIONS = QUESTIONS;
