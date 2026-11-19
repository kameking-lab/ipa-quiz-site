import type { Question } from "@/lib/questions/types";
import round48 from "./2024-second.json";
import round49 from "./2025-first.json";
import round50 from "./2025-second.json";

export const KATEI_HOIKU_QUESTIONS = [...round48, ...round49, ...round50] as Question[];
