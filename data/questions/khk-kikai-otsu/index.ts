import type { Question } from "@/lib/questions/types";
import previous from "../batch1/khk-kikai-otsu.json";
import annual2026 from "./2026-annual.json";
import annual2023 from "./2023-annual.json";

export const KHK_KIKAI_OTSU_QUESTIONS = [...previous, ...annual2026, ...annual2023] as Question[];
