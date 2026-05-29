"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Save, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  INDUSTRY_LABELS,
  type EssayQuestion,
  type EssayGradingResult,
  type Industry,
} from "@/lib/essay/types";
import {
  readEssayDraft,
  writeEssayDraft,
  clearEssayDraft,
  appendEssayHistory,
} from "@/lib/storage/essay-history";
import {
  essayUsageRemaining,
  incrementEssayUsage,
  FREE_ESSAY_LIMIT_PER_MONTH,
} from "@/lib/storage/essay-rate-limit";
import { LS_KEYS } from "@/lib/storage/keys";
import { EssayResultView } from "./EssayResultView";

const INDUSTRY_OPTIONS: Industry[] = [
  "manufacturing",
  "finance",
  "retail",
  "it",
  "public",
  "healthcare",
  "logistics",
  "construction",
  "education",
  "other",
];

interface Props {
  question: EssayQuestion;
}

export function EssayEditor({ question }: Props) {
  const [industry, setIndustry] = useState<Industry>("it");
  const [answers, setAnswers] = useState<{ ア: string; イ: string; ウ: string }>({
    ア: "",
    イ: "",
    ウ: "",
  });
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<EssayGradingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [remaining, setRemaining] = useState<number>(FREE_ESSAY_LIMIT_PER_MONTH);

  // Hydrate draft + premium status from localStorage after mount (SSR-safe pattern).
  useEffect(() => {
    const draft = readEssayDraft(question.id);
    if (draft) {
      setIndustry((draft.industry as Industry) ?? "it");
      setAnswers({ ア: draft.ア ?? "", イ: draft.イ ?? "", ウ: draft.ウ ?? "" });
      setSavedAt(draft.updatedAt);
    }
    try {
      const premium = window.localStorage.getItem(LS_KEYS.premium) === "1";
      setIsPremium(premium);
      setRemaining(premium ? Infinity : essayUsageRemaining(false));
    } catch {
      // ignore
    }
  }, [question.id]);

  // Auto-save (debounced) when answers/industry change
  useEffect(() => {
    const handle = setTimeout(() => {
      const updatedAt = new Date().toISOString();
      writeEssayDraft(question.id, { industry, ...answers, updatedAt });
      setSavedAt(updatedAt);
    }, 800);
    return () => clearTimeout(handle);
  }, [question.id, industry, answers]);

  const handleChange = useCallback((key: "ア" | "イ" | "ウ", value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }, []);

  const totalChars = useMemo(
    () => answers.ア.length + answers.イ.length + answers.ウ.length,
    [answers],
  );

  const canSubmit = totalChars >= 100 && !submitting;

  const handleSubmit = useCallback(async () => {
    if (!canSubmit) return;
    if (!isPremium && remaining <= 0) {
      setError(
        "今月の AI 添削上限（月3回）に達しました。Premium にアップグレードすると無制限です。",
      );
      return;
    }
    setSubmitting(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/essay-grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: question.id, industry, answers }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { message?: string } | null;
        throw new Error(data?.message ?? `採点に失敗しました（HTTP ${res.status}）`);
      }
      const data = (await res.json()) as EssayGradingResult;
      setResult(data);

      // Persist usage + history
      if (!isPremium) {
        const u = incrementEssayUsage();
        setRemaining(Math.max(0, FREE_ESSAY_LIMIT_PER_MONTH - u.count));
      }
      const totalScore = Math.round(
        data.subResults.reduce((acc, r) => acc + r.score, 0) /
          Math.max(data.subResults.length, 1),
      );
      appendEssayHistory({
        id: `${question.id}-${Date.now()}`,
        questionId: question.id,
        exam: question.exam,
        industry,
        rank: data.rank,
        passProbability: data.passProbability,
        totalScore,
        gradedAt: data.gradedAt,
        submission: { ...answers },
      });

      // Clear draft after successful submit
      clearEssayDraft(question.id);

      // Scroll to result
      requestAnimationFrame(() => {
        document.getElementById("essay-result")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "採点中にエラーが発生しました。");
    } finally {
      setSubmitting(false);
    }
  }, [canSubmit, isPremium, remaining, question, industry, answers]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-base">業種を選択</CardTitle>
            <Badge variant="outline">業種別事例の評価に使用</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value as Industry)}
            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          >
            {INDUSTRY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {INDUSTRY_LABELS[opt]}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {question.subPrompts.map((sub) => (
        <SubPromptEditor
          key={sub.key}
          subKey={sub.key}
          prompt={sub.prompt}
          targetChars={sub.targetChars}
          minChars={sub.minChars}
          maxChars={sub.maxChars}
          modelOutline={sub.modelOutline}
          value={answers[sub.key]}
          onChange={(v) => handleChange(sub.key, v)}
        />
      ))}

      <Card>
        <CardContent className="flex flex-col gap-3 pt-5">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1">
              <Save className="h-3 w-3" />
              {savedAt ? `自動保存済 ${formatTime(savedAt)}` : "未保存"}
            </span>
            <span>
              {isPremium ? (
                <Badge variant="success">Premium · 無制限</Badge>
              ) : (
                <Badge variant={remaining > 0 ? "outline" : "danger"}>
                  今月残り {remaining} / {FREE_ESSAY_LIMIT_PER_MONTH} 回
                </Badge>
              )}
            </span>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button
            type="button"
            variant="primary"
            size="lg"
            disabled={!canSubmit || (!isPremium && remaining <= 0)}
            onClick={handleSubmit}
            className="w-full"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> AI 採点中…（最大1分）
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> AI に採点してもらう
              </>
            )}
          </Button>

          {!canSubmit && !submitting && (
            <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
              合計 100 字以上で採点できます（現在 {totalChars} 字）
            </p>
          )}
        </CardContent>
      </Card>

      {result && (
        <div id="essay-result">
          <EssayResultView result={result} question={question} />
        </div>
      )}
    </div>
  );
}

interface SubPromptEditorProps {
  subKey: "ア" | "イ" | "ウ";
  prompt: string;
  targetChars: number;
  minChars: number;
  maxChars: number;
  modelOutline: string;
  value: string;
  onChange: (v: string) => void;
}

function SubPromptEditor({
  subKey,
  prompt,
  targetChars,
  minChars,
  maxChars,
  modelOutline,
  value,
  onChange,
}: SubPromptEditorProps) {
  const [showHint, setShowHint] = useState(false);
  const len = value.length;
  const status = charCountStatus(len, minChars, maxChars);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base">設問{subKey}</CardTitle>
          <span
            id={`essay-${subKey}-count`}
            className={`text-sm font-medium tabular-nums ${status.color}`}
          >
            {len} / {targetChars} 字目安
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {prompt}
        </p>
      </CardHeader>
      <CardContent>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={subKey === "イ" ? 14 : 10}
          aria-label={`設問${subKey}の論述`}
          aria-describedby={`essay-${subKey}-count`}
          placeholder={`設問${subKey}の論述（${minChars}〜${maxChars}字）...`}
          className="w-full resize-y rounded-xl border border-zinc-300 bg-white p-3 font-mono text-sm leading-relaxed dark:border-zinc-700 dark:bg-zinc-950"
        />
        <div className="mt-2 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => setShowHint((v) => !v)}
            className="text-sky-600 hover:underline dark:text-sky-400"
          >
            {showHint ? "ヒントを隠す" : "論述要素のヒントを表示"}
          </button>
          <span className={`tabular-nums ${status.color}`}>{status.message}</span>
        </div>
        {showHint && (
          <div className="mt-3 rounded-lg border border-sky-200 bg-sky-50 p-3 text-xs text-sky-900 dark:border-sky-900 dark:bg-sky-950/50 dark:text-sky-100">
            <p className="mb-1 font-semibold">想定される論述要素</p>
            <p className="leading-relaxed whitespace-pre-wrap">{modelOutline}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function charCountStatus(
  len: number,
  min: number,
  max: number,
): { color: string; message: string } {
  if (len === 0) return { color: "text-zinc-400", message: "未入力" };
  if (len < min) return { color: "text-amber-600 dark:text-amber-400", message: `下限まで ${min - len} 字` };
  if (len > max * 1.2) return { color: "text-red-600 dark:text-red-400", message: "字数超過に注意" };
  if (len > max) return { color: "text-amber-600 dark:text-amber-400", message: "目安超過" };
  return { color: "text-emerald-600 dark:text-emerald-400", message: "適正範囲" };
}

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}
