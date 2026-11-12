import type { Question } from "@/lib/questions/types";
import questions2023 from "./2023-early.json";
import questions2024 from "./2024-early.json";

export const CHIKURO1_QUESTIONS: Question[] = [...questions2023, ...questions2024] as Question[];
