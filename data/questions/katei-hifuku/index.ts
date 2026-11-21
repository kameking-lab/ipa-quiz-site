import type { Question } from "@/lib/questions/types";
import paper1 from "./2025-annual-gakka.json";
import round53 from "./2021-first.json";

export const KATEI_HIFUKU_QUESTIONS = [...paper1, ...round53] as Question[];
