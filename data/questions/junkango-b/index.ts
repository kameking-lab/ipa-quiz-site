import type { Question } from "@/lib/questions/types";
import questions2026 from "./2026-annual.json";
import questions2025 from "./2025-annual.json";

export const QUESTIONS = [...questions2026, ...questions2025] as Question[];
