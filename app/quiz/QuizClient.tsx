"use client";
import { deriveSessionPool } from "@/lib/questions/session-pool";

import * as React from "react";
import type { Question, QuizMode } from "@/lib/questions/types";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { startSession } from "@/lib/motivation/session";
import { PracticeDailyLimit, PracticeLoading } from "@/components/quiz/PracticeTransition";
import Link from "next/link";
import { fetchPracticeQuestion, PracticeRequestError } from "@/lib/billing/guest-client";
import type { PracticeAccess } from "@/lib/billing/practice-contract";
import { posthogCapture } from "@/lib/posthog";
import { nativeClient } from "@/mobile/shared/contracts";
import { jstResetLabel } from "@/lib/billing/reset-time";
import {shuffleChoices} from "@/lib/questions/filter";

const MAX_POOL = 80;
import { getMockExamHistory } from "@/lib/mock-exam/storage";

async function fetchQuestion(id: string, shuffle: boolean, start: boolean, signal: AbortSignal): Promise<{ question: Question; access: PracticeAccess | null }> {
  if (start) {
    return fetchPracticeQuestion(id, shuffle, signal);
  }
  if(nativeClient()) {
    try {
      const cached=await (await import("@/mobile/src/downloads")).downloads.findQuestion(id);
      if(cached)return {question:shuffle?shuffleChoices(cached):cached,access:null};
    }catch{/* Expired or unavailable downloads use the online path. */}
  }
  const qs = new URLSearchParams({ id });
  if (shuffle) qs.set("shuffle", "1");
  const res = await fetch(`/api/questions/next?${qs.toString()}`, { signal });
  if (!res.ok) throw new Error(`fetch question failed: ${res.status}`);
  return { question: (await res.json()) as Question, access: null };
}

/**
 * Whether the next question may be shown from the prefetch while its grant is
 * confirmed in the background. Only when the last grant proves the next one
 * will be allowed (paid/unlimited, or free questions left), so a free user at
 * the limit still never sees the eleventh question.
 */
export function canShowBeforeGrant(access: PracticeAccess | null): boolean {
  if (!access) return false;
  if (access.kind === "pass" || access.kind === "free") return true;
  return access.kind !== "unavailable" && access.kind !== "sample" && access.remaining !== null && access.remaining > 0;
}

function resetLabel(access: PracticeAccess | null) {
  if (!access) return null;
  // The quota policy is "next 00:00 JST"; never display another time of day.
  return jstResetLabel(access.resetAt);
}

export function QuizClient({
  poolIds,
  mode,
  backHref,
  backLabel,
  exam = "ap",
  completionLabel,
  completionShareHref,
  categoryById,
  wrongOnly = false,
  mockResultId,
  initialQuestionId,
  billingGateEnabled = false,
}: {
  poolIds: string[];
  mode: QuizMode;
  backHref: string;
  backLabel?: string;
  exam?: string;
  completionLabel?: string;
  completionShareHref?: string;
  categoryById?: Record<string, string>;
  wrongOnly?: boolean;
  mockResultId?: string;
  initialQuestionId?: string;
  billingGateEnabled?: boolean;
}) {
  const [sessionIds, setSessionIds] = React.useState<string[] | null>(null);
  const [index, setIndex] = React.useState(0);
  const [current, setCurrent] = React.useState<Question | null>(null);
  const [loadError, setLoadError] = React.useState(false);
  const [accessError, setAccessError] = React.useState<string | null>(null);
  const [access, setAccess] = React.useState<PracticeAccess | null>(null);
  const [invalidQuestionId, setInvalidQuestionId] = React.useState(false);
  const [retryCount, setRetryCount] = React.useState(0);
  React.useEffect(() => {
    // The limit screen unmounts QuizPlayer and its native gate. Recheck the
    // same question on the server when purchase/restore changes membership.
    if (accessError !== "daily_limit") return;
    const recheck = () => setRetryCount(n => n + 1);
    window.addEventListener("mobile:entitlement-changed", recheck);
    return () => window.removeEventListener("mobile:entitlement-changed", recheck);
  }, [accessError]);
  const [related, setRelated] = React.useState<{ id: string; questions: Question[] } | null>(null);
  const transitionHost = React.useRef<HTMLDivElement>(null);
  const navigating = React.useRef(false);
  const reportedLimits = React.useRef(new Set<string>());
  React.useEffect(() => {
    // Count a successful final free grant or confirmed denial, never AI/rate errors.
    if (!access || !["guest", "trial"].includes(access.kind) ||
        (access.remaining !== 0 && accessError !== "daily_limit")) return;
    if (accessError && accessError !== "daily_limit") return;
    const key = access.resetAt;
    if (reportedLimits.current.has(key)) return;
    reportedLimits.current.add(key);
    posthogCapture("practice_free_limit_reached", { exam, free_daily: access.freeDaily,
      reset_at: access.resetAt, reason: accessError === "daily_limit" ? "denied" : "last_free_question" });
  }, [access, accessError, exam]);
  // Layout timing prevents a paint at the old footer after the question collapses.
  React.useLayoutEffect(() => {
    if (!navigating.current) return;
    transitionHost.current?.focus({ preventScroll: true });
    transitionHost.current?.scrollIntoView({ block: "start", behavior: "instant" });
    if (current || loadError) navigating.current = false;
  }, [index, current, loadError]);
  const cache = React.useRef<Map<string, Question>>(new Map());
  // Set from each confirmed grant: may the next question appear before its own grant returns?
  const showBeforeGrant = React.useRef(false);
  const initializedPool = React.useRef<string | null>(null);

  // Optional content is fetched while the learner reads the current question.
  // Activation still uses the ordinary practice access check below.
  React.useEffect(() => {
    if (!current || nativeClient()) return;
    const controller = new AbortController();
    const id = current.id;
    const eligible = sessionIds?.slice(index + 1) ?? [];
    void fetch("/api/questions/related", { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ids: eligible }), signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("related-unavailable");
        const data = await response.json() as { questions: Question[] };
        if (controller.signal.aborted) return;
        const available = new Set(eligible);
        const questions = data.questions.filter((q) => available.has(q.id));
        for (const question of questions) {
          if (!cache.current.has(question.id)) cache.current.set(question.id, mode === "random" ? shuffleChoices(question) : question);
        }
        setRelated({ id, questions });
      }).catch(() => {
        if (!controller.signal.aborted) setRelated({ id, questions: [] });
      });
    return () => controller.abort();
  }, [current, mode, sessionIds, index]);

  // Derive session pool once on mount (needs localStorage for history modes).
  React.useEffect(() => {

    const url = new URL(window.location.href);
    const signature = JSON.stringify([mode, wrongOnly, poolIds, initialQuestionId, mockResultId]);
    if (initializedPool.current === signature) return;
    initializedPool.current = signature;
    const currentId = initialQuestionId ?? url.searchParams.get("question");
    if (currentId && !poolIds.includes(currentId)) {
      setInvalidQuestionId(true);
      setSessionIds([]);
      setCurrent(null);
      return;
    }
    setInvalidQuestionId(false);
    url.searchParams.delete("question");
    const sessionKey = `ipa-quiz:active-pool:v1:${url.pathname}${url.search}`;
    let ids = mockResultId
      ? (getMockExamHistory().find((result) => result.id === mockResultId)?.wrongQuestionIds ?? [])
        .filter((id) => poolIds.includes(id))
      : deriveSessionPool(poolIds, mode, categoryById, wrongOnly);
    if (mockResultId && currentId && !ids.includes(currentId)) {
      setInvalidQuestionId(true);
      setSessionIds([]);
      setCurrent(null);
      return;
    }
    const sessionLimit = mode === "year" ? poolIds.length : MAX_POOL;
    try {
      const saved: unknown = JSON.parse(window.sessionStorage.getItem(sessionKey) ?? "null");
      const relatedOrder = window.sessionStorage.getItem(`${sessionKey}:related-order`);
      const available = new Set(poolIds);
      if (currentId && Array.isArray(saved) && saved.length > 0 && saved.length <= sessionLimit &&
          saved.every((id) => typeof id === "string" && available.has(id)) && new Set(saved).size === saved.length && saved.includes(currentId) &&
          // Ordinary annual sessions retain source order. An explicit related
          // selection may reorder the same complete set, and is marked separately.
          (mode !== "year" || (saved.length === ids.length && ids.every((id) => saved.includes(id)) &&
            (saved.every((id, i) => id === ids[i]) || relatedOrder === JSON.stringify(saved))))) {
        ids = saved as string[];
      } else if (currentId && poolIds.includes(currentId) && !ids.includes(currentId)) {
        ids = [currentId, ...ids].slice(0, sessionLimit);
      }
      window.sessionStorage.setItem(sessionKey, JSON.stringify(ids));
    } catch { /* Unavailable storage still allows an exact question URL. */ }
    if (currentId && poolIds.includes(currentId) && !ids.includes(currentId)) {
      ids = [currentId, ...ids].slice(0, sessionLimit);
    }
    const startIndex = currentId ? Math.max(0, ids.indexOf(currentId)) : 0;
    setSessionIds(ids);
    setIndex(startIndex);
    setLoadError(false);
    cache.current.clear();
    startSession(mode);
  }, [poolIds, mode, categoryById, wrongOnly, initialQuestionId, mockResultId]);

  React.useEffect(() => {
    if (!sessionIds?.length) return;
    const url = new URL(window.location.href);
    url.searchParams.delete("question");
    try {
      window.sessionStorage.setItem(`ipa-quiz:active-pool:v1:${url.pathname}${url.search}`, JSON.stringify(sessionIds));
    } catch { /* Practice remains usable without session storage. */ }
  }, [sessionIds]);

  // Load current + prefetch next whenever index advances.
  React.useEffect(() => {
    if (!sessionIds || sessionIds.length === 0) return;
    const currentId = sessionIds[index];
    if (!currentId) return;
    const url = new URL(window.location.href);
    url.searchParams.set("question", currentId);
    window.history.replaceState(null, "", url);

    let cancelled = false;
    const controller = new AbortController();
    const shuffle = mode === "random";

    const loadInto = async (id: string, setActive: boolean) => {
      // Gate off keeps the existing GET/cache path independent of the billing API.
      // Gate on rechecks active questions, since prefetched content is not entitlement.
      const requiresGrant = nativeClient() || billingGateEnabled && mode !== "review";
      if ((!setActive || !requiresGrant) && cache.current.has(id)) {
        if (setActive && !cancelled) setCurrent(cache.current.get(id)!);
        return;
      }
      try {
        const result = await fetchQuestion(id, shuffle, setActive && requiresGrant, controller.signal);
        if (cancelled) return;
        if (setActive && result.access?.feedbackBonus?.newlyUsed) posthogCapture("practice_feedback_bonus_used", { remaining: result.access.feedbackBonus.remaining });
        cache.current.set(id, result.question);
        if (setActive) {
          showBeforeGrant.current = canShowBeforeGrant(result.access);
          // Keep a question already on screen (shown from the prefetch): swapping
          // in the server copy would reshuffle the choices under the user's finger.
          setCurrent((shown) => shown?.id === result.question.id ? shown : result.question);
          setAccess(result.access); setLoadError(false); setAccessError(null);
        }
      } catch (error) {
        if (setActive && !cancelled) {
          showBeforeGrant.current = false;
          setCurrent(null);
          setLoadError(true);
          setAccess(error instanceof PracticeRequestError ? error.access : null);
          setAccessError(error instanceof Error ? error.message : null);
        }
      }
    };

    setCurrent((shown) => shown?.id === currentId ? shown : null);
    setAccess(null);
    setLoadError(false);
    void loadInto(currentId, true);
    const nextId = sessionIds[index + 1];
    if (nextId) void loadInto(nextId, false);

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [sessionIds, index, mode, retryCount, billingGateEnabled]);

  const handleNext = React.useCallback(() => {
    if (navigating.current) return;
    navigating.current = true;
    transitionHost.current?.scrollIntoView({ block: "start", behavior: "instant" });
    const nextId = sessionIds?.[index + 1];
    const gated = nativeClient() || billingGateEnabled && mode !== "review";
    // Gated sessions used to blank the screen ("次の問題を読み込んでいます") for every
    // question while the grant round-trip ran. When the last grant proves the
    // next one is allowed, show the prefetched question at once.
    setCurrent(!gated || showBeforeGrant.current ? cache.current.get(nextId ?? "") ?? null : null);
    setAccess(null);
    setLoadError(false);
    setIndex((i) => i + 1);
  }, [sessionIds, index, billingGateEnabled, mode]);

  const handleRelated = (question: Question) => {
    if (navigating.current || !sessionIds || !current || related?.id !== current.id ||
        !related.questions.some((item) => item.id === question.id)) return;
    navigating.current = true;
    const nextIds = [...sessionIds.slice(0, index + 1), question.id,
      ...sessionIds.slice(index + 1).filter((id) => id !== question.id)];
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("question");
      window.sessionStorage.setItem(`ipa-quiz:active-pool:v1:${url.pathname}${url.search}:related-order`, JSON.stringify(nextIds));
    } catch { /* Continue in place when session storage is unavailable. */ }
    setSessionIds(nextIds);
    setCurrent(!(nativeClient() || billingGateEnabled && mode !== "review") ? cache.current.get(question.id) ?? null : null);
    setAccess(null);
    setLoadError(false);
    setIndex(index + 1);
  };

  if (!sessionIds) {
    return (
      <PracticeLoading />
    );
  }

  if (invalidQuestionId) {
    return (
      <div role="alert" className="mx-auto max-w-xl space-y-4 px-4 py-10 text-center">
        <p className="font-semibold">指定した問題はこの問題一覧にありません。</p>
        <Link href={backHref} className="inline-flex min-h-11 items-center rounded-xl border border-border px-5 py-2 font-semibold">
          問題一覧へ戻る
        </Link>
      </div>
    );
  }

  if (loadError) {
    const reset = resetLabel(access);
    const loginHref = `/auth/signin?callbackUrl=${encodeURIComponent(window.location.pathname + window.location.search)}`;
    if (accessError === "daily_limit") {
      return <div ref={transitionHost} tabIndex={-1} aria-label="本日の無料演習の終了" className="min-h-[100dvh] scroll-mt-24 outline-none">
        <PracticeDailyLimit reset={reset} resumeHref={window.location.pathname + window.location.search} backHref={backHref} freeDaily={access?.freeDaily} onUnlocked={() => setRetryCount(n => n + 1)} />
      </div>;
    }
    const message = accessError === "daily_limit"
      ? `本日の無料連続演習枠を使い切りました。${reset ? `${reset}に再開できます。` : "次の無料枠更新後に再開できます。"}`
      : accessError === "sign_in_required"
        ? "この端末の本日の演習枠はアカウントへの引継ぎが開始されています。続きは同じアカウントでログインして再試行してください。"
        : accessError === "guest_cookie_required"
          ? "このブラウザーでCookieを保存できませんでした。Cookieの設定をご確認ください。公開問題や無料復習もご利用いただけます。"
          : accessError === "guest_rate_limited"
            ? `短時間の操作が続いています。${access?.retryAfter != null ? `${access.retryAfter}秒ほど待ってから` : "少し待ってから"}もう一度お試しください。`
            : "問題を読み込めませんでした。少し待ってからもう一度お試しください。";
    return <div ref={transitionHost} tabIndex={-1} role="alert" className="mx-auto min-h-[100dvh] max-w-xl scroll-mt-24 space-y-4 px-4 py-10 text-center outline-none">
      <p className="font-semibold">{message}</p>
      <p>この端末に保存した学習記録は削除されません。履歴の同期などは無料ログインで利用できます。</p>
      {accessError === "daily_limit" ? <p>ログインだけで本日の無料枠が追加されることはありません。</p> : null}
      <nav aria-label="無料で続ける・保存と利用条件" className="flex flex-wrap justify-center gap-3">
        <Link href="/review" className="underline">保存済みの履歴・無料復習</Link>
        <Link className="underline" href={loginHref}>この問題から再開するためにログイン</Link>
        <Link href="/billing" className="underline">無料試用・料金と利用条件</Link>
      </nav>
      <div className="flex flex-wrap justify-center gap-3">
        {accessError !== "daily_limit" ? <button type="button" onClick={() => setRetryCount((count) => count + 1)} className="min-h-11 rounded-xl bg-primary px-5 py-2 font-semibold text-primary-foreground">再読み込み</button> : null}
        <Link href={backHref} className="inline-flex min-h-11 items-center rounded-xl border border-border px-5 py-2 font-semibold">科目選択へ戻る</Link>
      </div>
    </div>;
  }

  return (
    <div ref={transitionHost} tabIndex={-1} aria-label={`${index + 1}問目 / ${sessionIds.length}問`} className="min-h-[100dvh] scroll-mt-24 outline-none">
      {access?.feedbackBonus && <p role="status" className="mx-auto max-w-4xl px-4 py-3 text-sm">意見による追加10問を利用中です。追加枠は残り{access.feedbackBonus.remaining}問です。</p>}
      <QuizPlayer
      quiet
      question={current}
      index={index}
      total={sessionIds.length}
      mode={mode}
      backHref={backHref}
      backLabel={backLabel}
      exam={exam}
      completionLabel={completionLabel}
      completionShareHref={completionShareHref}
      onNext={handleNext}
      relatedQuestions={related?.id === current?.id ? related?.questions : undefined}
      onRelated={handleRelated}
      />
    </div>
  );
}
