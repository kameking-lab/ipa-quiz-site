import type { Question } from "@/lib/questions/types";
import data2025 from "./2025.json";
import data2024 from "./2024.json";

export const BUILDING_CLEANING2_QUESTIONS = [
  ...data2025,
  ...data2024,
] as Question[];
