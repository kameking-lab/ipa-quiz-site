import type { Question } from "@/lib/questions/types";
import questionsEarly from "./2025-early.json";
import questionsLate from "./2025-late.json";

export const DENSHI_KIKI_KUMITATE3_QUESTIONS: Question[] = [...questionsEarly, ...questionsLate] as Question[];
