import type { Question } from "@/lib/questions/types";
import octoberHouki from "./2022-october-houki.json";
import octoberKogaku from "./2022-october-kogaku.json";
import februaryHouki from "./2023-february-houki.json";
import februaryKogaku from "./2023-february-kogaku.json";

export const KAI_TOKU3_QUESTIONS: Question[] = [...octoberHouki, ...octoberKogaku, ...februaryHouki, ...februaryKogaku] as Question[];
