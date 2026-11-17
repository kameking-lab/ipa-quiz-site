import "server-only";
import { prisma } from "@/lib/db/prisma";
import { webEntitlement } from "@/mobile/server/entitlement";
import { revenueCatAccess } from "@/mobile/server/revenuecat";
import { mobileConfig } from "@/mobile/server/config";
import { DuplicatePurchaseGuard } from "./duplicate-purchase";
import { monthlyConfig } from "./subscription/config";

const db = { query: <T,>(sql: string, values: unknown[]) => prisma.$queryRawUnsafe<T[]>(sql, ...values) };
export async function assertNoDuplicatePurchase(userId: string) {
  return new DuplicatePurchaseGuard(db, async id => ({
    stripe: (await webEntitlement(id)).entitled,
    appStore: !!await revenueCatAccess(id, true),
  })).assertCanPurchase(userId);
}
export async function auditDuplicatePurchases(userId: string) {
  return new DuplicatePurchaseGuard(db, async id => {
    const stripe = (await webEntitlement(id)).entitled;
    // Read the committed verified snapshot: never trigger a refresh from its own audit.
    // Production money must not be reported as a duplicate of a sandbox receipt.
    const rows = mobileConfig().enabled ? await db.query<{ active: boolean }>(`SELECT
      (CASE WHEN $2 THEN "productionExpiresAt" ELSE "sandboxExpiresAt" END > NOW()) AS active
      FROM "MobileRevenueCatAccount" WHERE "userId"=$1`, [id, monthlyConfig().mode === "stripe-live"]) : [];
    return { stripe, appStore: rows[0]?.active === true };
  }).audit(userId);
}
