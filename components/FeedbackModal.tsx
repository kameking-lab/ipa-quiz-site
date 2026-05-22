"use client";

import * as React from "react";
import { Send, Bug } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TurnstileWidget } from "@/components/TurnstileWidget";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export type FeedbackCategory = "typo" | "wrong-answer" | "poor-explanation" | "other";

const CATEGORIES: { id: FeedbackCategory; label: string; emoji: string }[] = [
  { id: "typo", label: "誤字・表記ミス", emoji: "✏️" },
  { id: "wrong-answer", label: "正解が間違っている", emoji: "❌" },
  { id: "poor-explanation", label: "解説が不十分・不正確", emoji: "📝" },
  { id: "other", label: "その他", emoji: "💬" },
];

interface Props {
  open: boolean;
  onClose: () => void;
  questionId?: string;
  pageUrl?: string;
}

export function FeedbackModal({ open, onClose, questionId, pageUrl }: Props) {
  const [category, setCategory] = React.useState<FeedbackCategory | null>(null);
  const [comment, setComment] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = React.useState<string>("");

  React.useEffect(() => {
    if (!open) {
      setCategory(null);
      setComment("");
      setSubmitted(false);
      setSubmitting(false);
      setError(null);
      setTurnstileToken("");
    }
  }, [open]);

  const turnstileRequired = Boolean(TURNSTILE_SITE_KEY);
  const handleTurnstileToken = React.useCallback((t: string) => setTurnstileToken(t), []);
  const handleTurnstileError = React.useCallback(
    () => setError("人間認証に失敗しました。ページを再読み込みしてください。"),
    [],
  );

  const resolvedUrl =
    pageUrl ?? (typeof window !== "undefined" ? window.location.href : "");

  const submit = async () => {
    if (!category) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          category,
          comment: comment.trim().slice(0, 800) || undefined,
          pageUrl: resolvedUrl,
          questionId: questionId ?? undefined,
          turnstileToken: turnstileToken || undefined,
        }),
        cache: "no-store",
        keepalive: true,
      });
      if (res.status === 429) {
        setError("送信が多すぎます。しばらく経ってからお試しください。");
        setSubmitting(false);
        return;
      }
      if (res.status === 403) {
        setError("人間認証に失敗しました。再度ご確認ください。");
        setSubmitting(false);
        return;
      }
      if (!res.ok) {
        setError("送信に失敗しました。時間をおいて再試行してください。");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("ネットワークエラーが発生しました。");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        {submitted ? (
          <>
            <DialogHeader>
              <div className="mb-2 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <Bug className="h-5 w-5" />
                <span className="text-sm font-semibold">報告を受け付けました</span>
              </div>
              <DialogTitle>ご報告ありがとうございます</DialogTitle>
              <DialogDescription>
                内容を確認し、品質改善に役立てます。引き続き学習をどうぞ。
              </DialogDescription>
            </DialogHeader>
            <div className="mt-3 flex justify-end">
              <Button variant="primary" onClick={onClose}>
                閉じる
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="mb-2 flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <Bug className="h-5 w-5" />
                <span className="text-sm font-semibold">誤り・不具合を報告</span>
              </div>
              <DialogTitle>どのような問題がありましたか？</DialogTitle>
              <DialogDescription>
                問題ページから直接報告できます。問題 ID・URL は自動で付与されます。
              </DialogDescription>
            </DialogHeader>

            <fieldset className="mt-3 space-y-2">
              <legend className="sr-only">報告カテゴリ</legend>
              {CATEGORIES.map((c) => (
                <label
                  key={c.id}
                  className={
                    "flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 text-sm transition-colors " +
                    (category === c.id
                      ? "border-rose-400 bg-rose-50 dark:border-rose-500 dark:bg-rose-950/40"
                      : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800")
                  }
                >
                  <input
                    type="radio"
                    name="feedback-category"
                    value={c.id}
                    className="sr-only"
                    checked={category === c.id}
                    onChange={() => setCategory(c.id)}
                  />
                  <span aria-hidden="true" className="text-base">
                    {c.emoji}
                  </span>
                  <span className="text-zinc-800 dark:text-zinc-100">{c.label}</span>
                </label>
              ))}
            </fieldset>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, 800))}
              rows={3}
              maxLength={800}
              placeholder="詳細を記入してください（任意・800 文字以内）&#10;例: 選択肢ウの説明が正しくありません"
              className="mt-3 w-full resize-none rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-400 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-600"
            />

            {turnstileRequired && TURNSTILE_SITE_KEY && (
              <TurnstileWidget
                siteKey={TURNSTILE_SITE_KEY}
                onToken={handleTurnstileToken}
                onError={handleTurnstileError}
              />
            )}

            {error && (
              <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">{error}</p>
            )}

            {questionId && (
              <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                問題 ID: <code className="font-mono">{questionId}</code>
              </p>
            )}

            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button variant="outline" onClick={onClose} className="sm:order-1">
                キャンセル
              </Button>
              <Button
                variant="destructive"
                onClick={() => void submit()}
                disabled={!category || submitting || (turnstileRequired && !turnstileToken)}
                className="sm:order-2"
              >
                <Send className="h-4 w-4" />
                {submitting ? "送信中..." : "報告する"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
