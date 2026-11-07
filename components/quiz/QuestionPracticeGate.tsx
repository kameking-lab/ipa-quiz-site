"use client";
import { useEffect, useState, type ReactNode } from "react";
import { fetchPracticeQuestion, PracticeRequestError } from "@/lib/billing/guest-client";
import { PAYWALLED_CLASS, PAYWALLED_SELECTOR } from "@/lib/billing/paywall";
import { PracticeDailyLimit } from "./PracticeTransition";

/** Search and preview crawlers read the full page (declared as paywalled content in JSON-LD). */
export const CRAWLER_UA = /bot|crawler|spider|slurp|crawl|bingpreview|mediapartners|google-inspectiontool|googleother|lighthouse|facebookexternalhit|embedly|preview/i;

// For pages whose own structured data does not describe the quota-limited part.
const PAGE_PAYWALL_JSON_LD = JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", isAccessibleForFree: false,
  hasPart: { "@type": "WebPageElement", isAccessibleForFree: false, cssSelector: PAYWALLED_SELECTOR } });

/**
 * Counts an individual question page toward the shared daily free 10 (same
 * endpoint, cookie and JST reset as the continuous quiz; a revisit of the same
 * question that day is free). The page is server-rendered in full; for a person
 * past the quota the question part is replaced by the limit screen. Any other
 * outcome (free gate off, paid, bonus, not a quota question, network error)
 * leaves the page as it is.
 */
export function QuestionPracticeGate({ id, enabled, paper, declarePaywall = false, children }: { id: string; enabled: boolean; paper?: string; declarePaywall?: boolean; children: ReactNode }) {
  const [limited, setLimited] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [resumeHref, setResumeHref] = useState("/");
  useEffect(() => {
    if (!enabled || CRAWLER_UA.test(navigator.userAgent)) return;
    setResumeHref(window.location.pathname + window.location.search);
    const controller = new AbortController();
    fetchPracticeQuestion(id, false, controller.signal, paper)
      .then(() => setLimited(false))
      .catch((error: unknown) => {
        if (!controller.signal.aborted) setLimited(error instanceof PracticeRequestError && error.code === "daily_limit");
      });
    return () => controller.abort();
  }, [id, enabled, paper, attempt]);
  return <>
    {declarePaywall && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: PAGE_PAYWALL_JSON_LD }} />}
    <div className={PAYWALLED_CLASS} hidden={limited}>{children}</div>
    {limited && <div role="region" aria-label="本日の無料演習の終了"><PracticeDailyLimit resumeHref={resumeHref} onUnlocked={() => setAttempt(n => n + 1)} /></div>}
  </>;
}
