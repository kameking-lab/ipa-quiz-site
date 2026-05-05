"use client";

import { useEffect, useState } from "react";
import { ThumbsUp, AlertCircle, Flag, Check } from "lucide-react";

import { LS_KEYS } from "@/lib/storage/keys";

type Rating = "helpful" | "unclear" | "report";

type Stored = Record<string, { rating: Rating; ts: number }>;

function readStore(): Stored {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(LS_KEYS.questionFeedback);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Stored;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeStore(store: Stored): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.questionFeedback, JSON.stringify(store));
  } catch {
    /* quota exceeded — ignore */
  }
}

const META: Record<
  Rating,
  { label: string; icon: typeof ThumbsUp; tone: string; ring: string; ack: string }
> = {
  helpful: {
    label: "役立った",
    icon: ThumbsUp,
    tone: "text-emerald-600 dark:text-emerald-400",
    ring: "border-emerald-500/40 hover:bg-emerald-500/10",
    ack: "ご評価ありがとうございます！",
  },
  unclear: {
    label: "分かりにくい",
    icon: AlertCircle,
    tone: "text-amber-600 dark:text-amber-400",
    ring: "border-amber-500/40 hover:bg-amber-500/10",
    ack: "改善の参考にいたします。",
  },
  report: {
    label: "誤りを報告",
    icon: Flag,
    tone: "text-rose-600 dark:text-rose-400",
    ring: "border-rose-500/40 hover:bg-rose-500/10",
    ack: "報告ありがとうございます。確認します。",
  },
};

export function QuestionFeedback({ questionId }: { questionId: string }) {
  const [submitted, setSubmitted] = useState<Rating | null>(null);
  const [comment, setComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const store = readStore();
    const existing = store[questionId];
    if (existing) setSubmitted(existing.rating);
  }, [questionId]);

  async function send(rating: Rating, optionalComment?: string): Promise<void> {
    setBusy(true);
    try {
      await fetch("/api/question-feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          questionId,
          rating,
          comment: optionalComment?.trim() ? optionalComment.trim() : undefined,
        }),
        cache: "no-store",
        keepalive: true,
      }).catch(() => {
        /* network error — local state still recorded */
      });
    } finally {
      setBusy(false);
    }

    const store = readStore();
    store[questionId] = { rating, ts: Date.now() };
    writeStore(store);
    setSubmitted(rating);
  }

  function onPick(rating: Rating): void {
    if (submitted) return;
    if (rating === "report" || rating === "unclear") {
      setShowCommentBox(true);
      setSubmitted(rating);
      return;
    }
    void send(rating);
  }

  async function onSubmitWithComment(): Promise<void> {
    if (!submitted || submitted === "helpful") return;
    await send(submitted, comment);
    setShowCommentBox(false);
  }

  if (submitted && !showCommentBox) {
    const meta = META[submitted];
    return (
      <div
        role="status"
        className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm ${meta.ring} ${meta.tone}`}
      >
        <Check className="h-4 w-4" />
        <span>{meta.ack}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          この解説は？
        </span>
        {(Object.keys(META) as Rating[]).map((r) => {
          const meta = META[r];
          const Icon = meta.icon;
          return (
            <button
              key={r}
              type="button"
              onClick={() => onPick(r)}
              disabled={busy || (submitted !== null && submitted !== r)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${meta.ring} ${meta.tone} disabled:opacity-50`}
            >
              <Icon className="h-3.5 w-3.5" />
              {meta.label}
            </button>
          );
        })}
      </div>

      {showCommentBox && submitted && submitted !== "helpful" && (
        <div className="mt-3 space-y-2">
          <label
            htmlFor={`feedback-${questionId}`}
            className="block text-[11px] text-muted-foreground"
          >
            {submitted === "report"
              ? "どこが誤っていますか？（任意・800 文字まで）"
              : "どこが分かりにくかったですか？（任意・800 文字まで）"}
          </label>
          <textarea
            id={`feedback-${questionId}`}
            rows={3}
            maxLength={800}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="例: 解説の選択肢ウの説明が事実と異なります"
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void onSubmitWithComment()}
              disabled={busy}
              className="inline-flex items-center justify-center rounded-xl bg-foreground px-3 py-1.5 text-xs font-semibold text-background transition hover:bg-foreground/85 disabled:opacity-50"
            >
              送信
            </button>
            <button
              type="button"
              onClick={() => void onSubmitWithComment()}
              disabled={busy}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              コメントなしで送信
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
