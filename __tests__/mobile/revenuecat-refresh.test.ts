// @vitest-environment node
import { PGlite } from "@electric-sql/pglite";
import { readFileSync } from "node:fs";
import { expect, it, vi } from "vitest";

const db = vi.hoisted(() => ({ query: vi.fn() }));
vi.mock("@/lib/db/prisma", () => ({ prisma: { $queryRawUnsafe: db.query } }));
vi.mock("@/lib/billing/duplicate-purchase-runtime", () => ({ auditDuplicatePurchases: async () => {} }));
vi.mock("@/mobile/server/config", () => ({
  requireMobileReady: () => ({ apiKey: "fixture", productId: "monthly", entitlement: "pro", environment: "SANDBOX" }),
}));

import { refreshRevenueCat } from "@/mobile/server/revenuecat";

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
    await pg.exec('CREATE TABLE "User" (id TEXT PRIMARY KEY); INSERT INTO "User" VALUES (\'alice\');');
    for (const migration of ["20261104000000_mobile_revenuecat", "20261104020000_mobile_store_environments"]) {
      await pg.exec(readFileSync(`prisma/migrations/${migration}/migration.sql`, "utf8"));
    }
    await pg.exec('INSERT INTO "MobileRevenueCatAccount" ("userId","appUserId") VALUES (\'alice\',\'fixture-account\');');
    db.query.mockImplementation(async (sql: string, ...values: unknown[]) => (await pg.query(sql, values)).rows);
    const delayed = refreshRevenueCat("fixture-account", slow);
    await started.promise;
    try {
      await expect(refreshRevenueCat("fixture-account", async () => new Response(null, { status: 404 })))
        .resolves.toMatchObject({ expiresAt: null });
    } finally { resume.resolve(); }
    await expect(delayed).resolves.toMatchObject({ expiresAt: null });
    expect(slow).toHaveBeenCalledTimes(2);
  } finally {
    await pg.close();
  }
});
