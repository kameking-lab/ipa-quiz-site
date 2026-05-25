"use client";

import * as React from "react";
import type { ExamCode } from "@/lib/questions/types";
import { getMockConfig, MOCK_EXAM_CONFIGS } from "@/lib/mock-exam/config";
import { getMockExamHistoryByExam } from "@/lib/mock-exam/storage";
import {
  clearActiveSession,
  loadActiveSession,
  type MockExamActiveSession,
} from "@/lib/mock-exam/session";
import type { SelectionMode } from "@/lib/mock-exam/selection";
import type {
  MockExamFetchResponse,
  SlimMockQuestion,
} from "@/lib/mock-exam/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { examLabel } from "@/lib/utils";
import { Loader2, Timer, ChevronDown, BarChart3 } from "lucide-react";
import { MockExamRunner } from "./MockExamRunner";

const AVAILABLE_EXAMS: ExamCode[] = [
  "ip",
  "sg",
  "fe",
  "ap",
  "sc",
  "nw",
  "db",
  "es",
  "st",
  "sa",
  "pm",
  "sm",
  "au",
];

const MODE_OPTIONS: { id: SelectionMode; label: string; hint: string }[] = [
  { id: "balanced", label: "分野バランス", hint: "本番の分野構成比を維持" },
  { id: "random", label: "完全ランダム", hint: "プールから無作為抽出" },
];

export function MockExamLanding({ examFromQuery }: { examFromQuery?: string }) {
  const initialExam = (
    examFromQuery && examFromQuery in MOCK_EXAM_CONFIGS
      ? (examFromQuery as ExamCode)
      : "ap"
  ) as ExamCode;
  const [exam, setExam] = React.useState<ExamCode>(initialExam);
  const [mode, setMode] = React.useState<SelectionMode>("balanced");
  const [questions, setQuestions] = React.useState<SlimMockQuestion[] | null>(
    null,
  );
  const [resumeState, setResumeState] =
    React.useState<MockExamActiveSession | null>(null);
  const [running, setRunning] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [history, setHistory] = React.useState<
    ReturnType<typeof getMockExamHistoryByExam>
  >([]);
  const [ready, setReady] = React.useState(false);
  const [savedSession, setSavedSession] =
    React.useState<MockExamActiveSession | null>(null);

  React.useEffect(() => {
    setHistory(getMockExamHistoryByExam(exam));
    setReady(true);
  }, [exam]);

  React.useEffect(() => {
    setSavedSession(loadActiveSession());
  }, [running]);

  const config = getMockConfig(exam);

  const startMock = async () => {
    setLoading(true);
    setError(null);
    setResumeState(null);
    try {
      const res = await fetch(`/api/mock-exam/${exam}?mode=${mode}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { message?: string }
          | null;
        setError(body?.message ?? "問題の取得に失敗しました。");
        return;
      }
      const data = (await res.json()) as MockExamFetchResponse;
      if (!data.questions || data.questions.length === 0) {
        setError("問題が不足しています。");
        return;
      }
      // Starting fresh: drop any previous saved session for any exam.
      clearActiveSession();
      setQuestions(data.questions);
      setRunning(true);
    } catch {
      setError("通信エラーが発生しました。再度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  const resumeMock = (s: MockExamActiveSession) => {
    setExam(s.exam);
    setQuestions(s.questions);
    setResumeState(s);
    setRunning(true);
  };

  const discardSavedSession = () => {
    clearActiveSession();
    setSavedSession(null);
  };

  const onFinish = () => {
    setRunning(false);
    setQuestions(null);
    setResumeState(null);
    setHistory(getMockExamHistoryByExam(exam));
    setSavedSession(null);
  };

  if (running && questions) {
    return (
      <MockExamRunner
        questions={questions}
        config={config}
        onFinish={onFinish}
        resumeFrom={resumeState ?? undefined}
      />
    );
  }

  const trend = history.slice(-10);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-10 pt-8 sm:px-6 min-h-[640px]">
      <Breadcrumbs
        items={[
          { name: "ホーム", href: "/" },
          { name: "模試モード", href: "/mock-exam" },
        ]}
      />
      <header className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <Timer className="h-5 w-5 text-sky-500" />
          <Badge variant="outline">本番形式</Badge>
        </div>
        <h1 className="text-2xl font-bold">模試モード — 本番形式で実力チェック</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          本番と同じ問題数・時間配分で挑戦。終了後に合否判定と分野別分析を表示します。
        </p>
      </header>

      {savedSession && (
        <Card className="mb-4 border-amber-300 bg-amber-50/60 dark:border-amber-800 dark:bg-amber-950/30">
          <CardContent className="pt-5">
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="outline">中断中</Badge>
              <span className="text-xs font-medium">
                {getMockConfig(savedSession.exam).label}
              </span>
            </div>
            <p className="text-xs text-zinc-700 dark:text-zinc-300">
              {new Date(savedSession.startedAt).toLocaleString("ja-JP", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
              に開始した模試があります（
              {savedSession.answers.filter((a) => a !== undefined).length}/
              {savedSession.questions.length}問解答済）。
            </p>
            <div className="mt-3 flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => resumeMock(savedSession)}
              >
                再開する
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={discardSavedSession}
              >
                破棄する
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <ExamSelector
        exams={AVAILABLE_EXAMS}
        current={exam}
        defaultExam="ap"
        onSelect={setExam}
      />

      <Card className="mb-4 min-h-[200px]">
        <CardContent className="pt-5">
          <h2 className="mb-3 line-clamp-2 text-base font-semibold">{config.label}</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <Stat label="問題数" value={`${config.questions}問`} />
            <Stat label="制限時間" value={`${config.minutes}分`} />
            <Stat
              label="合格基準"
              value={`${Math.round(config.passThreshold * 100)}%`}
            />
          </div>

          <div className="mt-5">
            <div className="mb-2 text-xs font-semibold text-zinc-500">
              出題モード
            </div>
            <div className="grid grid-cols-2 gap-2">
              {MODE_OPTIONS.map((o) => {
                const active = mode === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setMode(o.id)}
                    className={`rounded-xl border px-3 py-2 text-left transition ${
                      active
                        ? "border-sky-400 bg-sky-50 dark:border-sky-600 dark:bg-sky-950/40"
                        : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
                    }`}
                  >
                    <div className="text-xs font-semibold">{o.label}</div>
                    <div className="mt-0.5 text-[11px] text-zinc-500">
                      {o.hint}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <ResultPreviewHint />

          <div className="mt-5">
            <Button
              onClick={startMock}
              variant="primary"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  問題を読み込み中…
                </>
              ) : (
                "模試を開始する"
              )}
            </Button>
            {error && (
              <p className="mt-2 text-center text-xs text-rose-600 dark:text-rose-400">
                {error}
              </p>
            )}
            <p className="mt-2 text-center text-[11px] text-zinc-500">
              中断してもブラウザを閉じるまでは再開できます。タイマーは経過時間で継続します。
            </p>
          </div>
        </CardContent>
      </Card>

      {/* History area: reserve space to prevent CLS when localStorage history loads */}
      <div className="mt-6 min-h-[200px]" aria-live="polite">
      {!ready ? (
        <div className="flex h-[200px] items-center justify-center" aria-hidden="true">
          <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
        </div>
      ) : history.length > 0 ? (
        <>
          <h2 className="mb-3 text-sm font-semibold">過去の模試 ({history.length}回)</h2>
          {trend.length >= 2 && <ScoreTrend results={trend} pass={config.passThreshold} />}
          <Card className="mt-3">
            <CardContent className="pt-5">
              <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {[...history].reverse().slice(0, 10).map((r) => (
                  <li
                    key={r.id}
                    className="flex items-center justify-between py-2 text-sm"
                  >
                    <div>
                      <div className="font-medium">
                        {new Date(r.finishedAt).toLocaleString("ja-JP", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="text-[11px] text-zinc-500">
                        {r.correct}/{r.totalQuestions}問正解 ・{" "}
                        {Math.round(r.timeUsedSec / 60)}分使用
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold ${
                          r.passed
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {r.scorePct}%
                      </div>
                      <Badge variant={r.passed ? "success" : "danger"}>
                        {r.passed ? "合格" : "不合格"}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </>
      ) : null}
      </div>

      <p className="mt-6 text-[11px] text-zinc-500">
        収録: 全13試験区分が利用可能です。問題数が少ない区分はプールから可能な範囲で抽出します。
      </p>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] text-zinc-500">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}

function ScoreTrend({
  results,
  pass,
}: {
  results: ReturnType<typeof getMockExamHistoryByExam>;
  pass: number;
}) {
  const max = 100;
  const w = 320;
  const h = 80;
  const step = w / Math.max(1, results.length - 1);
  const points = results
    .map((r, i) => `${i * step},${h - (r.scorePct / max) * h}`)
    .join(" ");
  const passY = h - pass * 100 * (h / max);

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="mb-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
          スコア推移
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="h-20 w-full">
          <line
            x1={0}
            x2={w}
            y1={passY}
            y2={passY}
            stroke="currentColor"
            strokeDasharray="4 4"
            className="text-zinc-300 dark:text-zinc-700"
          />
          <polyline
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="text-sky-500"
          />
          {results.map((r, i) => (
            <circle
              key={r.id}
              cx={i * step}
              cy={h - (r.scorePct / max) * h}
              r={3}
              className={r.passed ? "fill-emerald-500" : "fill-rose-500"}
            />
          ))}
        </svg>
      </CardContent>
    </Card>
  );
}

interface ExamSelectorProps {
  exams: ExamCode[];
  current: ExamCode;
  defaultExam: ExamCode;
  onSelect: (e: ExamCode) => void;
}

function ExamSelector({ exams, current, defaultExam, onSelect }: ExamSelectorProps) {
  const [userPicked, setUserPicked] = React.useState(false);
  const handle = (e: ExamCode) => {
    setUserPicked(true);
    onSelect(e);
  };
  const showingDefault = !userPicked && current === defaultExam;

  return (
    <div className="mb-4">
      {/* Mobile: native select keeps the choice one-tap and avoids horizontal scroll. */}
      <label className="block sm:hidden">
        <span className="mb-1 block text-xs font-semibold text-zinc-600 dark:text-zinc-400">
          試験区分を選択
        </span>
        <div className="relative">
          <select
            aria-label="模試の試験区分"
            value={current}
            onChange={(ev) => handle(ev.target.value as ExamCode)}
            className="h-11 w-full appearance-none rounded-xl border border-zinc-300 bg-white pl-3 pr-9 text-sm text-zinc-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          >
            {exams.map((e) => (
              <option key={e} value={e}>
                {examLabel(e)}
                {e === defaultExam ? "（既定）" : ""}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
            aria-hidden="true"
          />
        </div>
        {showingDefault && (
          <p className="mt-1 text-[11px] text-zinc-500">
            既定の応用情報を表示中です。タップで変更できます。
          </p>
        )}
      </label>

      {/* PC: 13-card grid, no horizontal scroll. Active state shows whether */}
      {/* it was user-picked vs the default fallback. */}
      <div
        role="radiogroup"
        aria-label="模試の試験区分"
        className="hidden grid-cols-3 gap-2 sm:grid lg:grid-cols-5"
      >
        {exams.map((e) => {
          const active = current === e;
          const isDefaultFallback = active && !userPicked && e === defaultExam;
          return (
            <button
              key={e}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => handle(e)}
              className={
                active
                  ? "relative min-h-[44px] rounded-xl border-2 border-sky-500 bg-sky-50 px-2 py-2 text-xs font-semibold text-sky-900 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-sky-950/40 dark:text-sky-100"
                  : "min-h-[44px] rounded-xl border border-zinc-200 bg-white px-2 py-2 text-xs font-medium text-zinc-700 transition hover:border-sky-300 hover:bg-sky-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-sky-950/30"
              }
            >
              {examLabel(e)}
              {isDefaultFallback && (
                <span className="absolute right-1 top-1 rounded bg-zinc-200 px-1 py-0.5 text-[9px] font-bold uppercase text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
                  既定
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ResultPreviewHint() {
  return (
    <div
      className="mt-5 flex items-start gap-3 rounded-xl border border-sky-200 bg-sky-50/60 p-3 text-xs text-sky-900 dark:border-sky-900/60 dark:bg-sky-950/30 dark:text-sky-100"
      aria-label="模試完了後に得られる結果分析の予告"
    >
      <BarChart3
        className="mt-0.5 h-4 w-4 shrink-0 text-sky-500 dark:text-sky-400"
        aria-hidden="true"
      />
      <div className="space-y-1.5">
        <p className="font-semibold">模試後の結果分析でわかること</p>
        <ul className="list-disc space-y-0.5 pl-4 leading-relaxed text-sky-800/90 dark:text-sky-200/90">
          <li>合否判定（合格基準クリアか）</li>
          <li>分野別正答率・弱点分野の可視化</li>
          <li>過去の模試結果との成績推移グラフ</li>
        </ul>
      </div>
    </div>
  );
}
