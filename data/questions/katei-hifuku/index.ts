import type { Question } from "@/lib/questions/types";
import paper1 from "./2025-annual-gakka.json";
import round60 from "./2024-second.json";
import round59 from "./2024-first.json";
import round58 from "./2023-second.json";
import round57 from "./2023-first.json";
import round53 from "./2021-first.json";
import round54 from "./2021-second.json";
import round55 from "./2022-first.json";
import round56 from "./2022-second.json";

export const KATEI_HIFUKU_QUESTIONS = [...paper1, ...round60, ...round59, ...round58, ...round57, ...round56, ...round55, ...round54, ...round53] as Question[];
