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
import { readSettings } from "@/lib/storage/settings";
import { clearQuizResume, readQuizResume, writeQuizResume, type QuizResumeState } from "@/lib/storage/quiz-resume";

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
  calculationIds?: string[],
  randomSettingsEnabled = false,
  maxQuestions = MAX_POOL,
): string[] {
  let ids = [...poolIds];
  if (mode === "random" && randomSettingsEnabled) {
    const settings = readSettings();
    if (settings.calculationOnly) {
      const calculations = new Set(calculationIds ?? []);
      ids = ids.filter((id) => calculations.has(id));
    }
    if (settings.excludeRecent) {
      const recent = new Set(createHistoryStore().getAllEntries().slice(-40).map((entry) => entry.id));
      ids = ids.filter((id) => !recent.has(id));
    }
  }
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
  return mode === "year" ? ids : ids.slice(0, Math.min(MAX_POOL, maxQuestions));
}

async function fetchQuestion(id: string, shuffle: boolean): Promise<Question> {
  const qs = new URLSearchParams({ id });
  if (shuffle) qs.set("shuffle", "1");
  const res = await fetch(`/api/questions/next?${qs.toString()}`);
  if (!res.ok) throw new Error(`fetch question failed: ${res.status}`);
  return (await res.json()) as Question;
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
  calculationIds,
  randomSettingsEnabled = false,
  maxQuestions = MAX_POOL,
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
  calculationIds?: string[];
  randomSettingsEnabled?: boolean;
  maxQuestions?: number;
}) {
  const [sessionIds, setSessionIds] = React.useState<string[] | null>(null);
  const [index, setIndex] = React.useState(0);
  const [deferredIds, setDeferredIds] = React.useState<string[]>([]);
  const [phase, setPhase] = React.useState<"primary" | "deferred">("primary");
  const [resumeRoute, setResumeRoute] = React.useState<string | null>(null);
  const [resumeSaved, setResumeSaved] = React.useState(false);
  const [sessionReady, setSessionReady] = React.useState(false);
  const [playerEpoch, setPlayerEpoch] = React.useState(0);
  const [current, setCurrent] = React.useState<Question | null>(null);
  const [loadError, setLoadError] = React.useState(false);
  const [invalidQuestionId, setInvalidQuestionId] = React.useState(false);
  const [retryCount, setRetryCount] = React.useState(0);
  const cache = React.useRef<Map<string, Question>>(new Map());
  const initializedPool = React.useRef<string | null>(null);

  // Derive session pool once on mount (needs localStorage for history modes).
  React.useEffect(() => {
     
    const requestedUrl = new URL(window.location.href);
    const url = new URL(requestedUrl);
    url.searchParams.delete("question");
    const resumeRequested = url.searchParams.get("resume") === "1";
    const newRequested = url.searchParams.get("new") === "1";
    url.searchParams.delete("resume");
    url.searchParams.delete("new");
    const route = `${url.pathname}${url.search}`;
    const signature = JSON.stringify([mode, wrongOnly, poolIds, initialQuestionId, route, resumeRequested, newRequested]);
    if (initializedPool.current === signature) return;
    initializedPool.current = signature;
    const currentId = resumeRequested ? null : (initialQuestionId ?? requestedUrl.searchParams.get("question"));
    if (resumeRequested || newRequested) {
      requestedUrl.searchParams.delete("resume");
      requestedUrl.searchParams.delete("new");
      window.history.replaceState(null, "", requestedUrl);
    }
    if (newRequested) setPlayerEpoch((epoch) => epoch + 1);
    setResumeRoute(route);
    if (currentId && !poolIds.includes(currentId)) {
      setInvalidQuestionId(true);
      setSessionIds([]);
      setCurrent(null);
      return;
    }
    setInvalidQuestionId(false);
    const sessionKey = `ipa-quiz:active-pool:v1:${route}`;
    let ids = deriveSessionPool(poolIds, mode, categoryById, wrongOnly, calculationIds, randomSettingsEnabled, maxQuestions);
    const sessionLimit = mode === "year" ? poolIds.length : Math.min(MAX_POOL, maxQuestions);
    const stored = readQuizResume();
    const available = new Set(poolIds);
    const validResume = stored?.route === route && stored.ids.length <= sessionLimit &&
      stored.ids.every((id) => available.has(id)) &&
      (mode !== "year" || stored.phase === "deferred" ||
        (stored.ids.length === ids.length && stored.ids.every((id, i) => id === ids[i]))) ? stored : null;
    // The address bar also carries our own current question ID. Restore its saved
    // queue when that ID still points at the same position; a different explicit
    // question link continues to take precedence.
    const sameSavedPosition = validResume && currentId &&
      currentId === validResume.ids[Math.min(validResume.index, validResume.ids.length - 1)];
    if (validResume && !newRequested && (resumeRequested || !currentId || sameSavedPosition)) {
      setSessionIds(validResume.ids);
      setIndex(validResume.index);
      setDeferredIds(validResume.deferredIds);
      setPhase(validResume.phase);
      setResumeSaved(true);
      setSessionReady(true);
      setLoadError(false);
      cache.current.clear();
      startSession(mode);
      return;
    }
    try {
      const saved: unknown = JSON.parse(window.sessionStorage.getItem(sessionKey) ?? "null");
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
    setDeferredIds([]);
    setPhase("primary");
    setIndex(startIndex);
    setSessionReady(true);
    setLoadError(false);
    cache.current.clear();
    startSession(mode);
  }, [poolIds, mode, categoryById, wrongOnly, initialQuestionId, calculationIds, randomSettingsEnabled, maxQuestions]);

  React.useEffect(() => {
    if (!sessionReady || !sessionIds || sessionIds.length === 0 || !resumeRoute) return;
    const snapshot: QuizResumeState = { version: 1, route: resumeRoute, ids: sessionIds, index, deferredIds, phase, updatedAt: Date.now() };
    const saved = writeQuizResume(snapshot);
    const confirmed = saved ? readQuizResume() : null;
    setResumeSaved(Boolean(confirmed && confirmed.route === snapshot.route &&
      confirmed.index === snapshot.index && confirmed.phase === snapshot.phase &&
      confirmed.ids.join("\0") === snapshot.ids.join("\0") &&
      confirmed.deferredIds.join("\0") === snapshot.deferredIds.join("\0")));
  }, [sessionReady, sessionIds, index, deferredIds, phase, resumeRoute]);

  // Load current + prefetch next whenever index advances.
  React.useEffect(() => {
    if (!sessionIds || sessionIds.length === 0) return;
    const currentId = sessionIds[index];
    if (!currentId) return;
    const url = new URL(window.location.href);
    url.searchParams.delete("new");
    url.searchParams.delete("resume");
    url.searchParams.set("question", currentId);
    window.history.replaceState(null, "", url);

    let cancelled = false;
    const shuffle = mode === "random" && randomSettingsEnabled && readSettings().randomizeChoices;

    const loadInto = async (id: string, setActive: boolean) => {
      if (cache.current.has(id)) {
        if (setActive && !cancelled) setCurrent(cache.current.get(id)!);
        return;
      }
      try {
        const q = await fetchQuestion(id, shuffle);
        cache.current.set(id, q);
        if (setActive && !cancelled) { setCurrent(q); setLoadError(false); }
      } catch {
        if (setActive && !cancelled) setLoadError(true);
      }
    };

    setCurrent(cache.current.get(currentId) ?? null);
    setLoadError(false);
    void loadInto(currentId, true);
    const nextId = sessionIds[index + 1];
    if (nextId) void loadInto(nextId, false);

    return () => {
      cancelled = true;
    };
  }, [sessionIds, index, mode, randomSettingsEnabled, retryCount]);

  const handleNext = React.useCallback(() => {
    // Keep the previous question from accepting another action while the next loads.
    setCurrent(null);
    setIndex((i) => i + 1);
  }, []);

  const handleDefer = React.useCallback((questionId: string) => {
    if (!sessionIds?.includes(questionId) || !poolIds.includes(questionId)) return;
    setDeferredIds((ids) => ids.includes(questionId) ? ids : [...ids, questionId]);
    setCurrent(null);
    setIndex((i) => i + 1);
  }, [sessionIds, poolIds]);

  const resumeDeferred = React.useCallback(() => {
    if (deferredIds.length === 0) return;
    setSessionIds(deferredIds);
    setDeferredIds([]);
    setPhase("deferred");
    setCurrent(null);
    setIndex(0);
  }, [deferredIds]);

  const handleComplete = React.useCallback(() => {
    if (deferredIds.length > 0 && sessionIds) {
      // The next visit should land on the deferred-round action, not replay the revealed final answer.
      setCurrent(null);
      setIndex(sessionIds.length);
    } else if (resumeRoute) {
      clearQuizResume(resumeRoute);
      setResumeSaved(false);
    }
  }, [deferredIds, resumeRoute, sessionIds]);

  const restartSession = React.useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (!resumeRoute) return;
    const ids = deriveSessionPool(poolIds, mode, categoryById, wrongOnly, calculationIds, randomSettingsEnabled, maxQuestions);
    const url = new URL(resumeRoute, window.location.origin);
    window.history.replaceState(null, "", url);
    clearQuizResume(resumeRoute);
    setResumeSaved(false);
    setPlayerEpoch((epoch) => epoch + 1);
    setSessionIds(ids);
    setDeferredIds([]);
    setPhase("primary");
    setIndex(0);
    setCurrent(null);
    setLoadError(false);
    cache.current.clear();
    try { window.sessionStorage.setItem(`ipa-quiz:active-pool:v1:${resumeRoute}`, JSON.stringify(ids)); }
    catch { /* Session storage is optional. */ }
    startSession(mode);
  }, [resumeRoute, poolIds, mode, categoryById, wrongOnly, calculationIds, randomSettingsEnabled, maxQuestions]);

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
    return <div role="alert" className="mx-auto max-w-xl space-y-4 px-4 py-10 text-center">
      <p className="font-semibold">問題を読み込めませんでした。</p>
      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={() => setRetryCount((count) => count + 1)} className="min-h-11 rounded-xl bg-primary px-5 py-2 font-semibold text-primary-foreground">再読み込み</button>
        <Link href={backHref} className="inline-flex min-h-11 items-center rounded-xl border border-border px-5 py-2 font-semibold">科目選択へ戻る</Link>
      </div>
    </div>;
  }

  return (
    <>
    {resumeSaved && resumeRoute && <p className="mx-auto max-w-3xl px-4 pt-3 text-sm text-muted-foreground">直近の演習は、このブラウザで続きから再開できます。<Link href={`${resumeRoute}${resumeRoute.includes("?") ? "&" : "?"}new=1`} onClick={restartSession} className="ml-1 font-semibold underline">最初から</Link></p>}
    <QuizPlayer
      key={playerEpoch}
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
      onDeferQuestion={handleDefer}
      deferredQuestionCount={deferredIds.length}
      onResumeDeferred={resumeDeferred}
      onComplete={handleComplete}
    />
    </>
  );
}
