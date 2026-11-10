import type { Question } from "@/lib/questions/types";
import { getReleasedRiyoshiQuestions } from "@/lib/riyoshi/publication";
import first from "./2026-first.json";
import second from "./2026-second.json";
import previousSecond from "./2025-second.json";

/** Reviewed source candidates; public registries use the release gate below. */
export const RIYOSHI_CANDIDATES: Question[] = [...first, ...second, ...previousSecond] as Question[];
export const RIYOSHI_QUESTIONS = getReleasedRiyoshiQuestions(RIYOSHI_CANDIDATES);
