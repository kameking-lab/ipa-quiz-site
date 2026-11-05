"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { currentReferral, isTsuginoReferral } from "@/lib/analytics/referral";
import { LS_KEYS } from "@/lib/storage/keys";
import { posthogCapture } from "@/lib/posthog";

/** An inline invitation, never a modal or prerequisite for the first question. */
export function TsuginoWelcome({ href, qualification }: { href: string | null; qualification: string }) {
  const [visible, setVisible] = useState(false);
  const checked = useRef(false);
  useEffect(() => {
    if (checked.current) return;
    checked.current = true;
    const referral = currentReferral();
    if (!href || !isTsuginoReferral(referral) || !referral?.first_visit || referral.landing_path !== window.location.pathname) return;
    try {
      if (localStorage.getItem(LS_KEYS.referralWelcomeDismissed)) return;
    } catch { /* The invitation is optional. */ }
    setVisible(true);
  }, [href]);

  function rememberDismissal() {
    try { localStorage.setItem(LS_KEYS.referralWelcomeDismissed, "1"); } catch { /* optional */ }
  }

  if (!visible || !href) return null;
  return <aside aria-label="次の資格からお越しの方へ" className="my-5 space-y-3 rounded-2xl border border-primary/30 bg-primary/5 p-4 sm:p-5">
    <p className="text-xs font-semibold text-muted-foreground">次の資格からお越しの方へ · {qualification}</p>
    <p className="text-lg font-bold">この資格の過去問を1問目から無料で</p>
    <p className="text-sm">ログイン不要。まずは10問、無料で始められます。</p>
    <div className="flex flex-wrap items-center gap-3">
      <Button asChild><Link href={href} prefetch={false} onClick={() => {
        posthogCapture("referral_practice_clicked", { qualification });
        rememberDismissal();
      }}>1問目から無料で解く</Link></Button>
      <button type="button" onClick={() => { rememberDismissal(); setVisible(false); }} className="min-h-11 px-3 text-sm underline underline-offset-4">案内を閉じる</button>
    </div>
  </aside>;
}
