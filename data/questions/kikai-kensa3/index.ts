import type { Question } from "@/lib/questions/types";
import questions2023 from "./2023-early.json";
import questions2025 from "./2025-early.json";

export const KIKAI_KENSA3_QUESTIONS: Question[] = [...questions2023, ...questions2025] as Question[];
