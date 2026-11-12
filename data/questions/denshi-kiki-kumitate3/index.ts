import type { Question } from "@/lib/questions/types";
import questions2024Early from "./2024-early.json";
import questions2024Late from "./2024-late.json";

export const DENSHI_KIKI_KUMITATE3_QUESTIONS: Question[] = [...questions2024Early, ...questions2024Late] as Question[];
