import type { Question } from "@/lib/questions/types";
import february2023 from "./2023-february.json";
import february2024 from "./2024-february.json";

export const KANKEN_4_QUESTIONS = (february2024 as Question[]).concat(february2023 as Question[]);
