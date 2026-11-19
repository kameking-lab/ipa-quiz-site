import type { Question } from "@/lib/questions/types";
import second2024 from "./2024-second.json";
import first2024 from "./2024-first.json";

export const DEKYO_CHIEF_SYSTEM_QUESTIONS = [...second2024, ...first2024] as Question[];
