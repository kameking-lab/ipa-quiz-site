import data0 from "./2025-round1.json";
import data1 from "./2025-round2.json";
import data2 from "./2026-round1.json";
import type { Question } from "@/lib/questions/types";

export const QUESTIONS = [...data0, ...data1, ...data2] as Question[];
