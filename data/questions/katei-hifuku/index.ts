import type { Question } from "@/lib/questions/types";
import paper1 from "./2025-annual-gakka.json";
import round60 from "./2024-second.json";
import round59 from "./2024-first.json";
import round57 from "./2023-first.json";
import round58 from "./2023-second.json";

export const KATEI_HIFUKU_QUESTIONS = [...paper1, ...round59, ...round60, ...round59, ...round58, ...round57] as Question[];
