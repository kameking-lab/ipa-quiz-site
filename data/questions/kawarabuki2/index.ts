import late2025 from "./2025-late.json";
import late2024 from "./2024-late.json";
import type { Question } from "@/lib/questions/types";

export const KAWARABUKI2_QUESTIONS = [...late2025, ...late2024] as Question[];
