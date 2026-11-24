// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AI_FREE_QUESTIONS_PER_DAY, AI_QUOTA_COPY } from "@/lib/constants/ai-quota";
import { resolveAiAccess } from "@/lib/ai/access-server";
import { aiAccessPolicy, aiNormalUsePolicy } from "@/lib/ai/access-config";
import { consumeAiUsage, prepareAiUsage, settleAiUsage, withAiUsageResponse } from "@/lib/ai/usage-server";
import { questionQuotaStore, recordPaidAiQuestion } from "@/lib/ai/question-quota-kv";
import { usageWindow } from "@/lib/ai/usage-kv";
import { checkAiNormalUse, normalUseWindows } from "@/lib/ai/normal-use-server";
import { guestRealm, readGuestCookie } from "@/lib/billing/guest-practice";
import { GET } from "@/app/api/ai/usage/route";
import { readFileSync } from "node:fs";

const ownership = vi.hoisted(() => ({
  identity: vi.fn(), web: vi.fn(), ios: vi.fn(),
}));
vi.mock("@/lib/billing/runtime", () => ({
  optionalBillingSession: async () => {
    const id = await ownership.identity();
    return id ? { user: { id } } : null;
  },
  billingRuntime: () => ({ service: { status: ownership.web } }),
}));
vi.mock("@/lib/billing/subscription/config", () => ({
  monthlySelected: () => true,
  monthlyConfig: () => ({ mode: "mock", sourceInstance: "quota" }),
}));
vi.mock("@/lib/billing/subscription/runtime", () => ({
  monthlyRuntime: () => ({ config: { mode: "stripe-test", sourceInstance: "quota" }, service: { status: ownership.web } }),
}));
vi.mock("@/mobile/server/revenuecat", () => ({ revenueCatAccess: ownership.ios }));
vi.mock("@/lib/ai/question-quota-kv", () => ({
  questionQuotaStore: { read: vi.fn(), reserve: vi.fn(), settle: vi.fn(), claimGuest: vi.fn() },
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
  vi.mocked(questionQuotaStore.claimGuest).mockResolvedValue({ status: "claimed", remaining: 1, resetAt: Date.now() + 60_000 });
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
    const fourth = await prepareAiUsage(caller.request, "copilot");
    reserve.mockResolvedValueOnce({ status: "exhausted", remaining: 0, resetAt, lease: undefined });
    const denied = await consumeAiUsage(fourth, "gemini", ["copilot", "fourth"], questionQuotaStore, now);
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

  it("does not expose a usage status for the retired scoring feature", async () => {
    const response = await GET(new Request("https://example.test/api/ai/usage?feature=scoring"));
    expect(response.status).toBe(400);
    expect(reserve).not.toHaveBeenCalled();
  });

  it("accepts an independently verified App Store member during a Web lookup outage", async () => {
    ownership.web.mockRejectedValue(new Error("web unavailable"));
    ownership.ios.mockResolvedValue({ expiresAt: new Date(Date.now() + 60_000) });
    for (const feature of ["copilot", "exam-library", "essay-grade"] as const) {
      expect((await prepareAiUsage(request, feature)).access).toEqual({ kind: "paid", subject: "same-account" });
    }
    expect(reserve).not.toHaveBeenCalled();
  });

  it("admits a verified iOS member while Web verification is still pending", async () => {
    let finish!: (value: { entitled: boolean }) => void;
    ownership.identity.mockResolvedValue("slow-web-for-ios");
    ownership.web.mockImplementationOnce(() => new Promise(resolve => { finish = resolve; }));
    ownership.ios.mockResolvedValue({ expiresAt: new Date(Date.now() + 60_000) });
    try {
      expect((await prepareAiUsage(request, "exam-library")).access.kind).toBe("paid");
    } finally { finish({ entitled: false }); }
  });

  it("keeps an unknown tier out of the free quota and rechecks on the next request", async () => {
    ownership.web.mockRejectedValueOnce(new Error("web unavailable")).mockResolvedValueOnce({ entitled: true });
    expect((await GET(request)).status).toBe(503);
    expect(await (await GET(request)).json()).toEqual({ kind: "paid" });
    expect(ownership.ios).toHaveBeenCalledTimes(1);
    expect(questionQuotaStore.read).not.toHaveBeenCalled();
  });

  it("bridges a brief Web status outage only for the verified account, through the verified expiry", async () => {
    const now = Date.now();
    const clock = vi.spyOn(Date, "now").mockReturnValue(now);
    try {
      ownership.identity.mockResolvedValue("recent-web-member");
      ownership.web.mockResolvedValueOnce({ entitled: true, expiresAt: new Date(now + 20_000).toISOString() })
        .mockRejectedValue(new Error("web unavailable"));
      expect(await (await GET(request)).json()).toEqual({ kind: "paid" });
      expect(await (await GET(request)).json()).toEqual({ kind: "paid" });
      ownership.identity.mockResolvedValueOnce("different-account");
      expect((await GET(request)).status).toBe(503);
      clock.mockReturnValue(now + 20_000);
      expect((await GET(request)).status).toBe(503);
    } finally { clock.mockRestore(); }
  });

  it("discards a prior Web verification on an explicit billing policy conflict", async () => {
    const { BillingError } = await import("@/lib/billing/domain");
    ownership.identity.mockResolvedValue("conflicted-web-member");
    ownership.web.mockResolvedValueOnce({ entitled: true, expiresAt: new Date(Date.now() + 86_400_000).toISOString() })
      .mockRejectedValueOnce(new BillingError("billing_policy_review_required", 503)).mockRejectedValue(new Error("offline"));
    expect((await prepareAiUsage(request, "copilot")).access.kind).toBe("paid");
    expect((await prepareAiUsage(request, "copilot")).response?.status).toBe(503);
    expect((await prepareAiUsage(request, "copilot")).response?.status).toBe(503);
  });

  it("discards a prior Web verification immediately after a negative lookup", async () => {
    ownership.identity.mockResolvedValue("former-web-member");
    ownership.web.mockResolvedValueOnce({ entitled: true, expiresAt: new Date(Date.now() + 86_400_000).toISOString() })
      .mockResolvedValueOnce({ entitled: false }).mockRejectedValue(new Error("web unavailable"));
    expect((await prepareAiUsage(request, "copilot")).access.kind).toBe("paid");
    expect((await prepareAiUsage(request, "copilot")).access.kind).toBe("free");
    expect((await prepareAiUsage(request, "copilot")).response?.status).toBe(503);
  });

  it("releases failed answers, and retries an already counted reply without reserving an extra slot", async () => {
    const now = Date.now();
    const result = { remaining: 1, resetAt: now + 1000 };
    const lease = { day: { subject: "user:same-account", limit: 3, offset: 540, now },
      fingerprint: "same", owner: "owner", expiresAt: now + 120_000 };
    reserve.mockResolvedValueOnce({ ...result, status: "reserved", lease });
    settle.mockResolvedValueOnce({ ...result, status: "released" });
    const response = await withAiUsageResponse(async track => {
      const usage = await prepareAiUsage(request, "essay-grade");
      track(usage);
      await consumeAiUsage(usage, "gemini", ["essay-grade", "answer"]);
      return new Response(null, { status: 503 });
    });
    expect(response.headers.get("X-AI-Quota-Consumed")).toBe("0");
    expect(settle).toHaveBeenCalledExactlyOnceWith(lease, false);
    reserve.mockResolvedValueOnce({ ...result, status: "repeat", lease });
    settle.mockResolvedValueOnce({ ...result, status: "recovered" });
    const resend = await prepareAiUsage(request, "essay-grade");
    expect(await consumeAiUsage(resend, "gemini", ["essay-grade", "answer"])).toBeNull();
    await settleAiUsage(resend, true);
    expect(settle).toHaveBeenCalledTimes(2);
    expect(resend.headers["X-AI-Quota-Consumed"]).toBe("0");
    reserve.mockResolvedValueOnce({ ...result, status: "answered", lease: undefined });
    const again = await prepareAiUsage(request, "essay-grade");
    const duplicate = await consumeAiUsage(again, "gemini", ["essay-grade", "answer"]);
    expect(duplicate?.status).toBe(409);
    expect(await duplicate?.json()).toMatchObject({ error: "ai_question_answered" });
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

  it("uses one service cap for a member across copilot and grading without adding a personal daily cap", () => {
    const now = Date.now();
    const windows = (endpoint: string) => normalUseWindows("same-account", endpoint, aiNormalUsePolicy(), now);
    const global = (endpoint: string) => windows(endpoint).filter(w => w.key.startsWith("rl:global:"));
    expect(global("essay-grade")).toEqual(global("copilot"));
    expect(global("copilot").map(w => w.limit)).toEqual([500, 5000]);
    expect(windows("essay-grade").filter(w => w.key.startsWith("ai:normal-use:"))).toHaveLength(1);
  });

  it.each(["released", "unchanged"] as const)("preserves a graded result when free settlement fails and the lease is %s", async status => {
    const now = Date.now(), resetAt = now + 60_000;
    const lease = { day: { subject: "user:same-account", limit: 3, offset: 540, now },
      fingerprint: "essay-grade", owner: "owner", expiresAt: now + 120_000 };
    reserve.mockResolvedValueOnce({ status: "reserved", remaining: 1, resetAt, lease });
    settle.mockRejectedValueOnce(new Error("lost reply")).mockResolvedValueOnce({ status: "unchanged", remaining: 1, resetAt })
      .mockResolvedValueOnce({ status, remaining: 1, resetAt });
    const result = await withAiUsageResponse(async track => {
      const context = await prepareAiUsage(request, "essay-grade");
      track(context);
      await consumeAiUsage(context, "gemini", ["essay-grade", "answer"]);
      return Response.json({ grade: "completed" }, { headers: context.headers });
    });
    expect(result.status).toBe(200);
    expect(await result.json()).toMatchObject({ grade: "completed" });
    expect(result.headers.get("X-AI-Quota-Consumed")).toBe(status === "released" ? "0" : "unknown");
    expect(result.headers.get("X-RateLimit-Remaining")).toBe(status === "released" ? "1" : null);
    expect(settle.mock.calls).toEqual([[lease, true], [lease, true], [lease, false]]);
  });

  it.each([undefined, "false"])("returns the original legacy response with rollout set to %s", async rollout => {
    vi.stubEnv("AI_QUOTA_ROLLOUT", rollout);
    const dependencies = vi.fn();
    expect(await resolveAiAccess(request, "copilot", aiAccessPolicy(), dependencies)).toEqual({ kind: "legacy" });
    expect(dependencies).not.toHaveBeenCalled();
    expect(aiNormalUsePolicy().rolloutEnabled).toBe(false);
    const legacy = new Response("legacy");
    expect(await withAiUsageResponse(async () => legacy)).toBe(legacy);
    expect(await (await GET(request)).json()).toEqual({ kind: "legacy" });
  });

  it("keeps the App Store listing and review notes aligned with the shared copy", () => {
    const notes = readFileSync("mobile/asc/review-notes.ja.txt", "utf8");
    expect(aiAccessPolicy().dailyNewGenerationLimit).toBe(AI_FREE_QUESTIONS_PER_DAY);
    expect(notes).toContain(AI_QUOTA_COPY);
    const listing = readFileSync("mobile/fastlane/metadata/ja/description.txt", "utf8");
    expect(listing).toContain(AI_QUOTA_COPY);
    expect(listing).toContain("https://www.kakomon-ai.jp/privacy");
    expect(listing).toContain("https://www.apple.com/legal/internet-services/itunes/dev/stdeula/");
  });
});
it("imports the signed-in browser quota before reporting status, and ignores tampered cookies", async () => {
  const guest = await guestRequest();
  ownership.identity.mockResolvedValue("same-account");
  const resetAt = Date.now() + 60_000;
  vi.mocked(questionQuotaStore.read).mockResolvedValueOnce({ status: "status", remaining: 1, resetAt });
  expect(await (await GET(guest.request)).json()).toEqual({ kind: "free", remaining: 1, resetAt });
  expect(questionQuotaStore.claimGuest).toHaveBeenCalledExactlyOnceWith(
    expect.objectContaining({ subject: "user:same-account", limit: 3, offset: 540 }), guest.subject,
  );
  vi.mocked(questionQuotaStore.read).mockResolvedValueOnce({ status: "status", remaining: 3, resetAt });
  const tampered = new Request(request, { headers: { cookie: guest.request.headers.get("cookie")! + "bad" } });
  expect((await GET(tampered)).status).toBe(200);
  expect(questionQuotaStore.claimGuest).toHaveBeenCalledTimes(1);
});

it("waits for an in-flight guest answer before admitting a signed-in free generation", async () => {
  const guest = await guestRequest();
  const resetAt = Date.now() + 60_000;
  ownership.identity.mockResolvedValue("same-account");
  vi.mocked(questionQuotaStore.claimGuest).mockResolvedValueOnce({ status: "pending", remaining: 3, resetAt });
  const waiting = await prepareAiUsage(guest.request, "copilot");
  expect((await consumeAiUsage(waiting, "gemini", ["concurrent"]))?.status).toBe(409);
  expect(reserve).not.toHaveBeenCalled();
  reserve.mockResolvedValueOnce({ status: "exhausted", remaining: 0, resetAt, lease: undefined });
  expect((await consumeAiUsage(waiting, "gemini", ["concurrent"]))?.status).toBe(429);
});

it("reports a pending App Store renewal without either reading or reserving a free slot", async () => {
  const { BillingError } = await import("@/lib/billing/domain");
  ownership.ios.mockRejectedValueOnce(new BillingError("membership_check_pending", 503))
    .mockRejectedValueOnce(new BillingError("membership_check_pending", 503))
    .mockResolvedValue({ expiresAt: new Date(Date.now() + 60_000) });
  const status = await GET(request);
  expect(status.status).toBe(503);
  expect(await status.json()).toMatchObject({ error: "ai_membership_check_pending" });
  const usage = await prepareAiUsage(request, "copilot");
  expect((await consumeAiUsage(usage, "gemini", ["renewal"]))?.status).toBe(503);
  expect(questionQuotaStore.read).not.toHaveBeenCalled();
  expect(reserve).not.toHaveBeenCalled();
  expect(await (await GET(request)).json()).toEqual({ kind: "paid" });
});
