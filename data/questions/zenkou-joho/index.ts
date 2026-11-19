import type { Question } from "@/lib/questions/types";
import paper1 from "./2025-late-joho-hardware.json";
import paper2 from "./2025-late-joho-level2.json";
import paper3 from "./2025-late-joho-level3.json";
import paper4 from "./2025-late-joho-programming.json";
import paper5 from "./2026-early-joho-hardware.json";
import paper6 from "./2026-early-joho-level2.json";
import paper7 from "./2026-early-joho-level3.json";
import paper8 from "./2026-early-joho-programming.json";

export const ZENKOU_JOHO_QUESTIONS = [...paper1, ...paper2, ...paper3, ...paper4, ...paper5, ...paper6, ...paper7, ...paper8] as Question[];
