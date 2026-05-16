"use client";

import * as React from "react";
import type { ExamCode } from "@/lib/questions/types";
import { getMockConfig } from "@/lib/mock-exam/config";
import { getMockExamHistoryByExam } from "@/lib/mock-exam/storage";
import type {
  MockExamFetchResponse,
  SlimMockQuestion,
} from "@/lib/mock-exam/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { examLabel } from "@/lib/utils";
import { Loader2, Timer } from "lucide-react";
import { MockExamRunner } from "./MockExamRunner";

const AVAILABLE_EXAMS: ExamCode[] = ["ip", "fe", "ap", "sg"];

export function MockExamLanding({ examFromQuery }: { examFromQuery?: string }) {
  const [exam, setExam] = React.useState<ExamCode>(
    (examFromQuery as ExamCode) || "ap",
  );
  const [questions, setQuestions] = React.useState<SlimMockQuestion[] | null>(
    null,
  );
  const [running, setRunning] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [history, setHistory] = React.useState<
    ReturnType<typeof getMockExamHistoryByExam>
  >([]);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setHistory(getMockExamHistoryByExam(exam));
    setReady(true);
  }, [exam]);

  const config = getMockConfig(exam);

  const startMock = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/mock-exam/${exam}`, { cache: "no-store" });
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
      setQuestions(data.questions);
      setRunning(true);
    } catch {
      setError("通信エラーが発生しました。再度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = () => {
    setRunning(false);
    setQuestions(null);
    setHistory(getMockExamHistoryByExam(exam));
  };

  if (running && questions) {
    return (
      <MockExamRunner
        questions={questions}
        config={config}
        onFinish={onFinish}
      />
    );
  }

  const trend = history.slice(-10);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-10 pt-8 sm:px-6 min-h-[640px]">
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

      <div className="mb-4 flex flex-nowrap gap-2 overflow-x-auto pb-1">
        {AVAILABLE_EXAMS.map((e) => (
          <button
            key={e}
            onClick={() => setExam(e)}
            className={`h-8 flex-shrink-0 rounded-full px-3 text-xs font-medium transition ${
              exam === e
                ? "bg-sky-600 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {examLabel(e)}
          </button>
        ))}
      </div>

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
              開始後は中断できますが、再開はできません。集中できる環境で挑戦してください。
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
        収録: 全試験区分が利用可能ですが、上の試験区分が安定して動作します。
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
