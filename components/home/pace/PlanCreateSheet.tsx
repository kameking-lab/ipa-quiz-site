"use client";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import type { HomeDirectoryItem } from "@/lib/home/home-directory";
import type { ExamSchedule, ExamScheduleSession } from "@/lib/study-plan/schedule";
import { createPacePlan } from "@/lib/study-plan/pace";
import { savePacePlan } from "@/lib/study-plan/pace-storage";
import { loadPlanCatalog } from "@/lib/study-plan/client";
import { japanDate } from "@/lib/home/featured-exams";
import styles from "./HomePace.module.css";

const fieldClass = "mt-1.5 min-h-11 w-full min-w-0 rounded-lg border border-input bg-card px-3";

export function PlanCreateSheet({ open, onOpenChange, items, initialExam, onCreated }: {
  open: boolean; onOpenChange: (open: boolean) => void; items: readonly HomeDirectoryItem[];
  initialExam: string; onCreated: (id: string) => void;
}) {
  const [exam, setExam] = useState(initialExam);
  const [sessions, setSessions] = useState<ExamScheduleSession[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [scheduleFailed, setScheduleFailed] = useState(false);
  const [weekday, setWeekday] = useState(30);
  const [holiday, setHoliday] = useState(60);
  useEffect(() => { if (open) setExam(initialExam); }, [open, initialExam]);
  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    setLoading(true); setError(""); setDate(""); setSessions([]); setSessionId(""); setScheduleFailed(false);
    void fetch(`/api/exam-schedule/${encodeURIComponent(exam)}`, { signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error("schedule");
        const data = await response.json() as ExamSchedule;
        if (controller.signal.aborted) return;
        const future = data.sessions.filter(s => s.scheduleStatus === "ondemand" || !s.examDate || (s.examDateEnd ?? s.examDate) >= japanDate(new Date()));
        setSessions(future); setSessionId(future[0]?.id ?? "");
      }).catch(() => { if (!controller.signal.aborted) setScheduleFailed(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [exam, open]);
  const session = sessions.find(s => s.id === sessionId);
  // A window/month is not an individual's appointment. Always ask for the booked day.
  const manual = !session?.examDate || session.scheduleStatus === "ondemand" ||
    session.datePrecision === "month" || !!session.examDateEnd && session.examDateEnd !== session.examDate;
  const examDate = manual ? date : session?.examDate ?? "";
  async function create() {
    if (!examDate || examDate < japanDate(new Date())) return;
    setSaving(true); setError("");
    try {
      const catalog = await loadPlanCatalog(exam);
      if (!catalog.length) throw new Error("演習できる問題がありません。");
      const now = new Date();
      const plan = createPacePlan({ id: crypto.randomUUID(), exam, sessionId: session?.id ?? null, examDate,
        startDate: japanDate(now) }, catalog, now.toISOString());
      plan.studyMinutes = { weekday, holiday };
      if (session) plan.registration = { label: session.label, start: session.applicationStart, deadline: session.applicationDeadline,
        resultDate: session.resultDate, sourceUrl: session.sourceUrl, estimated: session.applicationEstimated || session.scheduleStatus === "tentative" };
      if (!savePacePlan(plan)) throw new Error("保存できませんでした。端末の保存設定を確認してください。");
      onCreated(plan.id); onOpenChange(false);
    } catch (e) { setError(e instanceof Error ? e.message : "作成できませんでした。"); }
    finally { setSaving(false); }
  }
  return <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent side="bottom" aria-describedby={undefined} className={`${styles.sheet} mx-auto max-h-[min(90dvh,calc(100dvh-var(--safe-top)-1rem))] max-w-[640px] overflow-y-auto px-[18px] pt-3 pb-[max(1.5rem,var(--safe-bottom))] sm:px-6`}>
      <div aria-hidden="true" className="mx-auto mb-3 h-1 w-11 rounded-full bg-border" />
      <SheetHeader className="pr-11"><SheetTitle>学習計画を作成</SheetTitle></SheetHeader>
      <div className="mt-4 space-y-3">
        <label className="block text-sm font-medium">受ける資格<select className={fieldClass} value={exam} onChange={e => setExam(e.target.value)}>{items.map(item => <option key={item.key} value={item.key}>{item.name}</option>)}</select></label>
        {loading ? <p role="status" className="text-sm text-muted-foreground">日程を確認中…</p> : <>
          {sessions.length > 0 && <fieldset className="space-y-2">
            <legend className="mb-1.5 text-sm font-medium">受ける回</legend>
            {sessions.map(s => <div key={s.id} className="rounded-xl border border-border has-checked:border-primary has-checked:bg-primary-soft">
              <label className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-bold">
                <input type="radio" name="pace-plan-session" checked={s.id === sessionId} onChange={() => { setSessionId(s.id); setDate(""); }} className="size-4 shrink-0 accent-primary" />
                <span>{s.label}</span>
                {s.scheduleStatus === "tentative" && <span className="rounded-full border border-border px-2 py-0.5 text-xs font-normal text-muted-foreground">予定</span>}
              </label>
              {s.id === sessionId && <div className="space-y-2 px-3 pb-3">
                <dl className="space-y-1 text-xs">
                  {[["申込開始", s.applicationStart], ["申込締切", s.applicationDeadline], ["試験日", s.examDate], ["合格発表", s.resultDate]].map(([label, value]) => <div key={label} className="flex justify-between gap-3"><dt className="text-muted-foreground">{label}{s.applicationEstimated && label?.startsWith("申込") ? "（予定）" : ""}</dt><dd className="text-right">{value ?? "未発表"}{label === "試験日" && s.examDateEnd && s.examDateEnd !== value ? `〜${s.examDateEnd}` : ""}</dd></div>)}
                </dl>
                {manual && <label className="block text-sm font-medium">{s.scheduleStatus === "ondemand" ? "予約した日・受けたい日" : "受験日"}<input type="date" min={japanDate(new Date())} value={date} onChange={e => setDate(e.target.value)} className={fieldClass} /></label>}
                {!manual && <p className="text-sm font-medium">受験日　<time dateTime={examDate}>{examDate}</time>{s.scheduleStatus === "tentative" ? "（予定）" : ""}</p>}
                {s.sourceUrl && <div className="flex justify-end"><a href={s.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center text-xs text-primary underline underline-offset-4">公式日程</a></div>}
              </div>}
            </div>)}
          </fieldset>}
          {scheduleFailed && <p className="text-sm text-muted-foreground">日程を取得できませんでした。受験日を入力してください。</p>}
          {!session && <label className="block text-sm font-medium">受験日<input type="date" min={japanDate(new Date())} value={date} onChange={e => setDate(e.target.value)} className={fieldClass} /></label>}
        </>}
        <fieldset className="grid grid-cols-2 gap-3"><legend className="mb-1.5 text-sm font-medium">1日の勉強時間</legend><label className="text-xs text-muted-foreground">平日（分）<input type="number" min={1} max={1440} value={weekday} onChange={e => setWeekday(Number(e.target.value))} className={`${fieldClass} text-base text-foreground`} /></label><label className="text-xs text-muted-foreground">休日（分）<input type="number" min={1} max={1440} value={holiday} onChange={e => setHoliday(Number(e.target.value))} className={`${fieldClass} text-base text-foreground`} /></label></fieldset>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <Button size="xl" className="w-full" disabled={loading || saving || !examDate || examDate < japanDate(new Date()) || !Number.isInteger(weekday) || weekday < 1 || weekday > 1440 || !Number.isInteger(holiday) || holiday < 1 || holiday > 1440} onClick={() => void create()}>{saving ? "作成中…" : "この回で作成"}</Button>
      </div>
    </SheetContent>
  </Sheet>;
}
