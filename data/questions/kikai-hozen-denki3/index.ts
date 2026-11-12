import type { Question } from "@/lib/questions/types";
import round2026 from "./2026-round1.json";
import round2025 from "./2025-round2.json";

export const QUESTIONS: Question[] = [...round2026, ...round2025] as Question[];
