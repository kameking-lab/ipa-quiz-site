// @vitest-environment node
import { randomBytes, createHash } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const ledger = vi.hoisted(() => ({ active: "", retired: new Set<string>() }));
vi.mock("@/lib/auth/app-review-revocation", () => ({
  activateReviewVersion: async (version: string) => {
    if (ledger.retired.has(version)) return false;
    if (ledger.active && ledger.active !== version) ledger.retired.add(ledger.active);
    ledger.active = version; return true;
  },
  revokeReviewSessions: async () => { if (ledger.active) ledger.retired.add(ledger.active); ledger.active = ""; },
}));
const m = vi.hoisted(() => ({ admit: vi.fn(), find: vi.fn(), upsert: vi.fn() }));
vi.mock("@/lib/ai/usage-kv", () => ({ sharedUsageStore: { admit: m.admit } }));
vi.mock("@/lib/db/prisma", () => ({ prisma: { user: { findUnique: m.find, upsert: m.upsert } } }));
import { authorizeAppReview, reviewSessionClaims, reviewSessionValid } from "@/lib/auth/app-review";
import { APP_REVIEW_USER_ID, APP_REVIEW_EMAIL, appReviewConfig } from "@/lib/auth/app-review-config";
import { NextRequest } from "next/server";

let code: string;
const user = { id: APP_REVIEW_USER_ID, email: APP_REVIEW_EMAIL, name: "Review", image: null, plan: "free" };
const request = (origin = "https://auth.example.invalid") => new Request("https://auth.example.invalid/api/auth/callback/app-review", { method: "POST", headers: { origin } });
beforeEach(() => {
  ledger.active = ""; ledger.retired.clear();
  code = randomBytes(32).toString("base64url");
  for (const [key, value] of Object.entries({ APP_REVIEW_LOGIN_ENABLED: "true",
    APP_REVIEW_CODE_SHA256: createHash("sha256").update(code).digest("hex"), APP_REVIEW_EXPIRES_AT: new Date(Date.now() + 3600000).toISOString(),
    AUTH_SECRET: randomBytes(32).toString("hex"), AUTH_URL: "https://auth.example.invalid", DATABASE_URL: "postgresql://unused.invalid/test",
    KV_REST_API_URL: "https://kv.example.invalid", KV_REST_API_TOKEN: randomBytes(32).toString("hex") })) vi.stubEnv(key, value);
  m.admit.mockReset().mockResolvedValue({ allowed: true });
  m.find.mockReset().mockResolvedValue({ ...user, createdAt: new Date("2026-11-04T00:00:00Z") });
  m.upsert.mockReset().mockResolvedValue({ ...user, stripeCustomerId: null, _count: { accounts: 0, subscriptions: 0 } });
  vi.spyOn(console, "info").mockImplementation(() => {});
});
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

describe("restricted review credentials", () => {
  it("atomically provisions only the reserved free member after valid code admission", async () => {
    expect(await authorizeAppReview({ code }, request())).toEqual(user);
    expect(m.upsert).toHaveBeenCalledWith(expect.objectContaining({ where: { id: user.id }, update: {}, create: { id: user.id, email: user.email, name: "App Review", plan: "free" } }));
    expect(m.admit).toHaveBeenCalledTimes(4);
    vi.stubEnv("APP_REVIEW_USER_ID", "ordinary-victim");
    vi.stubEnv("APP_REVIEW_EMAIL", "victim@example.invalid");
    expect(appReviewConfig()).toMatchObject({ userId: APP_REVIEW_USER_ID, email: APP_REVIEW_EMAIL });
    expect(JSON.stringify(vi.mocked(console.info).mock.calls)).not.toContain(code);
    expect(JSON.stringify(vi.mocked(console.info).mock.calls)).not.toContain(user.email);
  });
  it.each(["APP_REVIEW_LOGIN_ENABLED", "APP_REVIEW_CODE_SHA256", "AUTH_SECRET", "DATABASE_URL", "KV_REST_API_URL", "KV_REST_API_TOKEN", "AUTH_URL"])("fails closed without %s", async key => {
    vi.stubEnv(key, ""); expect(appReviewConfig()).toBeNull();
    expect(await authorizeAppReview({ code }, request())).toBeNull();
    expect(m.upsert).not.toHaveBeenCalled();
  });
  it("rejects expired credentials and other origins before database access", async () => {
    expect(await authorizeAppReview({ code }, request("https://evil.invalid"))).toBeNull();
    vi.stubEnv("APP_REVIEW_EXPIRES_AT", new Date(Date.now() - 1).toISOString());
    expect(await authorizeAppReview({ code }, request())).toBeNull();
    expect(m.upsert).not.toHaveBeenCalled();
  });
  it("rejects wrong/short/malformed codes and conflicting or subscribed DB profiles", async () => {
    for (const credentials of [{ code: randomBytes(32).toString("hex") }, { code: "short" }, { code: {} }]) {
      expect(await authorizeAppReview(credentials, request())).toBeNull();
    }
    expect(m.upsert).not.toHaveBeenCalled();
    for (const profile of [{ email: "other@example.invalid" }, { plan: "team" }, { plan: "premium" }, { stripeCustomerId: "cus_test" }, { _count: { accounts: 1, subscriptions: 0 } }, { _count: { accounts: 0, subscriptions: 1 } }]) {
      m.upsert.mockResolvedValueOnce({ ...user, stripeCustomerId: null, _count: { accounts: 0, subscriptions: 0 }, ...profile });
      expect(await authorizeAppReview({ code }, request())).toBeNull();
    }
  });
  it("rejects correct credentials on exhausted/unavailable shared quota", async () => {
    m.admit.mockResolvedValueOnce({ allowed: false });
    expect(await authorizeAppReview({ code }, request())).toBeNull();
    m.admit.mockRejectedValueOnce(new Error("do not expose transport details"));
    expect(await authorizeAppReview({ code }, request())).toBeNull();
    expect(m.upsert).not.toHaveBeenCalled();
  });
  it("fails closed on provisioning conflict and never resets an existing member", async () => {
    m.upsert.mockRejectedValueOnce(new Error("unique email conflict"));
    expect(await authorizeAppReview({ code }, request())).toBeNull();
    expect(await authorizeAppReview({ code }, request())).toEqual(user);
    expect(await authorizeAppReview({ code }, request())).toEqual(user);
    for (const [query] of m.upsert.mock.calls) expect(query.update).toEqual({});
  });
  it("cannot revive old sessions after deletion and automatic recreation of the reserved member", async () => {
    const token = { id: user.id, ...await reviewSessionClaims(user.id) };
    expect(await reviewSessionValid(token)).toBe(true);
    m.find.mockResolvedValueOnce(null);
    expect(await reviewSessionValid(token)).toBe(false);
    m.find.mockResolvedValue({ ...user, createdAt: new Date("2026-11-04T01:00:00Z") });
    expect(await reviewSessionValid(token)).toBe(false);
    expect(await reviewSessionValid({ id: user.id, ...await reviewSessionClaims(user.id) })).toBe(true);
    expect(await reviewSessionValid({ id: user.id })).toBe(false);
  });
  it("sustained distributed invalid attempts cannot exhaust valid-credential admission", async () => {
    m.admit.mockImplementation(async (subject: string) => ({ allowed: !subject.includes("source:blocked") }));
    for (let i = 0; i < 120; i++) {
      const req = new Request(request(), { headers: { origin: "https://auth.example.invalid", "x-forwarded-for": `192.0.2.${i}` } });
      expect(await authorizeAppReview({ code: randomBytes(32).toString("base64url") }, req)).toBeNull();
    }
    expect(m.admit.mock.calls.every(([subject]) => String(subject).includes(":source:"))).toBe(true);
    expect(await authorizeAppReview({ code }, request())).toEqual(user);
  });
  it("revokes existing review tokens on rotation, expiry or disable, even after removing the pinned ID", async () => {
    const token = { id: user.id, ...await reviewSessionClaims(user.id) };
    expect(await reviewSessionValid(token)).toBe(true);
    vi.stubEnv("APP_REVIEW_CODE_SHA256", randomBytes(32).toString("hex"));
    expect(await reviewSessionValid(token)).toBe(false);
    vi.stubEnv("APP_REVIEW_LOGIN_ENABLED", "false");
    expect(await reviewSessionValid(token)).toBe(false);
    expect(await reviewSessionValid({ id: "ordinary-account" })).toBe(true);
  });
  it("permanently retires observed disabled versions and refuses configuration rollback", async () => {
    const originalHash = process.env.APP_REVIEW_CODE_SHA256!;
    const token = { id: user.id, ...await reviewSessionClaims(user.id) };
    vi.stubEnv("APP_REVIEW_LOGIN_ENABLED", "false");
    expect(await reviewSessionValid(token)).toBe(false);
    vi.stubEnv("APP_REVIEW_LOGIN_ENABLED", "true");
    expect(await reviewSessionValid(token)).toBe(false);
    expect((await reviewSessionClaims(user.id)).reviewVersion).toBeUndefined();
    vi.stubEnv("APP_REVIEW_CODE_SHA256", randomBytes(32).toString("hex"));
    const current = { id: user.id, ...await reviewSessionClaims(user.id) };
    expect(await reviewSessionValid(current)).toBe(true);
    vi.stubEnv("APP_REVIEW_CODE_SHA256", originalHash);
    expect(await reviewSessionValid(token)).toBe(false);
    expect(await reviewSessionValid(current)).toBe(false);
  });
  it("uses the production Auth.js CSRF flow, issues a real session and revokes it on disable", async () => {
    vi.stubEnv("AUTH_GOOGLE_ID", ""); vi.stubEnv("AUTH_GITHUB_ID", ""); vi.stubEnv("AUTH_EMAIL_SERVER", "");
    const { handlers } = await import("@/lib/auth");
    const csrf = await handlers.GET(new NextRequest("https://auth.example.invalid/api/auth/csrf"));
    const { csrfToken } = await csrf.json();
    const cookies = csrf.headers.getSetCookie().map(item => item.split(";")[0]).join("; ");
    const callback = (withCsrf: boolean) => handlers.POST(new NextRequest("https://auth.example.invalid/api/auth/callback/app-review", {
      method: "POST", headers: { origin: "https://auth.example.invalid", cookie: cookies, "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ code, ...(withCsrf ? { csrfToken } : {}) }),
    }));
    const rejected = await callback(false);
    expect(rejected.headers.get("location")).toContain("MissingCSRF");
    expect(m.admit).not.toHaveBeenCalled();
    const accepted = await callback(true);
    const sessionCookies = accepted.headers.getSetCookie().filter(item => item.includes("authjs.session-token=")).map(item => item.split(";")[0]).join("; ");
    expect(sessionCookies).not.toBe("");
    const probe = () => handlers.GET(new NextRequest("https://auth.example.invalid/api/auth/session", { headers: { cookie: sessionCookies } }));
    expect((await (await probe()).json()).user.id).toBe(user.id);
    vi.stubEnv("APP_REVIEW_LOGIN_ENABLED", "false");
    expect(await (await probe()).json()).toBeNull();
  });
});
