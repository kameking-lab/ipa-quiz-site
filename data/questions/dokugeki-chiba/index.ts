import type { Question } from "@/lib/questions/types";
import questions from "../batch3/dokugeki-chiba.json";
import annual2024 from "./2024-annual.json";
/** INT7 public projection; reviewed source manuscripts remain private and unchanged. */
export const QUESTIONS = [...questions, ...annual2024] as Question[];
