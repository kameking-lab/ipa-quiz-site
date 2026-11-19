import type { Question } from "@/lib/questions/types";
import february2024 from "./2024-february.json";
import february2023 from "./2023-february.json";

export const KANKEN_1_QUESTIONS = [...february2024, ...february2023] as Question[];
