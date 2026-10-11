import type { Question } from "@/lib/questions/types";
import paper2025 from "./2025-annual.json";
import paper2024 from "./2024-annual.json";
import followup20261011 from "./followup-20261011.json";

/** 第115・114回の午前237問＋午後235問＝472原問。数値記入2問。未確認・採点除外は未収録。 */
export const KANGOSHI_QUESTIONS: Question[] = [
  ...(paper2025 as Question[]),
  ...(paper2024 as Question[]),
  ...(followup20261011 as Question[]),
].sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
