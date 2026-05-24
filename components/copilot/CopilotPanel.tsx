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
} from "lucide-react";
import type { Question } from "@/lib/questions/types";
import { Button } from "@/components/ui/button";

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
} from "@/lib/copilot/citation-meta";
import {
  decodeRelatedHeader,
  type RelatedQuestion,
} from "@/lib/copilot/related";
import { CitationCards } from "@/components/copilot/CitationCards";
import { RelatedQuestionsSection } from "@/components/copilot/RelatedQuestions";
import { LS_KEYS } from "@/lib/storage/keys";
import { buildLearnerProfileFromHistory } from "@/lib/ai/learner-profile-client";
import {
  FREE_DAILY_LIMIT_CLIENT,
  POST_FEEDBACK_DAILY_LIMIT_CLIENT,
  incrementAiUsage,
  readAiUsage,
  readFeedbackSubmitted,
} from "@/lib/storage/rate-limit-client";
import { downloadMarkdown } from "@/lib/chat/export-markdown";
import { useChatSession } from "@/hooks/useChatSession";
import type { ChatSession, SharePayload } from "@/lib/chat/types";
import { examLabel, formatYearSeason } from "@/lib/utils";
import { readCharacterState } from "@/lib/storage/character";
import { posthogCapture } from "@/lib/posthog";

interface Message {
  role: "user" | "assistant";
  content: string;
  quickAction?: QuickActionId;
  /** RAG citation メタ。X-RAG-Citations ヘッダから復号して保持する。 */
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

/** Markdown 表示時に決定的に付与される出典フッターを除外する。
 * 構造化 citation カードに置き換えて表示するため、二重表示を避ける。 */
const CITATION_FOOTER_RE = /\n\n---\n\*\*出典\*\*[\s\S]*$/;
function stripCitationFooter(content: string): string {
  return content.replace(CITATION_FOOTER_RE, "");
}

interface Props {
  question: Question;
  selectedChoice?: string;
  isCorrect?: boolean;
  onRateLimitHit: () => void;
  onClose?: () => void;
  headerRight?: React.ReactNode;
  className?: string;
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

function usageCounterClass(remaining: number): string {
  if (remaining <= 3) return "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300";
  if (remaining <= 10) return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/60 dark:text-yellow-300";
  return "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300";
}

function jstResetTime(): string {
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const tomorrow = new Date(jst);
  tomorrow.setUTCHours(24, 0, 0, 0);
  const local = new Date(tomorrow.getTime() - 9 * 60 * 60 * 1000);
  return local.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
  onRateLimitHit,
  onClose,
  headerRight,
  className,
}: Props) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [streaming, setStreaming] = React.useState(false);
  const [streamStatus, setStreamStatus] = React.useState<StreamStatus>("idle");
  const [usage, setUsage] = React.useState(() => readAiUsage());
  const [feedbackSubmitted, setFeedbackSubmittedState] = React.useState(false);
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

  React.useEffect(() => {
     
    setFeedbackSubmittedState(readFeedbackSubmitted());
    const onStorage = () => setFeedbackSubmittedState(readFeedbackSubmitted());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const dailyLimit = feedbackSubmitted
    ? POST_FEEDBACK_DAILY_LIMIT_CLIENT
    : FREE_DAILY_LIMIT_CLIENT;
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

  // Reset conversation when question changes; refresh profile snapshot
  React.useEffect(() => {

    setMessages([]);
    setInput("");
    // Question-change abort is system-driven, not user-driven, so leave the
    // userStoppedRef flag false to avoid annotating the discarded message.
    userStoppedRef.current = false;
    abortRef.current?.abort();
    setStreamStatus("idle");
    setCopiedIdx(null);
    setCopiedAll(false);
    setShareOpen(false);
    setToast(null);
    setProfile(buildLearnerProfileFromHistory());
  }, [question.id]);

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
      if (streaming) return;
      const trimmed = text.trim();
      if (!trimmed && !quickAction) return;

      if (usage.count >= dailyLimit) {
        onRateLimitHit();
        return;
      }

      setErrorState(null);
      lastSendArgsRef.current = { text: trimmed, quickAction };

      const userMsg: Message = {
        role: "user",
        content: trimmed || QUICK_ACTIONS[quickAction!].label,
        quickAction,
      };
      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      setInput("");
      setStreaming(true);
      setStreamStatus("sending");
      userStoppedRef.current = false;

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const characterState = readCharacterState();
        posthogCapture("ai_query_sent", {
          questionId: question?.id,
          exam: question?.exam,
          quickAction: quickAction ?? null,
        });
        const res = await fetch("/api/copilot", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            ...(feedbackSubmitted ? { "x-feedback-submitted": "1" } : {}),
          },
          signal: controller.signal,
          body: JSON.stringify({
            question,
            selectedChoice,
            isCorrect,
            tier: "free",
            quickAction,
            learnerProfile: profile,
            character: characterState.id,
            characterEnabled: characterState.enabled,
            responseLength,
            messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        if (res.status === 429) {
          const body = (await res.json()) as { message?: string; reason?: string };
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: body.message ?? "レート制限に達しました。" },
          ]);
          if (body.reason === "daily") onRateLimitHit();
          setStreaming(false);
          setStreamStatus("idle");
          return;
        }

        if (!res.ok || !res.body) {
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
        const citationHeaderValue = res.headers.get("X-RAG-Citations");
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
        setUsage(incrementAiUsage());
      } catch (err) {
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
          const args = lastSendArgsRef.current;
          setErrorState({
            type: "network_error",
            retryFn: () => args && sendRef.current(args.text, args.quickAction),
          });
        }
      } finally {
        setStreaming(false);
        setStreamStatus("idle");
        userStoppedRef.current = false;
      }
    },
    [
      streaming,
      usage.count,
      dailyLimit,
      feedbackSubmitted,
      messages,
      question,
      selectedChoice,
      isCorrect,
      onRateLimitHit,
      profile,
      responseLength,
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

  const quickActionIds: QuickActionId[] = [
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
  if (isCorrect === false) quickActionIds.unshift(WRONG_ONLY);
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
    <div className={cn("flex h-full w-full flex-col bg-white dark:bg-zinc-950", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-sky-600 dark:text-sky-400" />
          <span className="text-sm font-semibold">AI コパイロット</span>
          {feedbackSubmitted ? (
            <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              ほぼ無制限
            </span>
          ) : (() => {
            const remaining = Math.max(FREE_DAILY_LIMIT_CLIENT - usage.count, 0);
            return (
              <div className="group/usage relative ml-2 flex items-center gap-1.5">
                <span
                  className={cn(
                    "cursor-default rounded-full px-2 py-0.5 text-[10px] font-medium",
                    usageCounterClass(remaining),
                  )}
                >
                  残り {remaining}/{FREE_DAILY_LIMIT_CLIENT} 回
                </span>
                <span className="hidden text-[10px] text-zinc-500 dark:text-zinc-400 sm:inline">
                  · JST 0:00 リセット
                </span>
                <div className="invisible absolute left-0 top-full z-50 mt-1.5 w-64 rounded-xl border border-zinc-200 bg-white p-3 text-[11px] leading-relaxed text-zinc-600 shadow-lg group-hover/usage:visible dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                  <p className="mb-1 font-semibold text-zinc-800 dark:text-zinc-200">AI 利用回数について</p>
                  <p>クイックアクションまたはテキスト送信のたびに 1 回消費します。</p>
                  <p className="mt-1">フィードバックを 1 度ご投稿いただくと、これ以降ほぼ無制限でお使いいただけます（教育貢献プロジェクト）。</p>
                  <p className="mt-1">毎日 JST 0:00（端末時刻で{jstResetTime()} ごろ）にリセットされます。</p>
                  {remaining === 0 && (
                    <p className="mt-1 font-semibold text-red-600 dark:text-red-400">
                      初回無料枠を使い切りました。
                    </p>
                  )}
                </div>
              </div>
            );
          })()}
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
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400">回答の長さ</span>
          <div
            role="group"
            aria-label="回答の長さ"
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

      {/* Quick actions */}
      <div className="border-b border-zinc-200 p-3 dark:border-zinc-800">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">クイックアクション</span>
          {!feedbackSubmitted && (
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500">各ボタンで AI 1 回消費</span>
          )}
        </div>
        {!feedbackSubmitted && Math.max(FREE_DAILY_LIMIT_CLIENT - usage.count, 0) === 0 ? (
          <p className="rounded-xl bg-sky-50 px-3 py-2 text-xs text-sky-700 dark:bg-sky-950/30 dark:text-sky-300">
            初回無料枠（{FREE_DAILY_LIMIT_CLIENT} 回）を使い切りました。
            フィードバックを 1 度ご投稿いただくと、以降ほぼ無制限でご利用いただけます。
          </p>
        ) : (
          <>
            <div
              id="copilot-quickactions-list"
              className="flex flex-wrap gap-1.5"
            >
              {visibleQuickActionIds.map((id) => (
                <button
                  key={id}
                  onClick={() => send("", id)}
                  disabled={streaming}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-xs transition-colors disabled:opacity-50",
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
                className="mt-2 inline-flex items-center gap-1 rounded-full border border-zinc-300 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-600 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                {quickActionsExpanded
                  ? "閉じる"
                  : `+他 ${hiddenQuickActionCount} 個を見る`}
              </button>
            )}
          </>
        )}
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-3"
        aria-live="polite"
        aria-label="AI コパイロットの応答"
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
                    {m.citations && m.citations.length > 0
                      ? stripCitationFooter(m.content)
                      : m.content}
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
                {m.citations && m.citations.length > 0 && (
                  <CitationCards citations={m.citations} messageIndex={i} />
                )}
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

      {/* AI disclaimer */}
      {messages.some((m) => m.role === "assistant") && (
        <p className="px-3 pb-1 text-[10px] leading-snug text-zinc-400 dark:text-zinc-600">
          ※ AI の回答は誤りを含む可能性があります。重要な判断はIPA公式資料でご確認ください。
        </p>
      )}

      {/* Input form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-end gap-2 border-t border-zinc-200 p-3 dark:border-zinc-800"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
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
              : "AIに質問… (Enter 送信 / Shift+Enter 改行)"
          }
          className="min-h-[44px] flex-1 resize-none rounded-xl border border-zinc-300 bg-white px-3 py-2 text-base placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-600 sm:text-sm"
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
            disabled={!input.trim()}
            aria-label="送信"
          >
            <Send className="h-4 w-4" />
          </Button>
        )}
      </form>

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
  onRateLimitHit,
}: Omit<Props, "className" | "onClose" | "headerRight">) {
  const [open, setOpen] = React.useState(false);

  // Escape キーでシートを閉じる（キーボードユーザーの脱出経路）
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bottom-safe fixed right-4 z-40 flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-xl hover:bg-sky-700 sm:hidden"
        >
          <Sparkles className="h-4 w-4" />
          AIに聞く
        </button>
      )}
      {open && (
        <div
          className="fixed inset-0 z-50 sm:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="AI コパイロット"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 top-12 flex flex-col rounded-t-2xl bg-white shadow-2xl dark:bg-zinc-950">
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
              onRateLimitHit={onRateLimitHit}
              onClose={() => setOpen(false)}
              className="rounded-t-2xl"
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
  onRateLimitHit,
  headerRight,
}: Omit<Props, "className" | "onClose">) {
  const [open, setOpen] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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

  return (
    <>
      {!open && (
        <button
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
              onRateLimitHit={onRateLimitHit}
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
