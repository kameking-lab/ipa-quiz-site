import type { Question } from "@/lib/questions/types";
import questions2024 from "./2024-early.json";
import questions2023 from "./2023-early.json";

/** 原本A群1〜25・B群1〜25を、内部の通し番号1〜50に対応させる。 */
export const ENGEI_SOSHOKU2_QUESTIONS: Question[] = [...questions2024, ...questions2023] as Question[];
