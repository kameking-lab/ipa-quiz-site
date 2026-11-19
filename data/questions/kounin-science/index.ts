import type { Question } from "@/lib/questions/types";
import first2024 from "./2024-first.json";
import second2024 from "./2024-second.json";

export const KOUNIN_SCIENCE_QUESTIONS = [...second2024, ...first2024] as Question[];
