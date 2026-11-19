import type { Question } from "@/lib/questions/types";


import data from "./official-2026-round1-gakka.json";


import questions from "./2025-round3-writing-reading.json";

export const EIKENP2PLUS_QUESTIONS = [...data, ...questions] as Question[];
