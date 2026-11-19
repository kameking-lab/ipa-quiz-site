import type { Question } from "@/lib/questions/types";
import data2026 from "./2026-kiso-selected.json";
import data2025 from "./2025-kiso-selected.json";

export const RODO_KIJUN_KANTOKUKAN_QUESTIONS = [...data2026, ...data2025] as Question[];
