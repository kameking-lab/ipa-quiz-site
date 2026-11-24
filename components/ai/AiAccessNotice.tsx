"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { MonthlyPlanLink, monthlyActionClass } from "@/components/billing/MonthlyOffer";
import { PLAN_OFFER } from "@/lib/billing/plan-offer";
import { captureActivity, flushActivity } from "@/lib/analytics/activity-client";
import { AI_FREE_QUESTIONS_PER_DAY } from "@/lib/constants/ai-quota";
import { AI_POLICY_VERSION, type AiFeature } from "@/lib/ai/access-policy";
import { fetchWithAiGuestCookie, saveAiCheckoutDraft } from "@/lib/ai/access-client";
import { MEMBERSHIP_CHECK_PENDING_MESSAGE } from "@/lib/billing/domain";

type Quota = { kind: "free"; remaining: number; resetAt: number } | { kind: "paid" | "membership_check_pending" };
const CHANNEL = "kakomon:ai-quota-changed";

export function useAiQuota(feature: AiFeature, active = true) {
  const [quota, setQuota] = useState<Quota | null>(null);
  const [denials, setDenials] = useState(0);
  const generation = useRef(0);
  const membershipVersion = useRef(0);
  const refresh = useCallback(async () => {
    if (!active) return;
    const attempt = ++generation.current;
    let value: Quota | null = null;
    try {
      const response = await fetchWithAiGuestCookie(`/api/ai/usage?feature=${feature}`, { cache: "no-store" });
      if (response.status === 503 && response.headers.get("X-Error-Type") === "ai_membership_check_pending") {
        value = { kind: "membership_check_pending" };
      } else if (response.ok) {
        const data = await response.json();
        if (data.kind === "paid") value = { kind: "paid" };
        if (data.kind === "free" && Number.isInteger(data.remaining) && data.remaining >= 0
          && data.remaining <= AI_FREE_QUESTIONS_PER_DAY && Number.isSafeInteger(data.resetAt) && data.resetAt > Date.now()) {
          value = data;
        }
      }
    } catch { /* The POST endpoint remains authoritative when status is unavailable. */ }
    if (attempt === generation.current) setQuota(value);
  }, [active, feature]);
  useEffect(() => {
    if (!active) return;
    const update = () => { void refresh(); };
    const membershipChanged = () => { membershipVersion.current += 1; update(); };
    void refresh();
    window.addEventListener("focus", update);
    window.addEventListener("pageshow", update);
    window.addEventListener("mobile:entitlement-changed", membershipChanged);
    window.addEventListener(CHANNEL, update);
    return () => {
      generation.current = generation.current + 1;
      window.removeEventListener("focus", update);
      window.removeEventListener("pageshow", update);
      membershipVersion.current += 1;
      window.removeEventListener("mobile:entitlement-changed", membershipChanged);
      window.removeEventListener(CHANNEL, update);
    };
  }, [active, refresh]);
  const resetAt = quota?.kind === "free" ? quota.resetAt : null;
  useEffect(() => {
    if (!active || resetAt === null) return;
    const timer = window.setTimeout(() => {
      setQuota(null);
      void refresh();
    }, Math.max(0, resetAt - Date.now()) + 50);
    return () => clearTimeout(timer);
  }, [active, refresh, resetAt]);
  const applyDenial = useCallback((version: number, response: Response, body: unknown) => {
    if (response.status === 503 && response.headers.get("X-Error-Type") === "ai_membership_check_pending") {
      if (version === membershipVersion.current) {
        generation.current++;
        setQuota({ kind: "membership_check_pending" });
      }
      return true;
    }
    if (response.status !== 429 || response.headers.get("X-AI-Policy-Version") !== AI_POLICY_VERSION
      || !body || typeof body !== "object" || !("error" in body) || body.error !== "ai_daily_quota_exhausted"
      || !("resetAt" in body) || typeof body.resetAt !== "number" || !Number.isSafeInteger(body.resetAt) || body.resetAt <= Date.now()) return false;
    // The purchase refresh owns the display when this answer predates the purchase.
    if (version !== membershipVersion.current) return true;
    generation.current++;
    setDenials(count => count + 1);
    setQuota({ kind: "free", remaining: 0, resetAt: body.resetAt });
    return true;
  }, []);
  const beginRequest = useCallback(() => applyDenial.bind(null, membershipVersion.current), [applyDenial]);
  return { quota: active ? quota : null, beginRequest, denials };
}

export function refreshAiQuota() {
  window.dispatchEvent(new Event(CHANNEL));
}

export function AiAccessNotice({ quota, draft, draftId, returnTo, denials, onDismiss }: {
  quota: Quota | null;
  draft: string;
  draftId: string;
  returnTo: string;
  denials: number;
  onDismiss?: () => void;
}) {
  const [dismissed, setDismissed] = useState<{ resetAt: number; denials: number } | null>(null);
  const seen = useRef<number | null>(null);
  const description = useId();
  const limit = AI_FREE_QUESTIONS_PER_DAY;
  const exhausted = quota?.kind === "free" && quota.remaining === 0;
  const resetAt = exhausted ? quota.resetAt : null;
  const shown = resetAt !== null && (dismissed?.resetAt !== resetAt || dismissed.denials !== denials);
  useEffect(() => {
    if (!shown || seen.current === resetAt) return;
    seen.current = resetAt;
    captureActivity("ai_quota_viewed");
  }, [resetAt, shown]);
  if (quota?.kind === "paid") return <p className="px-3 pb-1 text-xs text-muted-foreground">月額会員 · AI質問は回数制限なし</p>;
  if (quota?.kind === "membership_check_pending") return <p role="status" className="px-3 pb-1 text-xs text-muted-foreground">{MEMBERSHIP_CHECK_PENDING_MESSAGE}</p>;
  if (quota?.kind !== "free" || quota.remaining === limit) return null;
  if (!exhausted) return <p role="status" className="px-3 pb-1 text-xs text-muted-foreground">今日の無料AI あと{quota.remaining}回</p>;
  if (!shown) return null;
  const price = `月額${PLAN_OFFER.priceYen.toLocaleString("ja-JP")}円（税込）`;
  return <aside aria-label="今日の無料AI質問" className="mx-3 my-2 space-y-3 rounded-xl border border-border bg-muted/40 p-3">
    <div className="space-y-1">
      <p role="status" className="text-sm font-semibold">今日の無料のAI質問（{limit}回）はここまで</p>
      <p id={description} className="text-sm">{price}で回数制限なく質問でき、広告も出なくなります。</p>
    </div>
    <div className="grid auto-rows-fr gap-2">
      <MonthlyPlanLink returnTo={returnTo} label={`${price}で続ける`} describedBy={description} keepClickInApp onClick={() => {
        saveAiCheckoutDraft(draftId, draft);
        captureActivity("ai_quota_plan_clicked");
        flushActivity();
      }} />
      <button type="button" className={monthlyActionClass + " bg-card text-foreground shadow-[inset_0_0_0_1px_var(--border)] hover:bg-muted"} onClick={() => {
        captureActivity("ai_quota_dismissed");
        flushActivity();
        seen.current = null;
        setDismissed({ resetAt, denials });
        onDismiss?.();
      }}>今日はここまで</button>
    </div>
    <p className="text-xs text-muted-foreground">明日0時（日本時間）に{limit}回に戻ります</p>
  </aside>;
}
