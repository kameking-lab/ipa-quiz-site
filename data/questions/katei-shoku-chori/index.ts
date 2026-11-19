import type { Question } from "@/lib/questions/types";
import round60 from "./2024-second.json";
import round61 from "./2025-first.json";
import round62 from "./2025-second.json";

export const KATEI_SHOKU_CHORI_QUESTIONS = [...round60, ...round61, ...round62] as Question[];
