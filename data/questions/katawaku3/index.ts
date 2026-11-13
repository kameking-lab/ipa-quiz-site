import type { Question } from "@/lib/questions/types";
import late2024 from "./2024-late.json";
import late2025 from "./2025-late.json";

export const KATAWAKU3_QUESTIONS: Question[] = [...late2025, ...late2024] as Question[];
