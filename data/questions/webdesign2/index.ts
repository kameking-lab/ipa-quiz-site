import type { Question } from "@/lib/questions/types";
import round4 from "./2025-round4.json";
import round1 from "./2026-round1.json";
import round2 from "./2026-round2.json";

export const WEBDESIGN2_QUESTIONS = [...round4, ...round1, ...round2] as Question[];
