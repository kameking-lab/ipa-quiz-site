import type { Question } from "@/lib/questions/types";
import questions2025 from "./2025-early.json";
import questions2023 from "./2023-early.json";

export const KOJO_BANKIN3_QUESTIONS: Question[] = [...questions2025, ...questions2023] as Question[];
