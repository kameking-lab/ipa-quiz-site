import type { Question } from "@/lib/questions/types";
import round2 from "./2026-round2.json";
import round1 from "./2026-round1.json";
import round3 from "./2025-round3.json";

export const EIKEN5_QUESTIONS = [...round3, ...round1, ...round2] as Question[];
