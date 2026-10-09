import type { Question } from "@/lib/questions/types";
import paper2025 from "./2025-annual.json";
import paper2024 from "./2024-annual.json";

/** 看護師国家試験 第115回（令和7年度）・第114回（令和6年度）の午前 問1〜5のみ（計10問）。 */
export const KANGOSHI_QUESTIONS: Question[] = [
  ...(paper2025 as Question[]),
  ...(paper2024 as Question[]),
].sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
