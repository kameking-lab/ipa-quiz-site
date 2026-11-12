import type { Question } from "@/lib/questions/types";
import questions2025 from "./2025-early.json";

/** A群1〜25・B群1〜25を内部通し番号1〜50に対応。 */
export const FUJIN_KODOMOFUKU1_QUESTIONS: Question[] = [...questions2025] as Question[];
