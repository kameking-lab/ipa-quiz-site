"use client";
import { AiProcessingNotice } from "@/components/ai/AiProcessingNotice";

import { useEffect, useMemo, useRef, useState } from "react";
import { AiAccessNotice, refreshAiQuota, useAiQuota } from "@/components/ai/AiAccessNotice";
import { clearAiCheckoutDraft, fetchWithAiGuestCookie, readAiCheckoutDraft } from "@/lib/ai/access-client";
import { buttonVariants } from "@/components/ui/button";
import { Markdown } from "@/components/ui/markdown";
import { posthogCapture } from "@/lib/posthog";
import { findExamEntry } from "@/lib/exam-library-catalog";
import { qualificationHubForEntry } from "@/lib/exam-qualification-hubs";

type ChatMessage = { role: "user" | "assistant"; content: string };

export function ExamLibraryCopilot({ examId, questionId, selectedChoice }: {
  examId: string;
  questionId: string;
  selectedChoice: number | null;
}) {
  // admin/exam-usage の資格別集計キー。ハブが未対応のカタログ項目は null のまま送る。
  const hubSlug = useMemo(() => {
    const entry = findExamEntry(examId);
    return entry ? (qualificationHubForEntry(entry)?.slug ?? null) : null;
  }, [examId]);
  const draftId = `exam-library:${examId}:${questionId}`;
  const [open, setOpen] = useState(false);
  const { quota, denied: applyQuotaDenial } = useAiQuota("exam-library", open);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  useEffect(() => () => abortRef.current?.abort(), []);
  useEffect(() => {
    const saved = readAiCheckoutDraft(draftId);
    if (saved === null) return;
    setDraft(saved);
    setOpen(true);
  }, [draftId]);

  async function ask() {
    const question = draft.trim();
    if (!question || busy || abortRef.current) return;
    const history = [...messages, { role: "user" as const, content: question }].slice(-12);
    setMessages([...history, { role: "assistant", content: "" }]);
    setDraft("");
    setError("");
    setBusy(true);
    posthogCapture("exam_library_ai_query", { examId, hubSlug: hubSlug ?? undefined });
    let quotaDenied = false;
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const response = await fetchWithAiGuestCookie("/api/copilot/exam-library", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Kakomon-AI-Consent": "20261103" },
        body: JSON.stringify({ examId, questionId, selectedChoice, messages: history }),
        signal: controller.signal,
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null) as { error?: string; message?: string } | null;
        quotaDenied = applyQuotaDenial(response, body);
        if (quotaDenied) {
          setDraft((current) => current || draft);
          setMessages(messages);
          return;
        }
        throw new Error(body?.message ?? "AIの回答を取得できませんでした。時間をおいてお試しください。");
      }
      if (!response.body) throw new Error("AIの回答を取得できませんでした。時間をおいてお試しください。");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: answer }]);
      }
      answer += decoder.decode();
      if (!answer.trim() || /\[(?:エラー|タイムアウト|応答の途中終了)\]/.test(answer)) {
        throw new Error("AIの回答を取得できませんでした。時間をおいてお試しください。");
      }
      setMessages([...history, { role: "assistant", content: answer }]);
      clearAiCheckoutDraft(draftId);
    } catch (cause) {
      if (!controller.signal.aborted) {
        setMessages(messages);
        setDraft((current) => current || draft);
        setError(cause instanceof Error ? cause.message : "AIの回答を取得できませんでした。");
      }
    } finally {
      setBusy(false);
      if (abortRef.current === controller) abortRef.current = null;
      if (!quotaDenied) refreshAiQuota();
    }
  }

  return (
    <div className="mt-4 border-t border-current/25 pt-3">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className={buttonVariants({ variant: "outline", size: "lg" })}>
        この問題をAIに質問
      </button>
      {open ? (
        <div className="mt-3 rounded-xl border border-sky-300 bg-white p-3 text-slate-950 dark:border-sky-700 dark:bg-slate-950 dark:text-white">
          <p className="text-sm leading-6">問題と公表元の資料を参照して回答します。AIの説明は公式見解ではありません。</p>
          {messages.length > 0 ? (
            <ol aria-label="AIとの対話" className="mt-3 space-y-3">
              {messages.map((message, index) => (
                <li key={`${index}-${message.role}`} className={`rounded-lg p-3 text-sm leading-6 ${message.role === "user" ? "bg-sky-50 dark:bg-sky-950" : "bg-slate-100 dark:bg-slate-800"}`}>
                  <p className="mb-1 font-bold">{message.role === "user" ? "あなた" : "AI"}</p>
                  {message.content ? <Markdown>{message.content}</Markdown> : <span>回答中…</span>}
                </li>
              ))}
            </ol>
          ) : null}
          <AiAccessNotice quota={quota} feature="exam-library" draft={draft} draftId={draftId}
            returnTo={typeof window === "undefined" ? "" : window.location.pathname + window.location.search}
            onDismiss={() => setOpen(false)} />
          <form onSubmit={(event) => { event.preventDefault(); void ask(); }} className="mt-3">
            <label htmlFor={`exam-copilot-${questionId}`} className="block text-sm font-semibold">どこが分からないですか？</label>
            <textarea
              id={`exam-copilot-${questionId}`}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              maxLength={3000}
              rows={3}
              placeholder="例：選んだ肢が誤りになる理由を教えて"
              className="mt-1 w-full rounded-lg border border-slate-400 bg-white p-3 text-base text-slate-950 dark:border-slate-500 dark:bg-slate-900 dark:text-white"
            />
            {error ? <p role="alert" className="mt-2 text-sm text-red-700 dark:text-red-300">{error}</p> : null}
            <button type="submit" disabled={busy || !draft.trim()} className={`${buttonVariants({ variant: "primary", size: "lg" })} mt-2`}>{busy ? "回答中…" : "AIに聞く"}</button>
            <AiProcessingNotice />
          </form>
        </div>
      ) : null}
    </div>
  );
}
