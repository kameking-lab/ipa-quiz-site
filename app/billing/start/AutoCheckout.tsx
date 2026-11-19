"use client";
import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { planStartHref, saveQuizReturn, studyCheckoutHeading } from "@/lib/billing/quiz-return";
import { posthogCapture } from "@/lib/posthog";
import { flushJourney, observeJourney } from "@/lib/billing/journey-client";
import { PURCHASE_MESSAGES, purchaseNeedsSignIn } from "@/lib/billing/purchase-messages";
import { Button } from "@/components/ui/button";
import { MonthlyConditions, MonthlyPrice } from "@/components/billing/MonthlyOffer";
import { ExamEndFields, type ExamEndSelection } from "@/components/billing/ExamEndFields";
import { PLAN_OFFER } from "@/lib/billing/plan-offer";
import { dayNumber } from "@/lib/study-plan/pace";
import { examDateLabel } from "@/lib/billing/exam-end";

const MESSAGES: Record<string, string> = {
  ...PURCHASE_MESSAGES,
  sign_in_required: "ログインが切れました。もう一度お試しください。",
  subscription_exists: "契約済みか、支払確認中の申込があります。",
  app_store_subscription_exists: "App Storeで契約済みです。追加購入は不要です。",
  terms_changed: "条件が更新されました。もう一度お試しください。",
  invalid_exam_date: "受験日を選び直してください。",
  exam_writeoff_pending: "前回の最終請求を確認しています。",
  customer_balance_due: "前回のお支払いを確認しています。",
};

export function AutoCheckout({ terms, returnTo, fallback, today, firstExamDate = today, exam, trialDays = PLAN_OFFER.trialDays, testMode = false }: {
  terms: string; returnTo: string | null; fallback: string; today: string; firstExamDate?: string; exam?: string; trialDays?: number; testMode?: boolean;
}) {
  const started = useRef(false);
  const [pending, setPending] = useState(false);
  const [selection, setSelection] = useState<ExamEndSelection>({ date: null, exam: null, loading: true, automatic: true });
  const [earliestDate, setEarliestDate] = useState(firstExamDate);
  const [error, setError] = useState<{ message: string; signIn?: boolean } | null>(null);
  const self = planStartHref(returnTo ?? "");
  const heading = studyCheckoutHeading(returnTo) ?? "月額プランのお申し込み";
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (started.current || selection.loading || selection.automatic && !selection.date) return;
    const examDate = selection.date;
    started.current = true;
    setPending(true);
    setError(null);
    let navigating = false;
    try {
      const response = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ terms, examDate, ...(examDate && selection.exam ? { exam: selection.exam } : {}), ...(returnTo ? { returnTo } : {}) }),
      });
      const value: unknown = await response.json().catch(() => ({}));
      const body = value && typeof value === "object" ? value as { url?: unknown; orderId?: unknown; error?: unknown; recovered?: unknown; firstExamDate?: unknown } : {};
      if (!response.ok || typeof body.url !== "string") {
        const code = typeof body.error === "string" ? body.error : "";
        if (code === "invalid_exam_date" && typeof body.firstExamDate === "string" && dayNumber(body.firstExamDate) !== null
          && examDate && examDate < body.firstExamDate) {
          setEarliestDate(body.firstExamDate);
          setError({ message: `${examDateLabel(examDate)}を受験日とする申込受付は終了しました。受験日を選び直してください。` });
          return;
        }
        setError({ message: MESSAGES[code] ?? "決済画面を開けませんでした。", signIn: purchaseNeedsSignIn(code) });
        return;
      }
      if (body.recovered === true) {
        location.replace(body.url);
        navigating = true;
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
      navigating = true;
    } catch {
      setError({ message: "決済画面を開けませんでした。" });
    } finally {
      if (!navigating) { started.current = false; setPending(false); }
    }
  }
  const examDay = selection.date ? dayNumber(selection.date) : null;
  const endsDuringTrial = examDay !== null && examDay - (dayNumber(today) ?? examDay) < trialDays;
  return <form onSubmit={submit} className="mx-auto w-full max-w-md space-y-5 py-5 sm:py-10">
    <div className="space-y-2"><h1 className="text-xl font-bold">{heading}</h1><MonthlyPrice /></div>
    <ExamEndFields key={`${exam ?? ""}:${earliestDate}`} today={earliestDate} examHint={exam} disabled={pending} onSelection={setSelection} />
    {error && <p role="alert" className="text-sm font-semibold text-destructive">{error.message}</p>}
    {error?.signIn
      ? <Button asChild className="min-h-12 w-full"><Link href={`/auth/signin?switchAccount=1&callbackUrl=${encodeURIComponent(self)}`}>ログインし直す</Link></Button>
      : <Button type="submit" disabled={pending || selection.loading} className="min-h-12 w-full">{pending ? "決済画面へ移動しています…" : selection.loading ? "確認中…" : "決済へ進む"}</Button>}
    <MonthlyConditions signup={{ date: selection.date, trialDays, endsDuringTrial, automatic: selection.automatic }} />
    {error && !error.signIn && <Link href={fallback} className="text-sm underline">料金・契約の画面へ</Link>}
  </form>;
}
