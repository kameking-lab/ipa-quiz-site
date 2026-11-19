import type { Question } from "@/lib/questions/types";
import february2023 from "./2023-february-houki.json";
import october2025 from "./2025-october-houki.json";
import february from "./2026-february-houki.json";
import june from "./2026-june-houki.json";

export const RIKU_TOKU_KOKUNAI_QUESTIONS: Question[] = [...february2023, ...october2025, ...february, ...june] as Question[];
