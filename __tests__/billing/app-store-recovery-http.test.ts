// @vitest-environment node
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { monthlyStripeFixture } from "./monthly-stripe-fixture";
import { POST as checkout } from "@/app/api/billing/checkout/route";
import { PATCH } from "@/app/api/billing/ending/route";
import { POST } from "@/app/api/mobile/revenuecat/route";
import { appStorePurchaseState, appStorePurchaseStatus, appUserIdentity, readAppStorePurchaseStatus } from "@/mobile/server/revenuecat";
import { mobileEntitlement } from "@/mobile/server/entitlement";
import { monthlyTerms } from "@/lib/billing/subscription/service";

const testState = vi.hoisted(() => ({
  fixture: null as Awaited<ReturnType<typeof monthlyStripeFixture>> | null,
  userId: "alice",
  query: vi.fn(), execute: vi.fn(), after: vi.fn(), notify: vi.fn(),
  config: { enabled: true, appId: "fixture-app", environment: "SANDBOX", entitlement: "pro", productId: "monthly",
    apiKey: "fixture", webhookAuthorization: "local-only-webhook-authorization-fixture", identitySecret: "local-only-subscriber-identity-fixture" },
}));
vi.mock("next/server", () => ({ after: testState.after }));
vi.mock("@/lib/db/prisma", () => ({ prisma: { $queryRawUnsafe: testState.query, $executeRawUnsafe: testState.execute } }));
vi.mock("@/lib/billing/runtime", async () => {
  const { BillingError } = await import("@/lib/billing/domain");
  return { sameOrigin() {}, json: (body: unknown) => Response.json(body), billingIdentity: async () => testState.userId,
    billingFailure: (e: unknown) => e instanceof BillingError ? Response.json({ error: e.code }, { status: e.status })
      : Response.json({ error: "unavailable" }, { status: 503 }) };
});
vi.mock("@/lib/billing/checkout-email", () => ({ checkoutEmail: async () => undefined }));
vi.mock("@/lib/billing/subscription/config", () => ({ monthlySelected: () => true, monthlyConfig: () => testState.fixture!.config }));
vi.mock("@/lib/billing/subscription/runtime", () => ({ monthlyRuntime: () => testState.fixture }));
vi.mock("@/lib/notify/ops-alert", () => ({ notifyOpsOnce: testState.notify }));
vi.mock("@/mobile/server/config", () => ({ mobileConfig: () => testState.config, requireMobileReady: () => testState.config }));

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-02-01T00:00:00Z"));
  testState.userId = "alice";
  vi.spyOn(console, "warn").mockImplementation(() => {});
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.resetAllMocks();
});

function receipt(expiry: string, billingIssue?: string) {
  return { subscriber: {
    entitlements: { pro: { product_identifier: "monthly", expires_date: expiry, purchase_date: "2026-01-02T00:00:00Z" } },
    subscriptions: { monthly: { store: "app_store", is_sandbox: true, expires_date: expiry, billing_issues_detected_at: billingIssue } },
  } };
}

function subscriber(userId: string, failAudit = false) {
  const appUserId = appUserIdentity(userId, testState.config.identitySecret);
  let row = { userId, appUserId, expiresAt: null as Date | null, checkedAt: null as Date | null,
    productionExpiresAt: null as Date | null, sandboxExpiresAt: null as Date | null };
  testState.query.mockImplementation(async (sql: string, ...values: unknown[]) => {
    if (sql.startsWith('SELECT * FROM "MobileRevenueCatAccount"') || sql.startsWith('SELECT "appUserId"')) return [row];
    if (sql.startsWith('UPDATE "MobileRevenueCatAccount"')) {
      row = { ...row, expiresAt: values[1] as Date | null, checkedAt: values[2] as Date,
        productionExpiresAt: values[3] as Date | null, sandboxExpiresAt: values[4] as Date | null };
      return [row];
    }
    if (sql.startsWith('SELECT email,')) {
      if (failAudit) throw Error("simulated audit read failure");
      return [{ email: null }];
    }
    if (sql.includes('"sandboxExpiresAt" END > NOW()')) {
      const expiresAt = values[1] ? row.productionExpiresAt : row.sandboxExpiresAt;
      return [{ active: (expiresAt?.getTime() ?? 0) > Date.now() }];
    }
    throw Error("unexpected test query");
  });
  return (eventId: string, type: "INITIAL_PURCHASE" | "BILLING_ISSUE" | "RENEWAL") => POST(new Request("https://fixture.invalid/api/mobile/revenuecat", {
    method: "POST", headers: { authorization: testState.config.webhookAuthorization },
    body: JSON.stringify({ event: { id: eventId, type, app_id: testState.config.appId, app_user_id: appUserId, environment: "SANDBOX" } }),
  }));
}

it("blocks Web renewal during Apple billing retry and stops it again if a legacy order had already resumed", async () => {
  const examEndAt = Date.parse("2026-02-14T15:00:00Z") / 1000;
  const f = testState.fixture = await monthlyStripeFixture({ examEndAt, exam: "ip" });
  await f.service.receive(f.event(), "paid", f.provider);
  const { orderId } = f.result;
  const order = () => f.store.accounts.get("stripe-test:alice")!.signups[orderId];
  const webhook = subscriber("alice");
  const firstExpiry = "2026-02-02T00:00:00Z";
  let remote = receipt(firstExpiry);
  vi.stubGlobal("fetch", async () => Response.json(remote));
  expect(await (await webhook("evt_initial", "INITIAL_PURCHASE")).json()).toEqual({ ok: true });
  for (const [task] of testState.after.mock.calls) await task();
  testState.after.mockClear();
  expect(order().appStoreOverlap?.renewal).toBe("already_ending");

  const now = new Date("2026-02-03T00:00:00Z");
  vi.setSystemTime(now);
  f.setClock(now);
  remote = receipt(firstExpiry, firstExpiry);
  expect(appStorePurchaseState(remote, testState.config, now.getTime())).toBe("processing");
  expect((await webhook("evt_billing_issue", "BILLING_ISSUE")).status).toBe(200);
  const change = () => PATCH(new Request("https://fixture.invalid/api/billing/ending", {
    method: "PATCH", body: JSON.stringify({ orderId, kind: "renew" }),
  }));
  const blocked = await change();
  expect(blocked.status).toBe(409);
  expect(await blocked.json()).toEqual({ error: "app_store_purchase_pending" });
  expect(f.sub).toMatchObject({ cancel_at: examEndAt, cancel_at_period_end: false });

  // Simulate an order whose Web ending had been cleared before the Apple recovery.
  remote = receipt(firstExpiry);
  expect((await change()).status).toBe(200);
  expect(f.sub).toMatchObject({ cancel_at: null, cancel_at_period_end: false });

  remote = receipt("2026-03-03T00:00:00Z");
  expect(appStorePurchaseState(remote, testState.config, now.getTime())).toBe("active");
  const record = vi.spyOn(f.service, "recordAppStoreOverlaps");
  expect((await webhook("evt_billing_recovered", "RENEWAL")).status).toBe(200);
  expect(await record.mock.results[0].value).toEqual([{ userId: "alice", orderId, newlyRecorded: false }]);
  expect(order().appStoreOverlap?.renewal).toBe("pending");
  await f.service.runExamEndCheck("alice", orderId, f.provider, readAppStorePurchaseStatus);
  expect(order().appStoreOverlap?.renewal).toBe("stopped");
  expect(f.sub).toMatchObject({ status: "active", cancel_at: f.line.period.end });
  expect((await webhook("evt_billing_recovered", "RENEWAL")).status).toBe(200);
  for (const [task] of testState.after.mock.calls) await task();
  expect(testState.notify).toHaveBeenCalledOnce();
  expect(f.sub.items.data[0].current_period_end * 1000).toBeLessThan(Date.parse(remote.subscriber.entitlements.pro.expires_date));
  expect((await f.service.status("alice")).entitled).toBe(true);
});

it.each(["active", "processing"] as const)("blocks a new Web signup with an %s App Store purchase", async state => {
  const f = testState.fixture = await monthlyStripeFixture();
  testState.userId = "bob";
  subscriber("bob");
  const remote = state === "active" ? receipt("2026-03-03T00:00:00Z") : receipt("2026-01-31T00:00:00Z", "2026-01-31T00:00:00Z");
  vi.stubGlobal("fetch", async () => Response.json(remote));
  vi.mocked(f.fetcher).mockClear();
  const response = await checkout(new Request("https://fixture.invalid/api/billing/checkout", {
    method: "POST", body: JSON.stringify({ terms: monthlyTerms(f.config) }),
  }));
  expect(response.status).toBe(409);
  expect(await response.json()).toEqual({ error: state === "active" ? "app_store_subscription_exists" : "app_store_purchase_pending" });
  expect(f.fetcher).not.toHaveBeenCalled();
});

it.each(["approval", "restore"])("reconciles an active App Store receipt discovered by %s", async kind => {
  const f = testState.fixture = await monthlyStripeFixture();
  await f.service.receive(f.event(), "paid", f.provider);
  subscriber("alice");
  vi.stubGlobal("fetch", async () => Response.json(receipt("2026-03-03T00:00:00Z")));

  if (kind === "approval") await expect(appStorePurchaseStatus("alice", true)).resolves.toBe("active");
  else await expect(mobileEntitlement("alice", true)).resolves.toMatchObject({ entitled: true, source: "web" });
  for (const [task] of testState.after.mock.calls) await task();
  expect(f.sub).toMatchObject({ cancel_at: f.line.period.end });
  expect(testState.notify).toHaveBeenCalledOnce();
});

it("uses a fresh Stripe write key when an earlier overlap stop was withdrawn in the same period", async () => {
  const f = testState.fixture = await monthlyStripeFixture();
  await f.service.receive(f.event(), "paid", f.provider);
  const webhook = subscriber("alice");
  vi.stubGlobal("fetch", async () => Response.json(receipt("2026-03-03T00:00:00Z")));

  expect((await webhook("evt_initial", "INITIAL_PURCHASE")).status).toBe(200);
  await testState.after.mock.calls[0][0]();
  expect(f.sub).toMatchObject({ cancel_at: f.line.period.end });

  Object.assign(f.sub, { cancel_at: null });
  await f.service.receive(f.event("customer.subscription.updated", f.sub.id, "evt_resume"), "resumed", f.provider);
  expect((await webhook("evt_renewal", "RENEWAL")).status).toBe(200);
  await testState.after.mock.calls[1][0]();
  expect(f.sub).toMatchObject({ cancel_at: f.line.period.end });
  expect(testState.notify).toHaveBeenCalledOnce();
  const keys = vi.mocked(f.fetcher).mock.calls
    .filter(([url, options]) => String(url).endsWith("/subscriptions/sub_monthly") && options?.method === "POST")
    .map(([, options]) => new Headers(options?.headers).get("idempotency-key"));
  expect(keys).toHaveLength(2);
  expect(new Set(keys).size).toBe(2);
});

it("serves an App Store-only buyer immediately while the webhook audit keeps failing", async () => {
  testState.fixture = await monthlyStripeFixture();
  const webhook = subscriber("bob", true);
  const expiry = "2026-03-03T00:00:00.000Z";
  const transport = vi.fn(async () => Response.json(receipt(expiry)));
  vi.stubGlobal("fetch", transport);
  expect((await webhook("evt_app_only", "INITIAL_PURCHASE")).status).toBe(503);
  const expected = { entitled: true, source: "app-store", expiresAt: expiry };
  expect(await mobileEntitlement("bob")).toMatchObject({ entitled: false, source: "free" });
  expect(await mobileEntitlement("bob", false, "app")).toMatchObject(expected);
  expect(transport).toHaveBeenCalledTimes(1);
  vi.setSystemTime(new Date("2026-02-01T00:02:00Z"));
  expect(await mobileEntitlement("bob", true, "app")).toMatchObject(expected);
  expect(transport).toHaveBeenCalledTimes(2);
});
