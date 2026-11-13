import type { Question } from "@/lib/questions/types";
import questions2024 from "./2024-late.json";
import questions2023 from "./2023-late.json";

export const KENCHIKU_DAIKU2_QUESTIONS: Question[] = [...questions2024, ...questions2023] as Question[];
