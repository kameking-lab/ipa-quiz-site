import type { Question } from "@/lib/questions/types";
import oct21Houki from "./2021-october-houki.json";
import oct21Kogaku from "./2021-october-kogaku.json";
import feb22Houki from "./2022-february-houki.json";
import feb22Kogaku from "./2022-february-kogaku.json";

/** 公表された2021年10月・2022年2月の歴史筆記2回。現在のCBT例題は含まない。 */
export const LAND_SPECIAL2_QUESTIONS: Question[] = [...oct21Houki, ...oct21Kogaku, ...feb22Houki, ...feb22Kogaku] as Question[];
