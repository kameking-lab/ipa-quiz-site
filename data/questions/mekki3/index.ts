import type { Question } from "@/lib/questions/types";
import questions2025 from "./2025-early.json";
import questions2024 from "./2024-early.json";

export const MEKKI3_QUESTIONS: Question[] = [...questions2025, ...questions2024] as Question[];
