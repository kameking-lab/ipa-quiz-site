import data1 from "./2026-round2-reading-selected.json";
import data2 from "./2026-round1-reading-selected.json";
import data3 from "./2025-round3-reading-selected.json";
import listening1 from "./2026-round2-listening.json";
import listening2 from "./2026-round1-listening.json";
import listening3 from "./2025-round3-listening.json";
import type { Question } from "@/lib/questions/types";

export const EIKEN4_QUESTIONS = [...data1, ...data2, ...data3, ...listening1, ...listening2, ...listening3] as Question[];
