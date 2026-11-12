import type { Question } from "@/lib/questions/types";
import questions2024 from "./2024-early.json";
import questions2025 from "./2025-early.json";

export const KAGAKU_BUNSEKI1_QUESTIONS: Question[] = [...questions2024, ...questions2025] as Question[];
