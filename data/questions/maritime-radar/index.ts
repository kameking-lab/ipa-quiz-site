import type { Question } from "@/lib/questions/types";
import paper0 from "./2026-february-houki.json";
import paper1 from "./2026-february-kogaku.json";
import paper2 from "./2026-june-houki.json";
import paper3 from "./2026-june-kogaku.json";

/** 2026年2月・6月の筆記2回48原問。June工学Q24は既存HOLDにより演習対象外。 */
export const MARITIME_RADAR_QUESTIONS: Question[] = [...paper0, ...paper1, ...paper2, ...paper3] as unknown as Question[];
