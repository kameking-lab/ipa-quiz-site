import type { Question } from "@/lib/questions/types";
import round49 from "./2025-first.json";
import round50 from "./2025-second.json";

export const KATEI_HOIKU_QUESTIONS = [...round49, ...round50] as Question[];
