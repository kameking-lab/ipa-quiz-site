import type { Question } from "@/lib/questions/types";
import questions2024 from "./2024-early.json";
import questions2023 from "./2023-early.json";

export const SASSHI2_QUESTIONS: Question[] = [...questions2024, ...questions2023] as Question[];
