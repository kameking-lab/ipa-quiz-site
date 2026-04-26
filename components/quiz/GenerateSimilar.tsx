"use client";

import * as React from "react";
import { Sparkles, Loader2, RefreshCw, Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Question } from "@/lib/questions/types";

interface GeneratedQuestion {
  question: string;
  choices: Record<string, string>;
  answer: string;
  explanation: string;
}

interface Props {
  baseQuestion: Question;
  className?: string;
}

const CHOICES: Array<"ア" | "イ" | "ウ" | "エ"> = ["ア", "イ", "ウ", "エ"];

export function GenerateSimilar({ baseQuestion, className }: Props) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [generated, setGenerated] = React.useState<GeneratedQuestion | null>(null);
  const [picked, setPicked] = React.useState<string | undefined>(undefined);
  const [revealed, setRevealed] = React.useState(false);
  const [provider, setProvider] = React.useState<string | null>(null);

  const fetchSimilar = React.useCallback(
    async (difficultyShift: "easier" | "same" | "harder" = "same") => {
      setLoading(true);
      setError(null);
      setGenerated(null);
      setPicked(undefined);
      setRevealed(false);
      try {
        const res = await fetch("/api/generate-question", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            baseQuestion: {
              id: baseQuestion.id,
              exam: baseQuestion.exam,
              category: baseQuestion.category,
              topicTags: baseQuestion.topicTags ?? [],
              question: baseQuestion.question,
              choices: baseQuestion.choices ?? {},
              answer: Array.isArray(baseQuestion.answer)
                ? baseQuestion.answer[0]
                : String(baseQuestion.answer),
              explanation: baseQuestion.explanation,
            },
            difficultyShift,
          }),
        });
        if (!res.ok) {
          const data = (await res.json().catch(() => ({}))) as { message?: string };
          throw new Error(data.message ?? "類題の生成に失敗しました。");
        }
        const data = (await res.json()) as {
          question: GeneratedQuestion;
          provider?: string;
        };
        setGenerated(data.question);
        setProvider(data.provider ?? null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "類題の生成に失敗しました。");
      } finally {
        setLoading(false);
      }
    },
    [baseQuestion],
  );

  const onPick = (key: string) => {
    if (revealed) return;
    setPicked(key);
    setRevealed(true);
  };

  if (!generated && !loading && !error) {
    return (
      <div className={cn("rounded-2xl border border-dashed border-zinc-300 p-4 dark:border-zinc-700", className)}>
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          <Sparkles className="h-4 w-4 text-sky-500" />
          類題でもっと練習する
        </div>
        <p className="mb-3 text-xs text-zinc-600 dark:text-zinc-400">
          AI が同じ分野・近い難易度の類題を1問だけ生成します。
        </p>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="primary" onClick={() => fetchSimilar("same")}>
            <Sparkles className="h-3.5 w-3.5" />
            類題を出して
          </Button>
          <Button size="sm" variant="outline" onClick={() => fetchSimilar("easier")}>
            やさしめ
          </Button>
          <Button size="sm" variant="outline" onClick={() => fetchSimilar("harder")}>
            むずかしめ
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={cn("flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300", className)}>
        <Loader2 className="h-4 w-4 animate-spin text-sky-500" />
        AI が類題を生成中…
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-100", className)}>
        <div className="mb-2 flex items-center gap-2 font-semibold">
          <AlertTriangle className="h-4 w-4" />
          {error}
        </div>
        <Button size="sm" variant="outline" onClick={() => fetchSimilar("same")}>
          <RefreshCw className="h-3.5 w-3.5" />
          再試行
        </Button>
      </div>
    );
  }

  if (!generated) return null;

  const correctKey = generated.answer;
  const isCorrect = picked === correctKey;

  return (
    <div className={cn("space-y-3 rounded-2xl border border-sky-200 bg-sky-50/50 p-4 dark:border-sky-800 dark:bg-sky-950/20", className)}>
      <div className="flex items-center gap-2 text-xs font-semibold text-sky-800 dark:text-sky-200">
        <Sparkles className="h-3.5 w-3.5" />
        AI 生成の類題
        {provider === "mock" && (
          <span className="rounded bg-amber-200 px-1.5 py-0.5 text-[10px] text-amber-900 dark:bg-amber-900 dark:text-amber-100">
            モック
          </span>
        )}
      </div>
      <div className="rounded-xl bg-white p-4 text-sm leading-relaxed text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        {generated.question.split("\n").map((line, i) => (
          <p key={i} className="mb-2 last:mb-0">
            {line}
          </p>
        ))}
      </div>
      <div className="space-y-2">
        {CHOICES.map((k) => {
          const text = generated.choices[k] ?? "";
          if (!text) return null;
          const isPicked = picked === k;
          const isAns = correctKey === k;
          return (
            <button
              key={k}
              type="button"
              onClick={() => onPick(k)}
              disabled={revealed}
              className={cn(
                "flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm transition",
                !revealed && "border-zinc-200 bg-white hover:border-sky-300 hover:bg-sky-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900",
                revealed && isAns && "border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/30",
                revealed && isPicked && !isAns && "border-red-400 bg-red-50 dark:border-red-700 dark:bg-red-950/30",
                revealed && !isPicked && !isAns && "border-zinc-200 bg-white opacity-60 dark:border-zinc-800 dark:bg-zinc-950",
              )}
            >
              <span className="font-bold text-zinc-700 dark:text-zinc-300">{k}</span>
              <span className="flex-1 text-zinc-800 dark:text-zinc-100">{text}</span>
              {revealed && isAns && <Check className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />}
            </button>
          );
        })}
      </div>
      {revealed && (
        <div className={cn(
          "rounded-xl border p-3 text-sm",
          isCorrect
            ? "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-100"
            : "border-red-300 bg-red-50 text-red-900 dark:border-red-700 dark:bg-red-950/30 dark:text-red-100",
        )}>
          <div className="mb-1 font-semibold">
            {isCorrect ? "正解！" : `不正解（正解は ${correctKey}）`}
          </div>
          {generated.explanation.split("\n").map((line, i) => (
            <p key={i} className="mb-1 last:mb-0 text-xs leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={() => fetchSimilar("same")}>
          <RefreshCw className="h-3.5 w-3.5" />
          別の類題
        </Button>
        <Button size="sm" variant="ghost" onClick={() => fetchSimilar("easier")}>
          やさしめ
        </Button>
        <Button size="sm" variant="ghost" onClick={() => fetchSimilar("harder")}>
          むずかしめ
        </Button>
      </div>
      <p className="text-[10px] text-zinc-500 dark:text-zinc-500">
        ※ AI 生成の類題は IPA 公式問題ではありません。学習補助用です。
      </p>
    </div>
  );
}
