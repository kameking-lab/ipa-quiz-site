import round2 from "./2026-round2-selected.json";
import round1 from "./2026-round1-selected.json";
import type { Question } from "@/lib/questions/types";

export const CFP_3_QUESTIONS = [...round2, ...round1] as Question[];
