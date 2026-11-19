import type { Question } from "@/lib/questions/types";
import year2025 from "./2025-late.json";
import year2024 from "./2024-late.json";

export const SAKUI_ROTARY1_QUESTIONS = [...year2025, ...year2024] as Question[];
