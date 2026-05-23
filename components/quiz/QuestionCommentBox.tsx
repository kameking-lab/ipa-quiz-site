"use client";

import * as React from "react";
import { MessageSquare, Send } from "lucide-react";
import { LS_KEYS } from "@/lib/storage/keys";
import { cn } from "@/lib/utils";

export interface QuestionComment {
  id: string;
  questionId: string;
  body: string;
  createdAt: number;
  /** 'pending' until light client moderation passes, 'visible' for the author's own list */
  status: "pending" | "visible" | "rejected";
}

const MAX_LEN = 800;

function readAll(): QuestionComment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LS_KEYS.questionFeedback);
    return raw ? (JSON.parse(raw) as QuestionComment[]) : [];
  } catch {
    return [];
  }
}

function writeAll(list: QuestionComment[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.questionFeedback, JSON.stringify(list.slice(0, 1000)));
  } catch {
    // ignore
  }
}

function looksLikePersonalInfo(text: string): boolean {
  // Simple client-side heuristic: emails, phone numbers, long digit runs
  const hits = [
    /[\w.+-]+@[\w-]+\.[\w.-]+/i,
    /\b0\d{1,3}-\d{2,4}-\d{3,4}\b/,
    /\b\d{10,}\b/,
  ];
  return hits.some((rx) => rx.test(text));
}

export function QuestionCommentBox({ questionId }: { questionId: string }) {
  const [comments, setComments] = React.useState<QuestionComment[]>([]);
  const [input, setInput] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [sending, setSending] = React.useState(false);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
     
    setComments(readAll().filter((c) => c.questionId === questionId));
  }, [questionId]);

  const submit = async () => {
    setError(null);
    const body = input.trim();
    if (!body) return;
    if (body.length > MAX_LEN) {
      setError(`${MAX_LEN} 字以内でお願いします`);
      inputRef.current?.focus();
      return;
    }
    if (looksLikePersonalInfo(body)) {
      setError("個人情報（メール・電話番号など）が含まれている可能性があります。投稿を見直してください。");
      inputRef.current?.focus();
      return;
    }
    setSending(true);
    const entry: QuestionComment = {
      id: `qc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      questionId,
      body,
      createdAt: Date.now(),
      status: "visible",
    };
    const all = readAll();
    all.unshift(entry);
    writeAll(all);
    setComments(all.filter((c) => c.questionId === questionId));
    setInput("");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          kind: "question-comment",
          questionId,
          comment: body,
        }),
      });
    } catch {
      // best-effort
    }
    setSending(false);
  };

  return (
    <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-800 dark:text-zinc-100">
        <MessageSquare className="h-4 w-4 text-sky-600 dark:text-sky-400" />
        この問題へのコメント
      </h3>
      <p className="mb-3 text-[11px] text-zinc-500 dark:text-zinc-400">
        誤りの指摘・補足解説・別解などをお寄せください。教育貢献プロジェクトとして全件目を通します。
        個人情報は投稿しないでください。
      </p>

      <label htmlFor={`qcomment-${questionId}`} className="sr-only">
        コメント本文
      </label>
      <textarea
        id={`qcomment-${questionId}`}
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value.slice(0, MAX_LEN))}
        rows={3}
        maxLength={MAX_LEN}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `qcomment-error-${questionId}` : undefined}
        placeholder="例: 選択肢ウの解説に補足があります…"
        className="w-full resize-none rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-600"
      />
      <div className="mt-2 flex items-center justify-between">
        <span
          id={error ? `qcomment-error-${questionId}` : undefined}
          role={error ? "alert" : undefined}
          className={cn("text-[11px]", error ? "text-red-600 dark:text-red-400" : "text-zinc-400 dark:text-zinc-500")}
        >
          {error ?? `${input.length} / ${MAX_LEN}`}
        </span>
        <button
          onClick={submit}
          disabled={sending || !input.trim()}
          className="flex items-center gap-1 rounded-full bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:opacity-50"
        >
          <Send className="h-3 w-3" />
          {sending ? "送信中..." : "投稿する"}
        </button>
      </div>

      {comments.length > 0 && (
        <ul className="mt-4 space-y-2 border-t border-zinc-100 pt-3 text-sm dark:border-zinc-800">
          {comments.slice(0, 5).map((c) => (
            <li
              key={c.id}
              className="rounded-xl bg-zinc-50 px-3 py-2 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
            >
              <p className="whitespace-pre-wrap text-xs leading-relaxed">{c.body}</p>
              <p className="mt-1 text-[10px] text-zinc-400 dark:text-zinc-500">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
