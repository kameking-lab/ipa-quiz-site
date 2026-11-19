import type { Question } from "@/lib/questions/types";
import late2025 from "./2025-late.json";
import early2026 from "./2026-early.json";

export const BIZ_CAREER_LOGISTICS3_QUESTIONS = [...early2026, ...late2025] as Question[];
