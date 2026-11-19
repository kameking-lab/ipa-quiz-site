import type { Question } from "@/lib/questions/types";


import grade1 from "./2026-76-1.json";


import grade3 from "./2025-74-3.json";


import paper1 from "./2025-75-1.json";


import paper2 from "./2026-76-2.json";

import questions from "./2026-76-3.json";

import newPaper from "./2025-75-2.json";

import questions2025753 from "./2025-75-3.json";

export const ZENSHO_BIDO_QUESTIONS = [...grade1, ...grade3, ...paper1, ...paper2, ...questions, ...newPaper, ...questions2025753] as Question[];
