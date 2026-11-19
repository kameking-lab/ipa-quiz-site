import type { Question } from "@/lib/questions/types";
import annual2026 from "./2026.json";
import annual2025 from "./2025.json";
import annual2023 from "./2023.json";

export const QUESTIONS = [...annual2026, ...annual2025, ...annual2023] as Question[];
