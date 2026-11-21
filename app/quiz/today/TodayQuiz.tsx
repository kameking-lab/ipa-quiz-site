"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { QuizClient } from "../QuizClient";
import { listPacePlans } from "@/lib/study-plan/pace-storage";
import { loadPlanCatalog, paceAttempts, type CatalogQuestion } from "@/lib/study-plan/client";
import { calculatePace, weakQuestions } from "@/lib/study-plan/pace";
import { createHistoryStore } from "@/lib/storage/history";
import { japanDate } from "@/lib/home/featured-exams";
import { Button } from "@/components/ui/button";
import { LS_KEYS } from "@/lib/storage/keys";

const TodayLibrary = dynamic(() => import("./TodayLibrary").then(m => m.TodayLibrary));

export function TodayQuiz({ planId, weakExam, billingGateEnabled }: { planId: string; weakExam?: string; billingGateEnabled: boolean }) {
  const [batch, setBatch] = useState<{ ids: string[]; exam: string; library?: CatalogQuestion[] } | null>(null);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setError("");
    setBatch(null);
    void (async () => {
      const plan = weakExam ? undefined : listPacePlans().find(p => p.id === planId);
      const exam = weakExam ?? plan?.exam;
      if (!exam) throw new Error("学習計画が見つかりませんでした。");
      const catalog = await loadPlanCatalog(exam, controller.signal);
      if (controller.signal.aborted) return;
      const now = new Date();
      const today = japanDate(now);
      const attempts = paceAttempts();
      const pace = plan ? calculatePace(plan, catalog, attempts, today, now.getTime()) : null;
      let ids = plan
        ? pace!.remainingIds.slice(0, pace!.target ?? 0)
        : weakQuestions(catalog, exam, attempts, createHistoryStore().getStarredIds(), now.getTime()).map(row => row.question.id);
      const byId = new Map(catalog.filter(q => !plan || (pace?.oldestYear != null && q.year >= pace.oldestYear)).map(q => [q.id, q]));
      const url = new URL(location.href);
      const current = url.searchParams.get("question");
      const scope = JSON.stringify([exam, planId, !!weakExam, pace?.oldestYear]);
      const key = LS_KEYS.paceBatchPrefix + scope;
      let resumed = false;
      try {
        const cached = JSON.parse(sessionStorage.getItem(key) ?? "null");
        if (current && cached?.day === today && Array.isArray(cached.ids) && cached.ids.includes(current) &&
            cached.ids.every((id: unknown) => typeof id === "string" && byId.has(id)) &&
            new Set(cached.ids).size === cached.ids.length) {
          ids = cached.ids;
          resumed = true;
        }
        sessionStorage.setItem(key, JSON.stringify({ day: today, ids }));
      } catch { /* The question grant still applies without session storage. */ }
      if (current && !resumed) {
        url.searchParams.delete("question");
        history.replaceState(history.state, "", url);
      }
      setBatch({ ids, exam, library: catalog[0]?.paperId ? ids.map(id => byId.get(id)!) : undefined });
    })().catch(e => { if (!controller.signal.aborted) setError(e instanceof Error ? e.message : "問題を準備できませんでした。"); });
    return () => controller.abort();
  }, [planId, weakExam, revision]);

  const backHref = weakExam ? "/review?mode=weak&exam=" + encodeURIComponent(weakExam) : "/";
  const backLabel = weakExam ? "苦手リストへ" : "ホームへ";
  const title = weakExam ? "苦手演習" : "計画の問題";
  if (error) return <main className="mx-auto max-w-[640px] space-y-4 p-6">
    <p role="alert">{error}</p>
    <Button variant="outline" onClick={() => setRevision(value => value + 1)}>再読み込み</Button>
    <Link href={backHref} className="ml-4 inline-flex min-h-11 items-center underline">{backLabel}</Link>
  </main>;
  if (!batch) return <p role="status" className="p-8 text-center text-sm text-muted-foreground">問題を準備中…</p>;
  if (!batch.ids.length) return <main className="mx-auto max-w-[640px] p-8 text-center">
    <h1 className="text-xl font-bold">{weakExam ? "苦手リストは空です" : "この計画で解く問題はありません"}</h1>
    <Button asChild className="mt-6 min-h-12"><Link href={backHref}>{backLabel}</Link></Button>
  </main>;
  return <>
    <h1 className="mx-auto w-full max-w-[640px] px-4 pt-4 text-sm font-semibold">{title} · {batch.ids.length}問</h1>
    {batch.library ? <TodayLibrary questions={batch.library} exam={batch.exam} backHref={backHref} backLabel={backLabel} />
      : <QuizClient poolIds={batch.ids} mode="year" fixedBatch backHref={backHref} backLabel={backLabel} exam={batch.exam}
          billingGateEnabled={billingGateEnabled} />}
  </>;
}
