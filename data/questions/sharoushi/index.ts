import type { Question } from "@/lib/questions/types";
import paper2026 from "./2026-annual.json";
import paper2025 from "./2025-annual.json";

/**
 * 社会保険労務士試験 第58回（令和8年度）・第57回（令和7年度）
 * 択一式「労働基準法及び労働安全衛生法」の一部16問。
 * 既存10問は sharoushi10-20261010 の生成データ、追加6問は一次根拠の独立査読済み候補。
 */
export const SHAROUSHI_QUESTIONS: Question[] = [
  ...(paper2026 as Question[]),
  ...(paper2025 as Question[]),
].sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
