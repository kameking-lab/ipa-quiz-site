import type { Question } from "@/lib/questions/types";
import paper2026 from "./2026-annual.json";
import paper2025 from "./2025-annual.json";
import rousai2025 from "./rousai-2025-annual.json";

/**
 * 社会保険労務士試験 第58回（令和8年度）・第57回（令和7年度）
 * 択一式「労働基準法及び労働安全衛生法」の一部16問と
 * 「労災保険法及び徴収法」の一次根拠確認済み問。択一式全70問ではない。
 */
export const SHAROUSHI_QUESTIONS: Question[] = [
  ...(paper2026 as Question[]),
  ...(paper2025 as Question[]),
  ...(rousai2025 as Question[]),
].sort((a, b) => b.year - a.year || a.session.localeCompare(b.session) || a.qNumber - b.qNumber);
