"use client";

import * as React from "react";
import type { Question, QuizMode } from "@/lib/questions/types";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { createHistoryStore } from "@/lib/storage/history";
import { startSession } from "@/lib/motivation/session";
import { orderByPriority } from "@/lib/learning/spaced-repetition";
import { aggregateByCategory } from "@/lib/learning/analytics";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { fetchPracticeQuestion, PracticeRequestError } from "@/lib/billing/guest-client";
import type { PracticeAccess } from "@/lib/billing/practice-contract";

const MAX_POOL = 80;
const WEAKNESS_THRESHOLD = 0.6;
const WEAKNESS_MIN_ATTEMPTS = 3;

function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function selectWeakCategories(
  categoryById: Record<string, string>,
): Set<string> | null {
  const history = createHistoryStore();
  const lookup = new Map<string, { category: string }>();
  for (const [id, category] of Object.entries(categoryById)) {
    lookup.set(id, { category });
  }
  const stats = aggregateByCategory(history.getAllEntries(), lookup);
  const weak = stats
    .filter((s) => s.attempts >= WEAKNESS_MIN_ATTEMPTS && s.accuracy < WEAKNESS_THRESHOLD)
    .map((s) => s.category);
  if (weak.length === 0) return null;
  return new Set(weak);
}

function deriveSessionPool(
  poolIds: string[],
  mode: QuizMode,
  categoryById?: Record<string, string>,
  wrongOnly = false,
): string[] {
  let ids = [...poolIds];
  if (mode === "review" || mode === "unanswered") {
    const history = createHistoryStore();
    if (mode === "review") {
      const wrong = new Set(history.getWrongIds());
      const starred = new Set(wrongOnly ? [] : history.getStarredIds());
      ids = ids.filter((id) => wrong.has(id) || starred.has(id));
    } else {
      const answered = new Set(history.getAnsweredIds());
      ids = ids.filter((id) => !answered.has(id));
    }
  }
  if (mode === "weakness" && categoryById) {
    const weakSet = selectWeakCategories(categoryById);
    if (weakSet) {
      ids = ids.filter((id) => {
        const cat = categoryById[id];
        return cat ? weakSet.has(cat) : false;
      });
    }
    // fallback: no weak categories detected → no filter, use random shuffle
  }
  if (mode === "review") {
    ids = orderByPriority(ids);
  } else if (mode === "random" || mode === "unanswered" || mode === "weakness") {
    shuffleInPlace(ids);
  }
  // An annual sitting must include every available original in source order.
  return mode === "year" ? ids : ids.slice(0, MAX_POOL);
}

async function fetchQuestion(id: string, shuffle: boolean, start: boolean, signal: AbortSignal): Promise<{ question: Question; access: PracticeAccess | null }> {
  if (start) {
    return fetchPracticeQuestion(id, shuffle, signal);
  }
  const qs = new URLSearchParams({ id });
  if (shuffle) qs.set("shuffle", "1");
  const res = await fetch(`/api/questions/next?${qs.toString()}`, { signal });
  if (!res.ok) throw new Error(`fetch question failed: ${res.status}`);
  return { question: (await res.json()) as Question, access: null };
}

function resetLabel(access: PracticeAccess | null) {
  if (!access) return null;
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo", month: "numeric", day: "numeric", hour: "numeric", minute: "2-digit", hourCycle: "h23",
  }).format(new Date(access.resetAt)) + "（日本時間）";
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
  const cache = React.useRef<Map<string, Question>>(new Map());
  const initializedPool = React.useRef<string | null>(null);

  // Derive session pool once on mount (needs localStorage for history modes).
  React.useEffect(() => {
     
    const url = new URL(window.location.href);
    const signature = JSON.stringify([mode, wrongOnly, poolIds, initialQuestionId]);
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
    let ids = deriveSessionPool(poolIds, mode, categoryById, wrongOnly);
    const sessionLimit = mode === "year" ? poolIds.length : MAX_POOL;
    try {
      const saved: unknown = JSON.parse(window.sessionStorage.getItem(sessionKey) ?? "null");
      const available = new Set(poolIds);
      if (currentId && Array.isArray(saved) && saved.length > 0 && saved.length <= sessionLimit &&
          saved.every((id) => typeof id === "string" && available.has(id)) && saved.includes(currentId) &&
          // Annual pools always follow the latest complete source order, including new additions.
          (mode !== "year" || (saved.length === ids.length && saved.every((id, i) => id === ids[i])))) {
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
  }, [poolIds, mode, categoryById, wrongOnly, initialQuestionId]);

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
      const requiresGrant = billingGateEnabled && mode !== "review";
      if ((!setActive || !requiresGrant) && cache.current.has(id)) {
        if (setActive && !cancelled) setCurrent(cache.current.get(id)!);
        return;
      }
      try {
        const result = await fetchQuestion(id, shuffle, setActive && requiresGrant, controller.signal);
        if (cancelled) return;
        cache.current.set(id, result.question);
        if (setActive) { setCurrent(result.question); setAccess(result.access); setLoadError(false); setAccessError(null); }
      } catch (error) {
        if (setActive && !cancelled) {
          setLoadError(true);
          setAccess(error instanceof PracticeRequestError ? error.access : null);
          setAccessError(error instanceof Error ? error.message : null);
        }
      }
    };

    setCurrent(null);
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
    setIndex((i) => i + 1);
  }, []);

  if (!sessionIds) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <Loader2 className="h-5 w-5 animate-spin text-sky-500" />
      </div>
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
    const message = accessError === "daily_limit"
      ? `本日の無料連続演習枠を使い切りました。${reset ? `${reset}に再開できます。` : "次の無料枠更新後に再開できます。"}`
      : accessError === "sign_in_required"
        ? "この端末の本日の演習枠はアカウントへの引継ぎが開始されています。続きは同じアカウントでログインして再試行してください。"
        : accessError === "guest_cookie_required"
          ? "このブラウザーでCookieを保存できませんでした。Cookieの設定をご確認ください。公開問題や無料復習もご利用いただけます。"
          : accessError === "guest_rate_limited"
            ? `短時間の操作が続いています。${access?.retryAfter != null ? `${access.retryAfter}秒ほど待ってから` : "少し待ってから"}もう一度お試しください。`
            : "問題を読み込めませんでした。少し待ってからもう一度お試しください。";
    return <div role="alert" className="mx-auto max-w-xl space-y-4 px-4 py-10 text-center">
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
    <>
      {access?.kind === "guest" ? (
        <aside aria-label="ログインなしの無料演習枠" className="mx-auto w-full max-w-4xl space-y-1 border-b border-border px-4 py-3 text-sm">
          <p role="status">ログインなしで無料の連続演習を利用中です。{access.remaining != null ? `今日あと${access.remaining}問（1日${access.freeDaily}問）。` : "残りの演習枠を確認できません。"}次の更新：{resetLabel(access)}</p>
          <p>学習履歴は設定に応じてこの端末に保存されます。<Link href={`/auth/signin?callbackUrl=${encodeURIComponent(window.location.pathname + window.location.search)}`} className="underline">履歴の同期などは無料ログイン</Link>で利用できます。</p>
          <p>この演習枠はAIへの質問回数とは別です。</p>
        </aside>
      ) : null}
      <QuizPlayer
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
      />
    </>
  );
}
