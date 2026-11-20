import type { Question } from "@/lib/questions/types";

import specialistA from "./2026-special-a.json";


import { KOKUZEI_2026_SPECIAL_B_QUESTIONS } from "./2026-special-b";

import official2024SpecialB from "./2024-annual-special-b.json";




import data from "./official-2025-annual-special-a.json";


import questions from "./2024-annual-senmon.json";

export const KOKUZEI_SENMONKAN_QUESTIONS = [...specialistA, ...KOKUZEI_2026_SPECIAL_B_QUESTIONS, ...data, ...questions, ...official2024SpecialB] as Question[];
