import type { Question } from "@/lib/questions/types";
import { getReleasedBiyoshiQuestions } from "./publication";
import first from "./2026-first.json";
import second from "./2026-second.json";

/** Saved originals for review; never use candidates as a public pool. */
export const BIYOSHI_CANDIDATES: Question[] = [...first, ...second] as Question[];
export const BIYOSHI_QUESTIONS = getReleasedBiyoshiQuestions(BIYOSHI_CANDIDATES);
