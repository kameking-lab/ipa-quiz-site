import type { Question } from "@/lib/questions/types";
import round2024 from "./2024-late.json";
import round2023 from "./2023-late.json";

export const KANKEN_3_QUESTIONS = [...round2024, ...round2023] as Question[];
