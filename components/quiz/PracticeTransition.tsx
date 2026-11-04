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

export function PracticeDailyLimit({ reset, resumeHref, backHref, freeDaily, onUnlocked }: { reset: string | null; resumeHref: string; backHref: string; freeDaily?: number; onUnlocked?: () => void }) {
  useEffect(() => { posthogCapture("practice_limit_viewed", { freeDaily: freeDaily ?? 10 }); }, [freeDaily]);
  return <section aria-labelledby="practice-limit-title" className="mx-auto min-h-[100dvh] w-full max-w-2xl px-4 py-6 sm:py-10">
    <div className="space-y-5 rounded-3xl border border-sky-200 bg-gradient-to-b from-sky-50 via-card to-card p-5 text-center shadow-sm dark:border-sky-800 dark:from-sky-950 sm:p-8">
      <div className="flex justify-center"><ChihuahuaMascot pose="celebrate" size={128} /></div>
      <div className="space-y-2">
        <p className="text-sm font-semibold text-sky-700 dark:text-sky-300">今日も一歩、合格に近づいたね！</p>
        <h2 id="practice-limit-title" className="text-2xl font-bold leading-snug">今日の無料演習はここまで</h2>
        <p className="text-sm text-muted-foreground">本日の無料連続演習枠{Number.isFinite(freeDaily) && freeDaily! > 0 ? `（${freeDaily}問）` : ""}を使い切りました。</p>
      </div>
      <p className="text-base leading-relaxed">月額プランなら、収録済みの年度別・通常の連続演習を<br className="hidden sm:block" />回数制限なく、自分のペースで進められます。</p>
      <div className="space-y-2">
        <Link href={billingHref(resumeHref)} onClick={() => { posthogCapture("practice_upgrade_clicked", { source: "daily_limit" }); try { saveQuizReturn(window.sessionStorage, resumeHref); } catch { /* The link retains the exact context even without storage. */ } }} className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 px-4 py-4 text-lg font-bold text-white shadow-md transition-shadow hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600">有料にして続きを解く<span aria-hidden="true" className="ml-2">→</span></Link>
        <p className="text-xs leading-relaxed text-muted-foreground">料金・自動更新の条件を確認する画面へ進みます。<br />このボタンだけで課金は始まりません。</p>
      </div>
      <div className="space-y-3 border-t border-border pt-5">
        <FeedbackUnlock onUnlocked={onUnlocked ?? (() => window.location.reload())} />
        <Link href="/review" className="flex min-h-12 w-full items-center justify-center rounded-xl border border-border bg-background px-4 py-3 font-semibold hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">保存済みの履歴を無料で復習する</Link>
        <p className="text-sm leading-relaxed">{reset ? `${reset}に無料枠が更新されます。` : "次の日本時間0時に無料枠が更新されます。"}<br />履歴はそのまま。明日もここから続けられます。</p>
        <Link href={resumeHref} className="inline-flex min-h-11 items-center justify-center px-3 text-sm font-semibold underline underline-offset-4">明日、この問題から再開する</Link>
        <p className="text-xs text-muted-foreground">この問題のURLを保存しておくと、明日戻れます。ログインだけでは本日の無料枠は増えません。</p>
      </div>
    </div>
    <div className="mt-4 text-center"><Link href={backHref} className="inline-flex min-h-11 items-center px-4 text-sm underline underline-offset-4">科目選択へ戻る</Link></div>
  </section>;
}
