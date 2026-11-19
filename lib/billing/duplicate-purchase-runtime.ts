import "server-only";
import { after } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { webEntitlement } from "@/mobile/server/entitlement";
import { revenueCatAccess } from "@/mobile/server/revenuecat";
import { mobileConfig } from "@/mobile/server/config";
import { DuplicatePurchaseGuard } from "./duplicate-purchase";
import { monthlyConfig } from "./subscription/config";
import { monthlyRuntime } from "./subscription/runtime";

const db = { query: <T,>(sql: string, values: unknown[]) => prisma.$queryRawUnsafe<T[]>(sql, ...values) };
export async function assertNoDuplicatePurchase(userId: string): Promise<void> {
  return new DuplicatePurchaseGuard(db, async id => {
    const stripe = (await webEntitlement(id)).entitled;
    return { stripe, appStore: !stripe && !!await revenueCatAccess(id, true) };
  }).assertCanPurchase(userId);
}
export async function auditDuplicatePurchases(userId: string): Promise<void> {
  const appStoreUsers = await new DuplicatePurchaseGuard(db, async id => {
    const stripe = (await webEntitlement(id)).entitled;
    // Read the committed verified snapshot: never trigger a refresh from its own audit.
    // Production money must not be reported as a duplicate of a sandbox receipt.
    const rows = mobileConfig().enabled ? await db.query<{ active: boolean }>(`SELECT
      (CASE WHEN $2 THEN "productionExpiresAt" ELSE "sandboxExpiresAt" END > NOW()) AS active
      FROM "MobileRevenueCatAccount" WHERE "userId"=$1`, [id, monthlyConfig().mode === "stripe-live"]) : [];
    return { stripe, appStore: rows[0]?.active === true };
  }).audit(userId);
  if (!appStoreUsers) return;
  try {
    const { service, provider } = monthlyRuntime();
    const orders = await service.recordAppStoreOverlaps(userId, appStoreUsers);
    if (!orders.length) return;
    // Persist first, then let the Stripe write run without delaying App Store access.
    const reconcile = async () => {
      for (const order of orders) {
        try { await service.reconcileAppStoreOverlap(order.userId, order.orderId, provider); }
        catch { console.warn("duplicate_purchase_reconcile_unavailable"); }
      }
    };
    try { after(reconcile); } catch { await reconcile(); }
  } catch { console.warn("duplicate_purchase_reconcile_unavailable"); }
}
