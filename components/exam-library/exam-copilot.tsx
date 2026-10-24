"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Markdown } from "@/components/ui/markdown";
import { posthogCapture } from "@/lib/posthog";
import { findExamEntry } from "@/lib/exam-library-catalog";
import { qualificationHubForEntry } from "@/lib/exam-qualification-hubs";
import { parseCopilotFailure, classifyCopilotHttpFailure, copilotFailureMessage } from "@/lib/copilot/errors";

type ChatMessage = { role: "user" | "assistant"; content: string };
const MAX_MESSAGE_LENGTH = 3000;
const MAX_HISTORY_MESSAGES = 10;
const HISTORY_OMISSION = "\n[以前の回答の続きは省略]";

export function ExamLibraryCopilot({ examId, questionId, selectedChoice }: {
  examId: string;
  questionId: string;
  selectedChoice: number | null;
}) {
  // A keyed session aborts and discards the previous question's conversation.
  return <ExamCopilotSession key={`${examId}:${questionId}`} examId={examId} questionId={questionId} selectedChoice={selectedChoice} />;
}

function ExamCopilotSession({ examId, questionId, selectedChoice }: {
  examId: string;
  questionId: string;
  selectedChoice: number | null;
}) {
  const hubSlug = useMemo(() => {
    const entry = findExamEntry(examId);
    return entry ? (qualificationHubForEntry(entry)?.slug ?? null) : null;
  }, [examId]);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  // Only complete successful turns are eligible for subsequent API requests.
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pending, setPending] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [retryable, setRetryable] = useState(false);
  const [blockedDraft, setBlockedDraft] = useState<string | null>(null);
  const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const composingRef = useRef(false);
  useEffect(() => () => {
    const controller = abortRef.current;
    abortRef.current = null;
    controller?.abort();
    if (watchdogRef.current) clearTimeout(watchdogRef.current);
  }, []);

  function stop() {
    const controller = abortRef.current;
    abortRef.current = null;
    controller?.abort();
    if (watchdogRef.current) clearTimeout(watchdogRef.current);
    setBusy(false);
    setPending([]);
    setError("回答を停止しました。入力内容を確認して再試行できます。");
    setRetryable(true);
  }

  async function ask() {
    const question = draft.trim();
    if (!question || question.length > MAX_MESSAGE_LENGTH || question === blockedDraft || abortRef.current || composingRef.current) return;
    const history = [...messages.slice(-MAX_HISTORY_MESSAGES).map((message) => ({
      ...message, content: message.content.length > MAX_MESSAGE_LENGTH
        ? message.content.slice(0, MAX_MESSAGE_LENGTH - HISTORY_OMISSION.length) + HISTORY_OMISSION : message.content,
    })), { role: "user" as const, content: question }];
    setPending([{ role: "user", content: question }, { role: "assistant", content: "" }]);
    setError("");
    setRetryable(false);
    setBusy(true);
    const controller = new AbortController();
    abortRef.current = controller;
    const isCurrent = () => abortRef.current === controller && !controller.signal.aborted;
    const watchdog = setTimeout(() => {
      if (!isCurrent()) return;
      abortRef.current = null;
      controller.abort();
      setBusy(false);
      setPending([]);
      setError(copilotFailureMessage({ code: "timeout" }));
      setRetryable(true);
    }, 45_000);
    watchdogRef.current = watchdog;
    let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;
    try {
      posthogCapture("exam_library_ai_query", { examId, hubSlug: hubSlug ?? undefined });
      const response = await fetch("/api/copilot/exam-library", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examId, questionId, selectedChoice, messages: history }),
        signal: controller.signal,
      });
      if (!isCurrent()) return;
      if (!response.ok) {
        const body: unknown = await response.json().catch(() => null);
        const failure = classifyCopilotHttpFailure(response.status, body, response.headers.get("Retry-After"));
        if (isCurrent()) {
          setError(copilotFailureMessage(failure));
          setRetryable(Boolean(failure.retryable));
          setBlockedDraft(failure.retryable ? null : question);
        }
        return;
      }
      if (!response.body) throw new Error("AIの回答を受信できませんでした。再試行してください。");
      reader = response.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (!isCurrent()) return;
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        const parsed = parseCopilotFailure(answer);
        setPending([{ role: "user", content: question }, { role: "assistant", content: parsed.text }]);
      }
      answer += decoder.decode();
      const parsed = parseCopilotFailure(answer);
      if (!isCurrent()) return;
      if (parsed.error) {
        setError(copilotFailureMessage(parsed.error));
        setRetryable(Boolean(parsed.error.retryable));
        setBlockedDraft(parsed.error.retryable ? null : question);
        return;
      }
      if (!parsed.text.trim()) throw new Error("AIから空の回答が返りました。再試行してください。");
      setMessages([...history, { role: "assistant" as const, content: parsed.text }].slice(-MAX_HISTORY_MESSAGES));
      setDraft("");
    } catch {
      if (isCurrent()) {
        setError("AIの回答を取得できませんでした。通信状況を確認して再試行してください。");
        setRetryable(true);
      }
    } finally {
      clearTimeout(watchdog);
      if (watchdogRef.current === watchdog) watchdogRef.current = null;
      if (abortRef.current === controller) {
        abortRef.current = null;
        setBusy(false);
        setPending([]);
      }
      if (reader) {
        // Release pending reads as well as the lock on errors/early returns.
        try { await reader.cancel(); } catch { /* Connection may already be closed. */ }
        reader.releaseLock();
      }
    }
  }

  return (
    <div className="mt-4 border-t border-current/25 pt-3">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className={buttonVariants({ variant: "outline", size: "lg" })}>
        <Sparkles className="h-5 w-5" aria-hidden="true" />
        この問題をAIに質問
      </button>
      {open ? (
        <div className="mt-3 rounded-xl border border-sky-300 bg-white p-3 text-slate-950 dark:border-sky-700 dark:bg-slate-950 dark:text-white">
          <p className="text-sm leading-6">問題と公式公開の資料を参照して回答します。AIの説明は公式解説ではありません。</p>
          <p className="text-sm leading-6">現在の選択：{selectedChoice === null ? "未選択" : `選択肢（${selectedChoice}）`}</p>
          {messages.length + pending.length > 0 ? (
            <ol aria-label="AIとの対話" aria-busy={busy} className="mt-3 space-y-3">
              {[...messages, ...pending].map((message, index) => (
                <li key={`${index}-${message.role}`} className={`rounded-lg p-3 text-sm leading-6 ${message.role === "user" ? "bg-sky-50 dark:bg-sky-950" : "bg-slate-100 dark:bg-slate-800"}`}>
                  <p className="mb-1 font-bold">{message.role === "user" ? "あなた" : "AI"}</p>
                  {message.content ? <Markdown>{message.content}</Markdown> : <span>回答中…</span>}
                </li>
              ))}
            </ol>
          ) : null}
          <form onSubmit={(event) => { event.preventDefault(); void ask(); }} className="mt-3">
            <label htmlFor={`exam-copilot-${questionId}`} className="block text-sm font-semibold">どこが分からないですか？</label>
            <textarea
              id={`exam-copilot-${questionId}`}
              value={draft}
              disabled={busy}
              onChange={(event) => { setDraft(event.target.value); setError(""); setRetryable(false); }}
              onCompositionStart={() => { composingRef.current = true; }}
              onCompositionEnd={() => { composingRef.current = false; }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && (event.nativeEvent.isComposing || composingRef.current || event.keyCode === 229)) event.stopPropagation();
              }}
              maxLength={MAX_MESSAGE_LENGTH}
              aria-describedby={`exam-copilot-length-${questionId}`}
              rows={3}
              placeholder="例：選んだ選択肢が誤りになる理由を教えて"
              className="mt-1 w-full rounded-lg border border-slate-400 bg-white p-3 text-base text-slate-950 dark:border-slate-500 dark:bg-slate-900 dark:text-white"
            />
            <p id={`exam-copilot-length-${questionId}`} className="text-xs text-slate-600 dark:text-slate-300">{draft.length} / {MAX_MESSAGE_LENGTH}文字</p>
            {error ? <p role="alert" className="mt-2 text-sm text-red-700 dark:text-red-300">{error} 掲載済みの解説は引き続き利用できます。{blockedDraft === draft.trim() ? "入力内容を変更するか、運営側の対応をお待ちください。" : ""}</p> : null}
            <div className="mt-2 flex flex-wrap gap-2">
              <button type="submit" disabled={busy || !draft.trim() || blockedDraft === draft.trim()} className={buttonVariants({ variant: "primary", size: "lg" })}>{busy ? "回答中…" : retryable ? "再試行" : "AIに聞く"}</button>
              {busy ? <button type="button" onClick={stop} className={buttonVariants({ variant: "outline", size: "lg" })}>回答を停止</button> : null}
            </div>
            <p role="status" className="sr-only">{busy ? "AIが回答を生成しています。" : ""}</p>
          </form>
        </div>
      ) : null}
    </div>
  );
}
