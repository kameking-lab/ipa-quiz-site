import type { Question } from "@/lib/questions/types";
import february from "./2026-february-houki.json";
import june from "./2026-june-houki.json";

export const RIKU_TOKU_KOKUNAI_QUESTIONS: Question[] = [...february, ...june] as Question[];
