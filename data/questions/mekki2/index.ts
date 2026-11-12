import type { Question } from "@/lib/questions/types";
import questions2024 from "./2024-early.json";

/** A群1〜25・B群1〜25を内部番号1〜50に対応させる。 */
export const MEKKI2_QUESTIONS: Question[] = questions2024 as Question[];
