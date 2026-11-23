import type { Question } from "@/lib/questions/types";
import q0 from "./2025-early.json";
import q1 from "./2025-late.json";

export const FUTSU_SENBAN3_QUESTIONS: Question[] = [...q0, ...q1] as Question[];
