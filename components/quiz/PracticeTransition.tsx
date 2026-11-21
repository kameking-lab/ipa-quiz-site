"use client";

import { DailyLimitActions, MonthlyConditions, MonthlyPlanLink, MonthlyPrice } from "@/components/billing/MonthlyOffer";
import { P3Mascot } from "@/components/ui/P3Mascot";
import { ChihuahuaMascot } from "@/components/ChihuahuaMascot";
import { saveQuizReturn } from "@/lib/billing/quiz-return";
import { PLAN_OFFER } from "@/lib/billing/plan-offer";
import { sendFunnelEvent } from "@/lib/billing/funnel-client";
import { useEffect, useRef, useState } from "react";
import { sendConversion } from "@/lib/billing/conversion-client";
import { posthogCapture } from "@/lib/posthog";
import dynamic from "next/dynamic";
const FeedbackUnlock = dynamic(() => import("./FeedbackUnlock").then(m => m.FeedbackUnlock), { ssr: false });

export function PracticeLoading({ index = 0, total = 0 }: { index?: number; total?: number }) {
  // Quick loads (the usual case) show nothing instead of flashing a message per question.
  const [visible, setVisible] = useState(false);
  useEffect(() => { const timer = setTimeout(() => setVisible(true), 600); return () => clearTimeout(timer); }, []);
  if (!visible) return <div className="min-h-[100dvh]" aria-busy="true" />;
  return <div className="mx-auto flex min-h-[100dvh] w-full max-w-2xl flex-col items-center gap-4 px-4 pt-10 text-center sm:pt-14" role="status" aria-live="polite">
    <ChihuahuaMascot pose="guide" size={112} />
    <h2 className="text-xl font-bold">次の問題を読み込んでいます</h2>
    <p className="text-sm text-muted-foreground">{total > 0 ? `${Math.min(index + 1, total)}問目 / ${total}問` : "問題を準備しています"}</p>
    <div aria-hidden="true" className="h-2 w-40 overflow-hidden rounded-full bg-sky-100 dark:bg-sky-950"><div className="h-full w-1/2 rounded-full bg-sky-500 motion-safe:animate-pulse" /></div>
    <p className="text-sm text-muted-foreground">もう少しだけ待ってね。</p>
  </div>;
}

/**
 * The free-10 limit screen (web and app share it). Purchase first, one line of
 * required terms under the button, the one-time feedback bonus second, nothing
 * else. On the web the plan button goes straight to Stripe Checkout (sign-in
 * first when needed); in the iOS app the native host turns any /billing link
 * into the App Store purchase sheet, so Stripe is never reached there.
 */
export function PracticeDailyLimit({ resumeHref, freeDaily, onUnlocked }: { reset?: string | null; resumeHref: string; backHref?: string; freeDaily?: number; onUnlocked?: () => void }) {
  const free = Number.isFinite(freeDaily) && freeDaily! > 0 ? freeDaily! : PLAN_OFFER.freeDaily;
  const measured = useRef(false);
  useEffect(() => { if (!measured.current) { measured.current = true; sendConversion("offer_viewed"); } }, []);
  // The KV funnel count goes first: it must not depend on the analytics SDK.
  useEffect(() => { sendFunnelEvent("free_limit_reached"); posthogCapture("practice_limit_viewed", { freeDaily: free }); }, [free]);
  const start = () => {
    sendConversion("plan_clicked");
    sendFunnelEvent("paywall_plan_click");
    posthogCapture("practice_upgrade_clicked", { source: "daily_limit" });
    try { saveQuizReturn(window.sessionStorage, resumeHref); } catch { /* The link itself carries the return path. */ }
  };
  return <section aria-labelledby="practice-limit-title" className="p3-page p3-limit study-column space-y-4 pb-8">
    <div className="p3-landscape p3-hero">
      <h2 id="practice-limit-title" className="self-center text-xl font-bold">今日の無料{free}問はここまで</h2>
      <P3Mascot exam="" />
    </div>
    <div className="p3-listed space-y-2 px-4 py-3">
      <MonthlyPrice />
      <p>月額プランは演習回数無制限。</p>
    </div>
    <DailyLimitActions>
      <MonthlyPlanLink returnTo={resumeHref} onClick={start} />
    </DailyLimitActions>
    <MonthlyConditions keepPracticeOpen />
    <FeedbackUnlock onUnlocked={onUnlocked ?? (() => window.location.reload())} />
  </section>;
}
