import type { Question } from "@/lib/questions/types";
import march2026 from "./2026-march.json";
import round2Of2026 from "./2026-round2.json";

export const CHUKEN3_QUESTIONS = [...round2Of2026, ...march2026] as Question[];
