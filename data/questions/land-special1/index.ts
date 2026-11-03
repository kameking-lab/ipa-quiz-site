import type { Question } from "@/lib/questions/types";
import februaryHouki from "./2026-february-houki.json";
import februaryKogaku from "./2026-february-kogaku.json";
import juneHouki from "./2026-june-houki.json";
import juneKogaku from "./2026-june-kogaku.json";

/** 2026年2月・6月の09:30 A版2実施回。13:30 B版は未収録。 */
export const LAND_SPECIAL1_QUESTIONS: Question[] = [...februaryHouki, ...februaryKogaku, ...juneHouki, ...juneKogaku] as Question[];
