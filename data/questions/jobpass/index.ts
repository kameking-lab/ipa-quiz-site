import type { Question } from "@/lib/questions/types";
import grade2Second2024 from "./2024-second-grade2.json";
import grade3First2024 from "./2024-first-grade3.json";
import grade3Second2024 from "./2024-second-grade3.json";

export const JOBPASS_QUESTIONS = [...grade3Second2024, ...grade2Second2024, ...grade3First2024] as Question[];
