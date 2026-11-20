import type { Question } from "@/lib/questions/types";
import questions2022 from "./2022.json";
import questions2023 from "./2023.json";
import questions2024 from "./2024.json";
import questions2025 from "./2025.json";
import questions2026 from "./2026.json";

export const TOHAN_KITAKANTO_KOSHINETSU_QUESTIONS = [...questions2026, ...questions2025, ...questions2024, ...questions2023, ...questions2022] as Question[];
