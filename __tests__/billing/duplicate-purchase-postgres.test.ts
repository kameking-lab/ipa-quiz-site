// @vitest-environment node
import { PGlite } from "@electric-sql/pglite";
import { readFileSync } from "node:fs";
import { afterAll, beforeAll, beforeEach, expect, it, vi } from "vitest";
import { DuplicatePurchaseGuard } from "@/lib/billing/duplicate-purchase";
import { PostgresMonthlyStore } from "@/lib/billing/subscription/store";
import { MonthlyService, monthlyTerms } from "@/lib/billing/subscription/service";
import { monthlyFixture, monthlyFixtureConfig } from "./monthly-fixture";
import type { SqlSession } from "@/lib/billing/postgres-store";
import { BillingError } from "@/lib/billing/domain";

const wiring = vi.hoisted(() => ({ user: "alice", check: vi.fn(), runtime: null as unknown, entitlement: vi.fn(), app: vi.fn(), appStatus: vi.fn() }));
vi.mock("@/lib/billing/runtime", () => ({
  billingIdentity: async () => wiring.user,
  sameOrigin: (r: Request) => { if (r.headers.get("origin") !== "http://localhost:3338") throw new BillingError("invalid_origin", 403); },
  json: (value: unknown) => Response.json(value, { headers: { "Cache-Control": "private, no-store" } }),
  billingFailure: (e: BillingError) => Response.json({ error: e.code ?? "billing_unavailable" }, { status: e.status ?? 503 }),
}));
vi.mock("@/lib/billing/subscription/runtime", () => ({ monthlyRuntime: () => wiring.runtime }));
vi.mock("@/lib/billing/duplicate-purchase-runtime", () => ({ assertNoDuplicatePurchase: wiring.check }));
vi.mock("@/lib/billing/checkout-email", () => ({ checkoutEmail: async () => undefined }));
vi.mock("@/mobile/server/entitlement", () => ({ mobileEntitlement: wiring.entitlement }));
vi.mock("@/mobile/server/revenuecat", () => ({ appStorePurchaseCheck: wiring.app, appStorePurchaseStatus: wiring.appStatus }));
import { POST as checkout, DELETE as cancelWeb } from "@/app/api/billing/checkout/route";
import { POST as nativeCheck, DELETE as cancelNative, PATCH as recoverNative } from "@/app/api/mobile/purchase-check/route";

// A fresh in-memory PostgreSQL engine, with the real schema/SQL and no application connection.
const pg = new PGlite();
const sql: SqlSession = { query: async <T,>(text: string, values: unknown[]) => (await pg.query<T>(text, values)).rows };
const store = new PostgresMonthlyStore({ ...sql, transaction: fn => pg.transaction(tx => fn({ query: async <T,>(text: string, values: unknown[]) => (await tx.query<T>(text, values)).rows })) }, monthlyFixtureConfig.sourceInstance);
const config = { ...monthlyFixtureConfig, trialDays: 7 };
let now: Date;
const service = new MonthlyService(store, config, () => now);
let provider: Awaited<ReturnType<typeof monthlyFixture>>["provider"];
const guard = new DuplicatePurchaseGuard(sql, async id => ({
  stripe: (await service.status(id)).entitled,
  appStore: (await sql.query<{ active: boolean }>('SELECT "sandboxExpiresAt">NOW() AS active FROM "MobileRevenueCatAccount" WHERE "userId"=$1', [id]))[0]?.active === true,
}));
beforeAll(async () => {
  await pg.exec(readFileSync("prisma/migrations/20260419000000_init/migration.sql", "utf8"));
  await pg.exec(readFileSync("prisma/subscription-schema.sql", "utf8"));
  for (const name of ["20261104000000_mobile_revenuecat", "20261104020000_mobile_store_environments"]) await pg.exec(readFileSync(`prisma/migrations/${name}/migration.sql`, "utf8"));
}, 30000);
afterAll(async () => { await pg.close(); vi.unstubAllEnvs(); });
beforeEach(async () => {
  vi.stubEnv("BILLING_PRODUCT", "subscription"); wiring.user = "alice";
  wiring.check.mockImplementation(id => guard.assertCanPurchase(id));
  now = new Date();
  wiring.app.mockReset().mockResolvedValue(undefined);
  wiring.appStatus.mockReset().mockResolvedValue(null);
  wiring.entitlement.mockImplementation(async id => ({ userId: id, entitled: (await service.status(id)).entitled }));
  const f = await monthlyFixture();
  provider = f.provider;
  vi.mocked(provider.checkout).mockClear();
  wiring.runtime = { service, provider };
  await pg.exec('TRUNCATE "User" CASCADE');
  await pg.query('INSERT INTO "User" (id,email,"emailVerified","updatedAt") VALUES ($1,$2,NOW(),NOW()),($3,$4,NULL,NOW())', ["alice", " Owner@example.invalid ", "bob", "owner@EXAMPLE.invalid"]);
  await pg.exec(`INSERT INTO "Account" (id,"userId",type,provider,"providerAccountId") VALUES ('apple','alice','oidc','apple','apple-sub'),('google','bob','oidc','google','google-sub')`);
});
async function stripePaid() {
  const f = await monthlyFixture(); await f.send();
  const a = structuredClone(f.account()); a.userId = "bob";
  // The verified paid period is moved to now; no hand-written approximation of access rules.
  for (const invoice of Object.values(a.invoices)) { invoice.periodStart = Date.now()/1000 - 60; invoice.periodEnd = Date.now()/1000 + 3600; }
  await pg.query('INSERT INTO billing_subscription_account(user_id,mode,source_instance,payload) VALUES ($1,$2,$3,$4::jsonb)', ["bob", a.mode, a.sourceInstance, JSON.stringify(a)]);
}
async function appPaid() {
  await pg.query('INSERT INTO "MobileRevenueCatAccount" ("userId","appUserId","sandboxExpiresAt") VALUES ($1,$2,$3)', ["bob", "opaque", new Date(Date.now()+3600000)]);
}
it.each(["stripe", "appStore"])("matches trim/case differences and blocks a different account's %s", async source => {
  if (source === "stripe") await stripePaid(); else await appPaid();
  await expect(guard.assertCanPurchase("alice")).rejects.toMatchObject({ code: "duplicate_purchase_google" });
});
it("normalizes tabs, newlines and Unicode whitespace on the candidate account too",async()=>{
  await appPaid();await pg.query('UPDATE "User" SET email=$1 WHERE id=$2',["\t\n\u3000owner@EXAMPLE.invalid\u00a0\r", "bob"]);
  await expect(guard.assertCanPurchase("alice")).rejects.toMatchObject({code:"duplicate_purchase_google"});
});
it("allows nonmatching email and expired App Store access", async () => {
  await appPaid(); await pg.query('UPDATE "User" SET email=$1 WHERE id=$2', ["other@example.invalid", "bob"]);
  await expect(guard.assertCanPurchase("alice")).resolves.toBeUndefined();
  await pg.query('UPDATE "User" SET email=$1 WHERE id=$2', ["owner@example.invalid", "bob"]);
  await pg.exec('UPDATE "MobileRevenueCatAccount" SET "sandboxExpiresAt"=NOW()-INTERVAL \'1 second\'');
  await expect(guard.assertCanPurchase("alice")).resolves.toBeUndefined();
});
it("excludes identical relay addresses and never matches plus aliases", async () => {
  await appPaid();
  await pg.exec(`UPDATE "User" SET email=CASE WHEN id='alice' THEN ' SAME@privaterelay.appleid.com ' ELSE 'same@PRIVATERELAY.APPLEID.COM' END`);
  await expect(guard.assertCanPurchase("alice")).resolves.toBeUndefined();
  await pg.exec(`UPDATE "User" SET email=CASE WHEN id='alice' THEN 'owner+tag@example.invalid' ELSE 'owner@example.invalid' END`);
  await expect(guard.assertCanPurchase("alice")).resolves.toBeUndefined();
});
it("logs active cross-store duplicates and leaves both owners and rights unchanged", async () => {
  await stripePaid();
  await pg.query('INSERT INTO "MobileRevenueCatAccount" ("userId","appUserId","sandboxExpiresAt") VALUES ($1,$2,$3)', ["alice", "opaque", new Date(Date.now()+3600000)]);
  const before = await pg.query('SELECT * FROM billing_subscription_account');
  const warn = vi.spyOn(console, "warn").mockImplementation(()=>{});
  try { await guard.audit("alice"); expect(warn).toHaveBeenCalledExactlyOnceWith("duplicate_purchase_stripe_app_store_same_email"); } finally { warn.mockRestore(); }
  expect(await pg.query('SELECT * FROM billing_subscription_account')).toEqual(before);
});
it("logs a cross-store duplicate on one account with an Apple private relay address", async () => {
  await stripePaid(); await appPaid();
  await pg.query('UPDATE "User" SET email=$1 WHERE id=$2', ["owner@privaterelay.appleid.com", "bob"]);
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  try { await guard.audit("bob"); expect(warn).toHaveBeenCalledExactlyOnceWith("duplicate_purchase_stripe_app_store_same_account"); } finally { warn.mockRestore(); }
});

const request = (path: string, origin = "http://localhost:3338", cancellation?: Record<string, string>) => new Request(`http://localhost:3338/api/${path}`, {
  method: cancellation ? "DELETE" : "POST", headers: { origin }, body: JSON.stringify(cancellation ?? { terms: monthlyTerms(config) }),
});
const webRequest = () => request("billing/checkout");
const nativeRequest = () => request("mobile/purchase-check");
const release = (reservationId: string) => cancelNative(request("mobile/purchase-check", undefined, { reservationId }));
const attemptId = "00000000-0000-4000-8000-000000000077";
const purchaseBody = (method: string, body: object, origin = "http://localhost:3338") => new Request(
  "http://localhost:3338/api/mobile/purchase-check", { method, headers: { origin }, body: JSON.stringify(body) });
const prepareNative = (id = attemptId) => nativeCheck(purchaseBody("POST", { attemptId: id, confirmStoreKit: true }));
const recoverAttempt = () => recoverNative(purchaseBody("PATCH", { attemptId }));
const recoverReservation = (reservationId: string) => recoverNative(purchaseBody("PATCH", { reservationId }));
const transitionNative = (reservationId: string, action: "start" | "approval" | "retry-approval") => recoverNative(purchaseBody("PATCH", { reservationId, action }));
const pendingNative = (userId = wiring.user) => recoverNative(purchaseBody("PATCH", { action: "status", userId }));
const reservationInDb = () => store.transaction("alice", config.mode, config.sourceInstance, async a => a.appStorePurchase, true);
async function reserveAndRelease() {
  const response = await nativeCheck(nativeRequest());
  expect(response.status).toBe(200);
  const { reservation } = await response.json();
  expect((await release(reservation.id)).status).toBe(200);
}
it.each(["stripe", "appStore"])("HTTP: both purchase entry points stop before a reservation for another account's %s", async source => {
  if (source === "stripe") await stripePaid(); else await appPaid();
  for (const [route, path] of [[checkout, "billing/checkout"], [nativeCheck, "mobile/purchase-check"]] as const) {
    const response = await route(request(path));
    expect(response.status).toBe(409); expect(await response.json()).toEqual({ error: "duplicate_purchase_google" });
  }
  expect(await reservationInDb()).toBeUndefined();
  expect(provider.checkout).not.toHaveBeenCalled();
});
it("HTTP: a different email can reserve Stripe Checkout and pass the StoreKit check", async () => {
  await appPaid(); await pg.query('UPDATE "User" SET email=$1 WHERE id=$2', ["different@example.invalid", "bob"]);
  await reserveAndRelease();
  const response = await checkout(request("billing/checkout"));
  expect(response.status).toBe(200); expect((await response.json()).url).toContain("checkout.stripe.com");
});
it("HTTP: a legacy login with no active duplicate can buy on Web and iOS", async () => {
  await pg.exec(`UPDATE "User" SET "emailVerified"=NULL WHERE id='alice'`);
  await reserveAndRelease();
  const response = await checkout(request("billing/checkout"));
  expect(response.status).toBe(200);
  expect((await response.json()).url).toContain("checkout.stripe.com");
});
it.each(["stripe", "appStore"])("HTTP: a legacy login is blocked only while a same-email %s right is active", async source => {
  await pg.exec(`UPDATE "User" SET "emailVerified"=NULL WHERE id='alice'`);
  if (source === "stripe") await stripePaid(); else await appPaid();
  for (const route of [checkout, nativeCheck]) {
    const response = await route(request("purchase"));
    expect(response.status).toBe(409);
    expect(await response.json()).toEqual({ error: "purchase_email_unverified" });
  }
  expect(await reservationInDb()).toBeUndefined();
  expect(provider.checkout).not.toHaveBeenCalled();
});
it("HTTP: preserves the existing own-account paid rejection and CSRF protection", async () => {
  await stripePaid(); wiring.user = "bob";
  for (const route of [checkout, nativeCheck]) {
    const response = await route(request("purchase"));
    expect(response.status).toBe(409); expect(await response.json()).toEqual({ error: "subscription_exists" });
    expect((await route(request("purchase", "https://untrusted.invalid"))).status).toBe(403);
  }
});
it("HTTP: identical relay email is excluded at both purchase entry points", async () => {
  await appPaid(); await pg.exec(`UPDATE "User" SET email=CASE WHEN id='alice' THEN 'SAME@privaterelay.appleid.com' ELSE 'same@privaterelay.appleid.com' END`);
  await reserveAndRelease();
  expect((await checkout(request("billing/checkout"))).status).toBe(200);
});

async function currentWebContract(status: "past_due" | "incomplete" | "trialing" | "canceled" | "incomplete_expired", userId = "alice") {
  const f = await monthlyFixture();
  await f.send();
  const account = f.account();
  const contract = Object.values(account.contracts)[0], signup = account.signups[contract.signupId];
  const trial = status === "trialing";
  if (trial) signup.trialDays = 7;
  Object.assign(contract, { status, periodStart: now.getTime() / 1000 - 3600, periodEnd: now.getTime() / 1000 + (trial ? 3600 : -60) });
  for (const invoice of Object.values(account.invoices)) {
    invoice.periodStart = now.getTime() / 1000 - 86400;
    invoice.periodEnd = now.getTime() / 1000 - 60;
  }
  await store.transaction(userId, config.mode, config.sourceInstance, async a => { Object.assign(a, account, { userId }); });
}

it.each(["past_due", "incomplete"] as const)("HTTP: refuses iOS purchase for %s after the paid period while management works", async status => {
  await currentWebContract(status);
  expect(await service.status("alice")).toMatchObject({ entitled: false, canManage: true, subscription: { status } });
  const response = await nativeCheck(nativeRequest());
  expect(response.status).toBe(409);
  expect(await response.json()).toEqual({ error: "web_subscription_exists" });
  await expect(service.portal("alice", provider)).resolves.toHaveProperty("url", "https://billing.stripe.com/p/session/fixture");
});

it("HTTP: a live Web trial still grants access and blocks an iOS purchase", async () => {
  await currentWebContract("trialing");
  expect(await service.status("alice")).toMatchObject({ entitled: true, subscription: { status: "trialing" } });
  const response = await nativeCheck(nativeRequest());
  expect(response.status).toBe(409);
  expect(await response.json()).toEqual({ error: "subscription_exists" });
});

it.each(["canceled", "incomplete_expired"] as const)("HTTP: a terminal Web contract (%s) allows iOS", async status => {
  await currentWebContract(status);
  expect((await nativeCheck(nativeRequest())).status).toBe(200);
});

it.each(["open", "complete", "expired"] as const)("HTTP: Web first, Stripe says %s with its webhook still outstanding", async status => {
  expect((await checkout(webRequest())).status).toBe(200);
  vi.mocked(provider.checkoutSession).mockResolvedValueOnce({ id: "cs_test_monthly", status });
  const response = await nativeCheck(nativeRequest());
  expect(response.status).toBe(status === "complete" ? 409 : 200);
  if (status === "complete") expect(await response.json()).toEqual({ error: "web_checkout_pending" });
  if (status === "open") expect(provider.expireCheckout).toHaveBeenCalledWith("cs_test_monthly");
});

it("HTTP: an unrecorded Stripe response cannot free a Checkout that can still complete", async () => {
  const { orderId } = await (await checkout(webRequest())).json();
  await store.transaction("alice", config.mode, config.sourceInstance, async a => {
    a.signups[orderId].sessionId = null;
    a.signups[orderId].url = null;
  });
  vi.mocked(provider.checkoutSession)
    .mockResolvedValueOnce({ id: "cs_test_monthly", status: "complete" })
    .mockResolvedValueOnce({ id: "cs_test_monthly", status: "expired" });
  expect((await nativeCheck(nativeRequest())).status).toBe(409);
  expect((await nativeCheck(nativeRequest())).status).toBe(200);
});

it("HTTP: Web cancel expires the old URL before iOS can reserve", async () => {
  const { orderId } = await (await checkout(webRequest())).json();
  expect((await cancelWeb(request("billing/checkout", "https://untrusted.invalid", { orderId }))).status).toBe(403);
  expect((await cancelWeb(request("billing/checkout", undefined, { orderId }))).status).toBe(200);
  expect(provider.expireCheckout).toHaveBeenCalledWith("cs_test_monthly");
  expect((await service.status("alice", orderId)).purchase?.status).toBe("expired");
  expect((await nativeCheck(nativeRequest())).status).toBe(200);
});

it("HTTP: App Store first blocks Web before RevenueCat sees the transaction, including a replayed release", async () => {
  const first = await nativeCheck(nativeRequest());
  expect(first.status).toBe(200);
  const { reservation } = await first.json();
  const blocked = await checkout(webRequest());
  expect(blocked.status).toBe(409);
  expect(await blocked.json()).toEqual({ error: "app_store_purchase_pending" });
  expect(provider.checkout).not.toHaveBeenCalled();
  expect((await release(reservation.id)).status).toBe(200);
  expect((await nativeCheck(nativeRequest())).status).toBe(200);
  expect((await release(reservation.id)).status).toBe(200);
  expect((await checkout(webRequest())).status).toBe(409);
  now = new Date(Date.parse(reservation.expiresAt) + 1000);
  expect((await checkout(webRequest())).status).toBe(200);
});

it.each(["app_store_subscription_exists", "app_store_purchase_pending"])("HTTP: Web checks RevenueCat even after the local attempt expires (%s)", async code => {
  const { reservation } = await (await nativeCheck(nativeRequest())).json();
  now = new Date(Date.parse(reservation.expiresAt) + 1000);
  wiring.app.mockRejectedValue(new BillingError(code, 409));
  const web = await checkout(webRequest());
  expect(web.status).toBe(409);
  expect(await web.json()).toEqual({ error: code });
  expect(provider.checkout).not.toHaveBeenCalled();
});

it("HTTP: a second member cannot reserve iOS while the first is creating Stripe Checkout", async () => {
  const entered = Promise.withResolvers<void>(), continueStripe = Promise.withResolvers<void>();
  vi.mocked(provider.checkout).mockImplementationOnce(async () => {
    entered.resolve();
    await continueStripe.promise;
    return { id: "cs_test_monthly", url: "https://checkout.stripe.com/c/pay/monthly" };
  });
  const web = checkout(webRequest());
  await entered.promise;
  try {
    wiring.user = "bob";
    const native = await nativeCheck(nativeRequest());
    expect(native.status).toBe(409);
    expect(await native.json()).toEqual({ error: "web_checkout_preparing" });
  } finally { continueStripe.resolve(); }
  expect((await web).status).toBe(200);
});

it("HTTP: a matched member's past_due renewal blocks both buyers after paid access expires", async () => {
  await currentWebContract("past_due", "bob");
  expect((await service.status("bob")).entitled).toBe(false);
  for (const [route, input] of [[checkout, webRequest], [nativeCheck, nativeRequest]] as const) {
    const response = await route(input());
    expect(response.status).toBe(409);
    expect(await response.json()).toEqual({ error: "duplicate_purchase" });
  }
  await store.transaction("bob", config.mode, config.sourceInstance, async a => { Object.values(a.contracts)[0].status = "canceled"; });
  await reserveAndRelease();
  vi.mocked(provider.customer).mockResolvedValueOnce("cus_rejoin");
  vi.mocked(provider.checkout).mockResolvedValueOnce({ id: "cs_test_rejoin", url: "https://checkout.stripe.com/c/pay/rejoin" });
  expect((await checkout(webRequest())).status).toBe(200);
});

it.each(["open", "complete", "expired"] as const)("HTTP: cross-ID Web-first Checkout, Stripe says %s", async status => {
  const web = await checkout(webRequest());
  expect(web.status).toBe(200);
  const { orderId } = await web.json();
  wiring.user = "bob";
  const otherWeb = await checkout(webRequest());
  expect(otherWeb.status).toBe(409);
  expect(await otherWeb.json()).toEqual({ error: "web_checkout_pending" });
  vi.mocked(provider.checkoutSession).mockResolvedValueOnce({ id: "cs_test_monthly", status });
  const native = await nativeCheck(nativeRequest());
  expect(native.status).toBe(status === "complete" ? 409 : 200);
  expect((await service.status("alice", orderId)).purchase?.status).toBe(status === "complete" ? "pending" : "expired");
  if (status === "open") expect(provider.expireCheckout).toHaveBeenCalledWith("cs_test_monthly");
});

it("HTTP: the first iOS buyer blocks both channels on the other ID before RevenueCat returns", async () => {
  const entered = Promise.withResolvers<void>(), continueRevenueCat = Promise.withResolvers<void>();
  wiring.app.mockImplementation(async (id: string) => {
    if (id === "alice") { entered.resolve(); await continueRevenueCat.promise; }
  });
  const first = nativeCheck(nativeRequest());
  await entered.promise;
  try {
    wiring.user = "bob";
    expect(await (await checkout(webRequest())).json()).toEqual({ error: "app_store_purchase_pending" });
    expect(await (await nativeCheck(nativeRequest())).json()).toEqual({ error: "app_store_purchase_pending" });
  } finally { continueRevenueCat.resolve(); }
  const original = await first;
  expect(original.status).toBe(200);
  const { reservation } = await original.json();
  expect((await release(reservation.id)).status).toBe(200); // another ID cannot release it
  expect((await checkout(webRequest())).status).toBe(409);
  wiring.user = "alice";
  expect((await release(reservation.id)).status).toBe(200);
  wiring.user = "bob";
  expect((await checkout(webRequest())).status).toBe(200);
});

it("HTTP: a purchase visible only as processing at RevenueCat blocks both channels on the matching ID", async () => {
  wiring.app.mockImplementation(async (id: string) => {
    if (id === "bob") throw new BillingError("app_store_purchase_pending");
  });
  expect(await (await checkout(webRequest())).json()).toEqual({ error: "app_store_purchase_pending" });
  expect(await (await nativeCheck(nativeRequest())).json()).toEqual({ error: "app_store_purchase_pending" });
  wiring.app.mockResolvedValue(undefined);
  await reserveAndRelease();
});

it("HTTP: Stripe completion racing expiration wins and retains the order", async () => {
  const { orderId } = await (await checkout(webRequest())).json();
  vi.mocked(provider.expireCheckout).mockRejectedValueOnce(new BillingError("subscription_exists"));
  wiring.user = "bob";
  expect(await (await nativeCheck(nativeRequest())).json()).toEqual({ error: "subscription_exists" });
  expect((await service.status("alice", orderId)).purchase?.status).toBe("pending");
  expect(await store.transaction("bob", config.mode, config.sourceInstance, async a => a.appStorePurchase, true)).toBeUndefined();
});

it.each(["customer", "checkout"] as const)("HTTP: Stripe %s connection failure leaves a failed, retryable signup", async call => {
  vi.mocked(provider[call]).mockRejectedValueOnce(new Error("offline"));
  expect((await checkout(webRequest())).status).toBe(503);
  const signups = await store.transaction("alice", config.mode, config.sourceInstance, async a => Object.values(a.signups), true);
  expect(signups).toHaveLength(1);
  expect(signups[0]).toMatchObject({ state: "failed", sessionId: null, url: null });
  wiring.user = "bob";
  await reserveAndRelease();
  wiring.user = "alice";
  expect((await checkout(webRequest())).status).toBe(200);
});

it.each([null, "active", "processing"] as const)("HTTP: checks legacy true against fresh RevenueCat state %s", async state => {
  wiring.appStatus.mockResolvedValue(state);
  expect(await (await recoverNative(purchaseBody("PATCH", { legacy: true }))).json()).toEqual({ state });
  expect(wiring.appStatus).toHaveBeenCalledWith("alice");
  expect((await recoverNative(purchaseBody("PATCH", { legacy: true }, "https://untrusted.invalid"))).status).toBe(403);
});

it("HTTP: recovery after a lost preparation response fences StoreKit and cannot release a newer reservation", async () => {
  const { reservation } = await (await prepareNative()).json();
  expect(reservation.requiresStart).toBe(true);
  expect(await (await recoverReservation(reservation.id)).json()).toEqual({ state: "processing", phase: "ready" });
  expect(await (await recoverAttempt()).json()).toEqual({ state: null });
  expect((await transitionNative(reservation.id, "start")).status).toBe(409);
  const newer = await nativeCheck(nativeRequest());
  expect(newer.status).toBe(200);
  expect(await (await recoverAttempt()).json()).toEqual({ state: "processing" });
  expect((await checkout(webRequest())).status).toBe(409);
});

it("HTTP: an older expiry-only marker preserves an ambiguous purchase for at most 30 minutes", async () => {
  const expiresAt = new Date(now.getTime() + 25 * 3600000).toISOString();
  await store.transaction("alice", config.mode, config.sourceInstance, async a => {
    a.appStorePurchase = { id: attemptId, expiresAt };
  });
  const recover = () => recoverNative(purchaseBody("PATCH", { expiresAt }));
  expect(await (await recover()).json()).toEqual({ state: "processing" });
  wiring.user = "bob";
  expect((await checkout(webRequest())).status).toBe(409);
  now = new Date(now.getTime() + 30 * 60000);
  wiring.user = "alice";
  expect(await (await recover()).json()).toEqual({ state: null });
  wiring.user = "bob";
  expect((await checkout(webRequest())).status).toBe(200);
});

it("HTTP: recovery outruns the initial duplicate lookup and a late POST cannot recreate its reservation", async () => {
  const entered = Promise.withResolvers<void>(), continueDuplicateCheck = Promise.withResolvers<void>();
  wiring.check.mockImplementationOnce(async () => {
    entered.resolve();
    await continueDuplicateCheck.promise;
  });
  const original = prepareNative();
  await entered.promise;
  try {
    expect(await (await recoverNative(purchaseBody("PATCH", { legacy: true }))).json()).toEqual({ state: "processing", phase: "preparing" });
    wiring.user = "bob";
    expect((await checkout(webRequest())).status).toBe(409);
    wiring.user = "alice";
    expect(await (await recoverAttempt()).json()).toEqual({ state: null });
    await reserveAndRelease();
    wiring.user = "bob";
    expect((await checkout(webRequest())).status).toBe(200);
  } finally { continueDuplicateCheck.resolve(); }
  expect((await original).status).toBe(409);
  expect(await reservationInDb()).toBeUndefined();
});

it("HTTP: recovery before POST registration records a fence for that attempt only", async () => {
  expect(await (await recoverAttempt()).json()).toEqual({ state: null });
  expect((await prepareNative()).status).toBe(409);
  await reserveAndRelease();
  wiring.user = "bob";
  expect((await checkout(webRequest())).status).toBe(200);
});

it("HTTP: an abandoned preparation keeps Web blocked while Stripe is closing an existing Checkout", async () => {
  expect((await checkout(webRequest())).status).toBe(200);
  const entered = Promise.withResolvers<void>(), continueStripe = Promise.withResolvers<void>();
  vi.mocked(provider.expireCheckout).mockImplementationOnce(async () => {
    entered.resolve();
    await continueStripe.promise;
  });
  wiring.user = "bob";
  const original = prepareNative();
  await entered.promise;
  try {
    expect(await (await recoverAttempt()).json()).toEqual({ state: "processing", phase: "closing_checkout" });
    wiring.user = "alice";
    expect((await checkout(webRequest())).status).toBe(409);
  } finally { continueStripe.resolve(); }
  expect((await original).status).toBe(409);
  wiring.user = "bob";
  expect(await (await recoverAttempt()).json()).toEqual({ state: null });
  vi.mocked(provider.checkoutSession).mockResolvedValueOnce({ id: "cs_test_monthly", status: "expired" });
  await reserveAndRelease();
});

it("HTTP: StoreKit started, an absent RevenueCat result keeps both channels blocked for 30 minutes", async () => {
  const { reservation } = await (await prepareNative()).json();
  expect((await transitionNative(reservation.id, "start")).status).toBe(200);
  const expiry = now.getTime() + 30 * 60000;
  expect(await reservationInDb()).toMatchObject({ phase: "uncertain", expiresAt: new Date(expiry).toISOString() });
  wiring.appStatus.mockRejectedValueOnce(new BillingError("mobile_verification_unavailable", 503));
  expect((await recoverReservation(reservation.id)).status).toBe(503);
  expect(await (await recoverReservation(reservation.id)).json()).toEqual({ state: "processing" });
  expect((await nativeCheck(nativeRequest())).status).toBe(409);
  wiring.user = "bob";
  now = new Date(expiry - 1000);
  expect((await checkout(webRequest())).status).toBe(409);
  expect(provider.checkout).not.toHaveBeenCalled();
  now = new Date(expiry);
  await reserveAndRelease();
  expect((await checkout(webRequest())).status).toBe(200);
});

it("HTTP: a replayed cancellation for A cannot release B, which both channels can retry after its own cancellation", async () => {
  const { reservation: a } = await (await nativeCheck(nativeRequest())).json();
  expect((await release(a.id)).status).toBe(200);
  const { reservation: b } = await (await nativeCheck(nativeRequest())).json();
  expect((await release(a.id)).status).toBe(200);
  expect(await reservationInDb()).toMatchObject({ id: b.id });
  wiring.user = "bob";
  expect((await checkout(webRequest())).status).toBe(409);
  expect((await nativeCheck(nativeRequest())).status).toBe(409);
  wiring.user = "alice";
  expect((await release(b.id)).status).toBe(200);
  await reserveAndRelease();
  wiring.user = "bob";
  expect((await checkout(webRequest())).status).toBe(200);
});

it.each(["uncertain", "approval"] as const)("HTTP: accepts a late verified App Store transaction during %s", async phase => {
  const { reservation } = await (await prepareNative()).json();
  expect((await transitionNative(reservation.id, "start")).status).toBe(200);
  if (phase === "approval") expect(await (await transitionNative(reservation.id, "approval")).json()).toEqual({ state: "processing" });
  now = new Date(now.getTime() + 20 * 60000);
  wiring.appStatus.mockResolvedValue("active");
  await pg.query('INSERT INTO "MobileRevenueCatAccount" ("userId","appUserId","sandboxExpiresAt") VALUES ($1,$2,$3)', ["alice", "opaque", new Date(Date.now()+3600000)]);
  expect(await (await recoverReservation(reservation.id)).json()).toEqual({ state: "active" });
  expect(await reservationInDb()).toBeUndefined();
  wiring.user = "bob";
  expect((await checkout(webRequest())).status).toBe(409);
  expect((await nativeCheck(nativeRequest())).status).toBe(409);
  expect(provider.checkout).not.toHaveBeenCalled();
});

it("HTTP: acknowledged approval stays pending beyond 30 minutes and cannot extend past 24 hours", async () => {
  const { reservation } = await (await prepareNative()).json();
  expect((await transitionNative(reservation.id, "start")).status).toBe(200);
  const expiry = now.getTime() + 24 * 3600000;
  expect(await (await transitionNative(reservation.id, "approval")).json()).toEqual({ state: "processing" });
  now = new Date(expiry - 1000);
  expect(await (await transitionNative(reservation.id, "approval")).json()).toEqual({ state: "processing" });
  expect(await reservationInDb()).toMatchObject({ phase: "approval", expiresAt: new Date(expiry).toISOString() });
  wiring.user = "bob";
  expect((await checkout(webRequest())).status).toBe(409);
  now = new Date(expiry);
  wiring.user = "alice";
  expect(await (await transitionNative(reservation.id, "approval")).json()).toEqual({ state: null });
  wiring.user = "bob";
  expect((await checkout(webRequest())).status).toBe(200);
});

async function requestApproval(id?: string) {
  const { reservation } = await (await prepareNative(id)).json();
  expect((await transitionNative(reservation.id, "start")).status).toBe(200);
  expect(await (await transitionNative(reservation.id, "approval")).json()).toEqual({ state: "processing" });
  return reservation;
}

it.each(["iOS", "Web"])("HTTP: a declined Ask to Buy at five minutes can be retried on %s", async channel => {
  const original = await requestApproval();
  now = new Date(now.getTime() + 5 * 60000);
  expect((await prepareNative()).status).toBe(409);
  expect((await release(original.id)).status).toBe(200);
  expect(await reservationInDb()).toMatchObject({ id: original.id, phase: "approval" });
  wiring.user = "bob";
  expect((await checkout(webRequest())).status).toBe(409);
  expect((await pendingNative("alice")).status).toBe(409);
  expect(await (await pendingNative()).json()).toEqual({ managed: true, pending: { approval: { reservationId: original.id } } });
  expect(provider.checkout).not.toHaveBeenCalled();
  wiring.appStatus.mockClear();
  expect(await (await transitionNative(original.id, "retry-approval")).json()).toEqual({ state: null });
  expect(wiring.appStatus.mock.calls).toEqual([["alice", true], ["bob", true]]);
  expect(await reservationInDb()).toBeUndefined();
  if (channel === "iOS") {
    wiring.user = "alice";
    expect(await (await pendingNative()).json()).toEqual({ managed: true, pending: null });
    const next = await requestApproval("00000000-0000-4000-8000-000000000078");
    expect(next.id).not.toBe(original.id);
  } else {
    wiring.user = "bob";
    expect((await checkout(webRequest())).status).toBe(200);
    expect(provider.checkout).toHaveBeenCalledOnce();
  }
});

it.each(["other@example.invalid", "owner+tag@example.invalid", "owner@privaterelay.appleid.com"])(
  "HTTP: an account outside the purchase group cannot see or release an approval (%s)", async email => {
    const original = await requestApproval();
    if (email.endsWith("@privaterelay.appleid.com")) {
      await pg.query('UPDATE "User" SET email=$1 WHERE id=$2', [` ${email.toUpperCase()} `, "alice"]);
    }
    await pg.query('UPDATE "User" SET email=$1 WHERE id=$2', [email, "bob"]);
    wiring.user = "bob";
    expect(await (await pendingNative()).json()).toEqual({ managed: true, pending: null });
    wiring.appStatus.mockClear();
    expect(await (await transitionNative(original.id, "retry-approval")).json()).toEqual({ state: null });
    expect(wiring.appStatus).not.toHaveBeenCalled();
    expect(await reservationInDb()).toMatchObject({ id: original.id, phase: "approval" });
    wiring.user = "alice";
    expect(await (await pendingNative()).json()).toMatchObject({ pending: { approval: { reservationId: original.id } } });
  },
);

it.each([6, 23])("HTTP: can retry at %i hours after starting Ask to Buy", async hours => {
  const original = await requestApproval();
  now = new Date(now.getTime() + hours * 3600000);
  wiring.user = "bob";
  expect(await (await pendingNative()).json()).toMatchObject({ pending: { approval: { reservationId: original.id } } });
  expect((await prepareNative()).status).toBe(409);
  expect((await checkout(webRequest())).status).toBe(409);
  expect(await (await transitionNative(original.id, "retry-approval")).json()).toEqual({ state: null });
  wiring.user = "alice";
  expect((await prepareNative()).status).toBe(200);
});

it("HTTP: records an approval whose StoreKit result arrives after switching logins", async () => {
  const { reservation } = await (await prepareNative()).json();
  expect((await transitionNative(reservation.id, "start")).status).toBe(200);
  wiring.user = "bob";
  expect(await (await transitionNative(reservation.id, "approval")).json()).toEqual({ state: "processing" });
  expect(wiring.appStatus).toHaveBeenCalledExactlyOnceWith("alice");
  expect(await (await pendingNative()).json()).toMatchObject({ pending: { approval: { reservationId: reservation.id } } });
  expect(await reservationInDb()).toMatchObject({ id: reservation.id, phase: "approval" });
});

it("HTTP: retry preserves approval on an active or processing receipt or an unavailable RevenueCat lookup", async () => {
  const original = await requestApproval();
  wiring.user = "bob";
  wiring.appStatus.mockImplementation(async id => id === "alice" ? "active" : null);
  expect(await (await transitionNative(original.id, "retry-approval")).json()).toEqual({ state: "active" });
  expect(await reservationInDb()).toMatchObject({ id: original.id, phase: "approval" });
  wiring.appStatus.mockImplementation(async id => id === "bob" ? "processing" : null);
  expect(await (await transitionNative(original.id, "retry-approval")).json()).toEqual({ state: "processing" });
  wiring.appStatus.mockRejectedValueOnce(new BillingError("purchase_check_unavailable", 503));
  expect((await transitionNative(original.id, "retry-approval")).status).toBe(503);
  expect(await reservationInDb()).toMatchObject({ id: original.id, phase: "approval" });
  expect((await prepareNative()).status).toBe(409);
  expect((await checkout(webRequest())).status).toBe(409);
});

it("HTTP: retry revalidates group membership after the RevenueCat lookup", async () => {
  const original = await requestApproval();
  const checking = Promise.withResolvers<void>(), lookup = Promise.withResolvers<null>();
  wiring.appStatus.mockImplementationOnce(() => { checking.resolve(); return lookup.promise; });
  wiring.user = "bob";
  const retry = transitionNative(original.id, "retry-approval");
  await checking.promise;
  await pg.query('UPDATE "User" SET email=$1 WHERE id=$2', ["different@example.invalid", "bob"]);
  lookup.resolve(null);
  expect((await retry).status).toBe(409);
  expect(await reservationInDb()).toMatchObject({ id: original.id, phase: "approval" });
});

it("HTTP: the retry action preserves uncertain and newer reservations", async () => {
  const { reservation: first } = await (await prepareNative()).json();
  expect((await transitionNative(first.id, "start")).status).toBe(200);
  expect(await (await transitionNative(first.id, "retry-approval")).json()).toEqual({ state: "processing" });
  expect(await reservationInDb()).toMatchObject({ id: first.id, phase: "uncertain" });
  expect(await (await transitionNative(first.id, "approval")).json()).toEqual({ state: "processing" });

  const checking = Promise.withResolvers<void>(), oldLookup = Promise.withResolvers<null>();
  wiring.appStatus.mockImplementationOnce(() => { checking.resolve(); return oldLookup.promise; });
  const slowRetry = transitionNative(first.id, "retry-approval");
  await checking.promise;
  expect(await (await transitionNative(first.id, "retry-approval")).json()).toEqual({ state: null });
  const next = await requestApproval("00000000-0000-4000-8000-000000000078");
  oldLookup.resolve(null);
  expect(await (await slowRetry).json()).toEqual({ state: "processing" });
  expect(await reservationInDb()).toMatchObject({ id: next.id, phase: "approval" });
});

it("HTTP: a still-approvable request that completes after release blocks the next purchase on either channel", async () => {
  const original = await requestApproval();
  now = new Date(now.getTime() + 5 * 60000);
  expect(await (await transitionNative(original.id, "retry-approval")).json()).toEqual({ state: null });
  // StoreKit only delivers the transaction when the guardian approves. Model a delivery after the retry.
  wiring.app.mockImplementation(async id => {
    if (id === "alice") throw new BillingError("app_store_subscription_exists");
  });
  wiring.appStatus.mockResolvedValue("active");
  expect(await (await recoverReservation(original.id)).json()).toEqual({ state: "active" });
  expect((await prepareNative()).status).toBe(409);
  wiring.user = "bob";
  expect((await checkout(webRequest())).status).toBe(409);
  expect(provider.checkout).not.toHaveBeenCalled();
});

it("logs a late App Store approval when Web payment already went through after the retry", async () => {
  const original = await requestApproval();
  expect(await (await transitionNative(original.id, "retry-approval")).json()).toEqual({ state: null });
  wiring.user = "bob";
  const response = await checkout(webRequest());
  expect(response.status).toBe(200);
  const { orderId } = await response.json();
  const { observation } = await monthlyFixture();
  const start = Math.floor(now.getTime() / 1000), end = start + 30 * 86400;
  Object.assign(observation.contracts[0], { signupId: orderId, terms: monthlyTerms(config), periodStart: start, periodEnd: end });
  Object.assign(observation.invoices[0], { periodStart: start, periodEnd: end });
  vi.mocked(provider.observe).mockResolvedValueOnce(observation);
  expect(await service.receive({ id: "evt_web_paid" }, "web-paid", provider)).toBe("processed");
  expect((await service.status("bob")).entitled).toBe(true);
  await pg.query('INSERT INTO "MobileRevenueCatAccount" ("userId","appUserId","sandboxExpiresAt") VALUES ($1,$2,$3)', ["alice", "late-approval", new Date(Date.now() + 3600000)]);
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  try {
    await guard.audit("alice");
    expect(warn).toHaveBeenCalledWith("duplicate_purchase_stripe_app_store_same_email");
  } finally { warn.mockRestore(); }
});
