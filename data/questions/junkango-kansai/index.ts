import type { Question } from "@/lib/questions/types";
import questions from "../batch3/junkango-kansai.json";
import questions2024 from "./2024.json";
import questions2023 from "./2023.json";
/** INT7 public projection; reviewed source manuscripts remain private and unchanged. */
export const QUESTIONS = [...questions, ...questions2024, ...questions2023] as Question[];
