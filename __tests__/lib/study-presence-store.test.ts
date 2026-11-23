// @vitest-environment node
import { PGlite } from "@electric-sql/pglite";
import { afterAll, afterEach, beforeAll, beforeEach, expect, it, vi } from "vitest";

const { execute, query, transaction } = vi.hoisted(() => ({ execute: vi.fn(), query: vi.fn(), transaction: vi.fn() }));
vi.mock("@/lib/db/prisma", () => ({ prisma: { $executeRaw: execute, $queryRaw: query, $transaction: transaction } }));

let db: PGlite;
type Connection = Pick<PGlite, "query">;
function statement(strings: TemplateStringsArray, ...values: unknown[]) {
  const sql = strings.reduce((text, part, i) => i === 0 ? part : `${text}$${i}${part}`, "");
  const run = (connection: Connection) => connection.query(sql, values);
  return { run, then: (resolve: (value: unknown) => void, reject: (error: unknown) => void) => run(db).then(resolve, reject) };
}

const firstId = "00000000-0000-4000-8000-000000000001";
const secondId = "00000000-0000-4000-8000-000000000002";
const epoch = Date.parse("2026-11-18T15:27:00Z");
const origin = "https://presence.example";
const url = `${origin}/api/stats/study-presence`;
const json = (value: unknown, ua = "Mozilla/5.0 Chrome/130") => new Request(url, {
  method: "POST", body: JSON.stringify(value), headers: { Origin: origin, "Content-Type": "application/json", "User-Agent": ua },
});
function answer(exam: string, visitorId = firstId, answeredAgoMs = 0, previousVisitorId?: string) {
  return { exam, visitorId, answeredAgoMs, previousVisitorId };
}
let route: typeof import("@/app/api/stats/study-presence/route");
let store: typeof import("@/lib/study-presence-store");
const read = async () => (await route.GET(new Request(url))).json();

beforeAll(async () => {
  db = new PGlite();
  await db.exec(`SET TIME ZONE 'Asia/Tokyo'; CREATE TABLE "StudyPresence" ("id" TEXT PRIMARY KEY, "lastSeenAt" TIMESTAMP(3) NOT NULL, "exam" TEXT);`);
});
afterAll(() => db.close());
beforeEach(async () => {
  await db.exec('TRUNCATE "StudyPresence"');
  vi.resetModules();
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(epoch);
  vi.stubEnv("DATABASE_URL", "postgresql://test");
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("VERCEL_ENV", "production");
  execute.mockReset().mockImplementation(statement);
  query.mockReset().mockImplementation((...args: Parameters<typeof statement>) => statement(...args).run(db).then(result => result.rows));
  transaction.mockReset().mockImplementation((statements: ReturnType<typeof statement>[]) => db.transaction(async connection => {
    for (const operation of statements) await operation.run(connection);
  }));
  route = await import("@/app/api/stats/study-presence/route");
  store = await import("@/lib/study-presence-store");
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllEnvs(); });

it("excludes pre-release rows, legacy page-open heartbeats and bot answers without writing", async () => {
  await db.query('INSERT INTO "StudyPresence" VALUES ($1, $2, $3)', ["e".repeat(64), new Date(epoch), "civil1"]);
  const legacy = await route.POST(json({ visitorId: firstId, exam: "civil1", idleMs: 0 }));
  expect(await legacy.json()).toMatchObject({ count: 0, exams: [] });
  expect((await route.POST(json(answer("tsushin1"), "Mozilla/5.0 HeadlessChrome"))).status).toBe(403);
  expect(await read()).toMatchObject({ status: "measured", count: 0, exams: [], today: { count: 0, activeCount: 0, exams: [] } });
  expect(execute).not.toHaveBeenCalled();
});

it("counts answers and drops each browser exactly five minutes after its submitted answer", async () => {
  expect(await read()).toMatchObject({ count: 0 });
  expect((await route.POST(json(answer("civil1")))).status).toBe(204);
  vi.setSystemTime(epoch + 120_000);
  expect((await route.POST(json(answer("tsushin1", secondId, 30_000)))).status).toBe(204);
  vi.setSystemTime(epoch + 299_999);
  expect(await read()).toMatchObject({ count: 2, exams: [{ exam: "civil1", count: 1 }, { exam: "tsushin1", count: 1 }], validUntil: new Date(epoch + 300_000).toISOString() });
  vi.setSystemTime(epoch + 300_000);
  expect(await read()).toMatchObject({ count: 1, exams: [{ exam: "tsushin1", count: 1 }] });
  vi.setSystemTime(epoch + 390_000);
  expect(await read()).toMatchObject({ count: 0, exams: [], today: { count: 2, activeCount: 0,
    exams: [{ exam: "civil1", count: 1, activeCount: 0 }, { exam: "tsushin1", count: 1, activeCount: 0 }] } });
});

it("starts today's count at JST midnight, while old tabs keep a rolling five-minute window", async () => {
  const midnight = Date.parse("2026-11-18T15:00:00Z");
  vi.setSystemTime(midnight - 1);
  await route.POST(json(answer("civil1")));
  expect(await read()).toMatchObject({ validUntil: new Date(midnight).toISOString(), today: { count: 1, activeCount: 1 } });

  vi.setSystemTime(midnight);
  expect(await read()).toMatchObject({ count: 1, total: 1, exams: [{ exam: "civil1", count: 1 }],
    today: { count: 0, activeCount: 0, exams: [] } });
  const legacy = await route.POST(json({ visitorId: firstId, idleMs: 0 }));
  expect(await legacy.json()).toEqual({ count: 1 });

  await route.POST(json(answer("civil2", secondId)));
  expect(await read()).toMatchObject({ count: 2, today: { count: 1, activeCount: 1,
    exams: [{ exam: "civil2", count: 1, activeCount: 1 }] } });
  vi.setSystemTime(midnight + 300_000);
  expect(await read()).toMatchObject({ count: 0, today: { count: 1, activeCount: 0 } });
});

it("groups a browser under its newest qualification, ignores older writes and rotates its ID atomically", async () => {
  await route.POST(json(answer("civil1")));
  vi.setSystemTime(epoch + 60_000);
  await route.POST(json(answer("tsushin1")));
  await route.POST(json(answer("civil1", firstId, 30_000)));
  expect(await read()).toMatchObject({ count: 1, exams: [{ exam: "tsushin1", count: 1 }] });
  await route.POST(json(answer("dai-1-shu-eisei-kanrisha", secondId, 0, firstId)));
  expect(await read()).toMatchObject({ count: 1, exams: [{ exam: "eisei1", count: 1 }],
    today: { count: 1, exams: [{ exam: "eisei1", count: 1, activeCount: 1 }] } });
  const stored = await db.query<{id: string}>('SELECT "id" FROM "StudyPresence"');
  expect(stored.rows.map(row => row.id).sort()).toEqual([
    expect.stringMatching(/^answer:[a-f0-9]{64}$/),
    expect.stringMatching(/^daily-answer:2026-11-19:answer:[a-f0-9]{64}$/),
  ]);
  expect(transaction).toHaveBeenCalledTimes(2);
});

it("combines existing answer rows from both routes to a qualification in the daily breakdown", async () => {
  const exams = ["sokuryoshiho", "survey-assistant", "haikan-plant2", "plant-haikan2"];
  for (const [index, exam] of exams.entries()) {
    const at = index % 2 === 0 ? epoch - 600_000 : epoch;
    await db.query('INSERT INTO "StudyPresence" VALUES ($1, $2, $3)', [`answer:fixture-${index}`, new Date(at), exam]);
  }
  expect(await read()).toMatchObject({ count: 2, today: { count: 4, activeCount: 2, exams: [
    { exam: "plant-haikan2", count: 2, activeCount: 1 },
    { exam: "survey-assistant", count: 2, activeCount: 1 },
  ] } });
  expect(query).toHaveBeenCalledTimes(2);
  expect(execute).not.toHaveBeenCalled();
});

it("leaves cleanup off reads and runs it at most once per fifteen minutes of writes", async () => {
  const retentionStart = Date.parse("2026-11-17T15:00:00Z");
  for (const [id, at] of [["old", retentionStart - 1], ["retained", retentionStart]] as const) {
    await db.query('INSERT INTO "StudyPresence" VALUES ($1, $2, $3)', [`answer:${id}`, new Date(at), "civil1"]);
  }
  await store.recordStudyPresence(firstId, epoch, "fe");
  await store.recordStudyPresence(secondId, epoch, "ap");
  const cleanupCount = () => execute.mock.calls.filter(([strings]) => strings.join("").includes('"lastSeenAt" < (')).length;
  expect(cleanupCount()).toBe(1);
  expect(await store.readStudyPresence(epoch + 900_000)).toMatchObject({ snapshot: { count: 0 }, today: { count: 2, activeCount: 0 } });
  expect(cleanupCount()).toBe(1);
  vi.setSystemTime(epoch + 900_000);
  await store.recordStudyPresence(secondId, epoch + 900_000, "ap");
  expect(cleanupCount()).toBe(2);
  const { rows } = await db.query<{ id: string }>('SELECT "id" FROM "StudyPresence"');
  expect(rows).toHaveLength(5);
  expect(rows.map(row => row.id)).toContain("answer:retained");
  expect(rows.map(row => row.id)).not.toContain("answer:old");
});

it("keeps yesterday's distinct learners after they answer again today", async () => {
  const midnight = Date.parse("2026-11-19T15:00:00Z");
  vi.setSystemTime(midnight - 60_000);
  await route.POST(json(answer("fe")));
  await route.POST(json(answer("ap", secondId)));
  vi.setSystemTime(midnight);
  await route.POST(json(answer("fe")));
  expect(await read()).toMatchObject({ today: { count: 1 }, yesterdayCount: 2 });
});
