import paper0 from "./2025-february.json";
import paper1 from "./2026-round1.json";
import paper2 from "./2026-round2.json";
import type { Question } from "@/lib/questions/types";

export const WEBDESIGN3_QUESTIONS: Question[] = [...paper0, ...paper1, ...paper2] as Question[];
