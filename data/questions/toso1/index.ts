import type { Question } from "@/lib/questions/types";
import questions2024 from "./2024-early.json";

/** A群1〜25・B群1〜25を内部通し番号1〜50に対応。 */
export const TOSO1_QUESTIONS: Question[] = [...questions2024] as Question[];
