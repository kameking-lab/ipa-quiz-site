import type { Question } from "@/lib/questions/types";
import questions2024 from "./2024.json";
import questions2025 from "./2025.json";

export const TOHAN_KYUSHU_OKINAWA_QUESTIONS = [...questions2025, ...questions2024] as Question[];
