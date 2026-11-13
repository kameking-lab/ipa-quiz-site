import type { Question } from "@/lib/questions/types";
import questions0 from "./2023-late.json";
import questions1 from "./2025-late.json";

export const HAIDEN_SEIGYO3_QUESTIONS: Question[] = [...questions0, ...questions1] as Question[];
