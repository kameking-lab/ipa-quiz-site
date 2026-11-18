"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { planStartHref, saveQuizReturn } from "@/lib/billing/quiz-return";
import { posthogCapture } from "@/lib/posthog";
import { flushJourney, observeJourney } from "@/lib/billing/journey-client";
import { PURCHASE_MESSAGES, purchaseNeedsSignIn } from "@/lib/billing/purchase-messages";
import { Button } from "@/components/ui/button";

const MESSAGES: Record<string, string> = {
  ...PURCHASE_MESSAGES,
  sign_in_required: "ログインが切れました。もう一度お試しください。",
  subscription_exists: "契約済みか、支払確認中の申込があります。",
  app_store_subscription_exists: "App Storeで契約済みです。追加購入は不要です。",
  terms_changed: "条件が更新されました。もう一度お試しください。",
};

/** Opens Stripe Checkout immediately; the tap on the plan button was the consent. */
export function AutoCheckout({ terms, returnTo, fallback, testMode = false }: { terms: string; returnTo: string | null; fallback: string; testMode?: boolean }) {
  const started = useRef(false);
  const [error, setError] = useState<{ message: string; signIn?: boolean } | null>(null);
  const self = planStartHref(returnTo ?? "");
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    void (async () => {
      try {
        const response = await fetch("/api/billing/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ terms }) });
        const value: unknown = await response.json().catch(() => ({}));
        const body = value && typeof value === "object" ? value as { url?: unknown; orderId?: unknown; error?: unknown } : {};
        if (!response.ok || typeof body.url !== "string") {
          const code = typeof body.error === "string" ? body.error : "";
          setError({ message: MESSAGES[code] ?? "決済画面を開けませんでした。", signIn: purchaseNeedsSignIn(code) });
          return;
        }
        posthogCapture("checkout_started", { plan: "monthly", test_mode: testMode, source: "plan_button" });
        observeJourney({ stage: "checkout" });
        flushJourney();
        try {
          if (returnTo) {
            saveQuizReturn(window.sessionStorage, returnTo);
            if (typeof body.orderId === "string") saveQuizReturn(window.sessionStorage, returnTo, Date.now(), body.orderId);
          }
        } catch { /* Returning to the question is a convenience; payment does not depend on it. */ }
        location.replace(body.url);
      } catch {
        setError({ message: "決済画面を開けませんでした。" });
      }
    })();
  }, [terms, returnTo, testMode]);
  return <div className="mx-auto max-w-md space-y-4 py-10 text-center" aria-live="polite">
    <h1 className="sr-only">決済へ移動</h1>
    {error ? <>
      <p role="alert" className="font-semibold">{error.message}</p>
      {error.signIn ? (
        <Button asChild size="lg"><Link href={`/auth/signin?switchAccount=1&callbackUrl=${encodeURIComponent(self)}`}>ログインし直す</Link></Button>
      ) : (
        <Link href={fallback} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border px-5 font-semibold">料金・契約の画面へ</Link>
      )}
    </> : <p role="status">決済画面へ移動しています…</p>}
  </div>;
}
