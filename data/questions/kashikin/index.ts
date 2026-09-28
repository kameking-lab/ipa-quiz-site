import type { Question } from "@/lib/questions/types";
import paper2025 from "./2025-annual.json";
import paper2024 from "./2024-annual.json";

/** 貸金業務取扱主任者資格試験 第20回（令和7年度）・第19回（令和6年度）。 */
export const KASHIKIN_QUESTIONS: Question[] = [
  ...(paper2025 as Question[]),
  ...(paper2024 as Question[]),
].sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
