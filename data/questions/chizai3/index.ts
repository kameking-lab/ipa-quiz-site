import july from "./2026-july.json";

import march from "./2026-march.json";
import julyPractical from "./2026-july-practical.json";

import marchPractical from "./2026-march-practical.json";

import type { Question } from "@/lib/questions/types";


export const CHIZAI3_QUESTIONS = [...july, ...march, ...julyPractical, ...marchPractical] as Question[];
