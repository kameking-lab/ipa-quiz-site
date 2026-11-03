"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { billingHref, readQuizReturn, safeQuizReturn, saveQuizReturn } from "@/lib/billing/quiz-return";

export function QuizResumeLinks({ order, showLogin = false, loginOnly = false, primary = false }: { order?: string; showLogin?: boolean; loginOnly?: boolean; primary?: boolean }) {
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
  const login = <Link className={loginOnly ? "inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground" : "inline-flex min-h-11 items-center underline"} href={"/auth/signin?callbackUrl=" + encodeURIComponent(callback)}>{loginOnly ? "ログインして購入へ進む" : "購入したアカウントでログイン"}</Link>;
  if (loginOnly) return login;
  return <aside aria-label="学習を再開" className="space-y-2">
    <Link href={href ?? "/modes/year"} className={primary ? "inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground" : "inline-flex min-h-11 items-center underline"}>{href ? "元の問題から再開する" : "年度を選んで学習へ"}</Link>
    {storageUnavailable && <p role="status" className="text-sm">戻り先を保存できません。決済前に元の問題のリンクを控えてください。</p>}
    {showLogin && login}
  </aside>;
}
