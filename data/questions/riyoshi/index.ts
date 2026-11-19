import type { Question } from "@/lib/questions/types";
import { getReleasedRiyoshiQuestions } from "@/lib/riyoshi/publication";
import first from "./2026-first.json";
import second from "./2026-second.json";
import previousSecond from "./2025-second.json";
import round50 from "./2024-second.json";
import round49 from "./2024-first.json";

/** Reviewed source candidates; public registries use the release gate below. */
export const RIYOSHI_CANDIDATES: Question[] = [...first, ...second, ...previousSecond, ...round50, ...round49] as Question[];
export const RIYOSHI_QUESTIONS = getReleasedRiyoshiQuestions(RIYOSHI_CANDIDATES);
