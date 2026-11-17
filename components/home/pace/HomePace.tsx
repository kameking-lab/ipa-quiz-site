"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { HomeDirectoryDomain } from "@/lib/home/home-directory";
import { calculatePace, refreshThinRange, type AnswerAttempt, type PacePlan } from "@/lib/study-plan/pace";
import { listPacePlans, savePacePlan, deletePacePlan } from "@/lib/study-plan/pace-storage";
import { answersToday, deadlineWarning, shouldShowPaceOffer, type PaceOffer } from "@/lib/study-plan/home";
import { paceAttempts, loadPlanCatalog } from "@/lib/study-plan/client";
import { frequentExamKeys, japanDate, upcomingExamPicks } from "@/lib/home/featured-exams";
import { readLastQuestion } from "@/lib/storage/last-question";
import { listExamLearningSummaries } from "@/lib/exam-library-session";
import { LS_KEYS } from "@/lib/storage/keys";
import { qualificationStudyArt } from "@/lib/home/study-room";
import { passingLineForExam } from "@/lib/study-plan/policy";
import { qualificationIdsForExam } from "@/lib/study-plan/schedule";
import { PRICE_PAGE_LINK } from "@/lib/billing/price-page-link";
import { PlanCreateSheet } from "./PlanCreateSheet";
import { PaceTrack } from "./PaceTrack";
import { StudyRoomLine } from "./StudyRoomLine";
import styles from "./HomePace.module.css";

interface Resume { exam: string; name: string; href: string; caption: string }
function readOffer(): PaceOffer {
  try { const value = JSON.parse(localStorage.getItem(LS_KEYS.paceOffer) ?? "{}"); return {
    shownOn: typeof value?.shownOn === "string" ? value.shownOn : undefined,
    dismissedOn: typeof value?.dismissedOn === "string" ? value.dismissedOn : undefined,
  }; } catch { return {}; }
}
function storeOffer(value: PaceOffer) { try { localStorage.setItem(LS_KEYS.paceOffer, JSON.stringify(value)); return true; } catch { return false; } }

export function HomePace({ domains, planExamKeys, createOnLoad = false }: {
  domains: readonly HomeDirectoryDomain[]; planExamKeys: readonly string[]; createOnLoad?: boolean;
}) {
  const router = useRouter();
  useEffect(() => {
    if (["#choose-qualification", "#home-directory-title"].includes(location.hash)) router.replace("/search");
  }, [router]);
  const items = useMemo(() => domains.flatMap(d => [...d.featured, ...d.compact]), [domains]);
  const planItems = useMemo(() => items.filter(item => planExamKeys.includes(item.key)), [items, planExamKeys]);
  const [plans, setPlans] = useState<PacePlan[]>([]);
  const [active, setActive] = useState("");
  const [attempts, setAttempts] = useState<AnswerAttempt[]>([]);
  const [today, setToday] = useState(japanDate(new Date()));
  const [ready, setReady] = useState(false);
  const [resume, setResume] = useState<Resume | null>(null);
  const [recent, setRecent] = useState("");
  const [sheet, setSheet] = useState<"create" | "switch" | "detail" | "registration" | null>(createOnLoad ? "create" : null);
  const [query, setQuery] = useState("");
  const [paid, setPaid] = useState<boolean | null>(null);
  const [offerVisibleOn, setOfferVisibleOn] = useState("");
  const [error, setError] = useState("");
  const offerClaimed = useRef("");
  const refresh = useCallback(() => {
    setPlans(listPacePlans()); setAttempts(paceAttempts()); setToday(japanDate(new Date())); setReady(true);
    const history = paceAttempts();
    const aliases = Object.fromEntries(items.flatMap(item => (item.historyPrefixes ?? []).map(p => [p, item.key])));
    setRecent(frequentExamKeys(history, items.map(i => i.key), aliases)[0] ?? "");
  }, [items]);
  useEffect(() => {
    refresh();
    const visible = () => { if (document.visibilityState === "visible") refresh(); };
    window.addEventListener("study-plan:changed", refresh); window.addEventListener("storage", refresh);
    window.addEventListener("pageshow", refresh); window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", visible);
    const timer = window.setInterval(refresh, 60_000);
    return () => { window.removeEventListener("study-plan:changed", refresh); window.removeEventListener("storage", refresh);
      window.removeEventListener("pageshow", refresh); window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", visible); window.clearInterval(timer); };
  }, [refresh]);
  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/billing/status", { signal: controller.signal, cache: "no-store" })
      .then(async r => { if (r.status === 401) return { entitled: false }; if (!r.ok) throw new Error(); return await r.json() as { entitled?: boolean }; })
      .then(data => { if (!controller.signal.aborted) setPaid(data.entitled === true); }).catch(() => {});
    return () => controller.abort();
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    const last = readLastQuestion();
    const safety = listExamLearningSummaries().find(s => s.lastQuestionId && s.answered > 0);
    const useSafety = safety && (!last || Date.parse(safety.updatedAt) > last.answeredAt);
    if (!last && !useSafety) return;
    const params = useSafety ? new URLSearchParams({ paper: safety.examId, question: safety.lastQuestionId! })
      : new URLSearchParams({ exam: last!.exam, year: String(last!.year), season: last!.season, session: last!.session, qNumber: String(last!.qNumber), part: last!.part ?? "" });
    void fetch(`/api/home/resume?${params}`, { signal: controller.signal }).then(async r => { if (r.ok) setResume(await r.json() as Resume); }).catch(() => {});
    return () => controller.abort();
  }, []);
  const plan = plans.find(p => p.id === active) ?? plans[0];
  useEffect(() => {
    if (!plan) return;
    const controller = new AbortController();
    void loadPlanCatalog(plan.exam, controller.signal).then(catalog => {
      const updated = refreshThinRange(plan, catalog, today);
      if (updated !== plan) savePacePlan(updated);
    }).catch(() => {});
    return () => controller.abort();
  }, [plan, today]);
  useEffect(() => {
    if (!plan || paid === null || offerClaimed.current === today) return;
    const offer = readOffer();
    if (shouldShowPaceOffer(plan, attempts, today, paid, offer) && storeOffer({ ...offer, shownOn: today })) {
      offerClaimed.current = today; setOfferVisibleOn(today);
    }
  }, [plan, attempts, today, paid]);
  const pace = plan ? calculatePace(plan, attempts, today) : null;
  const warning = plan && !plan.result && (pace?.daysRemaining === null || (pace?.daysRemaining ?? -1) >= 0) ? deadlineWarning(plan, today) : null;
  const item = items.find(i => i.key === plan?.exam);
  const initialExam = plan?.exam ?? (planItems.some(i => i.key === recent) ? recent : planItems[0]?.key ?? "ip");
  const completedToday = answersToday(attempts, today, plan ? new Set(plan.range.questionIds) : undefined);
  const matched = query ? items.filter(i => `${i.name}${i.abbr ?? ""}`.normalize("NFKC").toLowerCase().includes(query.normalize("NFKC").toLowerCase())).slice(0, 6)
    : upcomingExamPicks(items.map(i => i.key), [], new Date(`${today}T00:00:00+09:00`)).map(pick => items.find(i => i.key === pick.key)!).filter(Boolean);
  function updatePlan(patch: Partial<PacePlan>) {
    if (!plan) return;
    if (!savePacePlan({ ...plan, ...patch, updatedAt: new Date().toISOString() })) setError("保存できませんでした。");
    else { setError(""); setSheet(null); }
  }
  const nextKeys: Record<string, string> = { ip: "fe", fe: "ap", fp3: "fp2", fp2: "fp1", denko2: "denko1", denken3: "denken2", denken2: "denken1" };
  const planDomain = domains.find(d => [...d.featured, ...d.compact].some(i => i.key === plan?.exam));
  const next = items.find(i => i.key === nextKeys[plan?.exam ?? ""]) ??
    [...(planDomain?.featured ?? []), ...(planDomain?.compact ?? [])].find(i => i.key !== plan?.exam && i.questionCount > 0) ?? items.find(i => i.key !== plan?.exam && i.questionCount > 0);
  return <>
    <section aria-label="今日の学習" data-home-state={!ready ? "loading" : plan ? "planned" : resume || recent ? "returning" : "new"} className={`${styles.card} overflow-hidden border border-border bg-card`}>
      {ready && plan && pace ? <>
        {warning && <button onClick={() => setSheet("registration")} className={`min-h-11 w-full px-5 py-3 text-left text-sm font-medium ${warning.urgency === "urgent" ? "bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-100" : "bg-amber-100 text-amber-950 dark:bg-amber-950 dark:text-amber-100"}`}>{plan.registration?.estimated ? "申込締切（予定）" : "申込締切"}{warning.remaining === 0 ? "は今日" : warning.remaining === 1 ? "は明日" : `まであと${warning.remaining}日`} <span aria-hidden="true">›</span></button>}
        <div className={styles.content}>
          <button className={styles.qualification} onClick={() => setSheet("switch")} aria-label="資格を切り替える" aria-describedby="home-qualification" aria-haspopup="dialog"><span id="home-qualification">{item?.name ?? plan.exam}</span><ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" /></button>
          {plan.registration && <p className="mt-1 text-xs text-muted-foreground">{plan.registration.label}</p>}
          {(pace.daysRemaining ?? 0) < 0 ? <div className="py-6 text-center">
            {!plan.result ? <><h1 className="text-xl font-bold">試験、おつかれさまでした</h1><p className="mt-2 text-sm text-muted-foreground">結果はどうでしたか？</p><div className="mt-6 grid grid-cols-3 gap-2">{([['passed', '合格'], ['failed', '不合格'], ['absent', '受けなかった']] as const).map(([result, label]) => <Button key={result} variant={result === "passed" ? "default" : "outline"} className="min-h-12 px-1" onClick={() => updatePlan({ result })}>{label}</Button>)}</div></>
              : plan.result === "passed" ? <><span className="text-4xl" aria-hidden="true">🎉</span><h1 className="mt-3 text-2xl font-bold">合格おめでとう！</h1><PaceDog exam={plan.exam} />{next && <Link className="mt-4 block rounded-xl bg-muted p-4 text-sm font-medium" href={next.href}>次は {next.name}へ <span aria-hidden="true">›</span></Link>}</>
              : <><h1 className="text-xl font-bold">次の一歩を、いっしょに。</h1><Button className="mt-6 min-h-12 w-full" onClick={() => setSheet("create")}>学習計画を作成</Button></>}
          </div> : <>
            <h1 className={styles.countdown}>{pace.daysRemaining === null ? "受験日を設定" : <>試験まで <span>{pace.daysRemaining}</span> 日</>}</h1>
            <PaceTrack plan={plan} percent={pace.percent} target={pace.idealPercent} onOpen={() => setSheet("detail")} />
            <div className="mt-1 flex items-end justify-between gap-3"><p className={`rounded-full px-3 py-1 text-sm font-semibold ${pace.judgment === "behind" ? "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-100" : "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100"}`}>{pace.judgment === "ahead" ? "いいペース" : pace.judgment === "behind" ? "少し遅れ" : pace.judgment === "unscheduled" ? "日程未設定" : "予定どおり"}</p><p className="text-4xl font-bold tabular-nums tracking-tight">{Math.round(pace.percent)}<span className="ml-1 text-base font-normal text-muted-foreground">%</span></p></div>
            {pace.requiredQuestionsPerDay !== null && <p className="mt-4 text-sm font-medium">{pace.requiredQuestionsPerDay === 0 ? "すべての問題を仕上げました" : <>1日 <strong className="text-lg tabular-nums">{pace.requiredQuestionsPerDay}</strong> 問</>}</p>}
            <Button asChild className={`${styles.primary} mt-5 w-full text-base`}><Link href={`/quiz/today?plan=${encodeURIComponent(plan.id)}`}>今日の問題を解く <span aria-hidden="true">→</span></Link></Button>
            <p className="mt-2 text-center text-xs text-muted-foreground">今日 {completedToday}問</p>
            {offerVisibleOn === today && paid === false && pace.judgment === "behind" && (pace.requiredQuestionsPerDay ?? 0) > 10 && <div className="mt-4 flex items-center gap-2 border-t border-border pt-3 text-xs text-muted-foreground"><Link href={PRICE_PAGE_LINK.href} className="flex-1 leading-relaxed underline underline-offset-4">1日{pace.requiredQuestionsPerDay}問必要です。月額プランなら回数無制限で追いつけます</Link><button aria-label="月額プランの案内を閉じる" className="flex min-h-11 min-w-11 items-center justify-center" onClick={() => { storeOffer({ ...readOffer(), dismissedOn: today }); setOfferVisibleOn(""); }}><X className="h-4 w-4" /></button></div>}
          </>}
        </div>
      </> : ready && (resume || recent) ? <div className={styles.content}>
        <p className="text-xs text-muted-foreground">おかえりなさい</p><h1 className="mt-3 text-xl font-bold">{resume?.name ?? items.find(i => i.key === recent)?.name}</h1><p className="mt-2 text-sm text-muted-foreground">{resume?.caption ?? "前回の続きから"}</p>
        <div className="relative my-8 flex h-16 items-center border-b-2 border-dashed border-border"><PaceDog exam={resume?.exam ?? recent} /><span className="ml-auto text-sm text-muted-foreground">試験日 ？</span></div><p className="text-sm text-muted-foreground">今日 {completedToday}問</p>
        <Button asChild className={`${styles.primary} mt-5 w-full`}><Link href={resume?.href ?? items.find(i => i.key === recent)?.href ?? "/search"}>続きを解く <span aria-hidden="true">→</span></Link></Button><Button variant="ghost" className="mt-3 min-h-12 w-full rounded-xl" onClick={() => setSheet("create")}>学習計画を作成</Button>
      </div> : <div className={styles.content}>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">今日も、ひと問ずつ。</h1>
        <label className={`${styles.search} mt-6 flex min-h-14 items-center gap-3 rounded-2xl border border-border bg-background px-4`}><Search aria-hidden="true" className="h-5 w-5 shrink-0 text-muted-foreground" /><input id="qualification-search" aria-label="資格名・略称で検索" aria-controls="home-qualification-results" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="受ける資格は？" className="w-full min-w-0 bg-transparent py-3 text-base outline-none" /></label>
        <h2 id="home-results-title" className="mb-2 mt-5 text-xs text-muted-foreground">{query ? "検索結果" : "試験が近い資格"}</h2><ul id="home-qualification-results" aria-labelledby="home-results-title" className="divide-y divide-border">{matched.map(i => <li key={i.key}><Link href={i.href} className={styles.result}><span>{i.name}</span><span aria-hidden="true">›</span></Link></li>)}</ul>
        {query && !matched.length && <p role="status" className="py-4 text-sm text-muted-foreground">該当する資格が見つかりませんでした。</p>}
        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{domains.reduce((n, d) => n + d.qualificationCount, 0)}資格・{domains.reduce((n, d) => n + d.totalQuestions, 0).toLocaleString("ja-JP")}問・ログインなしで1日10問まで無料</p>
        <Button className={`${styles.primary} mt-5 w-full`} onClick={() => setSheet("create")}>学習計画を作成</Button>
      </div>}
    </section>
    {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
    <StudyRoomLine />
    <PlanCreateSheet open={sheet === "create"} onOpenChange={open => setSheet(open ? "create" : null)} items={planItems} initialExam={initialExam} onCreated={id => { setActive(id); refresh(); }} />
    <Sheet open={sheet === "switch"} onOpenChange={open => setSheet(open ? "switch" : null)}><SheetContent side="bottom" aria-describedby={undefined} className="mx-auto max-h-[min(85dvh,calc(100dvh-var(--safe-top)-1rem))] max-w-[640px] overflow-y-auto pb-[max(1.5rem,var(--safe-bottom))]"><SheetHeader><SheetTitle>受ける資格</SheetTitle></SheetHeader><div className="mt-5 space-y-2">{plans.map(p => <button key={p.id} onClick={() => { setActive(p.id); setSheet(null); }} className="flex min-h-12 w-full items-center justify-between rounded-xl bg-muted px-4 text-left text-sm"><span>{items.find(i => i.key === p.exam)?.name ?? p.exam}<span className="ml-2 text-xs text-muted-foreground">{p.examDate}</span></span>{plan?.id === p.id ? "✓" : ""}</button>)}<Button variant="outline" className="min-h-12 w-full" onClick={() => setSheet("create")}>学習計画を作成</Button>{item && <Link href={item.href} className="block py-4 text-center text-sm underline">年度・科目を選ぶ</Link>}</div></SheetContent></Sheet>
    <Sheet open={sheet === "registration" || sheet === "detail"} onOpenChange={open => { if (!open) setSheet(null); }}><SheetContent side="bottom" aria-describedby={undefined} className="mx-auto max-h-[min(85dvh,calc(100dvh-var(--safe-top)-1rem))] max-w-[640px] overflow-y-auto pb-[max(1.5rem,var(--safe-bottom))]"><SheetHeader><SheetTitle>{sheet === "registration" ? "受験の申し込み" : "学習計画"}</SheetTitle></SheetHeader>{plan && <div className="mt-5 space-y-4 text-sm"><p className="font-semibold">{item?.name ?? plan.exam}　{plan.registration?.label}</p><dl className="space-y-3">{[["申込開始", plan.registration?.start], ["申込締切", plan.registration?.deadline], ["試験日", plan.examDate], ["合格発表", plan.registration?.resultDate]].map(([label, value]) => <div key={label} className="flex justify-between gap-3"><dt className="text-muted-foreground">{label}</dt><dd>{value ?? "未発表"}{plan.registration?.estimated && label?.startsWith("申込") ? "（予定）" : ""}</dd></div>)}</dl>{plan.registration?.sourceUrl && <a href={plan.registration.sourceUrl} target="_blank" rel="noopener noreferrer" className="block min-h-11 py-3 underline">申込ページを開く（公式） ↗</a>}{!plan.registered && <Button className="min-h-12 w-full" onClick={() => updatePlan({ registered: true })}>申込済みにする</Button>}{sheet === "detail" && <><a href={`https://tsugino-shikaku.jp/${qualificationIdsForExam(plan.exam)[0] ? `shikaku/${qualificationIdsForExam(plan.exam)[0]}` : "calendar"}`} target="_blank" rel="noopener noreferrer" className="block py-3 underline">日程を次の資格で見る ↗</a><p>今日 {completedToday}問 · {Math.round(pace?.percent ?? 0)}%</p>{passingLineForExam(plan.exam).sourceUrl && <a className="block underline" href={passingLineForExam(plan.exam).sourceUrl!} target="_blank" rel="noopener noreferrer">合格基準（公式）</a>}{passingLineForExam(plan.exam).conditions && <p className="text-xs text-muted-foreground">{passingLineForExam(plan.exam).conditions}</p>}<Link className="block py-3 underline" href="/me">学習の記録</Link><Button variant="outline" className="min-h-12 w-full" onClick={() => setSheet("create")}>受ける回を変更</Button><button className="min-h-11 w-full text-destructive" onClick={() => { if (deletePacePlan(plan.id)) { setActive(""); setSheet(null); refresh(); } else setError("削除できませんでした。"); }}>計画を削除</button></>}</div>}</SheetContent></Sheet>
  </>;
}
function PaceDog({ exam }: { exam: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={qualificationStudyArt(exam)} onError={e => { if (!e.currentTarget.src.endsWith("/mascot/chihuahua-study.webp")) e.currentTarget.src = "/mascot/chihuahua-study.webp"; }} alt="チワワ" width={80} height={80} className="mx-auto h-20 w-20 object-contain motion-safe:animate-[bounce_2s_infinite] motion-reduce:animate-none" />;
}
