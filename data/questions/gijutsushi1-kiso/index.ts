import type { Question } from "@/lib/questions/types";
import questions2025 from "./2025-annual.json";
import questions2024 from "./2024-annual.json";

export const GIJUTSUSHI1_KISO_QUESTIONS = [...questions2025, ...questions2024] as Question[];
