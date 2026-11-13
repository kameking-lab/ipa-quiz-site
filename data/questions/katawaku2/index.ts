import type { Question } from "@/lib/questions/types";
import questions2024 from "./2024-late.json";
import questions2025 from "./2025-late.json";

export const KATAWAKU2_QUESTIONS: Question[] = [...questions2024, ...questions2025] as Question[];
