// @vitest-environment node
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import { monthlyStripeFixture } from "./monthly-stripe-fixture";
import { MonthlyService } from "@/lib/billing/subscription/service";
import { PostgresMonthlyStore } from "@/lib/billing/subscription/store";
import { auditDuplicatePurchases } from "@/lib/billing/duplicate-purchase-runtime";
import { readAppStorePurchaseStatus } from "@/mobile/server/revenuecat";
import { POST as revenueCat } from "@/app/api/mobile/revenuecat/route";
import { POST as stripe } from "@/app/api/billing/webhook/route";
import { PATCH as changeEnding } from "@/app/api/billing/ending/route";

const h = vi.hoisted(() => ({
  runtime: null as Awaited<ReturnType<typeof monthlyStripeFixture>> | null,
  query: vi.fn(), notify: vi.fn(), after: vi.fn(),
  config: { enabled: true, appId: "app", environment: "SANDBOX", entitlement: "pro", productId: "monthly",
    apiKey: "fixture", webhookAuthorization: "local-only-synthetic-webhook-authorization" },
}));
vi.mock("next/server", () => ({ after: h.after }));
vi.mock("@/lib/db/prisma", () => ({ prisma: { $queryRawUnsafe: h.query } }));
vi.mock("@/mobile/server/config", () => ({ requireMobileReady: () => h.config, mobileConfig: () => h.config }));
vi.mock("@/lib/billing/subscription/config", () => ({ monthlySelected: () => true, monthlyConfig: () => h.runtime!.config }));
vi.mock("@/lib/billing/subscription/runtime", () => ({ monthlyRuntime: () => h.runtime }));
vi.mock("@/lib/notify/ops-alert", () => ({ notifyOpsOnce: h.notify }));
vi.mock("@/lib/billing/signature", async (importOriginal) => ({
  ...await importOriginal<typeof import("@/lib/billing/signature")>(),
  verifyStripeEvent: (raw: Uint8Array) => JSON.parse(new TextDecoder().decode(raw)),
  eventDigest: (raw: Uint8Array) => new TextDecoder().decode(raw),
}));
vi.mock("@/lib/billing/runtime", () => ({
  json: (v: unknown) => Response.json(v), sameOrigin() {}, billingIdentity: async () => "alice",
  billingFailure: (e: { code?: string; status?: number }) => Response.json({ error: e.code }, { status: e.status ?? 503 }),
}));

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-02-01T00:00:00Z"));
  vi.spyOn(console, "warn").mockImplementation(() => {});
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks(); vi.resetAllMocks(); });

async function setup(examEndAt?: number) {
  const f = h.runtime = await monthlyStripeFixture(examEndAt ? { examEndAt, exam: "ip" } : {});
  f.service = new MonthlyService(f.store, f.config, () => new Date(), auditDuplicatePurchases);
  let row = { userId: "alice", appUserId: "app-alice", expiresAt: null as Date | null, checkedAt: null as Date | null };
  let remoteExpiry = "2026-03-01T18:00:00Z";
  let failNextAudit = false;
  let failNextReceipt = false;
  h.query.mockImplementation(async (sql: string, ...args: unknown[]) => {
    if (sql.startsWith('SELECT * FROM "MobileRevenueCatAccount"') || sql.startsWith('SELECT "appUserId"')) return [row];
    if (sql.startsWith('UPDATE "MobileRevenueCatAccount"')) {
      row = { ...row, expiresAt: args[1] as Date | null, checkedAt: args[2] as Date };
      return [row];
    }
    if (sql.startsWith("SELECT email,")) {
      if (failNextAudit) { failNextAudit = false; throw new Error("temporary audit read failure"); }
      return [{ email: null }];
    }
    if (sql.includes('"sandboxExpiresAt" END > NOW()')) return [{ active: (row.expiresAt?.getTime() ?? 0) > Date.now() }];
    throw new Error("Unexpected query");
  });
  vi.stubGlobal("fetch", async () => {
    if (failNextReceipt) {
      failNextReceipt = false;
      throw new Error("temporary receipt lookup failure");
    }
    return Response.json({ subscriber: {
      entitlements: { pro: { product_identifier: "monthly", purchase_date: "2026-01-31T18:00:00Z", expires_date: remoteExpiry } },
      subscriptions: { monthly: { store: "app_store", is_sandbox: true, expires_date: remoteExpiry } },
    } });
  });
  return { f, row: () => row, order: () => f.store.accounts.get("stripe-test:alice")!.signups[f.result.orderId],
    expiry: (value: string) => { remoteExpiry = value; }, failOnce: () => { failNextAudit = true; },
    failReceiptOnce: () => { failNextReceipt = true; },
    runCron: () => f.service.runExamEndCheck("alice", f.result.orderId, f.provider, readAppStorePurchaseStatus),
    apple: (type: string) => revenueCat(new Request("https://fixture.invalid/apple", { method: "POST",
      headers: { authorization: h.config.webhookAuthorization },
      body: JSON.stringify({ event: { id: "event-" + type, type, app_id: "app", environment: "SANDBOX", app_user_id: "app-alice" } }) })),
    web: (event = f.event()) => stripe(new Request("https://fixture.invalid/stripe", { method: "POST", body: JSON.stringify(event) })),
  };
}

async function cronQueue(f: Awaited<ReturnType<typeof monthlyStripeFixture>>) {
  const pg = new PGlite();
  try {
    await pg.exec("CREATE TABLE billing_subscription_account (user_id text, mode text, source_instance text, payload jsonb)");
    const a = f.store.accounts.get("stripe-test:alice")!;
    await pg.query("INSERT INTO billing_subscription_account VALUES ($1,$2,$3,$4::jsonb)", [a.userId, a.mode, a.sourceInstance, JSON.stringify(a)]);
    const db = { query: async <T,>(sql: string, args: unknown[]) => (await pg.query<T>(sql, args)).rows,
      transaction: async () => { throw new Error("selector should be read-only"); } };
    return await new PostgresMonthlyStore(db, a.sourceInstance).examEndsToReconcile(a.mode, Date.now()/1000);
  } finally { await pg.close(); }
}

it.each([false, true])("stops renewal when Apple arrives first, transient Stripe audit failure = %s", async fail => {
  const s = await setup();
  expect((await s.apple("INITIAL_PURCHASE")).status).toBe(200);
  expect(s.order().appStoreOverlap).toBeUndefined();
  expect(s.row().expiresAt!.getTime()).toBeGreaterThan(s.f.line.period.end * 1000);
  if (fail) s.failOnce();
  const res = await s.web();
  if (fail) {
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ error: "duplicate_purchase_audit_unavailable" });
    expect((await s.f.service.status("alice")).entitled).toBe(true);
    expect(s.order().appStoreOverlap).toBeUndefined();
    expect(h.after).not.toHaveBeenCalled();
    expect(h.notify).not.toHaveBeenCalled();
    const retry = await s.web();
    expect(retry.status).toBe(200);
    expect(await retry.json()).toMatchObject({ received: true, result: "duplicate" });
  } else {
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ received: true, result: "processed" });
  }
  expect(h.after).toHaveBeenCalledOnce();
  for (const [task] of h.after.mock.calls) await task();
  expect(s.order().appStoreOverlap?.renewal).toBe("stopped");
  expect(s.f.sub).toMatchObject({ cancel_at: s.f.line.period.end });
  expect(h.notify).toHaveBeenCalledOnce();
});

it("retries the Stripe overlap audit after Web renewal resumes near its boundary", async () => {
  const s = await setup();
  expect((await s.web()).status).toBe(200);
  expect((await s.apple("RENEWAL")).status).toBe(200);
  for (const [task] of h.after.mock.calls) await task();
  h.after.mockClear();
  expect(s.f.sub).toMatchObject({ cancel_at: s.f.line.period.end });
  const resumeTime = new Date(s.f.line.period.end * 1000 - 20 * 60_000);
  vi.setSystemTime(resumeTime);
  s.f.setClock(resumeTime);
  Object.assign(s.f.sub, { cancel_at: null });
  s.failOnce();
  const event = s.f.event("customer.subscription.updated", s.f.sub.id, "evt_resume");
  expect((await s.web(event)).status).toBe(503);
  expect(s.order().appStoreOverlap?.renewal).toBe("stopped");
  expect(s.f.sub).toMatchObject({ cancel_at: null });
  const retry = await s.web(event);
  expect(retry.status).toBe(200);
  expect(await retry.json()).toMatchObject({ received: true, result: "duplicate" });
  expect(s.order().appStoreOverlap?.renewal).toBe("pending");
  expect(h.after).toHaveBeenCalledOnce();
  for (const [task] of h.after.mock.calls) await task();
  expect(s.order().appStoreOverlap?.renewal).toBe("stopped");
  expect(s.f.sub).toMatchObject({ cancel_at: s.f.line.period.end });
  expect(h.notify).toHaveBeenCalledOnce();
});

it.each([false, true])("discards a stale stop after App Store access ends, buyer resumed = %s", async resumed => {
  const examEndAt = Date.parse("2026-02-14T15:00:00Z") / 1000;
  const s = await setup(examEndAt);
  expect((await s.web()).status).toBe(200);
  const write = vi.spyOn(s.f.provider, "stopAppStoreOverlapRenewal")
    .mockRejectedValueOnce(new Error("temporary Stripe outage"));
  expect((await s.apple("RENEWAL")).status).toBe(200);
  for (const [task] of h.after.mock.calls) await task();
  expect(write).toHaveBeenCalledOnce();
  expect(s.order().appStoreOverlap?.renewal).toBe("pending");
  vi.setSystemTime(new Date("2026-02-02T00:00:01Z"));
  s.f.setClock(new Date());
  s.expiry("2026-02-02T00:00:00Z");
  expect(await cronQueue(s.f)).toEqual([{ user_id: "alice", signup_id: s.f.result.orderId }]);
  if (resumed) {
    expect((await s.apple("EXPIRATION")).status).toBe(200);
    expect(s.row().expiresAt).toBeNull();
    const response = await changeEnding(new Request("https://fixture.invalid/ending", { method: "PATCH",
      body: JSON.stringify({ orderId: s.f.result.orderId, kind: "renew" }) }));
    expect(response.status).toBe(200);
    expect(s.f.sub).toMatchObject({ cancel_at: null });
    // The order was selected before the buyer's change. Even an active receipt
    // cannot authorize that stale job. A fresh overlap can enqueue its own stop.
    s.expiry("2026-03-01T18:00:00Z");
  } else {
    // No expiration notification arrived. The committed snapshot still looks active.
    expect(s.row().expiresAt!.getTime()).toBeGreaterThan(Date.now());
    s.failReceiptOnce();
    await expect(s.runCron()).rejects.toThrow("temporary receipt lookup failure");
    expect(s.order().appStoreOverlap?.renewal).toBe("pending");
    expect(write).toHaveBeenCalledOnce();
  }
  await s.runCron();
  expect(write).toHaveBeenCalledOnce();
  expect(s.order().appStoreOverlap?.renewal).toBe("discarded");
  expect(s.f.sub).toMatchObject({ cancel_at: resumed ? null : examEndAt });
  expect(await cronQueue(s.f)).toEqual([]);
  expect((await s.f.service.status("alice")).entitled).toBe(true);
  if (resumed) {
    expect((await s.apple("RENEWAL")).status).toBe(200);
    expect(s.order().appStoreOverlap).toMatchObject({ renewal: "pending", renewalAttempt: 1 });
    await s.runCron();
    expect(s.order().appStoreOverlap?.renewal).toBe("stopped");
    expect(s.f.sub).toMatchObject({ cancel_at: s.f.line.period.end });
  }
});
