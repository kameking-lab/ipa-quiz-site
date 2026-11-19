import late2025 from "./2025-late.json";
import type { Question } from "@/lib/questions/types";

import year2025 from "./2025.json";

import year2024 from "./2024.json";


export const CAREER_GINO_1_QUESTIONS: Question[] = [...year2025, ...year2024] as Question[];
