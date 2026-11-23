import type { Question } from "@/lib/questions/types";
import year2025 from "./2025-annual.json";
import year2024 from "./2024-annual.json";
import year2023 from "./2023-annual.json";
import year2022 from "./2022-annual.json";

export const BUILDING_CLEANING3_QUESTIONS = [...year2025, ...year2024, ...year2023, ...year2022] as Question[];
