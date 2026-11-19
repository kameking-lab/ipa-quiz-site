import "server-only";
import { prisma } from "@/lib/db/prisma";
import { BillingError } from "../domain";
import type { SqlSession } from "../postgres-store";
import { monthlyConfig } from "./config";
import { MonthlyService } from "./service";
import { PostgresMonthlyStore } from "./store";
import { StripeMonthlyProvider } from "./stripe";
import { auditDuplicatePurchases } from "../duplicate-purchase-runtime";
import { notifyOpsOnce } from "@/lib/notify/ops-alert";

export function monthlyRuntime(requireSales = false, deadline?: AbortSignal) {
  const config = monthlyConfig();
  if (!process.env.DATABASE_URL || requireSales && !config.enabled) throw new BillingError("billing_unavailable", 503);
  const session = (client: Pick<typeof prisma, "$queryRawUnsafe">): SqlSession => ({ query: (sql, values) => client.$queryRawUnsafe(sql, ...values) });
  const store = new PostgresMonthlyStore({ ...session(prisma),
    transaction: fn => prisma.$transaction(tx => fn(session(tx)), { maxWait: 5000, timeout: 60000 }),
  }, config.sourceInstance);
  const key = (config.mode === "stripe-live" ? process.env.BILLING_STRIPE_LIVE_SECRET_KEY : process.env.BILLING_STRIPE_TEST_SECRET_KEY) ?? "";
  const service = new MonthlyService(store, config, undefined, auditDuplicatePurchases, (orderId, invoiceId) => notifyOpsOnce({
    key: `billing:exam-charge:${config.mode}:${invoiceId}`,
    text: `[過去問AI] 自動終了後の請求を確認してください（${config.mode}）。注文 ${orderId} / <https://dashboard.stripe.com/${config.mode === "stripe-test" ? "test/" : ""}invoices/${encodeURIComponent(invoiceId)}|請求書 ${invoiceId}>`,
  }), (orderId, reason) => notifyOpsOnce({
    key: `billing:purchase-review:${config.mode}:${orderId}:${reason}`,
    text: `[過去問AI] 再申込に影響する請求を確認してください（${config.mode}）。注文 ${orderId} / ${reason}`,
  }));
  return { config, store, service, provider: new StripeMonthlyProvider(config, key, fetch, deadline) };
}
