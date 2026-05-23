"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Clock, Send, ChevronRight } from "lucide-react";

import type {
  AfternoonAnswer,
  AfternoonQuestion,
  AfternoonScoringResult,
} from "@/lib/afternoon/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AfternoonDisclaimer } from "./AfternoonDisclaimer";
import { AfternoonResultView } from "./AfternoonResultView";

interface Props {
  questions: AfternoonQuestion[];
}

function formatTime(totalSec: number): string {
  const sign = totalSec < 0 ? "-" : "";
  const s = Math.abs(totalSec);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${sign}${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

export function AfternoonPlayer({ questions }: Props) {
  const [activeQid, setActiveQid] = useState<string>(questions[0]?.id ?? "");
  const [answers, setAnswers] = useState<Record<string, Record<string, string>>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, AfternoonScoringResult>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const totalMinutes = questions[0]?.totalTimeMinutes ?? 150;
  const [secondsLeft, setSecondsLeft] = useState<number>(totalMinutes * 60);
  const timerStarted = useRef(false);

  useEffect(() => {
    if (!timerStarted.current) timerStarted.current = true;
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, []);

  const active = useMemo(
    () => questions.find((q) => q.id === activeQid) ?? questions[0],
    [activeQid, questions],
  );

  if (!active) {
    return <p className="text-sm text-zinc-500">表示できる午後問題がありません。</p>;
  }

  const activeAnswers = answers[active.id] ?? {};

  const handleChange = (subLabel: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [active.id]: { ...(prev[active.id] ?? {}), [subLabel]: value },
    }));
  };

  const handleSubmit = async () => {
    setErrors((e) => ({ ...e, [active.id]: "" }));
    setSubmitting(active.id);
    try {
      const payload = {
        questionId: active.id,
        answers: active.subQuestions.map<AfternoonAnswer>((s) => ({
          label: s.label,
          text: activeAnswers[s.label] ?? "",
        })),
      };
      const res = await fetch("/api/scoring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        let msg = "採点に失敗しました。しばらく待って再試行してください。";
        try {
          const j = JSON.parse(text) as { message?: string };
          if (j.message) msg = j.message;
        } catch {
          // not JSON; keep default
        }
        setErrors((e) => ({ ...e, [active.id]: msg }));
        return;
      }

      // Stream the JSON body and parse once complete
      const reader = res.body?.getReader();
      if (!reader) throw new Error("no body");
      const decoder = new TextDecoder();
      let buf = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
      }
      buf += decoder.decode();
      let parsed: AfternoonScoringResult;
      try {
        const obj = JSON.parse(buf);
        parsed = obj as AfternoonScoringResult;
      } catch {
        const m = buf.match(/(\{[\s\S]*\})/);
        if (!m) throw new Error("invalid response");
        parsed = JSON.parse(m[1]) as AfternoonScoringResult;
      }
      setResults((prev) => ({ ...prev, [active.id]: parsed }));
    } catch {
      setErrors((e) => ({
        ...e,
        [active.id]: "採点中にエラーが発生しました。ネットワークを確認してください。",
      }));
    } finally {
      setSubmitting(null);
    }
  };

  const result = results[active.id];
  const error = errors[active.id];
  const isSubmitting = submitting === active.id;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
          <Clock className="h-4 w-4" aria-hidden="true" />
          <span className="tabular-nums font-mono text-base">{formatTime(secondsLeft)}</span>
          <span className="text-xs text-zinc-500">残り時間（{totalMinutes}分）</span>
        </div>
        <span className="text-xs text-zinc-500">JST 自動カウント</span>
      </div>

      <AfternoonDisclaimer />

      <nav aria-label="大問選択" className="flex flex-wrap gap-1.5">
        {questions.map((q) => {
          const done = Boolean(results[q.id]);
          const isActive = q.id === active.id;
          return (
            <button
              key={q.id}
              type="button"
              onClick={() => setActiveQid(q.id)}
              className={
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors " +
                (isActive
                  ? "border-sky-500 bg-sky-600 text-white"
                  : done
                    ? "border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-100"
                    : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900")
              }
              aria-current={isActive ? "page" : undefined}
            >
              問{q.qNumber}
            </button>
          );
        })}
      </nav>

      <Card>
        <CardContent className="space-y-4 pt-5">
          <header className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Badge variant="default">問{active.qNumber}</Badge>
              <Badge variant="outline">{active.category}</Badge>
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              {active.title}
            </h2>
          </header>

          <div className="whitespace-pre-wrap rounded-lg bg-zinc-50 p-3 text-sm leading-relaxed text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
            {active.context}
          </div>

          <ol className="space-y-5">
            {active.subQuestions.map((sub) => {
              const value = activeAnswers[sub.label] ?? "";
              const over = sub.maxLength ? value.length > sub.maxLength : false;
              const under = sub.minLength ? value.length < sub.minLength : false;
              const isEssay = sub.type === "essay-text";
              const rows = isEssay ? 16 : sub.type === "long-text" ? 4 : 2;
              return (
                <li key={sub.label} className="space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      {sub.label}
                    </p>
                    {(sub.maxLength || sub.minLength) && (
                      <span
                        className={
                          "text-xs " +
                          (over || under
                            ? "text-red-600 dark:text-red-400"
                            : "text-zinc-500 dark:text-zinc-400")
                        }
                      >
                        {value.length}
                        {sub.minLength && sub.maxLength
                          ? ` / ${sub.minLength}〜${sub.maxLength} 字`
                          : sub.maxLength
                            ? ` / ${sub.maxLength} 字`
                            : sub.minLength
                              ? ` / ${sub.minLength} 字以上`
                              : ""}
                      </span>
                    )}
                  </div>
                  <p className="whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-200">
                    {sub.prompt}
                  </p>

                  {isEssay && sub.compositionPoints && sub.compositionPoints.length > 0 && (
                    <details className="rounded-lg border border-zinc-200 bg-zinc-50 p-2 text-xs dark:border-zinc-800 dark:bg-zinc-900/50">
                      <summary className="cursor-pointer font-semibold text-zinc-700 dark:text-zinc-200">
                        構成のポイント（ヒント）
                      </summary>
                      <ul className="ml-4 mt-2 list-disc space-y-1 text-zinc-700 dark:text-zinc-200">
                        {sub.compositionPoints.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </details>
                  )}

                  <label htmlFor={`afternoon-${sub.label}`} className="sr-only">
                    {sub.label} の解答
                  </label>
                  <textarea
                    id={`afternoon-${sub.label}`}
                    value={value}
                    onChange={(e) => handleChange(sub.label, e.target.value)}
                    rows={rows}
                    aria-required="true"
                    aria-invalid={over || under || undefined}
                    placeholder={isEssay ? "論述（2,000〜3,000字）をここに入力" : "ここに解答を入力"}
                    className={
                      "w-full rounded-xl border px-3 py-2 text-sm leading-relaxed shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-zinc-900 dark:text-zinc-50 " +
                      (over || under
                        ? "border-red-400 focus:ring-red-500"
                        : "border-zinc-300 dark:border-zinc-700")
                    }
                  />
                </li>
              );
            })}
          </ol>

          <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:justify-end">
            {error && (
              <p
                role="alert"
                className="text-sm text-red-600 dark:text-red-400 sm:mr-auto"
              >
                {error}
              </p>
            )}
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="font-semibold"
            >
              {isSubmitting ? (
                <>採点中…</>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  採点する
                </>
              )}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && <AfternoonResultView question={active} result={result} />}
    </div>
  );
}
