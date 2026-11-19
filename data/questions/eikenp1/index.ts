import paper0 from "./2025-january.json";
import paper1 from "./2026-first.json";
import paper2 from "./2026-second.json";
import type { Question } from "@/lib/questions/types";

export const EIKENP1_QUESTIONS: Question[] = [...paper0, ...paper1, ...paper2] as Question[];
