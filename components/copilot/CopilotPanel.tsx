"use client";

import { requestAiConsent } from "@/lib/ai/consent";

import * as React from "react";
import dynamic from "next/dynamic";
import {
  Sparkles,
  Send,
  Loader2,
  Square,
  X,
  ChevronDown,
  RefreshCw,
  WifiOff,
  Copy,
  Check,
  Download,
  Share2,
  Link,
  Mic,
  MicOff,
  MoreVertical,
  Search,
} from "lucide-react";
import type { Question } from "@/lib/questions/types";
import { getChoiceKeys } from "@/lib/questions/answers";
import { choiceDisplayLabel } from "@/lib/questions/display";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  QUICK_ACTIONS,
  RESPONSE_LENGTH_LABEL,
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
import { downloadMarkdown } from "@/lib/chat/export-markdown";
import { useChatSession } from "@/hooks/useChatSession";
import type { ChatSession, SharePayload } from "@/lib/chat/types";
import { examLabel, formatYearSeason } from "@/lib/utils";
import { posthogCapture } from "@/lib/posthog";
import { AiAccessNotice, useAiAccessNotice } from "@/components/ai/AiAccessNotice";
import { aiPolicyDenialMessage } from "@/lib/ai/access-client";
import { copilotRestriction, type CopilotRestriction } from "./restriction-copy";
import { usePinnedQuickActions } from "@/lib/copilot/pinned-actions";
import { PrivacyNote } from "@/components/ui/privacy-note";

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
  focusRequest?: { sequence: number; prompt?: string };
}

const WRONG_ONLY: QuickActionId = "why-wrong";

// Number of quick actions shown by default before the "+他N個を見る" toggle.
// Six matches the plan recommendation: enough headroom for the most-used
// affordances without crowding the panel with the full 12-action list.
const QUICK_ACTION_COLLAPSED_COUNT = 4;

interface SpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((ev: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((ev: { error?: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

interface WindowWithSpeech extends Window {
  SpeechRecognition?: new () => SpeechRecognitionInstance;
  webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
}

function getSpeechRecognitionCtor(): (new () => SpeechRecognitionInstance) | null {
  if (typeof window === "undefined") return null;
  const w = window as WindowWithSpeech;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function buildShareUrl(question: Question, messages: Message[]): string {
  const payload: SharePayload = {
    v: 1,
    exam: question.exam,
    year: question.year,
    season: question.season,
    q: question.qNumber,
    qText: question.question.slice(0, 600),
    cat: question.category,
    msgs: messages.map((m) => ({
      r: m.role === "user" ? "u" : "a",
      c: m.content,
      qa: m.quickAction,
    })),
  };
  const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
  return `${window.location.origin}/chat/share?d=${encoded}`;
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
  focusRequest,
}: Props) {
  const {message: aiAccessMessage, begin: beginAiAccess, response: captureAiResponse, uncertain: markAiUncertain} = useAiAccessNotice(question.id);
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
  const [copiedIdx, setCopiedIdx] = React.useState<number | null>(null);
  const [copiedAll, setCopiedAll] = React.useState(false);
  const [quickActionsExpanded, setQuickActionsExpanded] = React.useState(false);
  const [actionsOpen, setActionsOpen] = React.useState(false);
  const actionsRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!actionsOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (!actionsRef.current?.contains(e.target as Node)) setActionsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActionsOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [actionsOpen]);
  const [copiedShareUrl, setCopiedShareUrl] = React.useState(false);
  const [shareOpen, setShareOpen] = React.useState(false);
  const [shareUrl, setShareUrl] = React.useState("");
  const [toast, setToast] = React.useState<string | null>(null);
  const [profile, setProfile] = React.useState<LearnerProfile | undefined>(undefined);
  const [voiceState, setVoiceState] = React.useState<
    "idle" | "listening" | "unsupported" | "denied"
  >("idle");
  const [responseLength, setResponseLength] = React.useState<ResponseLength>("medium");

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const abortRef = React.useRef<AbortController | null>(null);
  // Distinguishes a user-initiated stop (Stop button) from a system-side abort
  // (question-change, unmount). Only user stops should annotate the partial
  // message with a "(停止しました)" marker; system aborts should be silent.
  const userStoppedRef = React.useRef(false);
  const recognitionRef = React.useRef<SpeechRecognitionInstance | null>(null);
  const lastSendArgsRef = React.useRef<{ text: string; quickAction?: QuickActionId } | null>(null);
  const sendRef = React.useRef<(text: string, quickAction?: QuickActionId) => void>(() => {});
  const toastTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const { sessionId, createdAt } = useChatSession(question, messages);

  const showToast = React.useCallback((msg: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(msg);
    toastTimerRef.current = setTimeout(() => setToast(null), 2200);
  }, []);

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
    setInput(initialPrompt ?? "");
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
    setCopiedIdx(null);
    setCopiedAll(false);
    setShareOpen(false);
    setToast(null);
    setProfile(buildLearnerProfileFromHistory());
  }, [question.id, initialPrompt]);

  const requestSequence = focusRequest?.sequence;
  const requestedPrompt = focusRequest?.prompt;
  React.useEffect(() => {
    if (!requestSequence) return;
    // A follow-up is a focus request, never a new chat or an automatic send.
    if (requestedPrompt) setInput((draft) => draft.trim() ? draft : requestedPrompt);
    inputRef.current?.focus({ preventScroll: true });
    inputRef.current?.scrollIntoView({ block: "nearest" });
  }, [requestSequence, requestedPrompt]);

  // Detect Web Speech API availability once
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const Ctor = getSpeechRecognitionCtor();
     
    if (!Ctor) setVoiceState("unsupported");
    try {
      const stored = window.localStorage.getItem(LS_KEYS.copilotResponseLength);
      if (stored === "short" || stored === "medium" || stored === "long") {
        setResponseLength(stored);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLengthChange = React.useCallback((next: ResponseLength) => {
    setResponseLength(next);
    try {
      window.localStorage.setItem(LS_KEYS.copilotResponseLength, next);
    } catch {
      // ignore
    }
  }, []);

  // Stop any active recognition on unmount
  React.useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.stop();
      } catch {
        // ignore
      }
    };
  }, []);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  React.useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const send = React.useCallback(
    async (text: string, quickAction?: QuickActionId) => {
      if (streaming || abortRef.current) return;
      if (typeof navigator !== "undefined" && navigator.onLine === false) {
        setOnline(false);
        return;
      }
      const trimmed = text.trim();
      if (!trimmed && !quickAction) return;
      if (!requestAiConsent()) return;

      setErrorState(null);
      setRestriction(null);
      lastSendArgsRef.current = { text: trimmed, quickAction };

      const userMsg: Message = {
        role: "user",
        content: trimmed || QUICK_ACTIONS[quickAction!].label,
        quickAction,
      };
      const nextMessages = [...messages, userMsg];
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

      beginAiAccess();
      let responseReceived = false;
      try {
        posthogCapture("ai_query_sent", {
          questionId: question?.id,
          exam: question?.exam,
          quickAction: quickAction ?? null,
        });
        const res = await fetch("/api/copilot", {
          method: "POST",
          // 無料枠解除はサーバ署名済み Cookie で判定するため、自己申告ヘッダは送らない
          // （送っても無視される。ヘッダを残すと解除根拠を誤解させる）。
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
        responseReceived = true;
        captureAiResponse(res);
        const responseBody = !res.ok ? await res.clone().json().catch(() => null) : null;
        if (!currentRequest()) return;
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
        if (!responseReceived) markAiUncertain();
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
      beginAiAccess, captureAiResponse, markAiUncertain,
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

  const toggleVoice = React.useCallback(() => {
    if (voiceState === "unsupported") return;
    if (voiceState === "listening") {
      try {
        recognitionRef.current?.stop();
      } catch {
        // ignore
      }
      return;
    }
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) {
      setVoiceState("unsupported");
      return;
    }
    try {
      const rec = new Ctor();
      rec.lang = "ja-JP";
      rec.continuous = false;
      rec.interimResults = true;
      rec.onresult = (ev) => {
        let finalText = "";
        for (let i = 0; i < ev.results.length; i++) {
          const alt = ev.results[i][0];
          if (alt) finalText += alt.transcript;
        }
        if (finalText.trim()) {
          setInput((prev) => (prev ? `${prev} ${finalText}` : finalText));
        }
      };
      rec.onerror = (ev) => {
        if (ev.error === "not-allowed" || ev.error === "service-not-allowed") {
          setVoiceState("denied");
        } else {
          setVoiceState("idle");
        }
      };
      rec.onend = () => {
        setVoiceState((s) => (s === "denied" || s === "unsupported" ? s : "idle"));
        recognitionRef.current = null;
      };
      recognitionRef.current = rec;
      rec.start();
      setVoiceState("listening");
    } catch {
      setVoiceState("idle");
    }
  }, [voiceState]);

  const handleCopyMessage = React.useCallback(
    async (idx: number, content: string) => {
      try {
        await navigator.clipboard.writeText(content);
        setCopiedIdx(idx);
        showToast("コピーしました");
        setTimeout(() => setCopiedIdx(null), 2000);
      } catch {
        showToast("コピーに失敗しました");
      }
    },
    [showToast],
  );

  const handleCopyAll = React.useCallback(async () => {
    if (messages.length === 0) return;
    const text = messages
      .map((m) => `${m.role === "user" ? "あなた" : "過去問AI"}: ${m.content}`)
      .join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAll(true);
      showToast("全体をコピーしました");
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      showToast("コピーに失敗しました");
    }
  }, [messages, showToast]);

  const handleOpenShare = React.useCallback(() => {
    const url = buildShareUrl(question, messages);
    setShareUrl(url);
    setShareOpen(true);
  }, [question, messages]);

  const handleCopyShareUrl = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedShareUrl(true);
      showToast("URLをコピーしました");
      setTimeout(() => setCopiedShareUrl(false), 2000);
    } catch {
      showToast("コピーに失敗しました");
    }
  }, [shareUrl, showToast]);

  const handleDownloadMd = React.useCallback(() => {
    const session: ChatSession = {
      id: sessionId,
      questionId: question.id,
      examCode: question.exam,
      year: question.year,
      season: question.season,
      qNumber: question.qNumber,
      questionText: question.question,
      questionCategory: question.category,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
        quickAction: m.quickAction,
        createdAt: new Date().toISOString(),
      })),
      createdAt,
      updatedAt: new Date().toISOString(),
    };
    downloadMarkdown(session, question);
    showToast("ダウンロードを開始しました");
  }, [question, messages, sessionId, createdAt, showToast]);

  // Pins saved earlier still decide the order; the per-chip pin toggles were removed as clutter.
  const { pinned } = usePinnedQuickActions();

  const baseQuickActionIds: QuickActionId[] = [
    "term",
    "simplify",
    "detailed",
    "example",
    "mnemonic",
    "socratic",
    "prerequisite",
    "analyze-a",
    "analyze-i",
    "analyze-u",
    "analyze-e",
  ];
  // Final order: pinned first (in pin order), then why-wrong if active and
  // not already pinned, then the remaining base actions skipping anything
  // already placed.
  const quickActionIds: QuickActionId[] = [];
  const seen = new Set<QuickActionId>();
  for (const id of pinned) {
    // Do not surface retired generation actions or unrecognized stored pins.
    if (!Object.hasOwn(QUICK_ACTIONS, id)) continue;
    if (!seen.has(id)) {
      quickActionIds.push(id);
      seen.add(id);
    }
  }
  if (isCorrect === false && !seen.has(WRONG_ONLY)) {
    quickActionIds.push(WRONG_ONLY);
    seen.add(WRONG_ONLY);
  }
  for (const id of baseQuickActionIds) {
    if (!seen.has(id)) {
      quickActionIds.push(id);
      seen.add(id);
    }
  }
  const visibleQuickActionIds = quickActionsExpanded
    ? quickActionIds
    : quickActionIds.slice(0, QUICK_ACTION_COLLAPSED_COUNT);
  const hiddenQuickActionCount = Math.max(
    quickActionIds.length - QUICK_ACTION_COLLAPSED_COUNT,
    0,
  );

  const hasMessages = messages.length > 0;

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
      <AiAccessNotice message={aiAccessMessage} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-end gap-2 border-t border-zinc-200 p-3 dark:border-zinc-800"
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
          placeholder={
            voiceState === "listening"
              ? "話してください…"
              : "AIに質問…"
          }
          className="min-w-0 min-h-[44px] flex-1 resize-none rounded-xl border border-zinc-300 bg-white px-3 py-2 text-base placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-600 sm:text-sm"
        />
        {voiceState !== "unsupported" && (
          <Button
            type="button"
            variant={voiceState === "listening" ? "primary" : "ghost"}
            size="icon"
            onClick={toggleVoice}
            disabled={streaming || voiceState === "denied"}
            aria-label={
              voiceState === "listening"
                ? "音声入力を停止"
                : voiceState === "denied"
                  ? "マイクが拒否されました"
                  : "音声入力を開始"
            }
            title={
              voiceState === "denied"
                ? "ブラウザのマイク権限を許可してください"
                : voiceState === "listening"
                  ? "停止"
                  : "音声で質問"
            }
            className={cn(
              voiceState === "listening" && "animate-pulse",
              voiceState === "denied" && "opacity-50",
            )}
          >
            {voiceState === "denied" ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>
        )}
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
            className="bg-red-600 hover:bg-red-700 focus-visible:ring-red-500"
          >
            <Square className="h-4 w-4 fill-current" />
          </Button>
        ) : (
          <Button
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
      <PrivacyNote variant="ai" className="px-3 pb-2" />
    </>
  );

  return (
    <div className={cn("flex min-w-0 w-full flex-col bg-white dark:bg-zinc-950", !inline && "h-full", className)}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-sky-600 dark:text-sky-400" />
          <span className="text-sm font-semibold">{inline ? "この問題をAIに質問" : "AI コパイロット"}</span>
          <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300" title="短時間の連続利用などには適正利用制限があります">
            無料で質問
          </span>
        </div>
        <div className="flex items-center gap-1">
          {hasMessages && (
            <div ref={actionsRef} className="relative">
              <button
                onClick={() => setActionsOpen((v) => !v)}
                title="その他の操作"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                aria-label="その他の操作"
                aria-expanded={actionsOpen}
                aria-controls="copilot-actions-popup"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
              {actionsOpen && (
                <div
                  id="copilot-actions-popup"
                  role="group"
                  className="absolute right-0 top-full z-50 mt-1 w-44 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
                  aria-label="その他の操作"
                >
                  <button
                    onClick={() => {
                      setActionsOpen(false);
                      handleCopyAll();
                    }}
                    className="flex w-full min-h-[44px] items-center gap-2 px-3 py-2.5 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  >
                    {copiedAll ? (
                      <Check className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                    ) : (
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    )}
                    全体コピー
                  </button>
                  <button
                    onClick={() => {
                      setActionsOpen(false);
                      handleOpenShare();
                    }}
                    className="flex w-full min-h-[44px] items-center gap-2 px-3 py-2.5 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  >
                    <Share2 className="h-4 w-4" aria-hidden="true" />
                    共有
                  </button>
                  <button
                    onClick={() => {
                      setActionsOpen(false);
                      handleDownloadMd();
                    }}
                    className="flex w-full min-h-[44px] items-center gap-2 px-3 py-2.5 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Markdown DL
                  </button>
                </div>
              )}
            </div>
          )}
          {headerRight}
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="閉じる">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Response length toggle */}
      <div className="border-b border-zinc-200 px-3 pt-2.5 pb-2 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label="回答の長さ（目安）"
            className="inline-flex overflow-hidden rounded-full border border-zinc-300 dark:border-zinc-700"
          >
            {(["short", "medium", "long"] as const).map((len) => (
              <button
                key={len}
                type="button"
                onClick={() => handleLengthChange(len)}
                aria-pressed={responseLength === len}
                className={cn(
                  "px-2.5 py-0.5 text-[11px] font-medium transition-colors",
                  responseLength === len
                    ? "bg-sky-600 text-white"
                    : "bg-white text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800",
                )}
              >
                {RESPONSE_LENGTH_LABEL[len]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {inline && inputForm}

      {/* Quick actions */}
      <div className="border-b border-zinc-200 p-3 dark:border-zinc-800">
        <>
            <div
              id="copilot-quickactions-list"
              className="flex flex-wrap gap-2"
            >
              {visibleQuickActionIds.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => send("", id)}
                  disabled={streaming || !online}
                  className={cn(
                    "min-h-11 rounded-full border px-4 py-2 text-sm transition-colors disabled:opacity-50",
                    id === WRONG_ONLY
                      ? "border-red-300 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200"
                      : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800",
                  )}
                >
                  {QUICK_ACTIONS[id].label}
                </button>
              ))}
            </div>
            {hiddenQuickActionCount > 0 && (
              <button
                type="button"
                onClick={() => setQuickActionsExpanded((v) => !v)}
                aria-expanded={quickActionsExpanded}
                aria-controls="copilot-quickactions-list"
                className="mt-2 inline-flex min-h-11 items-center gap-1 rounded-full border border-zinc-300 bg-white px-3 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                {quickActionsExpanded
                  ? "閉じる"
                  : "他を見る"}
              </button>
            )}
        </>
      </div>

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
              m.role === "user"
                ? "ml-6 bg-sky-50 text-sky-900 dark:bg-sky-950/40 dark:text-sky-100"
                : "mr-2 bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100",
            )}
          >
            {m.role === "assistant" && (
              <button
                onClick={() => handleCopyMessage(i, m.content)}
                className="absolute right-2 top-2 rounded-md p-1 text-zinc-300 transition-colors hover:bg-zinc-200 hover:text-zinc-600 sm:opacity-0 sm:group-hover/message:opacity-100 dark:text-zinc-600 dark:hover:bg-zinc-700 dark:hover:text-zinc-300"
                aria-label="このメッセージをコピー"
                title="コピー"
              >
                {copiedIdx === i ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            )}
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

      {/* Cross-check against the site's per-choice explanations */}
      {messages.some((m) => m.role === "assistant") && selectedChoice && question.type !== "ordering" && question.choices && question.choiceExplanations && (
        <div className="mx-3 mb-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-sm leading-7 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
            <details>
              <summary className="cursor-pointer font-medium underline underline-offset-2">サイト掲載の選択肢別解説と照合</summary>
              <ul className="mt-1 space-y-1 pl-3">
                {getChoiceKeys(question.choices)
                  .filter((key) => selectedChoice.split("・").includes(key) ||
                    (Array.isArray(question.answer) ? question.answer : [question.answer]).includes(key))
                  .map((key) => question.choiceExplanations?.[key] && (
                    <li key={key}>
                      {choiceDisplayLabel(question.exam, key)}: {question.choiceExplanations[key]}
                    </li>
                  ))}
              </ul>
              {(question.sourceAnswerUrl || question.sourcePdfUrl) && (
                <a href={question.sourceAnswerUrl || question.sourcePdfUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block underline underline-offset-2">
                  問題データの出典PDFを開く
                </a>
              )}
            </details>
        </div>
      )}

      {!inline && inputForm}

      {/* Share modal */}
      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>会話を共有</DialogTitle>
            <DialogDescription>
              {examLabel(question.exam)} {formatYearSeason(question.year, question.season)} 問{question.qNumber} の会話を共有します。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                value={shareUrl}
                readOnly
                className="min-w-0 flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
                aria-label="共有URL"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyShareUrl}
                className="shrink-0"
                aria-label="URLをコピー"
              >
                {copiedShareUrl ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Link className="h-4 w-4" />
                )}
                <span className="ml-1">{copiedShareUrl ? "コピー済み" : "コピー"}</span>
              </Button>
            </div>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
              ※ URLには会話の内容が含まれます。個人情報は入力しないようにしてください。
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Toast — role="status" ensures SR announcement on appearance */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed bottom-4 right-4 z-[200]"
      >
        {toast && (
          <div className="flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-xl dark:bg-zinc-100 dark:text-zinc-900">
            <Check className="h-4 w-4 shrink-0 text-emerald-400 dark:text-emerald-600" aria-hidden="true" />
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}

/** One persistent editor for both wide and narrow question screens. */
export function CopilotInline(props: Omit<Props, "onClose" | "inline" | "initialPrompt">) {
  React.useEffect(() => {
    setCopilotPanelOpen(true);
    return () => setCopilotPanelOpen(false);
  }, []);
  return (
    <section
      aria-label="この問題についてAIに質問"
      className="min-w-0 scroll-mt-24 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800"
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
          <Sparkles className="h-4 w-4" />
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
          <Sparkles className="h-4 w-4" aria-hidden="true" />
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
