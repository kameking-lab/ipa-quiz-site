"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScheduleCalendar } from "@/components/ScheduleCalendar";
import { LEVEL_LABELS } from "@/lib/study-plan/constants";
import { getPlan } from "@/lib/study-plan/storage";
import type { StudyPlan } from "@/lib/study-plan/types";
import { examLabel } from "@/lib/utils";

type LoadState = "loading" | "ready" | "not-found";

export function ScheduleResultClient({ planId }: { planId: string }) {
  const [plan, setPlan] = React.useState<StudyPlan | null>(null);
  const [state, setState] = React.useState<LoadState>("loading");

  React.useEffect(() => {
    const found = getPlan(planId);
    if (found) {
      setPlan(found);
      setState("ready");
    } else {
      setState("not-found");
    }
  }, [planId]);

  if (state === "loading") {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-10">
        <div className="text-sm text-muted-foreground">読み込み中...</div>
      </main>
    );
  }

  if (state === "not-found" || !plan) {
    return (
      <main className="mx-auto w-full max-w-2xl px-4 py-10">
        <Card>
          <CardContent className="py-8 text-center">
            <h1 className="text-lg font-semibold">プランが見つかりません</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              このプランは別の端末で作成されたか、削除された可能性があります。
            </p>
            <div className="mt-6">
              <Link href="/study-plan">
                <Button variant="primary">新しいプランを作成</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  const coverageBadge = plan.summary.coveragePercent >= 100
    ? { label: "十分に余裕あり", tone: "text-emerald-600 dark:text-emerald-300" }
    : plan.summary.coveragePercent >= 70
    ? { label: "概ね順調", tone: "text-sky-600 dark:text-sky-300" }
    : { label: "時間タイト", tone: "text-amber-600 dark:text-amber-300" };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:py-10">
      <div className="mb-4">
        <Link
          href="/study-plan"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          一覧に戻る
        </Link>
      </div>

      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {examLabel(plan.input.exam)} 学習スケジュール
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span>試験日 {plan.input.examDate}</span>
          <span>レベル {LEVEL_LABELS[plan.input.level]}</span>
          <span>
            平日 {plan.input.weekdayMinutes}分 / 休日 {plan.input.weekendMinutes}分
          </span>
        </div>
      </header>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <div className="text-xs text-muted-foreground">目安学習時間</div>
              <div className="text-lg font-semibold tabular-nums">
                {plan.summary.totalHoursRequired} 時間
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">確保可能時間</div>
              <div className="text-lg font-semibold tabular-nums">
                {plan.summary.totalHoursAvailable} 時間
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">カバー率</div>
              <div className="text-lg font-semibold tabular-nums">
                {plan.summary.coveragePercent}%
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">判定</div>
              <div className={`text-sm font-semibold ${coverageBadge.tone}`}>
                {coverageBadge.label}
              </div>
            </div>
          </div>
          {plan.summary.coveragePercent < 70 && (
            <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:bg-amber-950 dark:text-amber-100">
              学習可能時間が目安に対してタイトです。
              中盤フェーズで弱点分野を絞り、終盤は模試と誤答復習を優先する構成にしています。
            </p>
          )}
        </CardContent>
      </Card>

      <ScheduleCalendar plan={plan} />

      <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
        学習中に分からないことが出たら、画面右下の AI コパイロットに質問できます。
        スケジュールはあくまで目安です。疲れた日は無理せず休んでください。
      </div>
    </main>
  );
}
