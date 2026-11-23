import round1 from "./2026-round1.json";
import round2 from "./2026-round2.json";
import type { Question } from "@/lib/questions/types";

export const QUESTIONS = [...round1, ...round2] as Question[];
