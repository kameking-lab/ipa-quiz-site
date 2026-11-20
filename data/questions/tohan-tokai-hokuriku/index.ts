import type { Question } from "@/lib/questions/types";
import questions2024 from "./2024.json";
import questions2025 from "./2025.json";
import questions2026 from "./2026.json";

export const TOHAN_TOKAI_HOKURIKU_QUESTIONS = [...questions2026, ...questions2025, ...questions2024] as Question[];
