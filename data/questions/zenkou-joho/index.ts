import type { Question } from "@/lib/questions/types";
import paper1 from "./2026-early-joho-hardware.json";
import paper2 from "./2026-early-joho-level2.json";
import paper3 from "./2026-early-joho-level3.json";
import paper4 from "./2026-early-joho-programming.json";

export const ZENKOU_JOHO_QUESTIONS = [...paper1, ...paper2, ...paper3, ...paper4] as Question[];
