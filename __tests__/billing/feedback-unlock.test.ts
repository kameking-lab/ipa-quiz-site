import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { UnlockFeedbackSchema } from "@/lib/feedback/unlock-contract";
import { FeedbackUnlockStore, type UnlockIdentity } from "@/lib/feedback/unlock-store";
import type { SqlDatabase } from "@/lib/billing/postgres-store";
import { BillingError } from "@/lib/billing/domain";
import { SITE_BASE_URL } from "@/lib/seo/config";

const m = vi.hoisted(() => ({ submit: vi.fn(), status: vi.fn(), origin: vi.fn(), rate: vi.fn(), bot: vi.fn(), user: "alice" as string | null, claim: vi.fn(), slack: vi.fn() }));
vi.mock("@/lib/notify/slack", () => ({ sendSlackMessage: m.slack }));
vi.mock("@/lib/feedback/unlock-runtime", () => ({ feedbackStore: () => ({ submit: m.submit, status: m.status, consumeRate: m.rate, claim: m.claim }), unlockIdentity: () => ({ realm: "test", account: m.user, browser: "browser" }), feedbackHash: () => "network-hash", readFeedbackBrowser: () => "browser", newFeedbackBrowser: () => "browser", feedbackBrowserHeader: () => "feedback_browser=test" }));
vi.mock("@/lib/billing/runtime", () => ({ sameOrigin: m.origin, optionalBillingIdentity: async () => m.user, json: (v: unknown, status = 200) => Response.json(v, { status }) }));
vi.mock("@/lib/billing/practice-access", () => ({ practiceGateEnabled: () => true }));
vi.mock("@/lib/rate-limit/server", () => ({ getClientIp: () => "192.0.2.1", checkRateLimit: m.rate }));
vi.mock("@/lib/turnstile", () => ({ verifyTurnstileToken: m.bot }));
import { GET, POST } from "@/app/api/feedback-unlock/route";

beforeEach(() => { vi.clearAllMocks(); vi.stubEnv("SLACK_WEBHOOK_URL", ""); m.slack.mockResolvedValue(true); vi.stubEnv("FEEDBACK_UNLOCK_ENABLED", "true"); m.user = "alice"; vi.stubEnv("TURNSTILE_SECRET_KEY", "test-only"); vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "test-only"); m.rate.mockResolvedValue(true); m.bot.mockResolvedValue({ ok: true }); m.submit.mockResolvedValue({ eventId: "event", remaining: 10 }); });
afterEach(() => vi.unstubAllEnvs());
const payload = { choices: ["explanations", "mobile"], comment: "連絡 test@example.jp 090-1234-5678" };
const request = (body: unknown) => new Request("https://example.test/api/feedback-unlock", { method: "POST", body: JSON.stringify(body) });
describe("feedback Slack notification", () => {
  beforeEach(() => vi.stubEnv("SLACK_WEBHOOK_URL", "https://hooks.slack.test/feedback"));

  it("notifies once after persistence using masked fields, labels, receipt time and the admin link", async () => {
    const startedAt = Date.now();
    const res = await POST(request({
      choices: ["qualifications", "explanations", "explanations"],
      requestedQualifications: ["情報処理安全確保支援士", "連絡 test@example.jp"],
      comment: "山田太郎さん test@example.jp 090-1234-5678 ID: private-user-42 <@U123456> <https://example.test|リンク> & ご意見",
    }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, eventId: "event", remaining: 10 });
    expect(m.slack).toHaveBeenCalledTimes(1);
    expect(m.submit.mock.invocationCallOrder[0]).toBeLessThan(m.slack.mock.invocationCallOrder[0]);
    const text = m.slack.mock.calls[0][0] as string;
    expect(text).toContain("[過去問AI] フィードバックで+10問 受信");
    expect(text).toContain("選ばれた改善点: 資格の数を増やしてほしい / 解説をもっと詳しく");
    expect(text).toContain("ほしい資格: 情報処理安全確保支援士 / 連絡 [削除済み]");
    expect(text).toContain(`管理画面: ${SITE_BASE_URL}/admin/feedback`);
    expect(text).toContain("&lt;https://example.test|リンク&gt; &amp; ご意見");
    const timestamp = text.match(/受信日時: (.+)/)![1];
    expect(new Date(timestamp).toISOString()).toBe(timestamp);
    expect(Date.parse(timestamp)).toBeGreaterThanOrEqual(startedAt);
    expect(Date.parse(timestamp)).toBeLessThanOrEqual(Date.now());
    for (const secret of ["山田太郎", "test@example.jp", "090-1234-5678", "private-user-42", "U123456", "alice", "browser", "event", "192.0.2.1", "network-hash"]) expect(text).not.toContain(secret);
    const saved = m.submit.mock.calls[0][2];
    expect(text).toContain(saved.commentMasked.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"));
  });

  it("waits for Slack to settle before returning the successful benefit response", async () => {
    let finish!: (delivered: boolean) => void;
    m.slack.mockImplementationOnce(() => new Promise<boolean>(resolve => { finish = resolve; }));
    let returned = false;
    const response = POST(request(payload)).then(res => { returned = true; return res; });
    await vi.waitFor(() => expect(m.slack).toHaveBeenCalledTimes(1));
    expect(m.submit).toHaveBeenCalledTimes(1);
    expect(returned).toBe(false);
    finish(true);
    expect(await (await response).json()).toMatchObject({ ok: true, remaining: 10 });
  });

  it.each(["non-2xx", "exception"])("logs %s failures without payload or error details and preserves +10", async failure => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      if (failure === "exception") m.slack.mockRejectedValueOnce(new Error("secret-webhook test@example.jp"));
      else m.slack.mockResolvedValueOnce(false);
      const res = await POST(request(payload));
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ ok: true, eventId: "event", remaining: 10 });
      expect(m.submit).toHaveBeenCalledTimes(1);
      expect(m.slack).toHaveBeenCalledTimes(1);
      expect(log.mock.calls).toEqual([["[feedback-unlock] Slack notification failed"]]);
    } finally { log.mockRestore(); }
  });

  it("does nothing when the webhook is unset", async () => {
    vi.stubEnv("SLACK_WEBHOOK_URL", "");
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      expect(await (await POST(request(payload))).json()).toMatchObject({ ok: true, remaining: 10 });
      expect(m.slack).not.toHaveBeenCalled();
      expect(log).not.toHaveBeenCalled();
    } finally { log.mockRestore(); }
  });

  it("supports optional empty fields and comment-only feedback", async () => {
    await POST(request({ choices: ["mobile"] }));
    expect(m.slack.mock.calls[0][0]).toContain("ほしい資格: (未記入)\nコメント: (コメントなし)");
    await POST(request({ choices: [], comment: "便利です" }));
    expect(m.slack.mock.calls[1][0]).toContain("選ばれた改善点: (選択なし)");
  });

  it("does not notify rejected, duplicate or failed submissions", async () => {
    m.submit.mockRejectedValueOnce(Error("database"));
    expect((await POST(request(payload))).status).toBe(503);
    m.submit.mockRejectedValueOnce(new BillingError("already_submitted", 409));
    expect((await POST(request(payload))).status).toBe(409);
    m.bot.mockResolvedValueOnce({ ok: false });
    expect((await POST(request(payload))).status).toBe(403);
    m.rate.mockResolvedValueOnce(false);
    expect((await POST(request(payload))).status).toBe(429);
    expect((await POST(request({ choices: [] }))).status).toBe(400);
    m.user = null;
    expect((await POST(request(payload))).status).toBe(401);
    expect(m.slack).not.toHaveBeenCalled();
  });
});

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
    expect(m.submit.mock.calls[0][0]).toEqual({ realm: "test", account: "alice", browser: null });
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

it("does not issue a browser identity cookie for an authenticated status read", async () => {
  m.status.mockResolvedValueOnce({ eligible: true, submitted: false, remaining: 0 });
  const response = await GET(new Request("https://example.test/api/feedback-unlock"));
  expect(response.status).toBe(200);
  expect(response.headers.get("set-cookie")).toBeNull();
});

describe("bonus wallet under its SQL transaction boundary", () => {
  const identity: UnlockIdentity = { realm: "test", account: "alice", browser: "b" };
  function fixture() {
    const row = { event_id: "e", user_id: "alice" as string | null, browser_hash: "b", retired: false };
    const grants: { day: string; question_id: string }[] = [];
    let tail = Promise.resolve();
    const query = vi.fn(async (sql: string, values: unknown[]) => {
      if (sql.startsWith("SELECT event_id FROM")) return [];
      if (sql.startsWith("SELECT event_id")) return [{ ...row }];
      if (sql.startsWith("SELECT day")) return grants.map(g => ({ ...g }));
      if (sql.startsWith("UPDATE feedback_unlock SET user_id")) row.user_id = values[1] as string;
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
    row.user_id = null;
    await store.grant({ ...identity, account: "alice" }, "2026-11-03", "q1");
    expect(row.user_id).toBe("alice");
    expect(await store.grant({ ...identity, account: null }, "2026-11-03", "q2")).toBeNull();
    expect(grants).toHaveLength(1);
    expect(await store.grant({ ...identity, account: "bob" }, "2026-11-03", "q2")).toBeNull();
  });
  it("keeps the same account wallet across browsers without granting another ten", async () => {
    const { store, row, grants } = fixture();
    row.user_id = "alice";
    row.user_id = null;
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

it("rejects anonymous acquisition before touching DB or bot, including new cookies and days", async () => {
  m.user = null;
  for (let n = 0; n < 2; n++) {
    expect((await GET(request(payload))).status).toBe(200);
    expect(await (await GET(request(payload))).json()).toMatchObject({ eligible: false, requiresLogin: true });
    expect((await POST(request(payload))).status).toBe(401);
  }
  expect(m.submit).not.toHaveBeenCalled(); expect(m.rate).not.toHaveBeenCalled(); expect(m.bot).not.toHaveBeenCalled();
});
it.each(["TURNSTILE_SECRET_KEY", "NEXT_PUBLIC_TURNSTILE_SITE_KEY"])("fails closed before DB writes when %s is absent", async key => {
  vi.stubEnv(key, "");
  expect(await (await GET(request(payload))).json()).toMatchObject({ eligible: false });
  expect((await POST(request(payload))).status).toBe(503);
  expect(m.submit).not.toHaveBeenCalled(); expect(m.rate).not.toHaveBeenCalled();
});
it("rejects skipped bot verification and limits Retry-After to short-term rate failures", async () => {
  m.bot.mockResolvedValueOnce({ ok: true, skipped: true });
  expect((await POST(request(payload))).status).toBe(403);
  expect(m.submit).not.toHaveBeenCalled();
  m.rate.mockResolvedValueOnce(false);
  expect((await POST(request(payload))).headers.get("Retry-After")).toBe("60");
});
