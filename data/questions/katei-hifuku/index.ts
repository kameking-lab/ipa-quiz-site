import type { Question } from "@/lib/questions/types";
import paper1 from "./2025-annual-gakka.json";
import round53 from "./2021-first.json";
import round54 from "./2021-second.json";
import round55 from "./2022-first.json";

export const KATEI_HIFUKU_QUESTIONS = [...paper1, ...round55, ...round54, ...round53] as Question[];
