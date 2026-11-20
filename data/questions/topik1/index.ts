import type { Question } from "@/lib/questions/types";
import annual2022 from "./2022-annual.json";
import annual2023 from "./2023-annual.json";
import annual2024 from "./2024-annual.json";
import annual2025 from "./2025-annual.json";

export const TOPIK1_QUESTIONS = [...annual2025, ...annual2024, ...annual2023, ...annual2022] as Question[];
