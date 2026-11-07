"use client";

import Link from "next/link";
import { ChihuahuaMascot } from "@/components/ChihuahuaMascot";
import { planStartHref, saveQuizReturn } from "@/lib/billing/quiz-return";
import { PLAN_OFFER } from "@/lib/billing/plan-offer";
import { sendFunnelEvent } from "@/lib/billing/funnel-client";
import { useEffect } from "react";
import { posthogCapture } from "@/lib/posthog";
import dynamic from "next/dynamic";
const FeedbackUnlock = dynamic(() => import("./FeedbackUnlock").then(m => m.FeedbackUnlock), { ssr: false });

export function PracticeLoading({ index = 0, total = 0 }: { index?: number; total?: number }) {
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
  useEffect(() => { posthogCapture("practice_limit_viewed", { freeDaily: free }); sendFunnelEvent("free_limit_reached"); }, [free]);
  const start = () => {
    posthogCapture("practice_upgrade_clicked", { source: "daily_limit" });
    sendFunnelEvent("paywall_plan_click");
    try { saveQuizReturn(window.sessionStorage, resumeHref); } catch { /* The link itself carries the return path. */ }
  };
  return <section aria-labelledby="practice-limit-title" className="mx-auto w-full max-w-md px-4 py-8 text-center">
    <div className="flex justify-center"><ChihuahuaMascot pose="celebrate" size={96} /></div>
    <h2 id="practice-limit-title" className="mt-3 text-2xl font-bold leading-snug">今日の無料{free}問はここまで</h2>
    <div className="mt-6 space-y-3">
      <a href={planStartHref(resumeHref)} onClick={start} aria-describedby="plan-terms" className="flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-lg font-bold text-primary-foreground hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">月額{PLAN_OFFER.priceYen}円で続ける</a>
      <p id="plan-terms" className="text-xs text-muted-foreground">税込・毎月自動更新・いつでも解約可 <Link href="/billing/terms" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">条件・返金</Link></p>
      <FeedbackUnlock onUnlocked={onUnlocked ?? (() => window.location.reload())} />
    </div>
    <p className="mt-6 text-xs text-muted-foreground">明日また{free}問</p>
  </section>;
}
