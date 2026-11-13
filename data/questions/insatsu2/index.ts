import type { Question } from "@/lib/questions/types";
import questions2023 from "./2023-early.json";

/** 原本A群1〜25・B群1〜25を、内部の通し番号1〜50に対応させる。 */
export const INSATSU2_QUESTIONS: Question[] = [...questions2023] as Question[];
