"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { createHistoryStore, type HistoryEntry } from "@/lib/storage/history";
import { getHeatmapMap, intensityLevel } from "@/lib/motivation/heatmap";
import { readDailyGoalTarget } from "@/lib/motivation/daily-goal";
import { readLastQuestion } from "@/lib/storage/last-question";
import { LS_KEYS } from "@/lib/storage/keys";
import { buildMeRecords, plannedPaceBehind, type StudyRecord } from "@/lib/me/records";
import { passedPlanExams } from "@/lib/me/pet";
import { examLabel } from "@/lib/utils";
import { MePetRoom } from "./MePetRoom";

const intensity = ["bg-stone-100 dark:bg-stone-800", "bg-emerald-100 dark:bg-emerald-950", "bg-emerald-300 dark:bg-emerald-800", "bg-emerald-500 dark:bg-emerald-600", "bg-emerald-700 dark:bg-emerald-400"] as const;
const number = new Intl.NumberFormat("ja-JP", { maximumFractionDigits: 1 });
const shortDate = (date: string) => `${Number(date.slice(5, 7))}/${Number(date.slice(8))}`;
interface Snapshot { history: HistoryEntry[]; days: Record<string, number>; exam: string | null; goal: number; passed: string[]; plans: unknown; now: Date }

export function MeClient() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [metadata, setMetadata] = useState<Record<string, string>>({});
  const [questionLabels, setQuestionLabels] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<{ date: string; exam?: string | null } | null>(null);
  const [showAll, setShowAll] = useState(false);
  const calendarScroll = useRef<HTMLDivElement>(null);
  const calendarEnd = snapshot ? snapshot.now.toDateString() : null;
  useEffect(() => {
    const element = calendarScroll.current;
    if (element) element.scrollLeft = element.scrollWidth;
  }, [calendarEnd]);
  useEffect(() => {
    let generation = 0;
    const controllers = new Set<AbortController>();
    const refresh = () => {
      const epoch = ++generation;
      const history = createHistoryStore().getAllEntries();
      let plans: unknown = [];
      try { plans = JSON.parse(localStorage.getItem(LS_KEYS.studyPlans) ?? "[]"); } catch { /* no plan */ }
      setSelected(null); setMetadata({}); setQuestionLabels({});
      setSnapshot({ history, days: getHeatmapMap(), exam: readLastQuestion()?.exam ?? null,
        goal: readDailyGoalTarget(), passed: passedPlanExams(plans), plans, now: new Date() });
      const ids = [...new Set(history.map(entry => entry.id))].filter(id => id.length > 0 && id.length <= 120).slice(-2000);
      if (!ids.length) return;
      const controller = new AbortController(); controllers.add(controller);
      void fetch("/api/questions/meta", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }), signal: controller.signal }).then(async response => {
        if (!response.ok) return;
        const body: unknown = await response.json();
        if (!body || typeof body !== "object" || !("meta" in body) || !Array.isArray(body.meta) || epoch !== generation) return;
        const found: Record<string, string> = {}, labels: Record<string, string> = {};
        for (const row of body.meta) if (row && typeof row.id === "string" && typeof row.exam === "string") {
          found[row.id] = row.exam; if (typeof row.label === "string") labels[row.id] = row.label;
        }
        setMetadata(found); setQuestionLabels(labels);
      }).catch(() => { /* saved IDs remain reviewable while offline */ }).finally(() => controllers.delete(controller));
    };
    refresh();
    const visible = () => { if (!document.hidden) refresh(); };
    window.addEventListener("storage", refresh); window.addEventListener("focus", refresh);
    window.addEventListener("pet-v1:owner-changed", refresh); document.addEventListener("visibilitychange", visible);
    return () => { generation++; controllers.forEach(controller => controller.abort());
      window.removeEventListener("storage", refresh); window.removeEventListener("focus", refresh);
      window.removeEventListener("pet-v1:owner-changed", refresh); document.removeEventListener("visibilitychange", visible); };
  }, []);
  const records = snapshot ? buildMeRecords(snapshot.history, snapshot.days, snapshot.now, metadata) : null;
  const exam = snapshot?.exam ?? records?.records[0]?.exam ?? "ip";
  const today = records?.calendar.at(-1);
  const todayExamCount = records?.records.find(record => record.date === today?.date && record.exam === exam)?.entries.length ?? 0;
  const opened = selected ? records?.records.filter(record => record.date === selected.date && (selected.exam === undefined || selected.exam === record.exam)) ?? [] : [];
  return <div className="space-y-8 pb-10">
    <MePetRoom exam={exam} minutes={records?.minutes ?? 0} todayCount={today?.count ?? 0} todayExamCount={todayExamCount} goal={snapshot?.goal ?? 10} passedExams={snapshot?.passed ?? []} paceBehind={snapshot ? plannedPaceBehind(snapshot.plans, snapshot.history, exam, snapshot.now, metadata) : undefined} />
    <dl aria-label="学習の数字" className="grid grid-cols-2 gap-y-6 rounded-2xl border border-border bg-card px-4 py-6 sm:grid-cols-4">
      {([
        ["連続日数", records?.streak, "日"], ["1日平均の問題数", records?.averageQuestions, "問"],
        ["1日平均の分数", records?.averageMinutes, "分"], ["これまでの問題数", records?.total, "問"],
      ] as const).map(([label, value, unit]) => <div key={label} className="border-border px-2 text-center odd:border-r sm:border-r sm:last:border-r-0"><dt className="mb-2 text-xs leading-relaxed text-muted-foreground">{label}</dt><dd className="text-2xl font-bold tabular-nums">{value === undefined ? "—" : number.format(value)}<span className="ml-1 text-xs font-normal text-muted-foreground">{unit}</span></dd></div>)}
    </dl>
    <section aria-labelledby="me-calendar"><div className="mb-4 flex flex-wrap items-baseline justify-between gap-2"><h2 id="me-calendar" className="font-bold tracking-tight">12週間のカレンダー</h2><span className="text-xs tabular-nums text-muted-foreground">{records ? `${shortDate(records.calendar[0].date)}–${shortDate(records.calendar[83].date)}` : ""}</span></div>
      <div className="flex gap-2"><div aria-hidden="true" className="grid grid-rows-7 gap-1 pb-2 text-xs leading-none text-muted-foreground">{records?.calendar.slice(0, 7).map(day => <span key={day.date} className="flex h-11 items-center">{new Intl.DateTimeFormat("ja", { weekday: "narrow", timeZone: "Asia/Tokyo" }).format(new Date(`${day.date}T12:00:00+09:00`))}</span>)}</div>
        <div ref={calendarScroll} role="region" aria-label="日別の学習量" tabIndex={0} className="min-w-0 flex-1 overflow-x-auto rounded-lg pb-2 outline-offset-2 focus-visible:outline-2 focus-visible:outline-primary">
          <div className="grid min-w-[572px] grid-flow-col grid-cols-12 grid-rows-7 gap-1">{records?.calendar.map(day => <button key={day.date} type="button" aria-label={`${day.date} ${day.count}問`} title={`${shortDate(day.date)} · ${day.count}問`} aria-current={day.date === today?.date ? "date" : undefined} disabled={!records.records.some(record => record.date === day.date)} className={`h-11 min-w-11 rounded-md aria-current:ring-2 aria-current:ring-inset aria-current:ring-emerald-700 dark:aria-current:ring-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-primary disabled:cursor-default ${intensity[intensityLevel(day.count)]}`} onClick={() => setSelected({ date: day.date })} />)}</div>
        </div></div>
      <div aria-hidden="true" className="mt-2 flex items-center justify-end gap-1 text-[10px] text-muted-foreground"><span>少</span>{intensity.map(color => <span key={color} className={`size-2.5 rounded-sm ${color}`} />)}<span>多</span></div>
    </section>
    <section aria-labelledby="me-recent"><h2 id="me-recent" className="mb-3 font-bold tracking-tight">最近の記録</h2>
      {records?.records.length === 0 ? <p className="py-5 text-sm text-muted-foreground">まだ記録がありません</p> : <ul className="divide-y divide-border">{(showAll ? records?.records : records?.records.slice(0, 10))?.map(record => <li key={`${record.date}:${record.exam}`}><RecordRow record={record} open={() => setSelected({ date: record.date, exam: record.exam })} /></li>)}</ul>}
      {(records?.records.length ?? 0) > 10 && !showAll ? <button type="button" className="mt-3 min-h-11 w-full rounded-xl text-sm text-muted-foreground hover:bg-muted" onClick={() => setShowAll(true)}>もっと見る</button> : null}
    </section>
    <nav aria-label="わたしのメニュー" className="flex flex-wrap gap-x-3 gap-y-1 border-t border-border pt-3 text-sm text-muted-foreground"><Link className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-2 outline-offset-2 hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary" href="/account/dashboard">アカウント</Link><Link className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-2 outline-offset-2 hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary" href="/settings">設定</Link><Link className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-2 outline-offset-2 hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary" href="/#home-directory-title">収録資格</Link><Link className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-2 outline-offset-2 hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary" href="/transparency">出典・運営</Link></nav>
    <Dialog open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}><DialogContent aria-describedby={undefined} className="max-h-[85dvh] overflow-y-auto [&>button:last-child]:size-11"><DialogTitle className="pr-11">{selected ? `${shortDate(selected.date)}の記録` : "学習の記録"}</DialogTitle>
      {opened.map(record => <section key={record.exam ?? "unknown"}><h3 className="text-sm font-semibold">{record.exam ? examLabel(record.exam) : "その他"}</h3><ul className="mt-2 divide-y divide-border">{[...record.entries].reverse().map((entry, index) => <li key={`${entry.id}:${entry.at}:${index}`}><Link prefetch={false} href={`/me/review/${encodeURIComponent(entry.id)}`} className="flex min-h-12 items-center gap-3 py-2 text-sm"><span className={entry.correct ? "text-emerald-700 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>{entry.correct ? "正解" : "不正解"}</span><span className="min-w-0 flex-1">{questionLabels[entry.id] ?? `問題${record.entries.length - index}`}</span><ChevronRight className="size-4 shrink-0" /></Link></li>)}</ul></section>)}
    </DialogContent></Dialog>
  </div>;
}

function RecordRow({ record, open }: { record: StudyRecord; open(): void }) {
  return <button type="button" onClick={open} className="flex min-h-16 w-full items-center gap-3 rounded-lg px-2 py-3 text-left outline-offset-2 hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary"><time className="w-10 shrink-0 text-xs tabular-nums text-muted-foreground" dateTime={record.date}>{shortDate(record.date)}</time><span className="min-w-0 flex-1 text-sm font-medium">{record.exam ? examLabel(record.exam) : "その他"}</span><span className="shrink-0 text-right text-xs tabular-nums">{record.entries.length}問<span className="mt-1 block text-muted-foreground"><span className="sr-only">正答率</span>{Math.round(100 * record.correct / record.entries.length)}%</span></span><ChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" /></button>;
}
