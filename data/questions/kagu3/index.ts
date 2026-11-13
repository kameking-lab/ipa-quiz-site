import type { Question } from "@/lib/questions/types";
import questions2025 from "./2025-late.json";
import questions2023 from "./2023-late.json";

export const KAGU3_QUESTIONS: Question[] = [...questions2025, ...questions2023] as Question[];
