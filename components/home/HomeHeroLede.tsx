"use client";

import * as React from "react";
import { readUserContext } from "@/lib/storage/user-context";
import { readLastQuestion } from "@/lib/storage/last-question";

// First-time hero lede ("どの試験を受けますか?"). Returning users instead get
// the prominent "続きから" hero (HomeReturningHeader), so this retracts for
// them. SSR and the first client render always emit this lede — keeping the
// h1 in the static HTML for crawlers — and it only hides after hydration once
// a returning visitor is detected, so layout shift stays minimal. Read-only:
// HomeReturningHeader owns recording the visit, so there is no double count.
export function HomeHeroLede({ totalQuestions }: { totalQuestions: number }) {
  const [mounted, setMounted] = React.useState(false);
  const [returning, setReturning] = React.useState(false);

  React.useEffect(() => {
    const prior = readUserContext();
    const last = readLastQuestion();
    setReturning(prior.visitCount >= 1 && last !== null);
    setMounted(true);
  }, []);

  if (mounted && returning) return null;

  return (
    <>
      <h1
        id="exam-picker-heading"
        className="mb-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
      >
        どの試験を受けますか?
      </h1>
      <ul
        aria-label="サービスの特徴"
        className="mb-3 flex flex-wrap gap-x-3 gap-y-1.5 text-xs sm:text-sm"
      >
        <li className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
          <span aria-hidden="true">✓</span>無料枠と月額プラン
        </li>
        <li className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
          <span aria-hidden="true">✓</span>閲覧は会員登録不要
        </li>
        <li className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
          <span aria-hidden="true">✓</span>13区分 {totalQuestions.toLocaleString("ja-JP")}問
        </li>
      </ul>
      <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        IPA試験対策の個別問題・原紙・保存済み履歴の閲覧と復習は無料です。ログイン後の連続演習には1日10問の無料枠と月額980円（税込・毎月自動更新）のプランがあります。
      </p>
    </>
  );
}
