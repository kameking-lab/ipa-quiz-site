export const HISTORY_BATCH = 256;
export const HISTORY_ACCOUNT_LIMIT = 500_000;
export const HISTORY_LIMIT_MESSAGE = "保存上限に達しました。超過分はこの端末に残っています。";

export interface HistoryAnswer {
  id: string;
  at: number;
  correct: boolean;
}

export interface HistoryCursor {
  at: number;
  rowId: string;
}

// Consecutive upload batches cover disjoint time windows. An empty device
// opens a single unbounded window. Within a window the row ID breaks ties.
export interface HistoryWindow {
  after?: number;
  through?: number;
  cursor?: HistoryCursor;
}

export function isTimestamp(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) &&
    Number.isFinite(new Date(value).getTime());
}

export function isHistoryCursor(value: unknown): value is HistoryCursor {
  if (!value || typeof value !== "object") return false;
  const cursor = value as Partial<HistoryCursor>;
  return isTimestamp(cursor.at) && typeof cursor.rowId === "string" &&
    cursor.rowId.length > 0 && cursor.rowId.length <= 128;
}

export const answerKey = (entry: HistoryAnswer) => JSON.stringify([entry.id, entry.at]);
