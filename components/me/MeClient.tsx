"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AccountNavigationLink } from "@/components/account/AccountNavigation";
import { PRICE_PAGE_LINK } from "@/lib/billing/price-page-link";
import { listExamLearningSummaries } from "@/lib/exam-library-session";
import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { createHistoryStore, type HistoryEntry } from "@/lib/storage/history";
import { getHeatmapMap, intensityLevel } from "@/lib/motivation/heatmap";
import { readDailyGoalTarget } from "@/lib/motivation/daily-goal";
import { readLastQuestion } from "@/lib/storage/last-question";
import { LS_KEYS } from "@/lib/storage/keys";
import { buildMeRecords, plannedPaceBehind, type StudyRecord } from "@/lib/me/records";
import { passedPlanExams } from "@/lib/me/pet";
import { getLearningActions, listPacePlans } from "@/lib/study-plan/pace-storage";
import type { LearningAction } from "@/lib/study-plan/activity";
import { examLabel } from "@/lib/utils";
import { MePetRoom } from "./MePetRoom";
import { WeaknessReport } from "./WeaknessReport";
import type { WeaknessQuestionMeta } from "@/lib/me/weakness";
import type { ExamDatePlan } from "@/lib/billing/exam-end";
import { readExamDatePlans } from "@/lib/billing/exam-end-client";
import { QualificationSelect } from "@/components/qualifications/QualificationSelect";
import { groupQualifications, qualificationGroupLabel } from "@/lib/qualifications/groups";

const intensity = ["bg-muted", "bg-activity-1", "bg-activity-2", "bg-activity-3", "bg-activity-4"] as const;
const number = new Intl.NumberFormat("ja-JP", { maximumFractionDigits: 1 });
const shortDate = (date: string) => `${Number(date.slice(5, 7))}/${Number(date.slice(8))}`;
const reportExams = new Set<string>(ALL_QUIZ_EXAM_CODES);
interface Snapshot { history: HistoryEntry[]; actions: LearningAction[]; days: Record<string, number>; exam: string | null; goal: number; passed: string[]; plans: unknown; examDatePlans: ExamDatePlan[]; hasSafetyHistory: boolean; now: Date }

export function MeClient({ reportExam: requestedReportExam }: { reportExam?: string } = {}) {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [metadata, setMetadata] = useState<Record<string, string>>({});
  const [weaknessMeta, setWeaknessMeta] = useState<Record<string, WeaknessQuestionMeta>>({});
  const [questionLabels, setQuestionLabels] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<{ date: string; exam?: string | null } | null>(null);
  const [chosenReportExam, setChosenReportExam] = useState<string>();
  const calendarScroll = useRef<HTMLDivElement>(null);
  const recordTrigger = useRef<HTMLButtonElement | null>(null);
  const openRecord = (selection: { date: string; exam?: string | null }, button: HTMLButtonElement) => {
    recordTrigger.current = button;
    setSelected(selection);
  };
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
      controllers.forEach(controller => controller.abort());
      const history = createHistoryStore().getAllEntries();
      const actions = getLearningActions();
      let plans: unknown = [];
      try { plans = JSON.parse(localStorage.getItem(LS_KEYS.studyPlans) ?? "[]"); } catch { /* no plan */ }
      setSelected(null); setMetadata({}); setQuestionLabels({}); setWeaknessMeta({});
      const pacePlans = listPacePlans();
      setSnapshot({ history, actions, days: getHeatmapMap(), exam: readLastQuestion()?.exam ?? pacePlans[0]?.exam ?? null,
        goal: readDailyGoalTarget(), passed: passedPlanExams(plans, pacePlans), plans, examDatePlans: readExamDatePlans(pacePlans), hasSafetyHistory: listExamLearningSummaries().some((paper) => paper.answered > 0), now: new Date() });
      const ids = [...new Set([...actions.filter(action => action.kind === "answer").map(action => action.questionId), ...history.map(entry => entry.id)])]
        .filter(id => id.length > 0 && id.length <= 120).slice(-2000);
      if (!ids.length) return;
      const controller = new AbortController(); controllers.add(controller);
      void fetch("/api/questions/meta", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids, includeTopics: true }), signal: controller.signal }).then(async response => {
        if (!response.ok) return;
        const body: unknown = await response.json();
        if (!body || typeof body !== "object" || !("meta" in body) || !Array.isArray(body.meta) || epoch !== generation) return;
        const found: Record<string, string> = {}, labels: Record<string, string> = {}, topics: Record<string, WeaknessQuestionMeta> = {};
        for (const row of body.meta) if (row && typeof row.id === "string" && typeof row.exam === "string") {
          found[row.id] = row.exam; if (typeof row.label === "string") labels[row.id] = row.label;
          if (typeof row.category === "string") topics[row.id] = { exam: row.exam, category: row.category,
            topicTags: Array.isArray(row.topicTags) ? row.topicTags.filter((tag: unknown): tag is string => typeof tag === "string") : [] };
        }
        setMetadata(found); setQuestionLabels(labels); setWeaknessMeta(topics);
      }).catch(() => { /* saved IDs remain reviewable while offline */ }).finally(() => controllers.delete(controller));
    };
    refresh();
    const visible = () => { if (!document.hidden) refresh(); };
    window.addEventListener("storage", refresh); window.addEventListener("focus", refresh);
    window.addEventListener("study-plan:changed", refresh);
    window.addEventListener("study-activity:synced", refresh);
    window.addEventListener("pet-v1:owner-changed", refresh); document.addEventListener("visibilitychange", visible);
    return () => { generation++; controllers.forEach(controller => controller.abort());
      window.removeEventListener("storage", refresh); window.removeEventListener("focus", refresh);
      window.removeEventListener("study-plan:changed", refresh);
      window.removeEventListener("study-activity:synced", refresh);
      window.removeEventListener("pet-v1:owner-changed", refresh); document.removeEventListener("visibilitychange", visible); };
  }, []);
  const records = useMemo(() => snapshot ? buildMeRecords(snapshot.history, snapshot.days, snapshot.now, metadata, snapshot.actions) : null, [snapshot, metadata]);
  const recordRows = useMemo(() => groupQualifications(records?.records ?? [], record => record.exam ?? ""), [records]);
  const exam = snapshot?.exam ?? records?.records[0]?.exam ?? "ip";
  const mostRecent = records?.records.reduce<{ exam: string | null; at: number }>((latest, record) => {
    const at = Math.max(...record.entries.map(entry => entry.at));
    return record.exam && at > latest.at ? { exam: record.exam, at } : latest;
  }, { exam: null, at: -1 });
  const reportExam = mostRecent?.exam ?? exam;
  const reportChoice = chosenReportExam ?? requestedReportExam;
  const wrongExam = reportChoice || reportExam;
  const progressOptions = [...new Set(records?.records.flatMap(record => record.exam && reportExams.has(record.exam) ? [record.exam] : []))]
    .map(key => ({ key, name: examLabel(key) }));
  const progressValue = reportChoice ?? (progressOptions.some(option => option.key === reportExam) ? reportExam : "");
  const hasWrong = records?.records.some((record) => record.exam === wrongExam && record.entries.some((entry) => !entry.correct));
  const wrongHref = '/quiz?' + new URLSearchParams({ mode: "review", reviewKind: "wrong", exam: wrongExam });
  const menuLink = "flex min-h-11 items-center py-2 text-sm font-medium underline-offset-4 hover:underline";
  const today = records?.calendar.at(-1);
  const todayExamCount = records?.records.find(record => record.date === today?.date && record.exam === exam)?.entries.length ?? 0;
  const opened = selected ? records?.records.filter(record => record.date === selected.date && (selected.exam === undefined || selected.exam === record.exam)) ?? [] : [];
  function renderRecords(rows: typeof recordRows) {
    function renderRecord(record: StudyRecord, label?: string) {
      return <li key={`${record.date}:${record.exam}`}><RecordRow record={record} label={label}
        open={button => openRecord({ date: record.date, exam: record.exam }, button)} /></li>;
    }
    return rows.map(row => {
      if ("item" in row) return renderRecord(row.item);
      const { group, children } = row;
      const count = new Set(children.map(({ item }) => item.exam)).size;
      return <li key={group.slug}><details className="px-3.5">
        <summary className="min-h-12 cursor-pointer py-3 text-sm font-semibold">{qualificationGroupLabel(group, count)}</summary>
        <ul className="divide-y divide-border">{children.map(({ item, label }) => renderRecord(item, label))}</ul>
      </details></li>;
    });
  }
  return <div className="space-y-3.5">
    <MePetRoom exam={exam} streak={records?.streak} minutes={records?.minutes ?? 0} todayCount={today?.count ?? 0} todayExamCount={todayExamCount} goal={snapshot?.goal ?? 10} passedExams={snapshot?.passed ?? []} paceBehind={snapshot ? plannedPaceBehind(snapshot.plans, snapshot.history, exam, snapshot.now, metadata) : undefined} />
    <h2 id="study-progress" className="scroll-mt-16 text-sm font-bold">学習の進捗</h2>
    <dl aria-label="学習の数字" aria-busy={!records} className="grid grid-cols-3 gap-1.5">
      {([
        ["1日平均の問題数", records?.averageQuestions, "問"],
        ["1日平均の分数", records?.averageMinutes, "分"], ["これまでの問題数", records?.total, "問"],
      ] as const).map(([label, value, unit]) => <div key={label} className="min-w-0 rounded-xl border border-hairline bg-card px-2 py-2 sm:px-3.5"><dt className="text-xs leading-relaxed text-muted-foreground">{label}</dt><dd className="font-display text-[26px] leading-tight font-bold tabular-nums">{value === undefined ? "—" : number.format(value)}<span className="ml-1 font-sans text-xs font-normal text-muted-foreground">{unit}</span></dd></div>)}
    </dl>
    <nav aria-label="学習の進捗と復習" className="p3-review-links flex flex-wrap gap-2">
      {hasWrong && ALL_QUIZ_EXAM_CODES.some((code) => code === wrongExam) && <Link href={wrongHref} className={menuLink}>間違えた問題を復習</Link>}
      <Link href={"/review?" + new URLSearchParams({ mode: "weak", ...(wrongExam ? { exam: wrongExam } : {}), returnTo: "/me" })} className={menuLink}>苦手リスト</Link>
      {snapshot?.hasSafetyHistory && <Link href="/e-learning/progress" className={menuLink}>安全衛生の進捗・復習</Link>}
      <Link href={snapshot?.examDatePlans.length ? "/#today" : "/study-plan"} className={menuLink}>{snapshot?.examDatePlans.length ? "学習計画を見る" : "学習計画を作成"}</Link>
    </nav>
    {progressOptions.length > 1 && <details className="rounded-xl border border-border px-3">
      <summary className="min-h-11 cursor-pointer py-3 text-sm font-medium">進捗を見る資格を選ぶ</summary>
      <QualificationSelect items={progressOptions} value={progressValue} onChange={setChosenReportExam} label="資格" emptyLabel="資格を選ぶ"
        className="pb-3 text-sm font-medium" fieldClass="mt-1 block min-h-11 w-full min-w-0 rounded-lg border border-border bg-background px-2 text-base" />
    </details>}
    {snapshot && records && reportChoice !== "" && <WeaknessReport history={records.entries}
      meta={weaknessMeta} exam={reportExam} requestedExam={reportChoice} plans={snapshot.examDatePlans} now={snapshot.now} />}
    <section aria-labelledby="me-calendar" className="p3-calendar rounded-xl border border-hairline bg-card p-3"><div className="mb-2 flex flex-wrap items-baseline justify-between gap-2"><h2 id="me-calendar" className="text-sm font-bold">12週間のカレンダー</h2><span className="text-xs tabular-nums text-muted-foreground">{records ? `${shortDate(records.calendar[0].date)}–${shortDate(records.calendar[83].date)}` : ""}</span></div>
      <div className="flex gap-1.5"><div aria-hidden="true" className="grid grid-rows-7 gap-0.5 text-xs leading-none text-muted-foreground">{records?.calendar.slice(0, 7).map(day => <span key={day.date} className="flex h-3.5 items-center">{new Intl.DateTimeFormat("ja", { weekday: "narrow", timeZone: "Asia/Tokyo" }).format(new Date(`${day.date}T12:00:00+09:00`))}</span>)}</div>
        <div ref={calendarScroll} role="region" aria-label="日別の学習量" tabIndex={0} className="min-w-0 flex-1 overflow-x-auto rounded-sm outline-offset-2 focus-visible:outline-2 focus-visible:outline-primary">
          <div className="grid min-w-[252px] grid-flow-col grid-cols-12 grid-rows-7 gap-0.5">{records?.calendar.map(day => <span key={day.date} aria-label={day.date + " " + day.count + "問"} title={shortDate(day.date) + " · " + day.count + "問"} aria-current={day.date === today?.date ? "date" : undefined} className={'h-3.5 rounded-[3px] aria-current:ring-2 aria-current:ring-inset aria-current:ring-primary ' + intensity[intensityLevel(day.count)]} />)}</div>
        </div></div>
      <div aria-hidden="true" className="mt-2 flex items-center justify-end gap-1 text-xs text-muted-foreground"><span>少</span>{intensity.map(color => <span key={color} className={`size-2.5 rounded-sm ${color}`} />)}<span>多</span></div>
    </section>
    <section aria-labelledby="me-recent" className="rounded-xl border border-border bg-card"><h2 id="me-recent" className="px-3.5 pt-3 pb-2 text-sm font-bold">最近の記録</h2>
      {records && recordRows.length === 0 ? <p className="px-3.5 py-4 text-sm text-muted-foreground">まだ記録がありません</p> : <ul className="divide-y divide-border border-t border-border">{renderRecords(recordRows.slice(0, 10))}</ul>}
      {recordRows.length > 10 && <details className="px-3.5">
        <summary className="min-h-11 cursor-pointer py-3 text-sm">過去の記録</summary>
        <ul className="divide-y divide-border">{renderRecords(recordRows.slice(10))}</ul>
      </details>}
    </section>
    <nav aria-label="わたしのメニュー" className="p3-listed divide-y divide-hairline px-3">
      <Link href={PRICE_PAGE_LINK.href} className={`${menuLink} justify-between gap-2 font-semibold text-primary`}>{PRICE_PAGE_LINK.label}<ChevronRight aria-hidden="true" className="size-4 shrink-0" /></Link>
      <AccountNavigationLink className={menuLink} />
      <details>
        <summary className="min-h-11 cursor-pointer py-3 text-sm font-medium">教材・運営情報</summary>
        <Link href="/essay" className={menuLink}>論文対策</Link>
        <Link href="/mock-exam" className={menuLink}>模試</Link>
        <Link href="/transparency" className={menuLink}>出典・運営</Link>
      </details>
    </nav>
    <Dialog open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}><DialogContent aria-describedby={undefined} onCloseAutoFocus={event => { event.preventDefault(); recordTrigger.current?.focus(); }} className="max-h-[85dvh] overflow-y-auto [&>button:last-child]:size-11"><DialogTitle className="pr-11">{selected ? `${shortDate(selected.date)}の記録` : "学習の記録"}</DialogTitle>
      {opened.map(record => <section key={record.exam ?? "unknown"}><h3 className="text-sm font-semibold">{record.exam ? examLabel(record.exam) : "その他"}</h3><ul className="mt-2 divide-y divide-border">{[...record.entries].reverse().map((entry, index) => <li key={`${entry.id}:${entry.at}:${index}`}><Link prefetch={false} href={`/me/review/${encodeURIComponent(entry.id)}`} className="flex min-h-12 items-center gap-3 rounded-lg px-2 py-3 text-sm outline-offset-2 hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary"><span className={`shrink-0 ${entry.correct ? "text-emerald-700 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{entry.correct ? "正解" : "不正解"}</span><span className="min-w-0 flex-1 break-words leading-relaxed">{questionLabels[entry.id] ?? `問題${record.entries.length - index}`}</span><ChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" /></Link></li>)}</ul></section>)}
    </DialogContent></Dialog>
  </div>;
}

function RecordRow({ record, label = record.exam ? examLabel(record.exam) : "その他", open }: {
  record: StudyRecord;
  label?: string;
  open(button: HTMLButtonElement): void;
}) {
  return <button type="button" onClick={event => open(event.currentTarget)} className="flex min-h-[52px] w-full items-center gap-2.5 rounded-lg px-3.5 py-2 text-left outline-offset-[-3px] hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary"><time className="w-9 shrink-0 text-xs tabular-nums text-muted-foreground" dateTime={record.date}>{shortDate(record.date)}</time><span className="min-w-0 flex-1 text-sm font-medium">{label}</span><span className="shrink-0 text-xs tabular-nums">{record.entries.length}問</span><span className="w-9 shrink-0 text-right text-xs text-muted-foreground tabular-nums"><span className="sr-only">正答率</span>{Math.round(100 * record.correct / record.entries.length)}%</span><ChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" /></button>;
}
