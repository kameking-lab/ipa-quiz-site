import type { Question } from "@/lib/questions/types";
import round2 from "./2024-round2.json";
import round1 from "./2024-round1.json";

export const KOUNIN_CIVICS_QUESTIONS = [...round2, ...round1] as Question[];
