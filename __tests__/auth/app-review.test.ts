// @vitest-environment node
import { randomBytes, createHash } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const m = vi.hoisted(() => ({ admit: vi.fn(), find: vi.fn() }));
vi.mock("@/lib/ai/usage-kv", () => ({ sharedUsageStore: { admit: m.admit } }));
vi.mock("@/lib/db/prisma", () => ({ prisma: { user: { findUnique: m.find } } }));
import { authorizeAppReview, reviewSessionClaims, reviewSessionValid } from "@/lib/auth/app-review";
import { appReviewConfig } from "@/lib/auth/app-review-config";
import { NextRequest } from "next/server";

let code: string;
const user = { id: "review-test-user", email: "review@example.invalid", name: "Review", image: null, plan: "free" };
const request = (origin = "https://auth.example.invalid") => new Request("https://auth.example.invalid/api/auth/callback/app-review", { method: "POST", headers: { origin } });
beforeEach(() => {
  code = randomBytes(32).toString("base64url");
  for (const [key, value] of Object.entries({ APP_REVIEW_LOGIN_ENABLED: "true", APP_REVIEW_EMAIL: user.email, APP_REVIEW_USER_ID: user.id,
    APP_REVIEW_CODE_SHA256: createHash("sha256").update(code).digest("hex"), APP_REVIEW_EXPIRES_AT: new Date(Date.now() + 3600000).toISOString(),
    AUTH_SECRET: randomBytes(32).toString("hex"), AUTH_URL: "https://auth.example.invalid", DATABASE_URL: "postgresql://unused.invalid/test",
    KV_REST_API_URL: "https://kv.example.invalid", KV_REST_API_TOKEN: randomBytes(32).toString("hex") })) vi.stubEnv(key, value);
  m.admit.mockReset().mockResolvedValue({ allowed: true });
  m.find.mockReset().mockResolvedValue(user);
  vi.spyOn(console, "info").mockImplementation(() => {});
});
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

describe("restricted review credentials", () => {
  it("returns only the pinned existing account, preserving its real plan", async () => {
    expect(await authorizeAppReview({ email: user.email.toUpperCase(), code }, request())).toEqual(user);
    expect(m.find).toHaveBeenCalledWith({ where: { id: user.id }, select: { id: true, email: true, name: true, image: true, plan: true } });
    expect(m.admit).toHaveBeenCalledTimes(4);
    expect(JSON.stringify(vi.mocked(console.info).mock.calls)).not.toContain(code);
    expect(JSON.stringify(vi.mocked(console.info).mock.calls)).not.toContain(user.email);
  });
  it.each(["APP_REVIEW_LOGIN_ENABLED", "APP_REVIEW_EMAIL", "APP_REVIEW_USER_ID", "APP_REVIEW_CODE_SHA256", "AUTH_SECRET", "DATABASE_URL", "KV_REST_API_URL", "KV_REST_API_TOKEN", "AUTH_URL"])("fails closed without %s", async key => {
    vi.stubEnv(key, ""); expect(appReviewConfig()).toBeNull();
    expect(await authorizeAppReview({ email: user.email, code }, request())).toBeNull();
    expect(m.find).not.toHaveBeenCalled();
  });
  it("rejects expired credentials and other origins before database access", async () => {
    expect(await authorizeAppReview({ email: user.email, code }, request("https://evil.invalid"))).toBeNull();
    vi.stubEnv("APP_REVIEW_EXPIRES_AT", new Date(Date.now() - 1).toISOString());
    expect(await authorizeAppReview({ email: user.email, code }, request())).toBeNull();
    expect(m.find).not.toHaveBeenCalled();
  });
  it("rejects another account, wrong/short/malformed codes and deleted/mismatched DB profiles", async () => {
    for (const credentials of [{ email: "other@example.invalid", code }, { email: user.email, code: randomBytes(32).toString("hex") }, { email: user.email, code: "short" }, { email: user.email, code: {} }]) {
      expect(await authorizeAppReview(credentials, request())).toBeNull();
    }
    expect(m.find).not.toHaveBeenCalled();
    for (const profile of [null, { ...user, email: "other@example.invalid" }, { ...user, plan: "team" }]) {
      m.find.mockResolvedValueOnce(profile);
      expect(await authorizeAppReview({ email: user.email, code }, request())).toBeNull();
    }
  });
  it("rejects correct credentials on exhausted/unavailable shared quota", async () => {
    m.admit.mockResolvedValueOnce({ allowed: false });
    expect(await authorizeAppReview({ email: user.email, code }, request())).toBeNull();
    m.admit.mockRejectedValueOnce(new Error("do not expose transport details"));
    expect(await authorizeAppReview({ email: user.email, code }, request())).toBeNull();
    expect(m.find).not.toHaveBeenCalled();
  });
  it("sustained distributed invalid attempts cannot exhaust valid-credential admission", async () => {
    m.admit.mockImplementation(async (subject: string) => ({ allowed: !subject.includes("source:blocked") }));
    for (let i = 0; i < 120; i++) {
      const req = new Request(request(), { headers: { origin: "https://auth.example.invalid", "x-forwarded-for": `192.0.2.${i}` } });
      expect(await authorizeAppReview({ email: user.email, code: randomBytes(32).toString("base64url") }, req)).toBeNull();
    }
    expect(m.admit.mock.calls.every(([subject]) => String(subject).includes(":source:"))).toBe(true);
    expect(await authorizeAppReview({ email: user.email, code }, request())).toEqual(user);
  });
  it("revokes existing review tokens on rotation, expiry or disable, even after removing the pinned ID", () => {
    const token = { id: user.id, ...reviewSessionClaims(user.id) };
    expect(reviewSessionValid(token)).toBe(true);
    vi.stubEnv("APP_REVIEW_CODE_SHA256", randomBytes(32).toString("hex"));
    expect(reviewSessionValid(token)).toBe(false);
    vi.stubEnv("APP_REVIEW_LOGIN_ENABLED", "false"); vi.stubEnv("APP_REVIEW_USER_ID", "");
    expect(reviewSessionValid(token)).toBe(false);
    expect(reviewSessionValid({ id: "ordinary-account" })).toBe(true);
  });
  it("uses the production Auth.js CSRF flow, issues a real session and revokes it on disable", async () => {
    vi.stubEnv("AUTH_GOOGLE_ID", ""); vi.stubEnv("AUTH_GITHUB_ID", ""); vi.stubEnv("AUTH_EMAIL_SERVER", "");
    const { handlers } = await import("@/lib/auth");
    const csrf = await handlers.GET(new NextRequest("https://auth.example.invalid/api/auth/csrf"));
    const { csrfToken } = await csrf.json();
    const cookies = csrf.headers.getSetCookie().map(item => item.split(";")[0]).join("; ");
    const callback = (withCsrf: boolean) => handlers.POST(new NextRequest("https://auth.example.invalid/api/auth/callback/app-review", {
      method: "POST", headers: { origin: "https://auth.example.invalid", cookie: cookies, "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ email: user.email, code, ...(withCsrf ? { csrfToken } : {}) }),
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
