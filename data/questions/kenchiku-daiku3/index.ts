import type { Question } from "@/lib/questions/types";
import q0 from "./2023-early.json";
import q1 from "./2023-late.json";

export const KENCHIKU_DAIKU3_QUESTIONS: Question[] = [...q0, ...q1] as Question[];
