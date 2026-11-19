import paper0 from "./2024-annual.json";

import paper1 from "./2025-annual.json";

import type { Question } from "@/lib/questions/types";



import questions from "./2023-38-business-management.json";

export const ZENSHO_ECO81_QUESTIONS = [...paper1, ...paper0, ...questions] as Question[];
