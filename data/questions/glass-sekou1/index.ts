import type { Question } from "@/lib/questions/types";
import paper2024 from "./2024-late.json";
import paper2025 from "./2025-late.json";

export const GLASS_SEKOU1_QUESTIONS: Question[] = [...paper2024, ...paper2025] as Question[];
