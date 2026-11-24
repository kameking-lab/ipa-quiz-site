// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/billing/status/route";
import { POST as openQuestion } from "@/app/api/billing/question/route";
import { hasFreeWebAccess } from "@/lib/ads/web-ads";
import { consumeAiUsage, prepareAiUsage } from "@/lib/ai/usage-server";
import { MonthlyService } from "@/lib/billing/subscription/service";
import { appUserIdentity } from "@/mobile/server/revenuecat";
import { MonthlyMemoryStore, monthlyFixture, monthlyFixtureConfig } from "./monthly-fixture";

const mocks = vi.hoisted(() => ({
  userId: "bob" as string | null,
  service: null as MonthlyService | null,
  account: { userId: "bob", appUserId: "", expiresAt: null as Date | null, checkedAt: null as Date | null, productionExpiresAt: null as Date | null, sandboxExpiresAt: null as Date | null },
  identitySecret: "public-fixture-identity-for-membership-tests",
  storeLookup: vi.fn<() => Response>(),
}));
vi.mock("@/lib/auth", () => ({ auth: async () => mocks.userId ? { user: { id: mocks.userId } } : null }));
vi.mock("@/lib/billing/subscription/config", () => ({
  monthlySelected: () => true, monthlyConfig: () => monthlyFixtureConfig,
}));
vi.mock("@/lib/billing/subscription/runtime", () => ({
  monthlyRuntime: () => ({ service: mocks.service, config: monthlyFixtureConfig }),
}));
vi.mock("@/lib/questions/pool-server", () => ({ findQuestionById: async (id: string) => ({ id }) }));
vi.mock("@/lib/questions/filter", () => ({ isPracticeReadyQuestion: () => true }));
vi.mock("@/lib/db/prisma", () => ({ prisma: {
  $executeRawUnsafe: async () => 1,
  $queryRawUnsafe: async (sql: string, ...args: unknown[]) => {
    if (sql.startsWith('UPDATE "MobileRevenueCatAccount"')) {
      Object.assign(mocks.account, { expiresAt: args[1], checkedAt: args[2], productionExpiresAt: args[3], sandboxExpiresAt: args[4] });
    } else if (!sql.startsWith("SELECT")) throw new Error("unexpected query");
    return [{ ...mocks.account }];
  },
} }));
vi.mock("@/mobile/server/config", () => ({
  mobileConfig: () => ({ enabled: true }),
  requireMobileReady: () => ({ identitySecret: mocks.identitySecret, apiKey: "fixture", productId: "monthly", entitlement: "pro", environment: "APP_STORE" }),
}));
vi.mock("@/lib/billing/duplicate-purchase-runtime", () => ({ auditDuplicatePurchases: async () => {} }));

const now = Date.parse("2026-11-24T12:00:00+09:00");
const statusRequest = new Request(`${monthlyFixtureConfig.origin}/api/billing/status`);
const adsAllowed = () => hasFreeWebAccess(new AbortController().signal);
const aiUsage = () => prepareAiUsage(statusRequest, "copilot");
const store = new MonthlyMemoryStore();

function practice(number: number) {
  return openQuestion(new Request(`${monthlyFixtureConfig.origin}/api/billing/question`, {
    method: "POST",
    headers: { origin: monthlyFixtureConfig.origin, "content-type": "application/json" },
    body: JSON.stringify({ id: `fixture-question-${number}` }),
  }));
}

function storeReceipt(expiresAt = now + 86_400_000, refunded = false) {
  const expiration = new Date(expiresAt).toISOString();
  return Response.json({ subscriber: {
    entitlements: { pro: { product_identifier: "monthly", expires_date: expiration, purchase_date: new Date(0).toISOString() } },
    subscriptions: { monthly: { store: "app_store", is_sandbox: false, expires_date: expiration,
      ...(refunded && { refunded_at: new Date(now).toISOString() }) } },
  } });
}

beforeEach(() => {
  vi.spyOn(Date, "now").mockReturnValue(now);
  vi.stubEnv("AUTH_SECRET", "public-guest-cookie-fixture");
  store.accounts.clear();
  mocks.userId = "bob";
  mocks.service = new MonthlyService(store, monthlyFixtureConfig, () => new Date(Date.now()));
  Object.assign(mocks.account, { appUserId: appUserIdentity("bob", mocks.identitySecret), expiresAt: null, checkedAt: null, productionExpiresAt: null, sandboxExpiresAt: null });
  mocks.storeLookup.mockReset();
  vi.stubGlobal("fetch", async (url: string) => {
    if (url === "/api/billing/status") return GET(statusRequest);
    if (url.startsWith("https://api.revenuecat.com/v1/subscribers/")) return mocks.storeLookup();
    throw new Error("unexpected transport");
  });
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe.each([false, true])("App Store study membership (AI quota rollout: %s)", rollout => {
  beforeEach(() => vi.stubEnv("AI_QUOTA_ROLLOUT", rollout ? "true" : undefined));

  it("waits for the first verification with no ads or free use, then opens all 11 questions after recovery", async () => {
    mocks.storeLookup.mockImplementation(() => new Response(null, { status: 503 }));
    const status = await GET(statusRequest);
    expect(status.status).toBe(503);
    expect(await status.json()).toEqual({ error: "membership_check_pending" });
    expect(await adsAllowed()).toBe(false);
    const usage = await aiUsage();
    expect(usage.access.kind).toBe(rollout ? "membership_check_pending" : "legacy");
    const quota = { read: vi.fn(), claimGuest: vi.fn(), reserve: vi.fn(), settle: vi.fn() };
    const denial = await consumeAiUsage(usage, "fixture-provider", {}, quota);
    expect(denial?.status).toBe(rollout ? 503 : undefined);
    if (denial) expect(await denial.json()).toMatchObject({ error: "ai_membership_check_pending" });
    expect(quota.reserve).not.toHaveBeenCalled();
    for (let i = 1; i <= 11; i++) {
      const response = await practice(i);
      expect(response.status).toBe(503);
      expect(await response.json()).toMatchObject({ error: "membership_check_pending", access: { kind: "unavailable", remaining: null } });
    }
    expect(store.accounts.size).toBe(0);

    mocks.storeLookup.mockImplementation(() => storeReceipt());
    expect(await (await GET(statusRequest)).json()).toMatchObject({ entitled: true, appStore: true });
    expect(await adsAllowed()).toBe(false);
    expect((await aiUsage()).access.kind).toBe(rollout ? "paid" : "legacy");
    for (let i = 1; i <= 11; i++) {
      const response = await practice(i);
      expect(response.status).toBe(200);
      expect(await response.json()).toMatchObject({ access: { kind: "pass", remaining: null } });
    }
    expect(store.accounts.size).toBe(0);
  });

  it("rechecks a recently verified but just expired period and recognizes the renewal", async () => {
    Object.assign(mocks.account, { expiresAt: new Date(now - 1000), productionExpiresAt: new Date(now - 1000), checkedAt: new Date(now - 5000) });
    mocks.storeLookup.mockImplementation(() => storeReceipt());
    expect(await adsAllowed()).toBe(false);
    expect(mocks.storeLookup).toHaveBeenCalledTimes(1);
    expect(await (await GET(statusRequest)).json()).toMatchObject({ entitled: true, appStore: true });
    expect((await aiUsage()).access.kind).toBe(rollout ? "paid" : "legacy");
    expect(await (await practice(11)).json()).toMatchObject({ access: { kind: "pass", remaining: null } });
  });

  it("keeps verified access during a temporary outage until its recorded expiry", async () => {
    const expiry = now + 1000;
    Object.assign(mocks.account, { expiresAt: new Date(expiry), productionExpiresAt: new Date(expiry), checkedAt: new Date(now - 65_000) });
    mocks.storeLookup.mockImplementation(() => new Response(null, { status: 503 }));
    expect(await (await GET(statusRequest)).json()).toMatchObject({ entitled: true, expiresAt: new Date(expiry).toISOString() });
    expect(await adsAllowed()).toBe(false);
    expect(await (await practice(11)).json()).toMatchObject({ access: { kind: "pass" } });
    expect((await aiUsage()).access.kind).toBe(rollout ? "paid" : "legacy");
    vi.mocked(Date.now).mockReturnValue(expiry);
    expect((await GET(statusRequest)).status).toBe(503);
    expect(await adsAllowed()).toBe(false);
    expect((await practice(11)).status).toBe(503);
    expect((await aiUsage()).access.kind).toBe(rollout ? "membership_check_pending" : "legacy");
  });

  it("keeps a verified member ad-free and out of the free quotas when a successful lookup has no subscriber", async () => {
    mocks.storeLookup.mockImplementation(() => storeReceipt());
    expect(await (await GET(statusRequest)).json()).toMatchObject({ entitled: true, appStore: true });
    const snapshot = { ...mocks.account };
    vi.mocked(Date.now).mockReturnValue(now + 61_000);
    mocks.storeLookup.mockImplementationOnce(() => Response.json(null));

    const status = await GET(statusRequest);
    expect.soft(status.status).toBe(200);
    expect.soft(await status.json()).toMatchObject({ entitled: true, expiresAt: snapshot.expiresAt?.toISOString() });
    expect.soft(mocks.account).toEqual(snapshot);
    expect.soft(await adsAllowed()).toBe(false);
    const usage = await aiUsage();
    expect.soft(usage.access.kind).toBe(rollout ? "paid" : "legacy");
    const quota = { read: vi.fn(), claimGuest: vi.fn(), reserve: vi.fn(), settle: vi.fn() };
    expect.soft(await consumeAiUsage(usage, "fixture-provider", { id: "fixture-question-11" }, quota)).toBeNull();
    expect.soft(quota.reserve).not.toHaveBeenCalled();
    for (let i = 1; i <= 11; i++) {
      const response = await practice(i);
      expect.soft(response.status).toBe(200);
      expect.soft(await response.json()).toMatchObject({ access: { kind: "pass", remaining: null } });
    }
    expect.soft(store.accounts.size).toBe(0);

    // Without a usable snapshot, the same response cannot allocate a free quota.
    mocks.storeLookup.mockImplementation(() => Response.json(null));
    vi.mocked(Date.now).mockReturnValue(now + 86_400_000);
    for (const expiry of [snapshot.expiresAt, null]) {
      Object.assign(mocks.account, { expiresAt: expiry, productionExpiresAt: expiry, checkedAt: expiry ? snapshot.checkedAt : null });
      const unverified = { ...mocks.account };
      const pending = await GET(statusRequest);
      expect.soft(pending.status).toBe(503);
      expect.soft(await pending.json()).toEqual({ error: "membership_check_pending" });
      expect.soft(await adsAllowed()).toBe(false);
      const pendingUsage = await aiUsage();
      expect.soft(pendingUsage.access.kind).toBe(rollout ? "membership_check_pending" : "legacy");
      expect.soft((await consumeAiUsage(pendingUsage, "fixture-provider", {}, quota))?.status).toBe(rollout ? 503 : undefined);
      expect.soft(quota.reserve).not.toHaveBeenCalled();
      const response = await practice(11);
      expect.soft(response.status).toBe(503);
      expect.soft(await response.json()).toMatchObject({ access: { kind: "unavailable", remaining: null } });
      expect.soft(mocks.account).toEqual(unverified);
      expect.soft(store.accounts.size).toBe(0);
    }
  });

  it.each(["expired", "refunded"])("classifies a confirmed %s purchase as free", async method => {
    Object.assign(mocks.account, { expiresAt: new Date(now - 1000), productionExpiresAt: new Date(now - 1000), checkedAt: new Date(now - 5000) });
    mocks.storeLookup.mockImplementation(() => method === "expired" ? storeReceipt(now - 1000) : storeReceipt(now + 10_000, true));
    expect(await (await GET(statusRequest)).json()).toMatchObject({ entitled: false, appStore: false });
    expect(await adsAllowed()).toBe(true);
    expect((await aiUsage()).access.kind).toBe(rollout ? "free" : "legacy");
    for (let i = 1; i <= 10; i++) {
      expect(await (await practice(i)).json()).toMatchObject({ access: { kind: "trial", remaining: 10 - i } });
    }
    expect((await practice(11)).status).toBe(429);
  });

  it("keeps anonymous ad and guest-cookie behavior", async () => {
    mocks.userId = null;
    expect((await GET(statusRequest)).status).toBe(401);
    expect(await adsAllowed()).toBe(true);
    expect((await aiUsage()).access.kind).toBe(rollout ? "guest_cookie_required" : "legacy");
    const guest = await practice(1);
    expect(guest.status).toBe(428);
    expect(guest.headers.get("set-cookie")).toMatch(/^practice_guest=/);
    expect(await guest.json()).toMatchObject({ access: { kind: "guest", remaining: 10 } });
    expect(mocks.storeLookup).not.toHaveBeenCalled();
  });

  it("preserves Web membership without contacting the App Store", async () => {
    const fixture = await monthlyFixture();
    await fixture.send();
    mocks.userId = "alice";
    mocks.service = fixture.service;
    expect(await (await GET(statusRequest)).json()).toMatchObject({ entitled: true, appStore: false });
    expect(await adsAllowed()).toBe(false);
    expect(await (await practice(11)).json()).toMatchObject({ access: { kind: "pass", remaining: null } });
    expect((await aiUsage()).access.kind).toBe(rollout ? "paid" : "legacy");
    expect(mocks.storeLookup).not.toHaveBeenCalled();
  });
});
