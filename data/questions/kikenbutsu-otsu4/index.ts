import type { Question } from "@/lib/questions/types";
import corrected2025 from "./2025-published.json";
import published2026 from "./published-202606.json";

export const QUESTIONS = (published2026 as Question[]).concat(corrected2025 as Question[]);
