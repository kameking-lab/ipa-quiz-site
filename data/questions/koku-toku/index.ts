import type { Question } from "@/lib/questions/types";
import februaryHouki from "./2026-february-houki.json";
import februaryKogaku from "./2026-february-kogaku.json";
import juneHouki from "./2026-june-houki.json";
import juneKogaku from "./2026-june-kogaku.json";

export const KOKU_TOKU_QUESTIONS: Question[] = [...februaryHouki, ...februaryKogaku, ...juneHouki, ...juneKogaku] as Question[];
