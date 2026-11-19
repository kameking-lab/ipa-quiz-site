import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { optionalBillingIdentity } from "@/lib/billing/runtime";
import { monthlyConfig, monthlySelected } from "@/lib/billing/subscription/config";
import { monthlyTerms } from "@/lib/billing/subscription/service";
import { billingHref, safeQuizReturn } from "@/lib/billing/quiz-return";
import { AutoCheckout } from "./AutoCheckout";
import { jstDateString } from "@/lib/streak/core";
import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { firstCheckoutExamDate } from "@/lib/billing/exam-end";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "月額プランのお申し込み", robots: { index: false, follow: false } };

/**
 * Collect the exam end preference after sign-in and before opening Checkout.
 */
export default async function StartCheckoutPage({ searchParams }: { searchParams: Promise<{ returnTo?: string }> }) {
  const back = safeQuizReturn((await searchParams).returnTo);
  const self = back ? `/billing/start?returnTo=${encodeURIComponent(back)}` : "/billing/start";
  const fallback = back ? billingHref(back) : "/billing";
  let config: ReturnType<typeof monthlyConfig> | null = null;
  try { if (monthlySelected()) config = monthlyConfig(); } catch { /* Not on sale: /billing explains. */ }
  if (!config?.enabled) redirect(fallback);
  let userId: string | null = null, member = false, contract = false, trialDays = 0;
  let recoveredUrl: string | undefined;
  try {
    userId = await optionalBillingIdentity();
    if (userId) {
      const { service, provider } = (await import("@/lib/billing/subscription/runtime")).monthlyRuntime();
      recoveredUrl = (await service.recoverPendingCheckout(userId, provider))?.url;
      if (!recoveredUrl) {
        await service.recoverElapsedExamEnds(userId, provider);
        const state = await service.status(userId);
        member = state.entitled;
        contract = !!state.subscription && !["canceled", "incomplete_expired"].includes(state.subscription.status);
        trialDays = state.trialDays;
      }
    }
  } catch { redirect(fallback); }
  if (!userId) redirect(`/auth/signin?callbackUrl=${encodeURIComponent(self)}`);
  if (recoveredUrl) redirect(recoveredUrl);
  if (member) redirect(back ?? "/billing");
  if (contract) redirect(fallback);
  const target = back ? new URL(back, config.origin) : null;
  const examCode = target?.pathname.startsWith("/q/") ? target.pathname.split("/")[2] : target?.searchParams.get("exam");
  const exam = ALL_QUIZ_EXAM_CODES.find(code => code === examCode);
  const now = new Date();
  return <AutoCheckout terms={monthlyTerms(config)} returnTo={back} fallback={fallback} today={jstDateString(now)}
    firstExamDate={firstCheckoutExamDate(now)} trialDays={trialDays} exam={exam} testMode={config.mode === "stripe-test"} />;
}
