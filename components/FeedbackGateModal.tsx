"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Send, Sparkles } from "lucide-react";
import { setFeedbackSubmitted } from "@/lib/storage/rate-limit-client";
import { LS_KEYS } from "@/lib/storage/keys";
import { ShareButtons } from "@/components/ShareButtons";
import { posthogCapture } from "@/lib/posthog";

const CHOICES = [
  { id: "great", label: "とても役に立った", icon: "🎉" },
  { id: "good", label: "役に立った", icon: "👍" },
  { id: "neutral", label: "ふつう", icon: "🙂" },
  { id: "needs-improvement", label: "改善してほしい点がある", icon: "💡" },
  { id: "bug", label: "不具合・誤りを見つけた", icon: "🐛" },
] as const;

type ChoiceId = (typeof CHOICES)[number]["id"];

export interface PublicFeedbackEntry {
  id: string;
  choice: ChoiceId;
  comment: string;
  createdAt: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  /** Optional: where the gate fired ("ai-limit" | "question-milestone" など) */
  source?: string;
}

function appendToPublicFeedback(entry: PublicFeedbackEntry) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(LS_KEYS.publicFeedback);
    const list: PublicFeedbackEntry[] = raw ? JSON.parse(raw) : [];
    list.unshift(entry);
    window.localStorage.setItem(LS_KEYS.publicFeedback, JSON.stringify(list.slice(0, 200)));
  } catch {
    // ignore
  }
}

export function FeedbackGateModal({ open, onClose, source }: Props) {
  const [choice, setChoice] = React.useState<ChoiceId | null>(null);
  const [comment, setComment] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
       
      setChoice(null);
      setComment("");
      setSubmitted(false);
      setSubmitting(false);
    }
  }, [open]);

  const submit = async () => {
    if (!choice) return;
    setSubmitting(true);
    const entry: PublicFeedbackEntry = {
      id: `fb-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      choice,
      comment: comment.trim().slice(0, 1000),
      createdAt: Date.now(),
    };
    appendToPublicFeedback(entry);
    setFeedbackSubmitted(true);
    posthogCapture("feedback_submitted", {
      choice,
      source: source ?? null,
      hasComment: entry.comment.length > 0,
    });
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(LS_KEYS.feedbackGateShown, "true");
      } catch {
        // ignore
      }
    }
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          kind: "feedback",
          source,
          choice,
          comment: entry.comment,
        }),
      });
    } catch {
      // best-effort; OK to continue offline
    }
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        {submitted ? (
          <>
            <DialogHeader>
              <div className="mb-2 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <Heart className="h-5 w-5" />
                <span className="text-sm font-semibold">フィードバックありがとうございます</span>
              </div>
              <DialogTitle>これ以降、AI コパイロットを実質無制限でお使いいただけます</DialogTitle>
              <DialogDescription>
                いただいたご意見は、過去問 AI プロジェクトの改善にすべて目を通させていただきます。
              </DialogDescription>
            </DialogHeader>

            <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm dark:border-emerald-900/60 dark:bg-emerald-950/30">
              <div className="mb-1 flex items-center gap-2 font-semibold text-emerald-800 dark:text-emerald-200">
                <Sparkles className="h-4 w-4" />
                教育貢献プロジェクト
              </div>
              <p className="text-xs leading-relaxed text-emerald-900/80 dark:text-emerald-100/80">
                IPA 試験対策を、誰もが平等に学べる場へ。あなたの声がそのまま改善に反映されます。
              </p>
            </div>

            <div className="mt-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="mb-2 text-xs font-semibold text-zinc-700 dark:text-zinc-200">
                よければ、学習仲間にもシェアしてください
              </p>
              <ShareButtons
                url={typeof window !== "undefined" ? window.location.origin : "https://kakomon-ai.jp/"}
                text="IPA 試験対策が全機能無料で使える教育貢献プロジェクト「過去問 AI」を活用しています。"
                hashtags={["過去問AI", "IPA試験"]}
                compact
              />
            </div>

            <div className="mt-3 flex justify-end">
              <Button variant="primary" onClick={onClose}>
                学習を続ける
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="mb-2 flex items-center gap-2 text-sky-600 dark:text-sky-400">
                <MessageSquare className="h-5 w-5" />
                <span className="text-sm font-semibold">フィードバックをお願いします</span>
              </div>
              <DialogTitle>使い心地を一言だけ教えてください</DialogTitle>
              <DialogDescription>
                ご投稿いただくと、AI コパイロットを以降ほぼ無制限でお使いいただけます。所要 10 秒。
              </DialogDescription>
            </DialogHeader>

            <fieldset className="mt-3 space-y-2">
              <legend className="sr-only">使い心地</legend>
              {CHOICES.map((c) => (
                <label
                  key={c.id}
                  className={
                    "flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 text-sm transition-colors " +
                    (choice === c.id
                      ? "border-sky-400 bg-sky-50 dark:border-sky-500 dark:bg-sky-950/40"
                      : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800")
                  }
                >
                  <input
                    type="radio"
                    name="feedback-choice"
                    value={c.id}
                    className="sr-only"
                    checked={choice === c.id}
                    onChange={() => setChoice(c.id)}
                  />
                  <span aria-hidden="true" className="text-base">
                    {c.icon}
                  </span>
                  <span className="text-zinc-800 dark:text-zinc-100">{c.label}</span>
                </label>
              ))}
            </fieldset>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, 1000))}
              rows={3}
              maxLength={1000}
              placeholder="ご意見・改善要望（任意・1000 字以内）"
              className="mt-3 w-full resize-none rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-600"
            />

            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button variant="outline" onClick={onClose} className="sm:order-1">
                あとで
              </Button>
              <Button
                variant="primary"
                onClick={submit}
                disabled={!choice || submitting}
                className="sm:order-2"
              >
                <Send className="h-4 w-4" />
                {submitting ? "送信中..." : "送信して続ける"}
              </Button>
            </div>
            <p className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-400">
              送信内容は公開フィードバック一覧（個人情報マスキング済み）に掲載される場合があります。
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
