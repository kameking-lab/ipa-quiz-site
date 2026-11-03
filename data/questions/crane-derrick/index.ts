import type { Question } from "@/lib/questions/types";
import october from "./2026-10.json";
import april from "./2026-04.json";

/** 未公開。first は当年の第1回公表（4月）を表す。 */
export const CRANE_DERRICK_QUESTIONS = [...october, ...april] as Question[];
