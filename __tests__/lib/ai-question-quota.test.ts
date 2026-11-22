// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AI_FREE_QUESTIONS_PER_DAY, AI_QUOTA_COPY } from "@/lib/constants/ai-quota";
import { resolveAiAccess } from "@/lib/ai/access-server";
import { aiAccessPolicy, aiNormalUsePolicy } from "@/lib/ai/access-config";
import { consumeAiUsage, prepareAiUsage, settleAiUsage, withAiUsageResponse } from "@/lib/ai/usage-server";
import { questionQuotaStore, recordPaidAiQuestion } from "@/lib/ai/question-quota-kv";
import { usageWindow } from "@/lib/ai/usage-kv";
import { checkAiNormalUse } from "@/lib/ai/normal-use-server";
import { guestRealm, readGuestCookie } from "@/lib/billing/guest-practice";
import { GET } from "@/app/api/ai/usage/route";
import { readFileSync } from "node:fs";

const ownership = vi.hoisted(() => ({
  identity: vi.fn(), web: vi.fn(), ios: vi.fn(),
}));
vi.mock("@/lib/billing/runtime", () => ({
  optionalBillingIdentity: ownership.identity,
  billingRuntime: () => ({ service: { status: ownership.web } }),
}));
vi.mock("@/lib/billing/subscription/config", () => ({
  monthlySelected: () => true,
  monthlyConfig: () => ({ mode: "mock", sourceInstance: "quota" }),
}));
vi.mock("@/lib/billing/subscription/runtime", () => ({
  monthlyRuntime: () => ({ service: { status: ownership.web } }),
}));
vi.mock("@/mobile/server/revenuecat", () => ({ revenueCatAccess: ownership.ios }));
vi.mock("@/lib/ai/question-quota-kv", () => ({
  questionQuotaStore: { read: vi.fn(), reserve: vi.fn(), settle: vi.fn() },
  recordPaidAiQuestion: vi.fn(),
}));

const request = new Request("https://kakomon.example/api/ai/usage");
const reserve = vi.mocked(questionQuotaStore.reserve);
const settle = vi.mocked(questionQuotaStore.settle);

beforeEach(() => {
  vi.resetAllMocks();
  vi.stubEnv("AI_QUOTA_ROLLOUT", "true");
  vi.stubEnv("AUTH_SECRET", "synthetic-guest-cookie-signing-test");
  ownership.identity.mockResolvedValue("same-account");
  ownership.web.mockResolvedValue({ entitled: false });
  ownership.ios.mockResolvedValue(null);
});
afterEach(() => vi.unstubAllEnvs());

async function guestRequest() {
  ownership.identity.mockResolvedValue(null);
  const first = await GET(request);
  expect(first.status).toBe(428);
  const cookie = first.headers.get("Set-Cookie")!.split(";")[0];
  const guest = new Request(request, { headers: { cookie } });
  const subject = readGuestCookie(guest, guestRealm("mock", "quota"));
  expect(subject).toBeTruthy();
  return { request: guest, subject: `guest:${subject}` };
}

describe("AI daily question quota", () => {
  it.each(["anonymous", "signed-in free"])("%s shares the third and fourth calls across features", async (tier) => {
    const caller = tier === "anonymous" ? await guestRequest() : { request, subject: "user:same-account" };
    const third = await prepareAiUsage(caller.request, "exam-library");
    expect(third.access).toEqual({ kind: "free", subject: caller.subject });
    const now = Date.parse("2026-11-22T14:59:59Z");
    const resetAt = now + 1000;
    const day = { subject: caller.subject, limit: AI_FREE_QUESTIONS_PER_DAY, offset: 540, now };
    const lease = { day, fingerprint: "same", owner: "owner", expiresAt: now + 120_000 };
    reserve.mockResolvedValueOnce({ status: "reserved", remaining: 1, resetAt, lease });
    settle.mockResolvedValueOnce({ status: "completed", remaining: 0, resetAt });
    expect(await consumeAiUsage(third, "gemini", ["exam-library", "third"], questionQuotaStore, now)).toBeNull();
    expect(third.headers["X-AI-Quota-Consumed"]).toBe("pending");
    await settleAiUsage(third, true);
    expect(third.headers["X-RateLimit-Remaining"]).toBe("0");
    const fourth = await prepareAiUsage(caller.request, "scoring");
    reserve.mockResolvedValueOnce({ status: "exhausted", remaining: 0, resetAt, lease: undefined });
    const denied = await consumeAiUsage(fourth, "gemini", ["scoring", "fourth"], questionQuotaStore, now);
    expect(denied?.status).toBe(429);
    expect(await denied?.json()).toMatchObject({ error: "ai_daily_quota_exhausted", resetAt });
    expect(reserve.mock.calls.map(([window]) => window)).toEqual([day, day]);
  });

  it.each(["web", "iOS"])("%s members pass both the third and fourth calls independently of the quota store", async (channel) => {
    if (channel === "web") ownership.web.mockResolvedValue({ entitled: true });
    else ownership.ios.mockResolvedValue({ expiresAt: new Date(Date.now() + 60_000) });
    reserve.mockRejectedValue(new Error("KV down"));
    for (const count of [3, 4]) {
      const usage = await prepareAiUsage(request, "copilot");
      expect(usage.access.kind).toBe("paid");
      expect(await consumeAiUsage(usage, "gemini", ["copilot", count])).toBeNull();
      await settleAiUsage(usage, true);
    }
    expect(reserve).not.toHaveBeenCalled();
    expect(recordPaidAiQuestion).toHaveBeenCalledTimes(2);
    expect(await (await GET(request)).json()).toEqual({ kind: "paid" });
  });

  it("switches windows exactly at midnight JST", () => {
    const policy = aiAccessPolicy();
    const midnight = Date.parse("2026-11-22T15:00:00.000Z");
    const before = usageWindow("user:same-account", midnight - 1, policy.dailyResetUtcOffsetMinutes!);
    const after = usageWindow("user:same-account", midnight, policy.dailyResetUtcOffsetMinutes!);
    expect(before.resetAt).toBe(midnight);
    expect(after.resetAt).toBe(midnight + 86_400_000);
    expect(after.key).not.toBe(before.key);
  });

  it("accepts an independently verified App Store member during a Web lookup outage", async () => {
    ownership.web.mockRejectedValue(new Error("web unavailable"));
    ownership.ios.mockResolvedValue({ expiresAt: new Date(Date.now() + 60_000) });
    for (const feature of ["copilot", "exam-library", "scoring"] as const) {
      expect((await prepareAiUsage(request, feature)).access).toEqual({ kind: "paid", subject: "same-account" });
    }
    expect(reserve).not.toHaveBeenCalled();
  });

  it("keeps an unknown tier out of the free quota and rechecks on the next request", async () => {
    ownership.web.mockRejectedValueOnce(new Error("web unavailable")).mockResolvedValueOnce({ entitled: true });
    expect((await GET(request)).status).toBe(503);
    expect(await (await GET(request)).json()).toEqual({ kind: "paid" });
    expect(ownership.ios).toHaveBeenCalledTimes(1);
    expect(questionQuotaStore.read).not.toHaveBeenCalled();
  });

  it("releases failed answers, and retries an already counted reply without reserving an extra slot", async () => {
    const now = Date.now();
    const result = { remaining: 1, resetAt: now + 1000 };
    const lease = { day: { subject: "user:same-account", limit: 3, offset: 540, now },
      fingerprint: "same", owner: "owner", expiresAt: now + 120_000 };
    reserve.mockResolvedValueOnce({ ...result, status: "reserved", lease });
    settle.mockResolvedValueOnce({ ...result, status: "released" });
    const response = await withAiUsageResponse(async track => {
      const usage = await prepareAiUsage(request, "scoring");
      track(usage);
      await consumeAiUsage(usage, "gemini", ["scoring", "answer"]);
      return new Response(null, { status: 503 });
    });
    expect(response.headers.get("X-AI-Quota-Consumed")).toBe("0");
    expect(settle).toHaveBeenCalledExactlyOnceWith(lease, false);
    reserve.mockResolvedValueOnce({ ...result, status: "repeat", lease: undefined });
    const resend = await prepareAiUsage(request, "scoring");
    expect(await consumeAiUsage(resend, "gemini", ["scoring", "answer"])).toBeNull();
    await settleAiUsage(resend, true);
    expect(settle).toHaveBeenCalledTimes(1);
  });

  it("blocks free calls on quota KV failure and promptly retries paid normal-use checks on later calls", async () => {
    reserve.mockRejectedValue(new Error("KV down"));
    const free = await prepareAiUsage(request, "copilot");
    expect((await consumeAiUsage(free, "gemini", ["copilot", "request"]))?.status).toBe(503);
    ownership.web.mockResolvedValue({ entitled: true });
    const paid = await prepareAiUsage(request, "copilot");
    const store = { admit: vi.fn().mockRejectedValueOnce(new Error("KV down")).mockResolvedValueOnce({ allowed: true }) };
    expect(await checkAiNormalUse(request, "copilot", paid, {}, aiNormalUsePolicy(), store)).toMatchObject({ ok: false, reason: "unavailable" });
    expect(await checkAiNormalUse(request, "copilot", paid, {}, aiNormalUsePolicy(), store)).toEqual({ ok: true });
  });

  it("uses one runtime switch and returns the original legacy response when disabled", async () => {
    vi.stubEnv("AI_QUOTA_ROLLOUT", "false");
    const dependencies = vi.fn();
    expect(await resolveAiAccess(request, "copilot", aiAccessPolicy(), dependencies)).toEqual({ kind: "legacy" });
    expect(dependencies).not.toHaveBeenCalled();
    expect(aiNormalUsePolicy().rolloutEnabled).toBe(false);
    const legacy = new Response("legacy");
    expect(await withAiUsageResponse(async () => legacy)).toBe(legacy);
    expect(await (await GET(request)).json()).toEqual({ kind: "legacy" });
  });

  it("keeps the App Store review snapshot aligned with the shared copy", () => {
    const notes = readFileSync("mobile/asc/review-notes.ja.txt", "utf8");
    expect(aiAccessPolicy().dailyNewGenerationLimit).toBe(AI_FREE_QUESTIONS_PER_DAY);
    expect(notes).toContain(AI_QUOTA_COPY);
  });
});
