import { beforeEach, describe, expect, it, vi } from "vitest";
import { UnlockFeedbackSchema } from "@/lib/feedback/unlock-contract";
import { FeedbackUnlockStore, type UnlockIdentity } from "@/lib/feedback/unlock-store";
import type { SqlDatabase } from "@/lib/billing/postgres-store";

const m = vi.hoisted(() => ({ submit: vi.fn(), status: vi.fn(), origin: vi.fn(), rate: vi.fn(), bot: vi.fn() }));
vi.mock("@/lib/feedback/unlock-runtime", () => ({ feedbackStore: () => ({ submit: m.submit, status: m.status, consumeRate: m.rate }), unlockIdentity: () => ({ realm: "test", account: null, browser: "browser" }), feedbackHash: () => "network-hash" }));
vi.mock("@/lib/billing/runtime", () => ({ sameOrigin: m.origin, optionalBillingIdentity: async () => null, json: (v: unknown, status = 200) => Response.json(v, { status }) }));
vi.mock("@/lib/billing/practice-access", () => ({ practiceGateEnabled: () => true }));
vi.mock("@/lib/rate-limit/server", () => ({ getClientIp: () => "192.0.2.1", checkRateLimit: m.rate }));
vi.mock("@/lib/turnstile", () => ({ verifyTurnstileToken: m.bot }));
import { POST } from "@/app/api/feedback-unlock/route";

beforeEach(() => { vi.clearAllMocks(); vi.stubEnv("FEEDBACK_UNLOCK_ENABLED", "true"); m.rate.mockResolvedValue(true); m.bot.mockResolvedValue({ ok: true }); m.submit.mockResolvedValue({ eventId: "event", remaining: 10 }); });
const payload = { choices: ["explanations", "mobile"], comment: "連絡 test@example.jp 090-1234-5678" };
const request = (body: unknown) => new Request("https://example.test/api/feedback-unlock", { method: "POST", body: JSON.stringify(body) });
describe("feedback acceptance", () => {
  it("requires a choice or nonblank comment and bounds every input", () => {
    expect(UnlockFeedbackSchema.safeParse({ choices: [], comment: "  " }).success).toBe(false);
    expect(UnlockFeedbackSchema.safeParse({ choices: [], comment: "参考書がほしい" }).success).toBe(true);
    expect(UnlockFeedbackSchema.safeParse({ choices: ["qualifications"] }).success).toBe(false);
    expect(UnlockFeedbackSchema.safeParse({ choices: ["unknown"] }).success).toBe(false);
    expect(UnlockFeedbackSchema.safeParse({ choices: ["other"], comment: "あ".repeat(1001) }).success).toBe(false);
    expect(UnlockFeedbackSchema.parse({ choices: ["mobile", "mobile"] }).choices).toEqual(["mobile"]);
  });
  it("persists masked feedback before acknowledging the benefit; never issues a copilot cookie", async () => {
    const res = await POST(request(payload));
    expect(res.status).toBe(200); expect(res.headers.get("set-cookie")).toBeNull();
    const saved = m.submit.mock.calls[0][2];
    expect(saved.choices).toEqual(payload.choices);
    expect(JSON.stringify(saved)).not.toContain("test@example.jp");
    expect(JSON.stringify(saved)).not.toContain("090-1234-5678");
  });
  it("fails closed on persistence errors, bot rejection, rate limiting and disabled rollout", async () => {
    m.submit.mockRejectedValueOnce(Error("database")); expect((await POST(request(payload))).status).toBe(503);
    m.bot.mockResolvedValueOnce({ ok: false }); expect((await POST(request(payload))).status).toBe(403);
    m.rate.mockResolvedValueOnce(false); expect((await POST(request(payload))).status).toBe(429);
    vi.stubEnv("FEEDBACK_UNLOCK_ENABLED", "false"); expect((await POST(request(payload))).status).toBe(503);
    expect(m.submit).toHaveBeenCalledTimes(1);
  });
  it("rejects oversize bodies and malformed input before storage", async () => {
    expect((await POST(request({ ...payload, comment: "x".repeat(18000) }))).status).toBe(413);
    expect((await POST(request({ choices: [], comment: "" }))).status).toBe(400);
    expect(m.submit).not.toHaveBeenCalled();
  });
});

describe("bonus wallet under its SQL transaction boundary", () => {
  const identity: UnlockIdentity = { realm: "test", account: null, browser: "b" };
  function fixture() {
    const row = { event_id: "e", account_hash: null as string | null, browser_hash: "b", retired: false };
    const grants: { day: string; question_id: string }[] = [];
    let tail = Promise.resolve();
    const query = vi.fn(async (sql: string, values: unknown[]) => {
      if (sql.startsWith("SELECT event_id")) return [{ ...row }];
      if (sql.startsWith("SELECT day")) return grants.map(g => ({ ...g }));
      if (sql.startsWith("UPDATE feedback_unlock SET account_hash")) row.account_hash = values[1] as string;
      if (sql.startsWith("INSERT INTO feedback_unlock_grant")) grants.push({ day: values[1] as string, question_id: values[2] as string });
      return [];
    });
    const db = { query, transaction: <T,>(fn: (sql: SqlDatabase) => Promise<T>) => {
      const result = tail.then(() => fn(db as unknown as SqlDatabase)); tail = result.then(() => {}, () => {}); return result;
    } } as unknown as SqlDatabase;
    return { row, grants, query, store: new FeedbackUnlockStore(db) };
  }
  it("allows ten distinct grants across days, reopens idempotently, and rejects the eleventh", async () => {
    const { store, grants, query } = fixture();
    const results = await Promise.all(Array.from({ length: 11 }, (_, n) => store.grant(identity, n < 5 ? "2026-11-03" : "2026-11-04", `q${n}`)));
    expect(results.filter(Boolean)).toHaveLength(10); expect(grants).toHaveLength(10);
    expect(await store.grant(identity, "2026-11-03", "q0")).toEqual({ remaining: 0, newlyUsed: false });
    expect(query.mock.calls.some(([sql]) => sql.endsWith("FOR UPDATE"))).toBe(true);
  });
  it("binds an anonymous wallet to its account and denies later signed-out reuse", async () => {
    const { store, row, grants } = fixture();
    await store.grant({ ...identity, account: "alice" }, "2026-11-03", "q1");
    expect(row.account_hash).toBe("alice");
    expect(await store.grant(identity, "2026-11-03", "q2")).toBeNull();
    expect(grants).toHaveLength(1);
    expect(await store.grant({ ...identity, account: "bob" }, "2026-11-03", "q2")).toBeNull();
  });
  it("keeps the same account wallet across browsers without granting another ten", async () => {
    const { store, row, grants } = fixture();
    row.account_hash = "alice";
    await store.grant({ ...identity, account: "alice" }, "2026-11-03", "q1");
    await store.grant({ ...identity, account: "alice", browser: "another-browser" }, "2026-11-03", "q1");
    expect(grants).toHaveLength(1);
    expect(await store.claim({ ...identity, account: "alice", browser: "another-browser" })).toEqual({ remaining: 9, newlyUsed: false });
  });
  it("rejects a repeat submission before inserting and retains a retired browser's prohibition", async () => {
    const { store, row, query } = fixture();
    row.retired = true;
    await expect(store.submit(identity, "network", { choices: ["mobile"], requestedQualifications: [], commentMasked: "" })).rejects.toMatchObject({ code: "already_submitted" });
    expect(query.mock.calls.some(([sql]) => sql.startsWith("INSERT INTO feedback_unlock\n"))).toBe(false);
    expect(await store.grant(identity, "2026-11-03", "q1")).toBeNull();
  });
});
