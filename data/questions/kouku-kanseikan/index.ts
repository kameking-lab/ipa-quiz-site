import type { Question } from "@/lib/questions/types";
import basic2025 from "./2025-basic.json";
import foreignLanguage2025 from "./2025-foreign-language.json";

export const KOUKU_KANSEIKAN_QUESTIONS: Question[] = [
  ...(basic2025 as Question[]),
  ...(foreignLanguage2025 as Question[]),
];
