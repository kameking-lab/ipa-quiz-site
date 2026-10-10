import type { Question } from "@/lib/questions/types";
import paper2025 from "./2025-annual.json";
import paper2024 from "./2024-annual.json";
import primaryFollowup from "./primary-followup-20261011.json";

/** 第115・114回の午前235問＋午後232問＝467原問。数値記入2問。未確認・採点除外は未収録。 */
export const KANGOSHI_QUESTIONS: Question[] = [
  ...(paper2025 as Question[]),
  ...(paper2024 as Question[]),
  ...(primaryFollowup as Question[]),
].sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
