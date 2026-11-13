import type { Question } from "@/lib/questions/types";
import questions2023 from "./2023-early.json";

/** A群・B群各1〜25を内部通し番号1〜50に対応。 */
export const FUJIN_KODOMOFUKU1_QUESTIONS: Question[] = [...questions2023] as Question[];
