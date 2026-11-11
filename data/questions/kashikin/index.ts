import type { Question } from "@/lib/questions/types";
import paper2025 from "./2025-annual.json";
import paper2024 from "./2024-annual.json";
import paper2023 from "./2023-annual.json";

/** 貸金業務取扱主任者資格試験 第18〜20回（令和5〜7年度）。 */
export const KASHIKIN_QUESTIONS: Question[] = [
  ...(paper2025 as Question[]),
  ...(paper2024 as Question[]),
  ...(paper2023 as Question[]),
].sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
