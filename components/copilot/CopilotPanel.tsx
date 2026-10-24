"use client";

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
  Pin,
  PinOff,
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
  INITIAL_QUESTION_EXAMPLES,
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
import { readCharacterState } from "@/lib/storage/character";
import { posthogCapture } from "@/lib/posthog";
import { usePinnedQuickActions } from "@/lib/copilot/pinned-actions";
import { classifyCopilotHttpFailure, copilotFailureMessage, parseCopilotFailure, type CopilotFailure } from "@/lib/copilot/errors";

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
  pending?: boolean;
  failed?: boolean;
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
  active?: boolean;
}

const WRONG_ONLY: QuickActionId = "why-wrong";

// Number of quick actions shown by default before the "+他N個を見る" toggle.
// Six matches the plan recommendation: enough headroom for the most-used
// affordances without crowding the panel with the full 12-action list.
const QUICK_ACTION_COLLAPSED_COUNT = 6;

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

function examHashtags(exam: string): string {
  const tags = ["IPA試験", "過去問AI"];
  const map: Record<string, string> = {
    ap: "応用情報",
    fe: "基本情報",
    sg: "情報セキュリティマネジメント",
    ip: "ITパスポート",
    sc: "情報処理安全確保支援士",
    nw: "ネットワークスペシャリスト",
    db: "データベーススペシャリスト",
    es: "エンベデッドシステムスペシャリスト",
    st: "ITストラテジスト",
    sa: "システムアーキテクト",
    pm: "プロジェクトマネージャ",
    sm: "ITサービスマネージャ",
    au: "システム監査技術者",
  };
  if (map[exam]) tags.push(map[exam]);
  return tags.join(",");
}

export function CopilotPanel({
  question,
  selectedChoice,
  isCorrect,
  initialPrompt,
  onClose,
  headerRight,
  className,
  active = true,
}: Props) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState(initialPrompt ?? "");
  const [streaming, setStreaming] = React.useState(false);
  const [streamStatus, setStreamStatus] = React.useState<StreamStatus>("idle");
  const [errorState, setErrorState] = React.useState<(CopilotFailure & { submittedText: string }) | null>(null);
  const [unreadOutput, setUnreadOutput] = React.useState(false);
  const [copiedIdx, setCopiedIdx] = React.useState<number | null>(null);
  const [copiedAll, setCopiedAll] = React.useState(false);
  const [quickActionsExpanded, setQuickActionsExpanded] = React.useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = React.useState(true);
  const [actionsOpen, setActionsOpen] = React.useState(false);
  const actionsRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const media = window.matchMedia("(max-height: 600px)");
    const update = () => setQuickActionsOpen(!media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

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
  const requestTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const completedMessagesRef = React.useRef<Message[]>([]);
  const followOutputRef = React.useRef(true);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  // Distinguishes a user-initiated stop (Stop button) from a system-side abort
  // (question-change, unmount). Only user stops should annotate the partial
  // message with a "(停止しました)" marker; system aborts should be silent.
  const userStoppedRef = React.useRef(false);
  const recognitionRef = React.useRef<SpeechRecognitionInstance | null>(null);
  const lastSendArgsRef = React.useRef<{ text: string; quickAction?: QuickActionId } | null>(null);
  const sendRef = React.useRef<(text: string, quickAction?: QuickActionId) => void>(() => {});
  const toastTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const { sessionId, createdAt } = useChatSession(question, messages.filter((m) => !m.pending && !m.failed && !m.stoppedByUser));

  const showToast = React.useCallback((msg: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(msg);
    toastTimerRef.current = setTimeout(() => setToast(null), 2200);
  }, []);

  // Reset conversation when question changes; refresh profile snapshot
  React.useEffect(() => {

    const previous = abortRef.current;
    abortRef.current = null;
    previous?.abort();
    if (requestTimerRef.current) clearTimeout(requestTimerRef.current);
    completedMessagesRef.current = [];
    followOutputRef.current = true;
    setUnreadOutput(false);
    setErrorState(null);
    lastSendArgsRef.current = null;
    setStreaming(false);
    setMessages([]);
    setInput(initialPrompt ?? "");
    // Question-change abort is system-driven, not user-driven, so leave the
    // userStoppedRef flag false to avoid annotating the discarded message.
    userStoppedRef.current = false;
    setStreamStatus("idle");
    setCopiedIdx(null);
    setCopiedAll(false);
    setShareOpen(false);
    setToast(null);
    setProfile(buildLearnerProfileFromHistory());
    return () => {
      const active = abortRef.current;
      abortRef.current = null;
      active?.abort();
      if (requestTimerRef.current) clearTimeout(requestTimerRef.current);
    };
  }, [question.id, initialPrompt]);

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
    if (followOutputRef.current) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "auto" });
    } else if (streaming) {
      setUnreadOutput(true);
    }
  }, [messages, streaming]);

  React.useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const send = React.useCallback(
    async (text: string, quickAction?: QuickActionId) => {
      // Ref is set synchronously: two clicks in the same render cannot send twice.
      if (abortRef.current) return;
      const trimmed = text.trim();
      if ((!trimmed && !quickAction) || trimmed.length > 4000) return;
      if (errorState && !errorState.retryable && trimmed === errorState.submittedText) return;

      const userMsg: Message = {
        role: "user",
        content: trimmed || QUICK_ACTIONS[quickAction!].label,
        quickAction,
      };
      // Failed/stopped turns never become model context. A retry replaces that turn.
      const base = completedMessagesRef.current;
      const nextMessages = [...base, userMsg];
      lastSendArgsRef.current = { text: userMsg.content, quickAction };
      setErrorState(null);
      setMessages([...base, { ...userMsg, pending: true }]);
      setInput((draft) => draft.trim() === userMsg.content ? "" : draft);
      setStreaming(true);
      setStreamStatus("sending");
      setUnreadOutput(false);
      followOutputRef.current = true;
      userStoppedRef.current = false;

      const controller = new AbortController();
      abortRef.current = controller;
      const isCurrent = () => abortRef.current === controller;
      let acc = "";
      let citations: CitationMeta[] = [];
      let relatedQuestions: RelatedQuestion[] = [];
      let clientTimedOut = false;
      const timer = setTimeout(() => {
        clientTimedOut = true;
        controller.abort();
      }, 45_000);
      requestTimerRef.current = timer;
      const showResponse = (content: string, pending: boolean, failed = false, stoppedByUser = false) => {
        if (!isCurrent()) return;
        setMessages([
          ...base,
          { ...userMsg, pending, failed: failed || stoppedByUser },
          ...(content || pending || stoppedByUser ? [{
            role: "assistant" as const,
            content,
            pending,
            failed,
            stoppedByUser,
            citations: failed || stoppedByUser ? undefined : citations,
            relatedQuestions: failed || stoppedByUser ? undefined : relatedQuestions,
          }] : []),
        ]);
      };
      const fail = (failure: CopilotFailure) => {
        if (!isCurrent()) return;
        setErrorState({ ...failure, submittedText: userMsg.content });
        // Preserve anything the learner typed while the response was loading.
        setInput((draft) => draft || userMsg.content);
        showResponse(parseCopilotFailure(acc).text, false, true);
      };

      try {
        const characterState = readCharacterState();
        posthogCapture("ai_query_sent", { questionId: question.id, exam: question.exam, quickAction: quickAction ?? null });
        const res = await fetch("/api/copilot", {
          method: "POST",
          headers: { "content-type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            question: { id: question.id },
            selectedChoice,
            isCorrect,
            tier: "free",
            quickAction,
            learnerProfile: profile,
            character: characterState.id,
            characterEnabled: characterState.enabled,
            responseLength,
            // Keep complete pairs plus the current question, within API bounds.
            messages: [...base.slice(-18), userMsg].map((m) => ({
              role: m.role,
              content: m.content.length > 4000 ? m.content.slice(0, 3978) + "\n（以前の回答の続きは省略）" : m.content,
            })),
          }),
        });
        if (!isCurrent()) return;
        if (!res.ok) {
          const body: unknown = await res.json().catch(() => undefined);
          fail(classifyCopilotHttpFailure(res.status, body, res.headers.get("Retry-After")));
          return;
        }
        if (!res.body) {
          fail({ code: "no_text", retryable: false });
          return;
        }
        citations = decodeCitationsHeader(res.headers.get("X-RAG-Citation-Candidates") ?? res.headers.get("X-RAG-Citations"));
        relatedQuestions = decodeRelatedHeader(res.headers.get("X-Related-Questions"));
        setStreamStatus("generating");
        showResponse("", true);
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (!isCurrent()) { await reader.cancel(); return; }
            acc += decoder.decode(value, { stream: !done });
            if (done) break;
            const parsed = parseCopilotFailure(acc);
            if (parsed.text) setStreamStatus("streaming");
            showResponse(parsed.text, true, Boolean(parsed.error));
          }
        } finally {
          reader.releaseLock();
        }
        if (!isCurrent()) return;
        const parsed = parseCopilotFailure(acc);
        if (parsed.error) {
          fail(parsed.error);
        } else if (!parsed.text.trim()) {
          fail({ code: "no_text", retryable: false });
        } else {
          const answer: Message = { role: "assistant", content: parsed.text, citations, relatedQuestions };
          completedMessagesRef.current = [...nextMessages, answer];
          setMessages(completedMessagesRef.current);
        }
        posthogCapture("copilot_response_received", {
          questionId: question.id, exam: question.exam,
          response_length: parsed.text.length,
          had_timeout: parsed.error?.code === "timeout",
          had_server_error: Boolean(parsed.error),
        });
      } catch (err) {
        if (!isCurrent()) return;
        if (controller.signal.aborted || (err as Error).name === "AbortError") {
          if (userStoppedRef.current) {
            showResponse(parseCopilotFailure(acc).text, false, false, true);
            setInput((draft) => draft || userMsg.content);
          } else if (clientTimedOut) {
            fail({ code: "timeout", retryable: true });
          }
        } else {
          fail({ code: "temporary", retryable: true });
        }
      } finally {
        clearTimeout(timer);
        // A stale request cannot settle or append to the next question's chat.
        if (isCurrent()) {
          abortRef.current = null;
          setStreaming(false);
          setStreamStatus("idle");
          userStoppedRef.current = false;
        }
      }
    },
    [question, selectedChoice, isCorrect, profile, responseLength, errorState],
  );

  // Keep a ref to `send` so retryFn closures can call the latest version
  // without triggering use-before-declared lint errors.
  React.useEffect(() => {
    sendRef.current = (text, quickAction) => {
      void send(text, quickAction);
    };
  }, [send]);

  const handleStop = React.useCallback(() => {
    const controller = abortRef.current;
    if (!controller) return;
    abortRef.current = null;
    controller.abort();
    if (requestTimerRef.current) clearTimeout(requestTimerRef.current);
    setStreaming(false);
    setStreamStatus("idle");
    setInput((draft) => draft || lastSendArgsRef.current?.text || "");
    setMessages((previous) => previous.map((message) => message.pending
      ? { ...message, pending: false, failed: true, stoppedByUser: message.role === "assistant", citations: undefined, relatedQuestions: undefined }
      : message));
  }, []);

  // A closed panel retains this question's conversation, but performs no work.
  React.useEffect(() => {
    if (active) return;
    handleStop();
    setShareOpen(false);
    setActionsOpen(false);
    const recognition = recognitionRef.current;
    if (recognition) {
      recognition.onresult = null;
      recognition.onend = null;
      recognition.onerror = null;
      try { recognition.stop(); } catch { /* already stopped */ }
      recognitionRef.current = null;
      setVoiceState("idle");
    }
  }, [active, handleStop]);

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

  const { pinned, isPinned, togglePin, canPinMore } = usePinnedQuickActions();

  const baseQuickActionIds: QuickActionId[] = [
    "term",
    "simplify",
    "detailed",
    "example",
    "mnemonic",
    "similar",
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
  const twitterUrl = shareUrl
    ? `https://twitter.com/intent/tweet?text=${encodeURIComponent("AIと一緒に解いたIPA過去問")}&hashtags=${encodeURIComponent(examHashtags(question.exam))}&url=${encodeURIComponent(shareUrl)}`
    : "";

  return (
    <div className={cn("flex h-full min-h-0 w-full flex-col bg-white dark:bg-zinc-950", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-sky-600 dark:text-sky-400" />
          <span className="text-sm font-semibold">AI コパイロット</span>
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
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400">回答の長さ（目安）</span>
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
          {responseLength === "short" && (
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500">30秒解説モード</span>
          )}
        </div>
      </div>

      <p className="shrink-0 px-3 pt-2 text-xs text-zinc-500" aria-live="polite">
        問{question.qNumber} · {selectedChoice
          ? `選択: ${selectedChoice.split("・").map((key) => {
            const choice = getChoiceKeys(question.choices).find((candidate) => candidate === key);
            return choice ? choiceDisplayLabel(question.exam, choice) : key;
          }).join("・")}（${isCorrect === true ? "正解" : isCorrect === false ? "不正解" : "未採点"}）`
          : "未解答 · 答えを伏せてヒントから"}
      </p>
      {/* Quick actions */}
      <div className="shrink-0 border-b border-zinc-200 px-3 pb-2 dark:border-zinc-800">
        <button type="button" onClick={() => setQuickActionsOpen((value) => !value)}
          aria-expanded={quickActionsOpen} aria-controls="copilot-actions-content"
          className="flex min-h-11 w-full items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span>クイックアクション</span><ChevronDown className={cn("h-4 w-4", quickActionsOpen && "rotate-180")} aria-hidden="true" />
        </button>
        {quickActionsOpen && <div id="copilot-actions-content" className="max-h-40 overflow-y-auto overscroll-contain">
            <div
              id="copilot-quickactions-list"
              className="flex flex-wrap gap-1.5"
            >
              {visibleQuickActionIds.map((id) => {
                const isThisPinned = isPinned(id);
                return (
                  <div
                    key={id}
                    className={cn(
                      "group/qa inline-flex items-stretch overflow-hidden rounded-full border transition-colors",
                      id === WRONG_ONLY
                        ? "border-red-300 bg-red-50 dark:border-red-900/60 dark:bg-red-950/40"
                        : isThisPinned
                          ? "border-sky-300 bg-sky-50/70 dark:border-sky-700 dark:bg-sky-950/40"
                          : "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => send("", id)}
                      disabled={streaming}
                      className={cn(
                        "px-2.5 py-1 text-xs transition-colors disabled:opacity-50",
                        id === WRONG_ONLY
                          ? "text-red-700 hover:bg-red-100 dark:text-red-200"
                          : isThisPinned
                            ? "text-sky-800 hover:bg-sky-100 dark:text-sky-100 dark:hover:bg-sky-900/40"
                            : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800",
                      )}
                    >
                      {QUICK_ACTIONS[id].label}
                    </button>
                    <button
                      type="button"
                      onClick={() => togglePin(id)}
                      aria-pressed={isThisPinned}
                      aria-label={
                        isThisPinned
                          ? `${QUICK_ACTIONS[id].label} のピン留めを解除`
                          : canPinMore
                            ? `${QUICK_ACTIONS[id].label} をピン留め`
                            : `ピン留め上限 (3) に達しています`
                      }
                      disabled={!isThisPinned && !canPinMore}
                      title={
                        isThisPinned
                          ? "ピン留め解除"
                          : canPinMore
                            ? "ピン留め (最大 3 件)"
                            : "ピン留め上限 (3) に達しています"
                      }
                      className={cn(
                        "flex w-6 items-center justify-center border-l text-[10px] transition-colors disabled:opacity-30",
                        id === WRONG_ONLY
                          ? "border-red-300 text-red-500 hover:bg-red-100 dark:border-red-900/60 dark:text-red-300 dark:hover:bg-red-950/60"
                          : isThisPinned
                            ? "border-sky-300 text-sky-600 hover:bg-sky-100 dark:border-sky-700 dark:text-sky-200 dark:hover:bg-sky-900/40"
                            : "border-zinc-300 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:border-zinc-700 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300",
                      )}
                    >
                      {isThisPinned ? (
                        <Pin className="h-3 w-3 fill-current" aria-hidden="true" />
                      ) : (
                        <PinOff className="h-3 w-3" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
            {hiddenQuickActionCount > 0 && (
              <button
                type="button"
                onClick={() => setQuickActionsExpanded((v) => !v)}
                aria-expanded={quickActionsExpanded}
                aria-controls="copilot-quickactions-list"
                className="mt-2 inline-flex items-center gap-1 rounded-full border border-zinc-300 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-600 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                {quickActionsExpanded
                  ? "閉じる"
                  : `+他 ${hiddenQuickActionCount} 個を見る`}
              </button>
            )}
        </div>}
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3"
        role="log"
        aria-live="polite"
        aria-label="AI コパイロットの応答"
        onScroll={(event) => {
          const el = event.currentTarget;
          followOutputRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
          if (followOutputRef.current) setUnreadOutput(false);
        }}
      >
        {messages.length === 0 && (
          <div className="space-y-2.5">
            <div className="rounded-xl border border-dashed border-zinc-300 p-4 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              問題文は既にAIに共有されています。分からないところを聞いたり、上のボタンでサッと深掘りできます。
            </div>
            <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-3 dark:border-sky-900/50 dark:bg-sky-950/20">
              <p className="mb-2 text-[11px] font-semibold text-sky-700 dark:text-sky-300">
                こんな質問ができます
              </p>
              <ul
                aria-label="質問例"
                className="flex flex-wrap gap-1.5"
              >
                {INITIAL_QUESTION_EXAMPLES.map((ex) => (
                  <li key={ex.label}>
                    <button
                      type="button"
                      onClick={() => {
                        setInput(ex.prompt);
                        inputRef.current?.focus({ preventScroll: true });
                        posthogCapture("copilot_question_example_clicked", {
                          label: ex.label,
                          questionId: question?.id,
                        });
                      }}
                      className="rounded-full border border-sky-300 bg-white px-2.5 py-1 text-xs text-sky-700 transition-colors hover:bg-sky-100 dark:border-sky-800 dark:bg-zinc-900 dark:text-sky-300 dark:hover:bg-sky-950/50"
                    >
                      {ex.label}
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[10px] text-zinc-500 dark:text-zinc-400">
                ※ クリックで入力欄にプリセット。自由に編集して送信できます。
              </p>
            </div>
          </div>
        )}
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
                {m.content.length === 0 && m.pending ? (
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
                {!m.failed && !m.stoppedByUser && <CitationCards citations={m.citations ?? []} response={m.content} isStreaming={streaming && i === messages.length - 1} messageIndex={i} />}
                {!m.failed && !m.stoppedByUser && m.relatedQuestions && m.relatedQuestions.length > 0 && (
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
                    {QUICK_ACTIONS[m.quickAction].label}
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

      {unreadOutput && (
        <button type="button" className="mx-3 min-h-11 shrink-0 rounded-lg text-sm font-medium text-sky-700"
          onClick={() => {
            followOutputRef.current = true;
            setUnreadOutput(false);
            scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "auto" });
          }}>
          新しい回答へ移動 ↓
        </button>
      )}

      {/* Error banner — role="alert" forces immediate SR announcement */}
      {errorState && (
        <div
          role="alert"
          className={cn(
            "mx-3 mb-2 flex items-start gap-2 rounded-xl border px-3 py-2.5 text-xs",
            errorState.code === "temporary"
              ? "border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
              : "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200",
          )}
        >
          {errorState.code === "temporary" ? (
            <WifiOff className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          ) : (
            <RefreshCw className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          )}
          <div className="flex-1">
            <span>
              {copilotFailureMessage(errorState)}
            </span>
            {errorState.retryable && (
              <button
                onClick={() => {
                  const args = lastSendArgsRef.current;
                  if (args) sendRef.current(args.text, args.quickAction);
                }}
                className="ml-2 font-semibold underline hover:no-underline"
              >
                再試行
              </button>
            )}
          </div>
        </div>
      )}
      {errorState && onClose && (
        <button type="button" onClick={onClose} className="mx-3 mb-2 min-h-11 shrink-0 rounded-lg border border-zinc-300 text-sm font-medium">
          問題・掲載解説に戻る
        </button>
      )}

      {/* AI disclaimer */}
      {messages.some((m) => m.role === "assistant") && (
        <div className="px-3 pb-1 text-[11px] leading-snug text-zinc-500 dark:text-zinc-400">
          <p>※ AI回答・掲載解説は誤りを含みます。資格の公式資料でも確認してください。</p>
          {selectedChoice && question.type !== "ordering" && question.choices && question.choiceExplanations && (
            <details className="mt-1">
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
          )}
        </div>
      )}

      {/* Input form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex shrink-0 items-end gap-2 border-t border-zinc-200 p-3 dark:border-zinc-800"
      >
        <textarea
          ref={inputRef}
          value={input}
          maxLength={4000}
          aria-describedby="copilot-input-hint"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && e.nativeEvent.keyCode !== 229) {
              e.preventDefault();
              if (!streaming) send(input);
            }
          }}
          rows={2}
          aria-label="AIへの質問を入力（Enter で送信、Shift+Enter で改行）"
          placeholder={
            voiceState === "listening"
              ? "話してください…"
              : "AIに質問… (Enter 送信 / Shift+Enter 改行)"
          }
          className="min-h-[44px] min-w-0 flex-1 resize-none rounded-xl border border-zinc-300 bg-white px-3 py-2 text-base placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-600 sm:text-sm"
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
            onClick={(event) => {
              // React can reuse this DOM node as the submit button immediately.
              // Cancel activation before stopping so that click cannot submit a draft.
              event.preventDefault();
              handleStop();
            }}
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
            disabled={!input.trim() || input.length > 4000 || Boolean(errorState && !errorState.retryable && input.trim() === errorState.submittedText)}
            aria-label="送信"
          >
            <Send className="h-4 w-4" />
          </Button>
        )}
      </form>
      <p id="copilot-input-hint" className="shrink-0 px-3 pb-2 text-[11px] text-zinc-500">
        {input.length} / 4000文字 · Enterで送信、Shift+Enterで改行
      </p>

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
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X（Twitter）で共有
            </a>
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

export function CopilotMobileSheet({
  question,
  selectedChoice,
  isCorrect,
  initialPrompt,
  defaultOpen = false,
}: Omit<Props, "className" | "onClose" | "headerRight"> & { defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [openedOnce, setOpenedOnce] = React.useState(defaultOpen);
  React.useEffect(() => { if (open) setOpenedOnce(true); }, [open]);
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
      {(open || openedOnce) && (
        <div
          ref={dialogRef}
          className={open ? "fixed inset-0 z-50 sm:hidden" : "hidden"}
          role={open ? "dialog" : undefined}
          aria-modal={open ? true : undefined}
          aria-hidden={!open}
          aria-label="AI コパイロット"
          onKeyDown={onDialogKeyDown}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 top-12 flex min-h-0 flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl dark:bg-zinc-950 [@media(max-height:600px)]:top-2">
            <button
              onClick={() => setOpen(false)}
              className="mx-auto mt-2 flex w-16 items-center justify-center rounded-full bg-zinc-300 py-1 dark:bg-zinc-700 [@media(max-height:600px)]:hidden"
              aria-label="閉じる"
            >
              <ChevronDown className="h-3 w-3 text-zinc-600 dark:text-zinc-300" />
            </button>
            <CopilotPanel
              active={open}
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
  const [openedOnce, setOpenedOnce] = React.useState(defaultOpen);
  React.useEffect(() => { if (open) setOpenedOnce(true); }, [open]);
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
      {(open || openedOnce) && (
        <div
          className={open ? "fixed inset-0 z-50 hidden sm:block" : "hidden"}
          role={open ? "dialog" : undefined}
          aria-modal={open ? true : undefined}
          aria-hidden={!open}
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
              active={open}
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
