import { billingIdentity } from "@/lib/billing/runtime";
import { monthlyConfig } from "@/lib/billing/subscription/config";
import { MONTHLY_PUBLIC_OFFER } from "@/lib/billing/subscription/public-offer";
import { monthlyRuntime } from "@/lib/billing/subscription/runtime";
import { MonthlyConditions, MonthlyPlanLink, MonthlyPrice } from "@/components/billing/MonthlyOffer";
import { ManageSubscriptionButton } from "./ManageSubscriptionButton";
import { BillingPageBeacon } from "./BillingPageBeacon";
import { MonthlyMascot } from "./MonthlyMascot";
import { revenueCatAccess } from "@/mobile/server/revenuecat";

/** One button and one line of terms; the full conditions live on /billing/terms. */
export default async function MonthlyPage({ returnTo }: { returnTo?: string } = {}) {
  let config: ReturnType<typeof monthlyConfig> | null = null;
  try { config = monthlyConfig(); } catch { /* Keep the unconfigured sales page closed. */ }
  let canManage = false, hasContract = false;
  try {
    if (config) {
      const userId = await billingIdentity();
      const state = await monthlyRuntime().service.status(userId);
      canManage = state.canManage; hasContract = !!state.subscription && !["canceled", "incomplete_expired"].includes(state.subscription.status);
      hasContract ||= state.entitled || !!await revenueCatAccess(userId);
    }
  } catch { /* Signed out or storage unavailable: the plan button signs in first. */ }
  return <>
    <BillingPageBeacon />
    <section aria-labelledby="monthly-price" className="mx-auto w-full max-w-sm space-y-6 py-4 sm:py-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-4">
            <h1 id="monthly-price" className="text-xl font-bold">月額プラン</h1>
            <MonthlyPrice />
          </div>
          <MonthlyMascot />
        </div>
        <p>演習は無料で1日{MONTHLY_PUBLIC_OFFER.freeDaily}問、月額で回数無制限。</p>
      </div>
      {hasContract ? <p role="status" className="text-sm">契約済みです（支払確認中を含む）。</p>
        : config?.enabled ? <MonthlyPlanLink returnTo={returnTo ?? ""} />
        : <p role="status" className="rounded-lg bg-muted px-4 py-3 text-sm">現在、新規申込を受け付けていません。</p>}
      {canManage && <ManageSubscriptionButton />}
      <MonthlyConditions showTrial={!hasContract} />
    </section>
  </>;
}
