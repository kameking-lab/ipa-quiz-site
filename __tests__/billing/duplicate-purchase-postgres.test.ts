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

const wiring = vi.hoisted(() => ({ user: "alice", check: vi.fn(), runtime: null as unknown, entitlement: vi.fn(), app: vi.fn() }));
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
vi.mock("@/mobile/server/revenuecat", () => ({ appStorePurchaseCheck: () => wiring.app }));
import { POST as checkout, DELETE as cancelWeb } from "@/app/api/billing/checkout/route";
import { POST as nativeCheck, DELETE as cancelNative } from "@/app/api/mobile/purchase-check/route";

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

const request = (path: string, origin = "http://localhost:3338", cancellation?: Record<string, string>) => new Request(`http://localhost:3338/api/${path}`, {
  method: cancellation ? "DELETE" : "POST", headers: { origin }, body: JSON.stringify(cancellation ?? { terms: monthlyTerms(config) }),
});
const webRequest = () => request("billing/checkout");
const nativeRequest = () => request("mobile/purchase-check");
const release = (reservationId: string) => cancelNative(request("mobile/purchase-check", undefined, { reservationId }));
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
  expect((await pg.query("SELECT user_id FROM billing_subscription_account WHERE user_id='alice'")).rows).toEqual([]);
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
  expect((await pg.query("SELECT user_id FROM billing_subscription_account WHERE user_id='alice'")).rows).toEqual([]);
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

async function currentWebContract(status: "past_due" | "incomplete" | "trialing" | "canceled" | "incomplete_expired") {
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
  await store.transaction("alice", config.mode, config.sourceInstance, async a => { Object.assign(a, account); });
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
  expect(response.status).toBe(status === "expired" ? 200 : 409);
  if (status !== "expired") expect(await response.json()).toEqual({ error: "web_checkout_pending" });
});

it("HTTP: an unrecorded Stripe response cannot free a Checkout that can still complete", async () => {
  const { orderId } = await (await checkout(webRequest())).json();
  await store.transaction("alice", config.mode, config.sourceInstance, async a => {
    a.signups[orderId].sessionId = null;
    a.signups[orderId].url = null;
  });
  expect((await nativeCheck(nativeRequest())).status).toBe(409);
  now = new Date(now.getTime() + 24 * 3600000);
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

it("HTTP: a simultaneous Web and iOS request can only reserve one checkout", async () => {
  const results = await Promise.all([checkout(webRequest()), nativeCheck(nativeRequest())]);
  expect(results.map(r => r.status).sort()).toEqual([200, 409]);
});
