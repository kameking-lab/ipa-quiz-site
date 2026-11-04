import type { Question } from "@/lib/questions/types";
import first from "./2024.json";
import second from "./2025.json";

/** 第24回・第25回の全94原問。公開可否は資格カタログで制御する。 */
export const IJI_SHUZEN_QUESTIONS: Question[] = [...first, ...second] as Question[];
