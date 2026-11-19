import type { Question } from "@/lib/questions/types";
import annual2026 from "./2026-annual.json";
import annual2025 from "./2025-annual.json";

export const RESTAURANT_2_QUESTIONS: Question[] = [...annual2026, ...annual2025] as Question[];
