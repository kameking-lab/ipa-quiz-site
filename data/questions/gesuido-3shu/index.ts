import type { Question } from "@/lib/questions/types";
import annual2026 from "./2026.json";
import annual2025 from "./2025.json";

export const QUESTIONS = [...annual2026, ...annual2025] as Question[];
