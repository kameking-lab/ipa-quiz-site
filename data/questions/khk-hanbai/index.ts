import type { Question } from "@/lib/questions/types";
import batch2026 from "./2026.json";
import batch2025 from "./2025.json";

export const QUESTIONS = [...batch2026, ...batch2025] as Question[];
