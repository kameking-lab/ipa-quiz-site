"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { QuizClient } from "../QuizClient";
import { listPacePlans } from "@/lib/study-plan/pace-storage";
import { loadPlanCatalog, paceAttempts, resumeQuestionId } from "@/lib/study-plan/client";
import { refreshThinRange, selectTodayQuestions } from "@/lib/study-plan/pace";
import { answersToday, todayQuestionGoal } from "@/lib/study-plan/home";
import { getDueCards } from "@/lib/learning/spaced-repetition";
import { japanDate } from "@/lib/home/featured-exams";
import { Button } from "@/components/ui/button";
import { LS_KEYS } from "@/lib/storage/keys";
import type { CatalogQuestion } from "@/lib/study-plan/client";
import dynamic from "next/dynamic";
const TodayLibrary = dynamic(() => import("./TodayLibrary").then(m => m.TodayLibrary));

export function TodayQuiz({ planId, billingGateEnabled }: { planId: string; billingGateEnabled: boolean }) {
  const [batch, setBatch] = useState<{ ids: string[]; exam: string; library?: CatalogQuestion[] } | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    void (async () => {
      const saved = listPacePlans().find(p => p.id === planId);
      if (!saved) throw new Error("学習計画が見つかりませんでした。");
      const catalog = await loadPlanCatalog(saved.exam, controller.signal);
      const attempts = paceAttempts(), today = japanDate(new Date());
      const plan = refreshThinRange(saved, catalog, today);
      let paid = false;
      try { const r = await fetch("/api/billing/status", { signal: controller.signal, cache: "no-store" });
        if (r.ok) paid = (await r.json() as { entitled?: boolean }).entitled === true;
      } catch { if (controller.signal.aborted) return; }
      const done = answersToday(attempts, today, new Set(catalog.map(q => q.id)));
      const goal = todayQuestionGoal(plan, attempts, today);
      const allowance = paid ? goal : Math.min(goal, Math.max(0, 10 - answersToday(attempts, today)));
      const remainingGoal = Math.max(0, goal - done);
      let ids = selectTodayQuestions(plan, catalog, attempts, Math.min(allowance, remainingGoal),
        getDueCards().sort((a, b) => a.dueAt - b.dueAt).map(c => c.id), resumeQuestionId(catalog));
      const byId = new Map(catalog.map(q => [q.id, q]));
      try {
        const current = new URL(location.href).searchParams.get("question");
        const cached: unknown = JSON.parse(sessionStorage.getItem(LS_KEYS.paceBatchPrefix + planId) ?? "null");
        if (current && cached && typeof cached === "object" && "day" in cached && cached.day === today && "ids" in cached &&
          Array.isArray(cached.ids) && cached.ids.includes(current) && cached.ids.length <= catalog.length &&
          cached.ids.every((id: unknown) => typeof id === "string" && byId.has(id)) && new Set(cached.ids).size === cached.ids.length) ids = cached.ids;
        sessionStorage.setItem(LS_KEYS.paceBatchPrefix + planId, JSON.stringify({ day: today, ids }));
      } catch { /* The server still checks every question when session storage is unavailable. */ }
      if (!controller.signal.aborted) setBatch({ ids, exam: plan.exam, library: catalog[0]?.paperId ? ids.map(id => byId.get(id)!) : undefined });
    })().catch(e => { if (!controller.signal.aborted) setError(e instanceof Error ? e.message : "問題を準備できませんでした。"); });
    return () => controller.abort();
  }, [planId]);
  if (error) return <main className="mx-auto max-w-[640px] p-6"><p role="alert">{error}</p><Link href="/" className="mt-4 block underline">ホームへ</Link></main>;
  if (!batch) return <p role="status" className="p-8 text-center text-sm text-muted-foreground">今日の問題を準備中…</p>;
  if (!batch.ids.length) return <main className="mx-auto w-full max-w-[640px] p-8 text-center"><h1 className="text-xl font-bold">今日も、おつかれさまでした</h1><Button asChild className="mt-6 min-h-12"><Link href="/">ホームへ</Link></Button></main>;
  if (batch.library) return <><h1 className="mx-auto w-full max-w-[640px] px-4 pt-4 text-sm font-semibold">今日の問題 · {batch.ids.length}問</h1><TodayLibrary questions={batch.library} exam={batch.exam} /></>;
  // Year mode preserves the exact priority order and all supplied IDs. Every
  // question still passes through QuizClient's existing server access gate.
  return <><h1 className="mx-auto w-full max-w-[640px] px-4 pt-4 text-sm font-semibold">今日の問題 · {batch.ids.length}問</h1><QuizClient poolIds={batch.ids} mode="year" backHref="/" backLabel="ホームへ" exam={batch.exam}
    completionLabel="今日の問題" billingGateEnabled={billingGateEnabled} /></>;
}
