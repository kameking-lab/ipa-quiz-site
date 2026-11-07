"use client";

import Link from "next/link";
import { ChihuahuaMascot } from "@/components/ChihuahuaMascot";
import { billingHref, saveQuizReturn } from "@/lib/billing/quiz-return";
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

export function PracticeDailyLimit({ resumeHref, freeDaily, onUnlocked }: { reset: string | null; resumeHref: string; backHref: string; freeDaily?: number; onUnlocked?: () => void }) {
  useEffect(() => { posthogCapture("practice_limit_viewed", { freeDaily: freeDaily ?? 10 }); }, [freeDaily]);
  // Owner decision 2026-11-07: plan first, the one-time feedback +10 second, one line for tomorrow.
  return <section aria-labelledby="practice-limit-title" className="mx-auto min-h-[100dvh] w-full max-w-md px-4 py-8">
    <div className="space-y-4 rounded-3xl border border-sky-200 bg-gradient-to-b from-sky-50 via-card to-card p-5 text-center shadow-sm dark:border-sky-800 dark:from-sky-950">
      <div className="flex justify-center"><ChihuahuaMascot pose="celebrate" size={96} /></div>
      <h2 id="practice-limit-title" className="text-2xl font-bold leading-snug">今日の無料演習はここまで</h2>
      {/* In the iOS app NativeTools intercepts /billing and opens the App Store purchase screen. */}
      <Link href={billingHref(resumeHref)} onClick={() => { posthogCapture("practice_upgrade_clicked", { source: "daily_limit" }); try { saveQuizReturn(window.sessionStorage, resumeHref); } catch { /* The link retains the exact context even without storage. */ } }} className="flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground hover:bg-primary/90">月額980円で続ける</Link>
      <FeedbackUnlock onUnlocked={onUnlocked ?? (() => window.location.reload())} />
      <p className="text-xs text-muted-foreground">明日また10問</p>
    </div>
  </section>;
}
