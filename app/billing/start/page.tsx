import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { optionalBillingIdentity } from "@/lib/billing/runtime";
import { monthlyConfig, monthlySelected } from "@/lib/billing/subscription/config";
import { monthlyTerms } from "@/lib/billing/subscription/service";
import { billingHref, safeQuizReturn } from "@/lib/billing/quiz-return";
import { AutoCheckout } from "./AutoCheckout";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "決済へ移動", robots: { index: false, follow: false } };

/**
 * The plan button's target: no page of its own to read or confirm. Signed out
 * → sign-in (Google/Apple), which returns here; signed in → Stripe Checkout at
 * once; already a member → straight back to the study page. Anything unusual
 * falls back to /billing, which explains the state.
 */
export default async function StartCheckoutPage({ searchParams }: { searchParams: Promise<{ returnTo?: string }> }) {
  const back = safeQuizReturn((await searchParams).returnTo);
  const self = back ? `/billing/start?returnTo=${encodeURIComponent(back)}` : "/billing/start";
  const fallback = back ? billingHref(back) : "/billing";
  let config: ReturnType<typeof monthlyConfig> | null = null;
  try { if (monthlySelected()) config = monthlyConfig(); } catch { /* Not on sale: /billing explains. */ }
  if (!config?.enabled) redirect(fallback);
  let userId: string | null = null, member = false, contract = false;
  try {
    userId = await optionalBillingIdentity();
    if (userId) {
      const state = await (await import("@/lib/billing/subscription/runtime")).monthlyRuntime().service.status(userId);
      member = state.entitled;
      contract = !!state.subscription && !["canceled", "incomplete_expired"].includes(state.subscription.status);
    }
  } catch { redirect(fallback); }
  if (!userId) redirect(`/auth/signin?callbackUrl=${encodeURIComponent(self)}`);
  if (member) redirect(back ?? "/billing");
  if (contract) redirect(fallback);
  return <AutoCheckout terms={monthlyTerms(config)} returnTo={back} fallback={fallback} testMode={config.mode === "stripe-test"} />;
}
