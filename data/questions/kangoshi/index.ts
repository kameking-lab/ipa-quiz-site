import type { Question } from "@/lib/questions/types";
import paper2025 from "./2025-annual.json";
import paper2024 from "./2024-annual.json";

/** 第115・114回の午前 問1〜90から178原問（第115回の問32・79を除く）。数値記入1問を含む。 */
export const KANGOSHI_QUESTIONS: Question[] = [
  ...(paper2025 as Question[]),
  ...(paper2024 as Question[]),
].sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
