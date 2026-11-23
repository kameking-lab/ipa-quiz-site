"use client";

import { useEffect, useState } from "react";
import { ThumbsUp, AlertCircle, Flag, Check } from "lucide-react";

import { readQuestionReportContext, questionReportContextLines, type QuestionReportContext } from "@/lib/feedback/question-report-context";
import { LS_KEYS } from "@/lib/storage/keys";
import { submitSupport } from "@/lib/feedback/submit";
import { readLocalFeedback } from "@/lib/feedback/local-data";

type Rating = "helpful" | "unclear" | "report";

type Stored = Record<string, { rating: Rating; ts: number; receiptId?: string }>;

function readStore(): Stored {
  if (typeof window === "undefined") return {};
  try {
    const legacy = readLocalFeedback(LS_KEYS.questionFeedback);
    const current = readLocalFeedback(LS_KEYS.questionRatings);
    return { ...(legacy && typeof legacy === "object" && !Array.isArray(legacy) ? legacy : {}), ...(current && typeof current === "object" && !Array.isArray(current) ? current : {}) } as Stored;
  } catch {
    return {};
  }
}

function writeStore(store: Stored): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.questionRatings, JSON.stringify(store));
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

interface QuestionFeedbackProps { questionId: string; context?: QuestionReportContext | null }
export function QuestionFeedback({ questionId, context }: QuestionFeedbackProps) {
  const current = readQuestionReportContext(context, questionId);
  // Reset an unsent report when the question or its displayed metadata changes.
  // An earlier request retains its own captured payload, never the new question's.
  return <QuestionFeedbackForm key={JSON.stringify([questionId,current])} questionId={questionId} context={current} />;
}
function QuestionFeedbackForm({ questionId, context }: { questionId: string; context: QuestionReportContext | null }) {
  const [submitted, setSubmitted] = useState<Rating | null>(null);
  const [receiptId, setReceiptId] = useState("");
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const store = readStore();
    const existing = store[questionId];
    if (existing?.receiptId) { setSubmitted(existing.rating); setReceiptId(existing.receiptId); }
  }, [questionId]);

  async function send(rating: Rating, optionalComment?: string): Promise<boolean> {
    setBusy(true);
    setError("");
    try {
      const receipt = await submitSupport({
          kind: "question-rating",
          questionId,
          rating,
          ...(rating !== "helpful" && context ? { context } : {}),
          comment: optionalComment?.trim() ? optionalComment.trim() : undefined,
      });
      const store = readStore();
      store[questionId] = { rating, ts: Date.now(), receiptId: receipt };
      writeStore(store);
      setReceiptId(receipt);
      setSubmitted(rating);
      return true;
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "送信できませんでした。再送信してください。");
      return false;
    } finally {
      setBusy(false);
    }
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
    if (await send(submitted, comment)) setShowCommentBox(false);
  }

  if (submitted && !showCommentBox) {
    const meta = META[submitted];
    return (
      <div
        role="status"
        className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm ${meta.ring} ${meta.tone}`}
      >
        <Check className="h-4 w-4" />
        <span>{meta.ack}<span className="mt-1 block break-all text-xs">運営の受付先に送信しました。受付番号: {receiptId}</span></span>
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
              className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${meta.ring} ${meta.tone} disabled:opacity-50`}
            >
              <Icon className="h-3.5 w-3.5" />
              {meta.label}
            </button>
          );
        })}
      </div>
      {error && <p role="alert" className="mt-2 text-sm text-rose-700 dark:text-rose-300">{error}</p>}

      {showCommentBox && submitted && submitted !== "helpful" && (
        <div className="mt-3 space-y-2">
          <div aria-label="報告に添付する教材情報" className="rounded-lg border border-border bg-muted/40 p-3 text-xs">
            <p className="font-semibold">この内容を報告に添付します</p>
            <ul className="mt-1 space-y-1 break-words">
              {questionReportContextLines(context, questionId).map(line => <li key={line}>{line}</li>)}
            </ul>
          </div>
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
            disabled={busy}
            onChange={(e) => setComment(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="例: 解説の選択肢ウの説明が事実と異なります"
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void onSubmitWithComment()}
              disabled={busy}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-foreground px-3 py-1.5 text-xs font-semibold text-background transition hover:bg-foreground/85 disabled:opacity-50"
            >
              送信
            </button>
            <button
              type="button"
              onClick={() => void onSubmitWithComment()}
              disabled={busy}
              className="min-h-11 text-xs text-muted-foreground hover:text-foreground"
            >
              コメントなしで送信
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
