"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { billingHref, readQuizReturn, safeQuizReturn, saveQuizReturn } from "@/lib/billing/quiz-return";

export function QuizResumeLinks({ order, showLogin = false }: { order?: string; showLogin?: boolean }) {
  const [href, setHref] = useState<string | null>(null);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  useEffect(() => {
    const explicit = order === undefined ? safeQuizReturn(new URL(window.location.href).searchParams.get("returnTo")) : null;
    try {
      const stored = readQuizReturn(window.sessionStorage, Date.now(), order);
      setHref(explicit ?? stored);
      if (explicit) setStorageUnavailable(!saveQuizReturn(window.sessionStorage, explicit));
    } catch { setHref(explicit); setStorageUnavailable(true); }
  }, [order]);
  const callback = order !== undefined
    ? `/billing/success?order=${encodeURIComponent(order)}`
    : href ? billingHref(href) : "/billing";
  return <aside aria-label="演習の続き" className="space-y-3 rounded-xl border border-border bg-muted/30 p-4">
    {href ? <><Link href={href} className="inline-flex min-h-11 items-center rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground">元の問題から再開する</Link>
      <p className="text-sm">元の年度・問題に戻ります。演習の利用条件は再開時に確認されます。戻るだけでは購入や追加の利用権は発生しません。</p>
      <p className="text-xs text-muted-foreground">戻り先はこのタブに最長48時間保持します。別の端末・タブでは引き継がれない場合があります。</p></> : <Link className="inline-flex min-h-11 items-center underline" href="/modes/year">年度を選んで学習へ戻る</Link>}
    {storageUnavailable && <p role="status" className="text-sm">このブラウザーでは戻り先を保存できません。決済画面へ進む前に、元の問題のリンクを控えてください。</p>}
    {showLogin && <Link className="inline-flex min-h-11 items-center underline" href={`/auth/signin?callbackUrl=${encodeURIComponent(callback)}`}>ログインして購入条件を確認する</Link>}
  </aside>;
}
