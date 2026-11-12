import type { Question } from "@/lib/questions/types";
import questionsEarly from "./2025-early.json";
import questionsLate from "./2025-late.json";
import questions2023Early from "./2023-early.json";

export const DENSHI_KIKI_KUMITATE3_QUESTIONS: Question[] = [...questionsEarly, ...questionsLate, ...questions2023Early] as Question[];
