import type { Question } from "@/lib/questions/types";
import year2025 from "./2025-annual.json";
import year2024 from "./2024-annual.json";

export const BUILDING_CLEANING3_QUESTIONS = [...year2025, ...year2024] as Question[];
