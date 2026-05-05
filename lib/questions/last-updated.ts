import type { Question } from "@/lib/questions/types";

/**
 * 解説の最終更新日 (ISO YYYY-MM-DD) のフォールバック。
 * 個別の `Question.lastUpdated` が未設定の場合に使用される。
 */
export const DEFAULT_LAST_UPDATED = "2026-05-05";

export function getLastUpdatedISO(q: Pick<Question, "lastUpdated">): string {
  return q.lastUpdated ?? DEFAULT_LAST_UPDATED;
}

export function formatLastUpdatedJa(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  return `${m[1]}年${Number(m[2])}月${Number(m[3])}日`;
}
