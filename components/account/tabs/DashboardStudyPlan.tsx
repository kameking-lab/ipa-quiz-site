"use client";

import * as React from "react";
import Link from "next/link";
import { ScheduleTaskItem } from "@/components/ScheduleTaskItem";
import { computeCompletionStats, getProgress, listPlans, setTaskDone } from "@/lib/study-plan/storage";
import type { ProgressMap, StudyPlan } from "@/lib/study-plan/types";
import { todayLocalDate } from "@/lib/study-plan/generator";
import { examLabel } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function DashboardStudyPlan() {
  const [plans, setPlans] = React.useState<StudyPlan[] | null>(null);
  const [selectedId, setSelectedId] = React.useState("");
  const [progress, setProgress] = React.useState<ProgressMap>({});
  const [today, setToday] = React.useState("");
  React.useEffect(() => {
    const saved = listPlans();
    const date = todayLocalDate();
    const requested = new URL(window.location.href).searchParams.get("plan");
    const current = saved.find((plan) => plan.id === requested) ?? saved.find((plan) => plan.daily.some((day) => day.date === date)) ?? saved[0];
    setPlans(saved);
    setToday(date);
    if (current) { setSelectedId(current.id); setProgress(getProgress(current.id)); }
  }, []);
  if (!plans) return <p role="status">学習計画を読み込み中...</p>;
  const plan = plans.find((item) => item.id === selectedId);
  if (!plan) return <section className="rounded-2xl border border-border bg-card p-5">
    <h2 className="text-lg font-semibold">今日の学習計画</h2>
    <p className="my-3 text-sm text-muted-foreground">期間と学習時間から、毎日の演習・復習を計算します。</p>
    <Button asChild><Link href="/study-plan">学習計画を作成する</Link></Button>
  </section>;
  const day = plan.daily.find((item) => item.date === today);
  const stats = computeCompletionStats(plan, progress);
  return <section aria-label="今日の学習計画" className="space-y-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
    <h2 className="text-lg font-semibold">今日の学習計画</h2>
    <label className="block text-sm font-medium">実行する計画
      <select value={selectedId} onChange={(event) => { setSelectedId(event.target.value); setProgress(getProgress(event.target.value)); }} className="mt-2 block min-h-11 w-full rounded-xl border border-border bg-background px-3">
        {plans.map((item) => <option key={item.id} value={item.id}>{examLabel(item.input.exam)} ・ 終了日 {item.input.examDate}</option>)}
      </select>
    </label>
    <p className="text-sm">計画全体: {stats.done}/{stats.total}タスク完了（{stats.percent}%）</p>
    {day ? <>
      <p className="text-sm font-semibold">{today} ・ {day.budgetMinutes}分目安</p>
      <ul className="space-y-3">{day.tasks.map((task) => <ScheduleTaskItem key={task.key} task={task} exam={plan.input.exam} planId={plan.id} done={Boolean(progress[task.key]?.done)} onToggle={(done) => setProgress({ ...setTaskDone(plan.id, task.key, done) })} />)}</ul>
      {day.tasks.length > 0 && day.tasks.every((task) => progress[task.key]?.done) ? <p role="status" className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">今日のタスクは完了です。</p> : null}
    </> : <p className="text-sm text-muted-foreground">今日はこの計画の期間外です。全日程を確認するか、新しい計画を作成できます。</p>}
    <div className="flex flex-wrap gap-3 text-sm">
      <Link className="inline-flex min-h-11 items-center text-primary underline" href={`/study-plan/result/${plan.id}`}>この計画の全日程を見る</Link>
      <Link className="inline-flex min-h-11 items-center text-primary underline" href="/study-plan">学習計画を作成・見直す</Link>
    </div>
    <p className="text-xs text-muted-foreground">タスクの完了チェックは全日程の表示と共通です。</p>
  </section>;
}
