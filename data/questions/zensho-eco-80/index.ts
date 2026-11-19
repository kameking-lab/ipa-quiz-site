import annual2025 from "./2025-annual.json";
import annual2024 from "./2024-annual.json";
import type { Question } from "@/lib/questions/types";

export const ZENSHO_ECO80_QUESTIONS = [...annual2025, ...annual2024] as Question[];
