import Link from "next/link";
import { billingIdentity } from "@/lib/billing/runtime";
import { monthlyConfig } from "@/lib/billing/subscription/config";
import { MONTHLY_PUBLIC_OFFER } from "@/lib/billing/subscription/public-offer";
import { monthlyRuntime } from "@/lib/billing/subscription/runtime";
import { planStartHref } from "@/lib/billing/quiz-return";
import { SellerDisclosureLine } from "@/components/billing/SellerDisclosureLine";
import { ManageSubscriptionButton } from "./ManageSubscriptionButton";
import { BillingPageBeacon } from "./BillingPageBeacon";

/** One button and one line of terms; the full conditions live on /billing/terms. */
export default async function MonthlyPage({ returnTo }: { returnTo?: string } = {}) {
  let config: ReturnType<typeof monthlyConfig> | null = null;
  try { config = monthlyConfig(); } catch { /* Keep the unconfigured sales page closed. */ }
  let canManage = false, hasContract = false;
  try {
    if (config) {
      const state = await monthlyRuntime().service.status(await billingIdentity());
      canManage = state.canManage; hasContract = !!state.subscription && !["canceled", "incomplete_expired"].includes(state.subscription.status);
    }
  } catch { /* Signed out or storage unavailable: the plan button signs in first. */ }
  const { priceYen: price, freeDaily: free } = MONTHLY_PUBLIC_OFFER;
  return <>
    <BillingPageBeacon />
    <section aria-labelledby="monthly-price" className="mx-auto max-w-md space-y-4 text-center">
      <h1 id="monthly-price" className="text-2xl font-bold">月額プラン</h1>
      <p>無料は1日{free}問。月額プランは回数無制限。</p>
      {hasContract ? <div className="space-y-3"><p role="status">契約済みです（支払確認中を含む）。追加購入は不要です。</p>{canManage && <ManageSubscriptionButton />}</div>
        : !config?.enabled ? <p role="status">現在、新規申込を受け付けていません。既存契約は自動解約されません。</p>
        : <a href={planStartHref(returnTo ?? "")} aria-describedby="monthly-terms" className="flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-lg font-bold text-primary-foreground hover:bg-primary/90">月額{price.toLocaleString("ja-JP")}円で続ける</a>}
      <p id="monthly-terms" className="text-xs text-muted-foreground">月額{price.toLocaleString("ja-JP")}円（税込）・毎月自動更新・いつでも解約可（期間末まで利用可）・日割返金なし <Link className="underline underline-offset-2" href="/billing/terms">条件・特商法表示</Link></p>
      {!hasContract && canManage && <ManageSubscriptionButton />}
      <SellerDisclosureLine className="text-xs text-muted-foreground" />
    </section>
  </>;
}
