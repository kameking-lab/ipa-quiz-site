import type { Question } from "@/lib/questions/types";
import early2024 from "./2024-early.json";
import late2025 from "./2025-late.json";

export const KIKAI_KENSA3_QUESTIONS: Question[] = [...late2025, ...early2024] as Question[];
