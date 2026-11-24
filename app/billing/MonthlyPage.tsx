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
import { aiAccessClaimsEnabled } from "@/lib/ai/quota-copy";
import { AI_QUOTA_COPY } from "@/lib/constants/ai-quota";
import { BillingError, MEMBERSHIP_CHECK_PENDING, MEMBERSHIP_CHECK_PENDING_MESSAGE } from "@/lib/billing/domain";

/** One button and one line of terms; the full conditions live on /billing/terms. */
export default async function MonthlyPage({ returnTo }: { returnTo?: string } = {}) {
  let config: ReturnType<typeof monthlyConfig> | null = null;
  try { config = monthlyConfig(); } catch { /* Keep the unconfigured sales page closed. */ }
  let canManage = false, hasContract = false, showTrial = true, management: SubscriptionManagement | null = null;
  let checkingMembership = false;
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
      hasContract ||= state.entitled || !!await revenueCatAccess(userId, false, true);
    }
  } catch (error) { checkingMembership = error instanceof BillingError && error.code === MEMBERSHIP_CHECK_PENDING; }
  return <MonthlyPlanView {...{ canManage, hasContract, showTrial, management, returnTo, checkingMembership }} salesOpen={config?.enabled === true} today={jstDateString(new Date())} />;
}

export function MonthlyPlanView({ canManage, hasContract, showTrial, management, returnTo, salesOpen, today, checkingMembership = false }: {
  canManage: boolean; hasContract: boolean; showTrial: boolean; management: SubscriptionManagement | null;
  returnTo?: string; salesOpen: boolean; today: string; checkingMembership?: boolean;
}) {
  return <>
    <BillingPageBeacon />
    <section aria-labelledby="monthly-price" className="p3-page p3-billing study-column space-y-4 pb-8">
      <div className="space-y-3">
        <div className="p3-landscape p3-hero p3-billing-hero">
          <div className="p3-price-sign">
            <h1 id="monthly-price" className="text-lg font-bold">月額プラン</h1>
            <MonthlyPrice />
          </div>
          <MonthlyMascot />
        </div>
        <p className="p3-billing-offer p3-listed text-sm leading-relaxed">
          <span>無料は過去問1日{MONTHLY_PUBLIC_OFFER.freeDaily}問。</span>
          <span>月額なら過去問を回数無制限で解けて、全分野の弱点から今週の復習を始められ、広告も出なくなります。</span>
          {aiAccessClaimsEnabled() && <span>{AI_QUOTA_COPY}</span>}
        </p>
      </div>
      {management ? <SubscriptionEnding key={management.orderId} initial={management} today={today} />
        : hasContract ? <p role="status" className="text-sm">契約済みです（支払確認中を含む）。</p>
        : checkingMembership ? <p role="status" className="text-sm">{MEMBERSHIP_CHECK_PENDING_MESSAGE}</p>
        : salesOpen ? <MonthlyPlanLink returnTo={returnTo ?? ""} />
        : <p role="status" className="rounded-lg bg-muted px-4 py-3 text-sm">現在、新規申込を受け付けていません。</p>}
      {canManage && (management ? <ManageSubscriptionButton label="契約・お支払い" /> : <ManageSubscriptionButton />)}
      <div className="p3-listed px-4 py-3">
        <MonthlyConditions showTrial={!hasContract && !checkingMembership && showTrial} contract={hasContract} />
      </div>
    </section>
  </>;
}
