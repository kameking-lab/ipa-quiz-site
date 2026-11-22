"use client";

import { recordLearningAction } from "@/lib/study-plan/pace-storage";
import { readSettings } from "@/lib/storage/settings";
import { AiProcessingNotice } from "@/components/ai/AiProcessingNotice";

import * as React from "react";
import dynamic from "next/dynamic";
import {
  MessageCircle,
  Send,
  Loader2,
  Square,
  X,
  ChevronDown,
  RefreshCw,
  WifiOff,
  Search,
} from "lucide-react";
import type { Question } from "@/lib/questions/types";
import { Button } from "@/components/ui/button";
import { setCopilotPanelOpen } from "@/lib/copilot/visibility";
import { FOCUSABLE_SELECTOR, trapTabTarget } from "@/lib/a11y/focus-trap";

const Markdown = dynamic(
  () => import("@/components/ui/markdown").then((m) => m.Markdown),
  {
    ssr: false,
    loading: () => (
      <div className="h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
    ),
  },
);
import { cn } from "@/lib/utils";
import {
  QUICK_ACTIONS,
  type QuickActionId,
  type LearnerProfile,
  type ResponseLength,
} from "@/lib/ai/prompts";
import {
  decodeCitationsHeader,
  type CitationMeta,
} from "@/lib/copilot/header-codec";
import {
  decodeRelatedHeader,
  type RelatedQuestion,
} from "@/lib/copilot/header-codec";
import { CitationCards } from "@/components/copilot/CitationCards";
import { stripCitationFooter } from "@/lib/copilot/citations";
import { RelatedQuestionsSection } from "@/components/copilot/RelatedQuestions";
import { LS_KEYS } from "@/lib/storage/keys";
import { buildLearnerProfileFromHistory } from "@/lib/ai/learner-profile-client";
import { useChatSession } from "@/hooks/useChatSession";
import { posthogCapture } from "@/lib/posthog";
import { AiAccessNotice, refreshAiQuota, useAiQuota } from "@/components/ai/AiAccessNotice";
import { aiPolicyDenialMessage, clearAiCheckoutDraft, fetchWithAiGuestCookie, readAiCheckoutDraft } from "@/lib/ai/access-client";
import { copilotRestriction, type CopilotRestriction } from "./restriction-copy";

interface Message {
  role: "user" | "assistant";
  content: string;
  quickAction?: QuickActionId;
  /** Retrieval candidates; rendered as citations only when the answer references them. */
  citations?: CitationMeta[];
  /** 関連問題サジェスト。X-Related-Questions ヘッダから復号して保持する。 */
  relatedQuestions?: RelatedQuestion[];
  /** ユーザが「停止」ボタンで途中停止したアシスタント応答であるかを示すフラグ。 */
  stoppedByUser?: boolean;
}

/**
 * Streaming phase used to drive the progress indicator shown above the
 * input form. Phases progress monotonically per send():
 *   idle → sending → searching → generating → streaming → idle
 *
 * - sending: request is in-flight, awaiting response headers.
 * - searching: response headers arrived; reading first chunk (RAG / provider warmup).
 * - generating: first chunk arrived but body is still very short.
 * - streaming: body has visible content; cursor is shown at the tail.
 */
type StreamStatus =
  | "idle"
  | "sending"
  | "searching"
  | "generating"
  | "streaming";

const STREAM_STATUS_LABEL: Record<Exclude<StreamStatus, "idle">, string> = {
  sending: "リクエスト送信中…",
  searching: "出典を検索しています…",
  generating: "回答を生成しています…",
  streaming: "回答を生成中…",
};

interface Props {
  question: Question;
  selectedChoice?: string;
  isCorrect?: boolean;
  initialPrompt?: string;
  onClose?: () => void;
  headerRight?: React.ReactNode;
  className?: string;
  inline?: boolean;
  paper?: boolean;
  focusRequest?: { sequence: number; prompt?: string };
}

export function CopilotPanel({
  question,
  selectedChoice,
  isCorrect,
  initialPrompt,
  onClose,
  headerRight,
  className,
  inline = false,
  paper = false,
  focusRequest,
}: Props) {
  const { quota, denied: applyQuotaDenial } = useAiQuota("copilot");
  const draftId = `copilot:${question.id}`;
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState(initialPrompt ?? "");
  const [online, setOnline] = React.useState(true);
  const [restriction, setRestriction] = React.useState<CopilotRestriction | null>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const [streaming, setStreaming] = React.useState(false);
  const [streamStatus, setStreamStatus] = React.useState<StreamStatus>("idle");
  const [errorState, setErrorState] = React.useState<{
    type: "server_error" | "network_error" | "timeout";
    retryFn: () => void;
  } | null>(null);
  const [profile, setProfile] = React.useState<LearnerProfile | undefined>(undefined);
  const [responseLength, setResponseLength] = React.useState<ResponseLength>("medium");

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const abortRef = React.useRef<AbortController | null>(null);
  // Distinguishes a user-initiated stop (Stop button) from a system-side abort
  // (question-change, unmount). Only user stops should annotate the partial
  // message with a "(停止しました)" marker; system aborts should be silent.
  const userStoppedRef = React.useRef(false);
  const lastSendArgsRef = React.useRef<{ text: string; quickAction?: QuickActionId; messages: Message[] } | null>(null);
  const sendRef = React.useRef<(text: string, quickAction?: QuickActionId) => void>(() => {});
  useChatSession(question, messages);

  React.useEffect(() => {
    const update = () => setOnline(navigator.onLine !== false);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  React.useEffect(() => () => {
    const pending = abortRef.current;
    abortRef.current = null;
    pending?.abort();
  }, []);

  // Reset conversation when question changes; refresh profile snapshot
  React.useEffect(() => {

    setMessages([]);
    setInput(readAiCheckoutDraft(draftId) ?? initialPrompt ?? "");
    lastSendArgsRef.current = null;
    // Question-change abort is system-driven, not user-driven, so leave the
    // userStoppedRef flag false to avoid annotating the discarded message.
    userStoppedRef.current = false;
    const pending = abortRef.current;
    abortRef.current = null;
    pending?.abort();
    setStreaming(false);
    setErrorState(null);
    setRestriction(null);
    setStreamStatus("idle");
    setProfile(buildLearnerProfileFromHistory());
  }, [draftId, initialPrompt]);

  const requestSequence = focusRequest?.sequence;
  const requestedPrompt = focusRequest?.prompt;
  React.useEffect(() => {
    if (!requestSequence) return;
    // A follow-up is a focus request, never a new chat or an automatic send.
    if (requestedPrompt) setInput((draft) => draft.trim() ? draft : requestedPrompt);
    inputRef.current?.focus({ preventScroll: true });
    inputRef.current?.scrollIntoView({ block: "nearest" });
  }, [requestSequence, requestedPrompt]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(LS_KEYS.copilotResponseLength);
      if (stored === "short" || stored === "medium" || stored === "long") {
        setResponseLength(stored);
      }
    } catch {
      // ignore
    }
  }, []);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);


  const send = React.useCallback(
    async (text: string, quickAction?: QuickActionId) => {
      if (streaming || abortRef.current) return;
      if (typeof navigator !== "undefined" && navigator.onLine === false) {
        setOnline(false);
        return;
      }
      const trimmed = text.trim();
      if (!trimmed && !quickAction) return;

      setErrorState(null);
      setRestriction(null);
      const previous = lastSendArgsRef.current;

      const userMsg: Message = {
        role: "user",
        content: trimmed || QUICK_ACTIONS[quickAction!].label,
        quickAction,
      };
      const nextMessages = previous && previous.text === trimmed && previous.quickAction === quickAction
        ? previous.messages : [...messages, userMsg];
      lastSendArgsRef.current = { text: trimmed, quickAction, messages: nextMessages };
      setMessages(nextMessages);
      // A Retry can send captured text while the editor holds a newer draft.
      if (!quickAction) setInput((draft) => draft.trim() === trimmed ? "" : draft);
      setStreaming(true);
      setStreamStatus("sending");
      userStoppedRef.current = false;

      const controller = new AbortController();
      abortRef.current = controller;
      const currentRequest = () => abortRef.current === controller;
      const restoreDraft = () => {
        if (!quickAction) setInput((draft) => draft || text);
      };

      let quotaDenied = false;
      try {
        posthogCapture("ai_query_sent", {
          questionId: question?.id,
          exam: question?.exam,
          quickAction: quickAction ?? null,
        });
        const res = await fetchWithAiGuestCookie("/api/copilot", {
          method: "POST",
          headers: { "content-type": "application/json", "X-Kakomon-AI-Consent": "20261103" },
          signal: controller.signal,
          body: JSON.stringify({
            question: { id: question.id },
            selectedChoice,
            isCorrect,
            tier: "free",
            quickAction,
            learnerProfile: profile,
            responseLength,
            messages: nextMessages.slice(-20).map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        if (!currentRequest()) return;
        const responseBody = !res.ok ? await res.clone().json().catch(() => null) : null;
        if (!currentRequest()) return;
        quotaDenied = applyQuotaDenial(res, responseBody);
        if (quotaDenied) {
          restoreDraft();
          setMessages(messages);
          return;
        }
        if (!res.ok) {
          setRestriction(copilotRestriction(res, responseBody));
          restoreDraft();
        }
        if (res.status === 400 && responseBody?.error === "original_question_explanation_only" && typeof responseBody.message === "string") {
          setMessages((prev) => [...prev, { role: "assistant", content: responseBody.message }]);
          return;
        }
        if (!res.ok && res.status !== 429) {
          const denial = aiPolicyDenialMessage(res.status, responseBody);
          if (denial) {
            setMessages((prev) => [...prev, { role: "assistant", content: denial }]);
            setStreaming(false);
            setStreamStatus("idle");
            return;
          }
        }

        if (res.status === 429) {
          const body = (responseBody ?? {}) as { message?: string; reason?: string };
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: body.message ?? "レート制限に達しました。" },
          ]);
          setStreaming(false);
          setStreamStatus("idle");
          return;
        }

        if (!res.ok || !res.body) {
          restoreDraft();
          const args = lastSendArgsRef.current;
          setErrorState({
            type: "server_error",
            retryFn: () => args && sendRef.current(args.text, args.quickAction),
          });
          setStreaming(false);
          setStreamStatus("idle");
          return;
        }

        // 構造化 citation メタと関連問題は HTTP ヘッダで返ってくる。
        // ヘッダは body 読み出し前に確定しているので、最初のメッセージ追加時に同梱しておく。
        const citationHeaderValue = res.headers.get("X-RAG-Citation-Candidates") ?? res.headers.get("X-RAG-Citations");
        const relatedHeaderValue = res.headers.get("X-Related-Questions");
        const citations = decodeCitationsHeader(citationHeaderValue);
        const relatedQuestions = decodeRelatedHeader(relatedHeaderValue);

        // Response headers landed: transition to "searching" so the user sees
        // a more specific status while we wait for the provider's first token.
        // Citation headers being present is a strong signal that RAG ran;
        // otherwise we fall back to "generating" since the model is warming up.
        setStreamStatus(
          citations.length > 0 || relatedQuestions.length > 0
            ? "searching"
            : "generating",
        );

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "",
            citations: citations.length > 0 ? citations : undefined,
            relatedQuestions:
              relatedQuestions.length > 0 ? relatedQuestions : undefined,
          },
        ]);

        while (true) {
          const { value, done } = await reader.read();
          if (!currentRequest()) return;
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          acc += chunk;
          // First non-empty chunk flips us into "streaming" so the cursor
          // takes over from the skeleton placeholder. React bails out if the
          // value is unchanged, so this is safe to call on every chunk.
          if (acc.length > 0) setStreamStatus("streaming");
          setMessages((prev) => {
            const copy = [...prev];
            const previous = copy[copy.length - 1];
            copy[copy.length - 1] = {
              role: "assistant",
              content: acc,
              citations: previous.citations,
              relatedQuestions: previous.relatedQuestions,
            };
            return copy;
          });
        }

        // Server emits an in-stream sentinel like "[タイムアウト]" or "[エラー]"
        // at the tail when the upstream provider fails or times out. Convert
        // that into a typed error banner so the user gets retry affordance.
        const isTimeout = acc.includes("[タイムアウト]");
        const isServerError = acc.includes("[エラー] AI応答の取得に失敗");
        if (isTimeout || isServerError) {
          restoreDraft();
          const args = lastSendArgsRef.current;
          setErrorState({
            type: isTimeout ? "timeout" : "server_error",
            retryFn: () => args && sendRef.current(args.text, args.quickAction),
          });
        } else if (acc.trim() && !acc.includes("[応答の途中終了]")) {
          lastSendArgsRef.current = null;
          clearAiCheckoutDraft(draftId);
        }

        if (acc.trim() && !isTimeout && !isServerError && readSettings().recordHistory) {
          recordLearningAction({ id: crypto.randomUUID(), kind: "ai-question", questionId: question.id,
            exam: question.exam, at: Date.now() });
        }
        posthogCapture("copilot_response_received", {
          questionId: question?.id,
          exam: question?.exam,
          response_length: acc.length,
          had_timeout: isTimeout,
          had_server_error: isServerError,
        });
      } catch (err) {
        if (!currentRequest()) return;
        if ((err as Error).name === "AbortError") {
          // User-initiated stop: keep whatever was already streamed and mark
          // the last assistant message so the UI can render a "(停止しました)"
          // hint instead of dropping the partial response. If the assistant
          // bubble was not yet pushed (aborted before headers landed) we fall
          // back to the explicit cancellation message.
          if (userStoppedRef.current) {
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last && last.role === "assistant") {
                const copy = [...prev];
                copy[copy.length - 1] = { ...last, stoppedByUser: true };
                return copy;
              }
              return [
                ...prev,
                {
                  role: "assistant",
                  content: "(停止しました)",
                  stoppedByUser: true,
                },
              ];
            });
            posthogCapture("copilot_response_stopped", {
              questionId: question?.id,
              exam: question?.exam,
            });
          } else {
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: "(キャンセルされました)" },
            ]);
          }
        } else {
          restoreDraft();
          const args = lastSendArgsRef.current;
          setErrorState({
            type: "network_error",
            retryFn: () => args && sendRef.current(args.text, args.quickAction),
          });
        }
      } finally {
        if (currentRequest()) {
          abortRef.current = null;
          setStreaming(false);
          setStreamStatus("idle");
          userStoppedRef.current = false;
          if (!quotaDenied) refreshAiQuota();
        }
      }
    },
    [
      streaming,
      messages,
      question,
      selectedChoice,
      isCorrect,
      profile,
      responseLength,
      applyQuotaDenial, draftId,
    ],
  );

  // Keep a ref to `send` so retryFn closures can call the latest version
  // without triggering use-before-declared lint errors.
  React.useEffect(() => {
    sendRef.current = (text, quickAction) => {
      void send(text, quickAction);
    };
  }, [send]);

  const handleStop = React.useCallback(() => {
    if (!streaming) return;
    userStoppedRef.current = true;
    abortRef.current?.abort();
  }, [streaming]);

  const inputForm = (
    <>
      {!online && (
        <p role="status" className="px-3 py-2 text-sm text-amber-800 dark:text-amber-200">
          オフラインのためAIに接続できません。
        </p>
      )}
      {restriction && (
        <aside aria-label="AIの利用制限" className="space-y-1 px-3 py-2 text-sm text-amber-800 dark:text-amber-200">
          <p role="status">{restriction.reason} {restriction.resume}</p>
          <a href="/contact" target="_blank" rel="noopener noreferrer" className="inline-block min-h-11 py-2 underline">問い合わせ</a>
        </aside>
      )}
      <AiAccessNotice quota={quota} feature="copilot" draft={input} draftId={draftId}
        returnTo={typeof window === "undefined" ? "" : window.location.pathname + window.location.search}
        onDismiss={() => inputRef.current?.focus()} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className={cn("flex items-end gap-2 border-t py-3", paper ? "border-hairline" : "border-zinc-200 px-3 dark:border-zinc-800")}
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing || e.keyCode === 229) return;
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!streaming) send(input);
            }
          }}
          rows={2}
          aria-label="AIへの質問を入力（Enter で送信、Shift+Enter で改行）"
          placeholder="AIに質問…"
          className="min-w-0 min-h-[44px] flex-1 resize-none rounded-xl border border-input bg-card px-3 py-2 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring sm:text-sm"
        />
        {streaming ? (
          // While streaming, the primary action swaps to "Stop". The user can
          // cancel a long answer without losing what's been streamed so far.
          <Button
            type="button"
            variant="primary"
            size="icon"
            onClick={handleStop}
            aria-label="生成を停止"
            title="生成を停止"
            className="bg-red-600 hover:bg-red-700 focus-visible:ring-red-500 min-h-11 min-w-11 h-auto whitespace-normal py-2.5"
          >
            <Square className="h-4 w-4 fill-current" />
          </Button>
        ) : (
          <Button className={cn("min-h-11 min-w-11 h-auto whitespace-normal py-2.5", paper && "shadow-none hover:shadow-none")}
            type="submit"
            variant="primary"
            size="icon"
            disabled={!input.trim() || !online}
            aria-label="送信"
          >
            <Send className="h-4 w-4" />
          </Button>
        )}
      </form>
      <div className={cn("pb-2", !paper && "px-3")}><AiProcessingNotice /></div>
    </>
  );

  return (
    <div className={cn("flex min-w-0 w-full flex-col bg-card", !inline && "h-full", className)}>
      {/* Header */}
      {!paper && <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-sky-600 dark:text-sky-400" />
          <span className="text-sm font-semibold">この問題をAIに質問</span>
        </div>
        <div className="flex items-center gap-1">
          {headerRight}
          {onClose && (
            <Button className="min-h-11 min-w-11 h-auto whitespace-normal py-2.5" variant="ghost" size="icon" onClick={onClose} aria-label="閉じる">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>}

      {inline && inputForm}

      {/* Messages */}
      <div
        ref={scrollRef}
        className={cn("min-w-0 overflow-y-auto break-words p-3 empty:p-0", inline ? "max-h-[24rem]" : "flex-1")}
        role="log"
        aria-live="polite"
        aria-label="AI コパイロットの応答"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              "group/message relative mb-3 rounded-xl px-3 py-2",
              paper ? (m.role === "user" ? "ml-6 bg-primary-soft text-primary-soft-foreground" : "mr-2 bg-background text-foreground")
                : m.role === "user"
                ? "ml-6 bg-sky-50 text-sky-900 dark:bg-sky-950/40 dark:text-sky-100"
                : "mr-2 bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100",
            )}
          >
            {m.role === "assistant" ? (
              <>
                {m.content.length === 0 ? (
                  // First-chunk skeleton: three pulsing lines simulate the
                  // shape of a typical 200-400字 answer so the layout doesn't
                  // pop when the first token arrives.
                  <div
                    className="space-y-2 py-1"
                    aria-label="回答を生成中"
                    role="status"
                  >
                    <div className="h-3 w-11/12 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-3 w-10/12 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-3 w-7/12 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                  </div>
                ) : (
                  <Markdown>
                    {stripCitationFooter(m.content)}
                  </Markdown>
                )}
                {/* Typing cursor: only on the last assistant message while
                    actively streaming. aria-hidden so SR users aren't told
                    about a cursor that's just a visual affordance. */}
                {streaming &&
                  i === messages.length - 1 &&
                  m.content.length > 0 && (
                    <span
                      aria-hidden="true"
                      className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-[2px] animate-pulse rounded-sm bg-sky-500 dark:bg-sky-400"
                    />
                  )}
                {m.stoppedByUser && (
                  <p className="mt-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                    （ここで停止しました）
                  </p>
                )}
                <CitationCards citations={m.citations ?? []} response={m.content} isStreaming={streaming && i === messages.length - 1} messageIndex={i} />
                {m.relatedQuestions && m.relatedQuestions.length > 0 && (
                  <RelatedQuestionsSection
                    items={m.relatedQuestions}
                    messageIndex={i}
                  />
                )}
              </>
            ) : (
              <div className="text-sm leading-relaxed">
                {m.quickAction && (
                  <span className="mr-1 rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold text-sky-700 dark:bg-sky-900 dark:text-sky-200">
                    {QUICK_ACTIONS[m.quickAction]?.label ?? "旧操作（非採用）"}
                  </span>
                )}
                {m.content}
              </div>
            )}
          </div>
        ))}
        {streaming && streamStatus !== "idle" && streamStatus !== "streaming" && (
          // Pre-stream phase indicator. While the assistant bubble is showing
          // its skeleton, surface what the system is doing (searching docs,
          // calling the model). Hidden during "streaming" because the typing
          // cursor in the message bubble already conveys live progress.
          <div
            role="status"
            aria-live="polite"
            className="mt-1 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400"
          >
            {streamStatus === "searching" ? (
              <Search className="h-3 w-3 animate-pulse" aria-hidden="true" />
            ) : (
              <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
            )}
            <span>{STREAM_STATUS_LABEL[streamStatus]}</span>
          </div>
        )}
      </div>

      {/* Error banner — role="alert" forces immediate SR announcement */}
      {errorState && (
        <div
          role="alert"
          className={cn(
            "mx-3 mb-2 flex items-start gap-2 rounded-xl border px-3 py-2.5 text-xs",
            errorState.type === "network_error"
              ? "border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
              : "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200",
          )}
        >
          {errorState.type === "network_error" ? (
            <WifiOff className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          ) : (
            <RefreshCw className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          )}
          <div className="flex-1">
            <span>
              {errorState.type === "timeout"
                ? "AIの応答が遅延しました。再試行で改善することがあります。"
                : errorState.type === "server_error"
                  ? "AIが一時的に応答できません。"
                  : "接続を確認してください。"}
            </span>
            {errorState.type !== "network_error" && (
              <button
                onClick={() => {
                  setErrorState(null);
                  errorState.retryFn();
                }}
                className="ml-2 font-semibold underline hover:no-underline"
              >
                再試行
              </button>
            )}
          </div>
        </div>
      )}

      {!inline && inputForm}

    </div>
  );
}

/** One persistent editor for both wide and narrow question screens. */
export function CopilotInline({ active = true, ...props }: Omit<Props, "onClose" | "inline" | "initialPrompt"> & { active?: boolean }) {
  React.useEffect(() => {
    if (!active) return;
    setCopilotPanelOpen(true);
    return () => setCopilotPanelOpen(false);
  }, [active]);
  return (
    <section
      aria-label="この問題についてAIに質問"
      className={cn("min-w-0 scroll-mt-24", !props.paper && "overflow-hidden rounded-2xl border border-border")}
      onTouchStart={(event) => event.stopPropagation()}
      onTouchEnd={(event) => event.stopPropagation()}
    >
      <CopilotPanel {...props} key={props.question.id} inline />
    </section>
  );
}

export function CopilotMobileSheet({
  question,
  selectedChoice,
  isCorrect,
  initialPrompt,
  defaultOpen = false,
}: Omit<Props, "className" | "onClose" | "headerRight"> & { defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const fabRef = React.useRef<HTMLButtonElement | null>(null);
  const dialogRef = React.useRef<HTMLDivElement | null>(null);
  const prevOpenRef = React.useRef(open);

  // Escape キーでシートを閉じる（キーボードユーザーの脱出経路）
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // シートを閉じたらトリガー(FAB)へフォーカスを戻す。シート内の入力を操作した
  // キーボード利用者が、閉じた後に document.body へ取り残されるのを防ぐ。
  React.useEffect(() => {
    if (prevOpenRef.current && !open) {
      fabRef.current?.focus({ preventScroll: true });
    }
    prevOpenRef.current = open;
  }, [open]);

  // 開いたらシート内へフォーカスを送り込む。FAB は open 中アンマウントされるため、
  // これが無いとキーボード利用者は document.body に取り残され、Tab で背後の
  // ページ内容に入り込んでしまう（aria-modal の前提が崩れる）。
  React.useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      const first = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      first?.focus({ preventScroll: true });
    }, 0);
    return () => window.clearTimeout(t);
  }, [open]);

  // Tab フォーカスをシート内に閉じ込める（WCAG 2.4.3）。aria-modal だけでは
  // ブラウザは Tab を背後の DOM へ移してしまうため、端で巻き戻す。
  const onDialogKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const focusables = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ).filter((el) => el.offsetParent !== null || el === document.activeElement);
    const target = trapTabTarget(
      focusables,
      document.activeElement as HTMLElement | null,
      e.shiftKey,
    );
    if (target) {
      e.preventDefault();
      target.focus({ preventScroll: true });
    }
  };

  // Mirror the open state into the shared signal so the global AI quota
  // badge only shows while a copilot panel is actually open.
  React.useEffect(() => {
    if (!open) return;
    setCopilotPanelOpen(true);
    return () => setCopilotPanelOpen(false);
  }, [open]);

  return (
    <>
      {!open && (
        <button
          ref={fabRef}
          onClick={() => setOpen(true)}
          className="my-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/30 bg-card px-5 py-3 text-sm font-semibold text-primary hover:bg-primary-soft sm:hidden"
        >
          <MessageCircle className="h-4 w-4" />
          AIに聞く
        </button>
      )}
      {open && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-50 sm:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="AI コパイロット"
          onKeyDown={onDialogKeyDown}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 top-12 flex min-h-0 flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl dark:bg-zinc-950">
            <button
              onClick={() => setOpen(false)}
              className="mx-auto mt-2 flex w-16 items-center justify-center rounded-full bg-zinc-300 py-1 dark:bg-zinc-700"
              aria-label="閉じる"
            >
              <ChevronDown className="h-3 w-3 text-zinc-600 dark:text-zinc-300" />
            </button>
            <CopilotPanel
              question={question}
              selectedChoice={selectedChoice}
              isCorrect={isCorrect}
              initialPrompt={initialPrompt}
              onClose={() => setOpen(false)}
              className="min-h-0 flex-1 rounded-t-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}

/**
 * PC variant of the AI copilot. Replaces the previous always-on right-rail
 * sidebar with a floating action button at the lower-right and a right-
 * docked slide-in panel — mirroring the mobile pattern so users keep the
 * problem at full width while reading and only open AI when they need it.
 */
export function CopilotDesktopFloating({
  question,
  selectedChoice,
  isCorrect,
  initialPrompt,
  headerRight,
  defaultOpen = false,
}: Omit<Props, "className" | "onClose"> & { defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const fabRef = React.useRef<HTMLButtonElement | null>(null);
  const prevOpenRef = React.useRef(open);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Restore focus to the trigger when the panel closes. The open effect below
  // pushes focus into the panel; without this, closing (Escape / overlay /
  // 内部の閉じる) would strand keyboard users at the document body.
  React.useEffect(() => {
    if (prevOpenRef.current && !open) {
      fabRef.current?.focus({ preventScroll: true });
    }
    prevOpenRef.current = open;
  }, [open]);

  // When the panel opens, push focus into the first input (search box) so
  // the keyboard user lands somewhere useful inside the dialog.
  React.useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      const target =
        panelRef.current?.querySelector<HTMLElement>(
          "input[type='search'], textarea, input, [tabindex='0']",
        ) ?? panelRef.current;
      target?.focus({ preventScroll: true });
    }, 60);
    return () => window.clearTimeout(t);
  }, [open]);

  // Trap Tab focus inside the dialog (WCAG 2.4.3), mirroring the mobile sheet.
  // aria-modal alone does not stop the browser from tabbing into the page
  // behind the panel, so wrap at the edges. Focusables live inside panelRef
  // (the overlay is aria-hidden and not focusable).
  const onDialogKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusables = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ).filter((el) => el.offsetParent !== null || el === document.activeElement);
    const target = trapTabTarget(
      focusables,
      document.activeElement as HTMLElement | null,
      e.shiftKey,
    );
    if (target) {
      e.preventDefault();
      target.focus({ preventScroll: true });
    }
  };

  // Mirror the open state into the shared signal so the global AI quota
  // badge only shows while a copilot panel is actually open.
  React.useEffect(() => {
    if (!open) return;
    setCopilotPanelOpen(true);
    return () => setCopilotPanelOpen(false);
  }, [open]);

  return (
    <>
      {!open && (
        <button
          ref={fabRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="AI コパイロットを開く"
          aria-expanded={open}
          className="bottom-safe fixed right-6 z-40 hidden h-14 items-center gap-2 rounded-full bg-sky-600 pl-4 pr-5 text-sm font-semibold text-white shadow-xl transition hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:inline-flex"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          AIに聞く
        </button>
      )}
      {open && (
        <div
          className="fixed inset-0 z-50 hidden sm:block"
          role="dialog"
          aria-modal="true"
          aria-label="AI コパイロット"
          onKeyDown={onDialogKeyDown}
        >
          {/* Semi-transparent overlay so the underlying question stays readable. */}
          <div
            className="absolute inset-0 bg-zinc-900/30 backdrop-blur-[1px]"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={panelRef}
            className="absolute inset-y-0 right-0 flex w-[min(420px,90vw)] flex-col bg-white shadow-2xl dark:bg-zinc-950"
          >
            <CopilotPanel
              question={question}
              selectedChoice={selectedChoice}
              isCorrect={isCorrect}
              initialPrompt={initialPrompt}
              onClose={() => setOpen(false)}
              headerRight={headerRight}
              className="h-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
