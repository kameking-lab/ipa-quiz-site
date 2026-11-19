import type { Question } from "@/lib/questions/types";
import fiscal2023 from "./2023-03.json";
import fiscal2024 from "./2024-03.json";

export const KANKEN_J1_QUESTIONS: Question[] = [...fiscal2024, ...fiscal2023] as Question[];
