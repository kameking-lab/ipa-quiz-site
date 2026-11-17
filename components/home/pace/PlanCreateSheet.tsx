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
    <SheetContent side="bottom" aria-describedby={undefined} className="mx-auto max-h-[min(90dvh,calc(100dvh-var(--safe-top)-1rem))] max-w-[640px] overflow-y-auto pb-[max(1.5rem,var(--safe-bottom))]">
      <SheetHeader><SheetTitle>学習計画を作成</SheetTitle></SheetHeader>
      <div className="mt-6 space-y-5">
        <label className="block text-sm font-medium">受ける資格<select className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-3" value={exam} onChange={e => setExam(e.target.value)}>{items.map(item => <option key={item.key} value={item.key}>{item.name}</option>)}</select></label>
        {loading ? <p role="status" className="text-sm text-muted-foreground">日程を確認中…</p> : <>
          {sessions.length > 0 && <label className="block text-sm font-medium">受ける回<select className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-3" value={sessionId} onChange={e => { setSessionId(e.target.value); setDate(""); }}>{sessions.map(s => <option key={s.id} value={s.id}>{s.label}{s.scheduleStatus === "tentative" ? "（予定）" : ""}</option>)}</select></label>}
          {scheduleFailed && <p className="text-sm text-muted-foreground">日程を取得できませんでした。受験日を入力してください。</p>}
          {session && <dl className="space-y-2 rounded-2xl bg-muted/50 p-4 text-sm">
            {[["申込開始", session.applicationStart], ["申込締切", session.applicationDeadline], ["試験日", session.examDate], ["合格発表", session.resultDate]].map(([label, value]) => <div key={label} className="flex justify-between gap-3"><dt className="text-muted-foreground">{label}{session.applicationEstimated && label?.startsWith("申込") ? "（予定）" : ""}</dt><dd>{value ?? "未発表"}{label === "試験日" && session.examDateEnd && session.examDateEnd !== value ? `〜${session.examDateEnd}` : ""}</dd></div>)}
            {session.sourceUrl && <div className="pt-1 text-right"><a href={session.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">公式日程</a></div>}
          </dl>}
          {manual && <label className="block text-sm font-medium">{session?.scheduleStatus === "ondemand" ? "予約した日・受けたい日" : "受験日"}<input type="date" min={japanDate(new Date())} value={date} onChange={e => setDate(e.target.value)} className="mt-2 min-h-12 w-full min-w-0 rounded-xl border border-border bg-background px-3" /></label>}
          {!manual && <p className="text-sm font-medium">受験日　<time dateTime={examDate}>{examDate}</time>{session?.scheduleStatus === "tentative" ? "（予定）" : ""}</p>}
        </>}
        <fieldset className="grid grid-cols-2 gap-3"><legend className="mb-2 text-sm font-medium">1日の勉強時間</legend><label className="text-xs text-muted-foreground">平日（分）<input type="number" min={1} max={1440} value={weekday} onChange={e => setWeekday(Number(e.target.value))} className="mt-1 min-h-11 w-full rounded-xl border border-border bg-background px-3 text-base text-foreground" /></label><label className="text-xs text-muted-foreground">休日（分）<input type="number" min={1} max={1440} value={holiday} onChange={e => setHoliday(Number(e.target.value))} className="mt-1 min-h-11 w-full rounded-xl border border-border bg-background px-3 text-base text-foreground" /></label></fieldset>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <Button className="min-h-12 w-full rounded-xl" disabled={loading || saving || !examDate || examDate < japanDate(new Date()) || !Number.isInteger(weekday) || weekday < 1 || weekday > 1440 || !Number.isInteger(holiday) || holiday < 1 || holiday > 1440} onClick={() => void create()}>{saving ? "作成中…" : "この回で作成"}</Button>
      </div>
    </SheetContent>
  </Sheet>;
}
