import { prisma } from "@/lib/db/prisma";
import { answerKey, HISTORY_ACCOUNT_LIMIT, HISTORY_BATCH, type HistoryAnswer, type HistoryCursor, type HistoryWindow } from "./history-protocol";

export async function saveHistoryBatch(userId: string, entries: HistoryAnswer[]) {
  const unique = new Map<string, HistoryAnswer>();
  for (const entry of entries) {
    const key = answerKey(entry);
    if (!unique.has(key) || !entry.correct) unique.set(key, entry);
  }
  if (!unique.size) return { merged: 0, limitReached: false };
  return prisma.$transaction(async tx => {
    // All StudyRecord writers take this lock before reading. ReadCommitted
    // gives the waiter a fresh snapshot after the previous device commits.
    await tx.$queryRaw`SELECT id FROM "User" WHERE id = ${userId} FOR UPDATE`;
    const existing = await tx.studyRecord.findMany({
      where: { userId, OR: Array.from(unique.values(), e => ({ questionId: e.id, answeredAt: new Date(e.at) })) },
      select: { questionId: true, answeredAt: true, correct: true },
      take: unique.size,
    });
    const misses = [];
    for (const row of existing) {
      const key = JSON.stringify([row.questionId, row.answeredAt.getTime()]);
      if (row.correct && unique.get(key)?.correct === false) {
        misses.push({ questionId: row.questionId, answeredAt: row.answeredAt });
      }
      unique.delete(key);
    }
    let merged = 0;
    if (misses.length) {
      const update = await tx.studyRecord.updateMany({
        where: { userId, correct: true, OR: misses }, data: { correct: false },
      });
      merged += update.count;
    }
    if (!unique.size) return { merged, limitReached: false };
    const count = await tx.studyRecord.count({ where: { userId }, take: HISTORY_ACCOUNT_LIMIT });
    const capacity = Math.max(0, HISTORY_ACCOUNT_LIMIT - count);
    const fresh = [...unique.values()].slice(0, capacity);
    if (fresh.length) {
      const insert = await tx.studyRecord.createMany({
        data: fresh.map(e => ({ userId, questionId: e.id, answeredAt: new Date(e.at), correct: e.correct })),
        skipDuplicates: true,
      });
      merged += insert.count;
    }
    return { merged, limitReached: fresh.length < unique.size };
  }, { isolationLevel: "ReadCommitted" });
}

export async function readHistoryPage(userId: string, window: HistoryWindow = {}) {
  const { after, through, cursor } = window;
  const rows = await prisma.studyRecord.findMany({
    where: {
      userId,
      ...(after !== undefined || through !== undefined || cursor ? { answeredAt: {
        ...(after !== undefined ? { gt: new Date(after) } : {}),
        // Give the (userId, answeredAt) index an explicit seek boundary.
        ...(cursor ? { gte: new Date(cursor.at) } : {}),
        ...(through !== undefined ? { lte: new Date(through) } : {}),
      } } : {}),
      ...(cursor ? { OR: [
        { answeredAt: { gt: new Date(cursor.at) } },
        { answeredAt: new Date(cursor.at), id: { gt: cursor.rowId } },
      ] } : {}),
    },
    orderBy: [{ answeredAt: "asc" }, { id: "asc" }],
    take: HISTORY_BATCH + 1,
    select: { id: true, questionId: true, answeredAt: true, correct: true },
  });
  const entries: HistoryAnswer[] = [];
  let bytes = 0;
  for (const row of rows.slice(0, HISTORY_BATCH)) {
    const entry = { id: row.questionId, correct: row.correct, at: row.answeredAt.getTime() };
    const size = Buffer.byteLength(JSON.stringify(entry)) + 1;
    // A single pre-existing long ID must still be restorable.
    if (entries.length && bytes + size > 256 * 1024) break;
    bytes += size;
    entries.push(entry);
  }
  const last = rows[entries.length - 1];
  const nextCursor = entries.length < rows.length ? { at: last.answeredAt.getTime(), rowId: last.id } : null;
  return { entries, nextCursor };
}

// One legacy JSON document on the wire, one DB page per consumer pull. A
// disconnected downloader cannot leave a loop reading the remaining account.
export function streamHistory(userId: string, metadata: object, includeTotal: boolean, headers?: Record<string, string>) {
  const encoder = new TextEncoder();
  let cursor: HistoryCursor | undefined;
  let count = 0;
  return new Response(new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(JSON.stringify(metadata).slice(0, -1) + ',"entries":['));
    },
    async pull(controller) {
      const page = await readHistoryPage(userId, { cursor });
      const json = page.entries.map(entry => JSON.stringify(entry)).join(",");
      let chunk = count && json ? "," + json : json;
      count += page.entries.length;
      if (!page.nextCursor) chunk += includeTotal ? `],"total":${count}}` : "]}";
      controller.enqueue(encoder.encode(chunk));
      if (page.nextCursor) cursor = page.nextCursor;
      else controller.close();
    },
  }), { headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "private, no-store", ...headers } });
}
