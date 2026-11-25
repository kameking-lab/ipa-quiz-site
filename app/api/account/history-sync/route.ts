import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { answerKey, HISTORY_BATCH, isHistoryCursor, isTimestamp, type HistoryAnswer, type HistoryWindow } from "@/lib/sync/history-protocol";
import { readHistoryPage, saveHistoryBatch, streamHistory } from "@/lib/sync/history-server";

export const runtime = "nodejs";

// Older clients send one localStorage snapshot, including device-only fields.
const MAX_BODY_BYTES = 8 * 1024 * 1024;
// Even a single historical row gets only one input envelope plus JSON metadata.
const MAX_PAGE_BYTES = MAX_BODY_BYTES + 1024;
const LEGACY_MAX_ENTRIES = 200_000;
const error = (code: string, status: number) => NextResponse.json({ error: code }, { status });

async function readBody(req: Request) {
  if (Number(req.headers.get("content-length")) > MAX_BODY_BYTES) return error("request_too_large", 413);
  const reader = req.body?.getReader();
  if (!reader) return error("invalid_request", 400);
  try {
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return error("request_too_large", 413);
      }
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks, bytes).toString("utf8")) as Record<string, unknown> | null;
  } catch {
    return error("invalid_request", 400);
  } finally {
    reader.releaseLock();
  }
}

function isEntry(value: unknown): value is HistoryAnswer {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<HistoryAnswer>;
  return typeof entry.id === "string" && typeof entry.correct === "boolean" && isTimestamp(entry.at);
}

function isWindow(value: unknown): value is HistoryWindow {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const page = value as HistoryWindow;
  return (page.after === undefined || isTimestamp(page.after)) &&
    (page.through === undefined || isTimestamp(page.through)) &&
    (page.cursor === undefined || isHistoryCursor(page.cursor));
}

export async function POST(req: Request) {
  if (!process.env.DATABASE_URL) return error("db_not_configured", 503);
  const session = await auth();
  if (!session?.user?.id) return error("unauthorized", 401);
  const userId = session.user.id;
  const body = await readBody(req);
  if (body instanceof Response) return body;
  if (!body || typeof body.expectedUserId !== "string" || !body.expectedUserId) return error("expected_user_required", 400);
  if (body.expectedUserId !== userId) return error("account_changed", 409);

  const page = body.historyPage;
  if (page !== undefined && !isWindow(page)) return error("invalid_history_page", 400);
  const entries = Array.isArray(body.entries) ? body.entries : [];
  if (entries.length > (page ? HISTORY_BATCH : LEGACY_MAX_ENTRIES)) return error("too_many_entries", 413);
  if (!entries.every(isEntry)) return error("invalid_history_entry", 400);

  let merged = 0;
  let limitReached = false;
  if (!page?.cursor) {
    for (let offset = 0; offset < entries.length; offset += HISTORY_BATCH) {
      const saved = await saveHistoryBatch(userId, entries.slice(offset, offset + HISTORY_BATCH));
      merged += saved.merged;
      limitReached ||= saved.limitReached;
    }
  }
  if (!page) return streamHistory(userId, { merged, ...(limitReached && { limitReached }) }, true);

  const result = await readHistoryPage(userId, page);
  const known = new Map(entries.map(entry => [answerKey(entry), entry.correct]));
  const payload = JSON.stringify({
    entries: result.entries.filter(entry => known.get(answerKey(entry)) !== entry.correct),
    merged, total: result.entries.length, nextCursor: result.nextCursor, limitReached,
  });
  if (Buffer.byteLength(payload) > MAX_PAGE_BYTES) return error("history_page_too_large", 413);
  return new Response(payload, { headers: {
    "Content-Type": "application/json; charset=utf-8", "Cache-Control": "private, no-store",
  } });
}
