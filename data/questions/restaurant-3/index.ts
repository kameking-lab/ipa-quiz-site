import y2026 from "./2026-annual.json";
import y2025 from "./2025-annual.json";
import type { Question } from "@/lib/questions/types";

export const RESTAURANT_3_QUESTIONS = [...y2026, ...y2025] as Question[];
