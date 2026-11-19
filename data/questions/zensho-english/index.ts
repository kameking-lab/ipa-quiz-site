import type { Question } from "@/lib/questions/types";
import round73 from "./2024-round73.json";
import round72 from "./2024-round72.json";

export const ZENSHO_ENGLISH_QUESTIONS = [...round73, ...round72] as Question[];
