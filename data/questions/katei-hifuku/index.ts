import type { Question } from "@/lib/questions/types";
import round61 from "./2025-first.json";
import round60 from "./2024-second.json";
import round59 from "./2024-first.json";

export const KATEI_HIFUKU_QUESTIONS = [...round61, ...round60, ...round59] as Question[];
