import "server-only";
import { after } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { webEntitlement } from "@/mobile/server/entitlement";
import { readAppStorePurchaseStatus, revenueCatAccess, type AppStoreAccessScope } from "@/mobile/server/revenuecat";
import { mobileConfig } from "@/mobile/server/config";
import { notifyOpsOnce } from "@/lib/notify/ops-alert";
import { BillingError } from "./domain";
import { DuplicatePurchaseGuard } from "./duplicate-purchase";
import { monthlyConfig, monthlySelected } from "./subscription/config";
import { monthlyRuntime } from "./subscription/runtime";

const db = { query: <T,>(sql: string, values: unknown[]) => prisma.$queryRawUnsafe<T[]>(sql, ...values) };
export async function assertNoDuplicatePurchase(userId: string, scope: AppStoreAccessScope = "web"): Promise<void> {
  return new DuplicatePurchaseGuard(db, async id => {
    const stripe = (await webEntitlement(id)).entitled;
    return { stripe, appStore: !stripe && !!await revenueCatAccess(id, { scope, fresh: true }) };
  }).assertCanPurchase(userId);
}
export async function auditDuplicatePurchases(userId: string, { retryOnFailure = false } = {}): Promise<void> {
  if (!monthlySelected() || !mobileConfig().enabled) return;
  try {
    const { mode } = monthlyConfig();
    const appStoreUsers = await new DuplicatePurchaseGuard(db, async id => {
      // Read the committed receipt in the same payment environment.
      const rows = await db.query<{ active: boolean }>(`SELECT
        (CASE WHEN $2 THEN "productionExpiresAt" ELSE "sandboxExpiresAt" END > NOW()) AS active
        FROM "MobileRevenueCatAccount" WHERE "userId"=$1`, [id, mode === "stripe-live"]);
      return { stripe: false, appStore: rows[0]?.active === true };
    }).appStoreUsers(userId);
    if (!appStoreUsers.length) return;
    const { service, provider } = monthlyRuntime();
    const orders = await service.recordAppStoreOverlaps(userId, appStoreUsers);
    if (!orders.length) return;
    // Persist first, then let the Stripe write run without delaying App Store access.
    const reconcile = async () => {
      for (const order of orders) {
        if (order.newlyRecorded) await notifyOpsOnce({
          key: `billing:app-store-overlap:${mode}:${order.orderId}`,
          text: `[過去問AI] App StoreとWebで重複した契約を確認してください（${mode}）。Web注文 ${order.orderId}`,
        });
        try { await service.reconcileAppStoreOverlap(order.userId, order.orderId, provider, readAppStorePurchaseStatus); }
        catch { console.warn("duplicate_purchase_reconcile_unavailable"); }
      }
    };
    try { after(reconcile); } catch { await reconcile(); }
  } catch {
    console.warn("duplicate_purchase_audit_unavailable");
    if (retryOnFailure) throw new BillingError("duplicate_purchase_audit_unavailable", 503);
  }
}
