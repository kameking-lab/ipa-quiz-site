import type { Question } from "@/lib/questions/types";
import paper2025 from "./2025-annual.json";
import paper2024 from "./2024-annual.json";

/** 第115・114回看護師国家試験の午前問題を段階的に収録。 */
export const KANGOSHI_QUESTIONS: Question[] = [
  ...(paper2025 as Question[]),
  ...(paper2024 as Question[]),
].sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
