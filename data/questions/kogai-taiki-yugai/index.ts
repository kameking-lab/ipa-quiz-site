import type { Question } from "@/lib/questions/types";
import paper2023 from "./2023-annual.json";
import paper2024 from "./2024-annual.json";
import paper2025 from "./2025-annual.json";

export const KOGAI_TAIKI_YUGAI_QUESTIONS: Question[] = [...paper2025, ...paper2024, ...paper2023] as Question[];
