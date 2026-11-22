// @vitest-environment node
import { PGlite } from "@electric-sql/pglite";
import { readFileSync } from "node:fs";
import { afterEach, expect, it, vi } from "vitest";

const db = vi.hoisted(() => ({ query: vi.fn(), execute: vi.fn() }));
vi.mock("@/lib/db/prisma", () => ({ prisma: { $queryRawUnsafe: db.query, $executeRawUnsafe: db.execute } }));
vi.mock("@/lib/billing/duplicate-purchase-runtime", () => ({ auditDuplicatePurchases: async () => {} }));
vi.mock("@/mobile/server/config", () => ({
  mobileConfig: () => ({ enabled: true }),
  requireMobileReady: () => ({ apiKey: "fixture", identitySecret: "public-fixture-identity-for-testing", productId: "monthly", entitlement: "pro", environment: "SANDBOX" }),
}));

import { appStorePurchaseStatus, refreshRevenueCat, revenueCatAccess } from "@/mobile/server/revenuecat";

afterEach(() => vi.unstubAllGlobals());

async function setupAccounts(pg: PGlite) {
  await pg.exec('CREATE TABLE "User" (id TEXT PRIMARY KEY); INSERT INTO "User" VALUES (\'alice\');');
  for (const migration of ["20261104000000_mobile_revenuecat", "20261104020000_mobile_store_environments"]) {
    await pg.exec(readFileSync(`prisma/migrations/${migration}/migration.sql`, "utf8"));
  }
  db.query.mockImplementation(async (sql: string, ...values: unknown[]) => (await pg.query(sql, values)).rows);
  db.execute.mockImplementation(async (sql: string, ...values: unknown[]) => (await pg.query(sql, values)).affectedRows);
}

it("does not persist a stale paid snapshot after another RevenueCat refresh has cleared it", async () => {
  const pg = new PGlite();
  const started = Promise.withResolvers<void>(), resume = Promise.withResolvers<void>();
  const expiresDate = new Date(Date.now() + 86400000).toISOString();
  const paid = { subscriber: {
    entitlements: { pro: { product_identifier: "monthly", expires_date: expiresDate, purchase_date: new Date(0).toISOString() } },
    subscriptions: { monthly: { store: "app_store", is_sandbox: true, expires_date: expiresDate } },
  } };
  const slow = vi.fn<typeof fetch>()
    .mockImplementationOnce(async () => {
      started.resolve();
      await resume.promise;
      return Response.json(paid);
    })
    .mockImplementation(async () => new Response(null, { status: 404 }));
  try {
    await setupAccounts(pg);
    await pg.exec('INSERT INTO "MobileRevenueCatAccount" ("userId","appUserId") VALUES (\'alice\',\'fixture-account\');');
    const delayed = refreshRevenueCat("fixture-account", { transport: slow });
    await started.promise;
    try {
      await expect(refreshRevenueCat("fixture-account", { transport: async () => new Response(null, { status: 404 }) }))
        .resolves.toMatchObject({ expiresAt: null });
    } finally { resume.resolve(); }
    await expect(delayed).resolves.toMatchObject({ expiresAt: null });
    expect(slow).toHaveBeenCalledTimes(2);
  } finally {
    await pg.close();
  }
});

it("makes a newly approved purchase accessible as soon as its receipt is verified", async () => {
  const pg = new PGlite();
  try {
    await setupAccounts(pg);
    const expiresAt = new Date(Date.now() + 86400000);
    const lookup = vi.fn()
      .mockResolvedValueOnce(Response.json({ subscriber: { entitlements: {}, subscriptions: {} } }))
      .mockResolvedValueOnce(Response.json({ subscriber: {
        entitlements: { pro: { product_identifier: "monthly", expires_date: expiresAt.toISOString(), purchase_date: new Date().toISOString() } },
        subscriptions: { monthly: { store: "app_store", is_sandbox: true, expires_date: expiresAt.toISOString() } },
      } }));
    vi.stubGlobal("fetch", lookup);

    await expect(appStorePurchaseStatus("alice", true)).resolves.toBeNull();
    await expect(appStorePurchaseStatus("alice", true)).resolves.toBe("active");
    await expect(revenueCatAccess("alice")).resolves.toMatchObject({ userId: "alice", expiresAt });
    expect(lookup).toHaveBeenCalledTimes(2);
  } finally {
    await pg.close();
  }
});

it("uses a recent unexpired study entitlement during a temporary outage, within five minutes of verification", async () => {
  const pg = new PGlite();
  try {
    await setupAccounts(pg);
    const expiresAt = new Date(Date.now() + 86_400_000);
    const paid = { subscriber: {
      entitlements: { pro: { product_identifier: "monthly", expires_date: expiresAt.toISOString(), purchase_date: new Date(0).toISOString() } },
      subscriptions: { monthly: { store: "app_store", is_sandbox: true, expires_date: expiresAt.toISOString() } },
    } };
    const transport = vi.fn<typeof fetch>().mockResolvedValueOnce(Response.json(paid))
      .mockImplementation(async () => new Response(null, { status: 503 }));
    vi.stubGlobal("fetch", transport);
    await appStorePurchaseStatus("alice", true);
    const setChecked = (age: number) => pg.query('UPDATE "MobileRevenueCatAccount" SET "checkedAt"=$1', [new Date(Date.now() - age)]);
    await setChecked(90_000);
    await expect(revenueCatAccess("alice", false, true)).resolves.toMatchObject({ expiresAt });
    await expect(revenueCatAccess("alice", true)).rejects.toThrow();
    await setChecked(301_000);
    await expect(revenueCatAccess("alice", false, true)).rejects.toThrow();
    await setChecked(90_000);
    transport.mockImplementationOnce(async () => {
      await pg.exec('UPDATE "MobileRevenueCatAccount" SET "expiresAt"=NULL');
      return new Response(null, { status: 503 });
    });
    await expect(revenueCatAccess("alice", false, true)).rejects.toThrow();
    // The checked snapshot can still be recent when a paid period turns over.
    await pg.query('UPDATE "MobileRevenueCatAccount" SET "expiresAt"=$1, "checkedAt"=$2',
      [new Date(Date.now() - 1_000), new Date()]);
    transport.mockResolvedValueOnce(Response.json(paid));
    await expect(revenueCatAccess("alice", false, true)).resolves.toMatchObject({ expiresAt });
  } finally { await pg.close(); }
});
