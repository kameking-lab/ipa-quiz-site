"use client";

import * as React from "react";
import { Loader2, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/ui/markdown";
import type { ExamCode } from "@/lib/questions/types";

const ESSAY_EXAMS: ExamCode[] = ["st", "sa", "pm", "sm", "au"];

const EXAM_LABELS: Record<ExamCode, string> = {
  st: "IT ストラテジスト",
  sa: "システムアーキテクト",
  pm: "プロジェクトマネージャ",
  sm: "IT サービスマネージャ",
  au: "システム監査技術者",
  ip: "",
  sg: "",
  fe: "",
  ap: "",
  sc: "",
  nw: "",
  db: "",
  es: "",
};

type Stage = "idle" | "loading" | "done" | "error";

export function EssayGraderClient() {
  const [exam, setExam] = React.useState<ExamCode>("pm");
  const [theme, setTheme] = React.useState("");
  const [essay, setEssay] = React.useState("");
  const [stage, setStage] = React.useState<Stage>("idle");
  const [feedback, setFeedback] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const charCount = essay.length;
  const minChars = 1500;
  const maxChars = 3500;

  async function submit() {
    if (charCount < minChars) {
      setError(`論述は最低 ${minChars} 字必要です（現在 ${charCount} 字）`);
      return;
    }
    setStage("loading");
    setError("");
    setFeedback("");
    try {
      const res = await fetch("/api/essay-grading", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ exam, theme, essay }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "採点に失敗しました");
      }
      // Stream response
      const reader = res.body?.getReader();
      if (!reader) throw new Error("レスポンスを取得できませんでした");
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setFeedback(acc);
      }
      setStage("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "採点に失敗しました");
      setStage("error");
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="space-y-4 pt-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">試験区分</span>
              <select
                value={exam}
                onChange={(e) => setExam(e.target.value as ExamCode)}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
              >
                {ESSAY_EXAMS.map((c) => (
                  <option key={c} value={c}>
                    {EXAM_LABELS[c]}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">設問テーマ（任意）</span>
              <input
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="例: 利害関係者の調整が必要なプロジェクトでの…"
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
                maxLength={300}
              />
            </label>
          </div>
          <label className="block">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">あなたの論述（{minChars}〜{maxChars}字）</span>
              <span
                className={
                  "text-xs " +
                  (charCount < minChars
                    ? "text-rose-600 dark:text-rose-400"
                    : charCount > maxChars
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-emerald-600 dark:text-emerald-400")
                }
              >
                {charCount} / {maxChars} 字
              </span>
            </div>
            <textarea
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              rows={14}
              placeholder="第1章〜第3章の論述本文を貼り付けてください…"
              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm leading-relaxed"
              maxLength={5000}
            />
          </label>
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="primary"
              onClick={submit}
              disabled={stage === "loading" || charCount < minChars}
            >
              {stage === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> 採点中…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> AI 採点を実行
                </>
              )}
            </Button>
          </div>
          {error && (
            <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
          )}
        </CardContent>
      </Card>

      {(stage === "loading" || stage === "done") && feedback && (
        <Card>
          <CardContent className="pt-5">
            <h2 className="mb-3 text-sm font-semibold text-foreground">AI 採点結果</h2>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <Markdown>{feedback}</Markdown>
            </div>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-muted-foreground">
        ※ AI 採点はあくまで学習補助です。実際の試験では IPA 採点者の判断が優先されます。
      </p>
    </div>
  );
}
