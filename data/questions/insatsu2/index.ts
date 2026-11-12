import type { Question } from "@/lib/questions/types";
import questions2024 from "./2024-early.json";

/** 原本A群1〜25・B群1〜25を、内部の通し番号1〜50に対応させる。 */
export const INSATSU2_QUESTIONS: Question[] = [...questions2024] as Question[];
