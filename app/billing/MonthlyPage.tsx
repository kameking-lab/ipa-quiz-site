import { billingIdentity } from "@/lib/billing/runtime";
import { monthlyConfig } from "@/lib/billing/subscription/config";
import { MONTHLY_PUBLIC_OFFER } from "@/lib/billing/subscription/public-offer";
import { monthlyRuntime } from "@/lib/billing/subscription/runtime";
import { MonthlyConditions, MonthlyPlanLink, MonthlyPrice } from "@/components/billing/MonthlyOffer";
import { ManageSubscriptionButton } from "./ManageSubscriptionButton";
import { BillingPageBeacon } from "./BillingPageBeacon";
import { MonthlyMascot } from "./MonthlyMascot";
import { revenueCatAccess } from "@/mobile/server/revenuecat";
import { jstDateString } from "@/lib/streak/core";
import { terminal, type SubscriptionManagement } from "@/lib/billing/subscription/domain";
import { SubscriptionEnding } from "./SubscriptionEnding";

/** One button and one line of terms; the full conditions live on /billing/terms. */
export default async function MonthlyPage({ returnTo }: { returnTo?: string } = {}) {
  let config: ReturnType<typeof monthlyConfig> | null = null;
  try { config = monthlyConfig(); } catch { /* Keep the unconfigured sales page closed. */ }
  let canManage = false, hasContract = false, showTrial = true, management: SubscriptionManagement | null = null;
  try {
    if (config) {
      const userId = await billingIdentity();
      const { service, provider } = monthlyRuntime();
      let state = await service.status(userId);
      if (config.enabled) {
        try {
          await service.recoverElapsedExamEnds(userId, provider);
          state = await service.status(userId);
        } catch { /* Keep the last verified contract state if Stripe is unavailable. */ }
      }
      if (!state.entitled && state.subscription && !terminal(state.subscription.status)) {
        try {
          await service.recoverPendingCheckout(userId, provider, { attachedOnly: true });
          state = await service.status(userId);
        } catch { /* Keep the last verified contract state if Stripe is unavailable. */ }
      }
      canManage = state.canManage; hasContract = !!state.subscription && !terminal(state.subscription.status);
      showTrial = state.trialDays > 0;
      management = state.management;
      hasContract ||= state.entitled || !!await revenueCatAccess(userId);
    }
  } catch { /* Signed out or storage unavailable: the plan button signs in first. */ }
  return <MonthlyPlanView {...{ canManage, hasContract, showTrial, management, returnTo }} salesOpen={config?.enabled === true} today={jstDateString(new Date())} />;
}

export function MonthlyPlanView({ canManage, hasContract, showTrial, management, returnTo, salesOpen, today }: {
  canManage: boolean; hasContract: boolean; showTrial: boolean; management: SubscriptionManagement | null;
  returnTo?: string; salesOpen: boolean; today: string;
}) {
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
        <p>無料は過去問1日{MONTHLY_PUBLIC_OFFER.freeDaily}問。月額なら過去問を回数無制限で解き、全分野の弱点から今週の復習を始められます。</p>
      </div>
      {management ? <SubscriptionEnding key={management.orderId} initial={management} today={today} />
        : hasContract ? <p role="status" className="text-sm">契約済みです（支払確認中を含む）。</p>
        : salesOpen ? <MonthlyPlanLink returnTo={returnTo ?? ""} />
        : <p role="status" className="rounded-lg bg-muted px-4 py-3 text-sm">現在、新規申込を受け付けていません。</p>}
      {canManage && (management ? <ManageSubscriptionButton label="契約・お支払い" /> : <ManageSubscriptionButton />)}
      <MonthlyConditions showTrial={!hasContract && showTrial} contract={hasContract} />
    </section>
  </>;
}
