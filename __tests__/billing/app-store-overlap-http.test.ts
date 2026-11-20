// @vitest-environment node
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { PATCH as changeEnding } from "@/app/api/billing/ending/route";
import { POST as revenueCatWebhook } from "@/app/api/mobile/revenuecat/route";
import { monthlyStripeFixture } from "./monthly-stripe-fixture";

const m = vi.hoisted(() => ({
  fixture: null as Awaited<ReturnType<typeof monthlyStripeFixture>> | null,
  query: vi.fn(),
  after: vi.fn<(task: () => Promise<void>) => void>(),
  notify: vi.fn(),
  webhookAuthorization: "local-test-only-approval-notification-fixture",
}));
vi.mock("next/server", () => ({ after: m.after }));
vi.mock("@/lib/db/prisma", () => ({ prisma: { $queryRawUnsafe: m.query } }));
vi.mock("@/lib/billing/runtime", async () => {
  const { BillingError } = await import("@/lib/billing/domain");
  return {
    json: (value: unknown) => Response.json(value),
    sameOrigin: () => {},
    billingIdentity: async () => "alice",
    billingFailure: (error: unknown) => error instanceof BillingError
      ? Response.json({ error: error.code }, { status: error.status })
      : Response.json({ error: "billing_unavailable" }, { status: 503 }),
  };
});
vi.mock("@/lib/billing/subscription/runtime", () => ({ monthlyRuntime: () => m.fixture }));
vi.mock("@/lib/billing/subscription/config", () => ({
  monthlySelected: () => true,
  monthlyConfig: () => m.fixture!.config,
}));
vi.mock("@/lib/notify/ops-alert", () => ({ notifyOpsOnce: m.notify }));
vi.mock("@/mobile/server/entitlement", () => ({
  webEntitlement: (userId: string) => m.fixture!.service.status(userId),
}));
vi.mock("@/mobile/server/config", () => ({
  mobileConfig: () => ({ enabled: true }),
  requireMobileReady: () => ({
    appId: "test-app", webhookAuthorization: m.webhookAuthorization, environment: "SANDBOX",
    entitlement: "pro", productId: "monthly", apiKey: "fixture",
  }),
}));

const appUserId = "app-user-fixture";
const examEndAt = Date.parse("2026-02-14T15:00:00Z") / 1000;

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-02-01T00:00:00Z"));
  vi.spyOn(console, "warn").mockImplementation(() => {});
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.resetAllMocks();
  m.fixture = null;
});

function receipt(expiresAt: Date) {
  const expiry = expiresAt.toISOString();
  return Response.json({ subscriber: {
    entitlements: { pro: { product_identifier: "monthly", purchase_date: new Date(0).toISOString(), expires_date: expiry } },
    subscriptions: { monthly: { store: "app_store", is_sandbox: true, expires_date: expiry } },
  } });
}

async function paidWebOrder(exam?: { examEndAt: number; exam: string }) {
  const f = await monthlyStripeFixture(exam);
  m.fixture = f;
  await f.service.receive(f.event(), "paid-web", f.provider);
  return f;
}

function readOrder(f: Awaited<ReturnType<typeof paidWebOrder>>) {
  return f.store.accounts.get("stripe-test:alice")!.signups[f.result.orderId];
}

function endingRequest(orderId: string, kind: "renew" | "exam", examDate?: string) {
  return new Request("https://fixture.invalid/api/billing/ending", {
    method: "PATCH", body: JSON.stringify({ orderId, kind, examDate }),
  });
}

it.each([
  { kind: "renew" as const, examDate: undefined, recorded: true },
  { kind: "exam" as const, examDate: "2026-02-20", recorded: true },
  { kind: "renew" as const, examDate: undefined, recorded: false },
  { kind: "exam" as const, examDate: "2026-02-20", recorded: false },
])("checks the App Store on $kind even without an overlap record ($recorded)", async ({ kind, examDate, recorded }) => {
  const f = await paidWebOrder({ examEndAt, exam: "ip" });
  const { orderId } = f.result;
  if (recorded) {
    await f.service.recordAppStoreOverlaps("alice", ["alice"]);
    await f.service.reconcileAppStoreOverlap("alice", orderId, f.provider, async () => "active");
  }
  expect(readOrder(f).appStoreOverlap?.renewal).toBe(recorded ? "already_ending" : undefined);
  expect(f.sub).toMatchObject({ cancel_at: examEndAt });

  m.query.mockResolvedValue([{ appUserId }]);
  const fetchReceipt = vi.fn()
    .mockResolvedValueOnce(receipt(new Date(Date.now() + 86400000)))
    .mockRejectedValueOnce(new Error("fixture network outage"))
    .mockResolvedValueOnce(receipt(new Date(Date.now() - 1)));
  vi.stubGlobal("fetch", fetchReceipt);
  const response = await changeEnding(endingRequest(orderId, kind, examDate));
  expect(response.status).toBe(409);
  expect(await response.json()).toEqual({ error: "app_store_subscription_exists" });
  expect(f.sub).toMatchObject({ cancel_at: examEndAt, cancel_at_period_end: false });
  expect(fetchReceipt).toHaveBeenCalledExactlyOnceWith(
    `https://api.revenuecat.com/v1/subscribers/${appUserId}`, expect.anything(),
  );

  const unavailable = await changeEnding(endingRequest(orderId, kind, examDate));
  expect(unavailable.status).toBe(503);
  expect(f.sub).toMatchObject({ cancel_at: examEndAt, cancel_at_period_end: false });

  const expired = await changeEnding(endingRequest(orderId, kind, examDate));
  expect(expired.status).toBe(200);
  expect(await expired.json()).toMatchObject({ management: { examDate: examDate ?? null } });
  expect(fetchReceipt).toHaveBeenCalledTimes(3);
});

it("allows an earlier exam date without rechecking the App Store", async () => {
  const f = await paidWebOrder({ examEndAt, exam: "ip" });
  const { orderId } = f.result;
  await f.service.recordAppStoreOverlaps("alice", ["alice"]);
  await f.service.reconcileAppStoreOverlap("alice", orderId, f.provider, async () => "active");

  const response = await changeEnding(endingRequest(orderId, "exam", "2026-02-10"));
  expect(response.status).toBe(200);
  expect(await response.json()).toMatchObject({ management: { examDate: "2026-02-10" } });
  expect(m.query).not.toHaveBeenCalled();
});

it.each(["overlap lookup", "order recording"])("preserves access and retries the webhook after failure in %s", async failure => {
  const f = await paidWebOrder();
  const expiry = new Date(Date.now() + 86400000);
  let account = { appUserId, userId: "alice", expiresAt: null as Date | null, checkedAt: null as Date | null };
  let failLookup = failure === "overlap lookup";
  m.query.mockImplementation(async (sql: string, ...[, expiresAt, checkedAt]) => {
    if (sql.startsWith('SELECT * FROM "MobileRevenueCatAccount"') || sql.startsWith('SELECT "appUserId"')) return [account];
    if (sql.startsWith('UPDATE "MobileRevenueCatAccount"')) {
      account = { ...account, expiresAt, checkedAt };
      return [account];
    }
    if (sql.startsWith('SELECT email,"emailVerified"')) {
      if (failLookup) {
        failLookup = false;
        throw new Error("fixture audit timeout");
      }
      return [{ email: null }];
    }
    if (sql.includes('"sandboxExpiresAt" END > NOW()')) return [{ active: account.expiresAt !== null }];
    throw new Error("Unexpected fixture query");
  });
  const record = vi.spyOn(f.service, "recordAppStoreOverlaps");
  if (failure === "order recording") record.mockRejectedValueOnce(new Error("fixture transaction timeout"));
  vi.stubGlobal("fetch", async () => receipt(expiry));
  const sendWebhook = () => revenueCatWebhook(new Request("https://fixture.invalid/api/mobile/revenuecat", {
    method: "POST", headers: { authorization: m.webhookAuthorization },
    body: JSON.stringify({ event: { id: "evt_late", app_id: "test-app", environment: "SANDBOX", app_user_id: appUserId } }),
  }));

  const response = await sendWebhook();
  expect(response.status).toBe(503);
  expect(await response.json()).toEqual({ error: "duplicate_purchase_audit_unavailable" });
  expect(account.expiresAt).toEqual(expiry);
  expect(readOrder(f).appStoreOverlap).toBeUndefined();
  expect(m.after).not.toHaveBeenCalled();

  const retry = await sendWebhook();
  expect(retry.status).toBe(200);
  expect(await retry.json()).toEqual({ ok: true });
  expect(record).toHaveBeenLastCalledWith("alice", ["alice"]);
  expect(readOrder(f).appStoreOverlap?.renewal).toBe("pending");
  expect((await sendWebhook()).status).toBe(200);
  expect(m.after).toHaveBeenCalledTimes(2);
  await Promise.all(m.after.mock.calls.map(([task]) => task()));

  expect(readOrder(f).appStoreOverlap?.renewal).toBe("stopped");
  expect(f.sub).toMatchObject({ cancel_at: f.line.period.end });
  expect(account.expiresAt).toEqual(expiry);
  expect(m.notify).toHaveBeenCalledExactlyOnceWith({
    key: `billing:app-store-overlap:stripe-test:${f.result.orderId}`,
    text: expect.stringContaining(f.result.orderId),
  });
});
