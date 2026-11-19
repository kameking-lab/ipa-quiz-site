import type { Question } from "@/lib/questions/types";
import yearly2024 from "./2024.json";
import yearly2025 from "./2025.json";

export const KOGAI_08_QUESTIONS = [...yearly2025, ...yearly2024] as Question[];
