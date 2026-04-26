"use client";

import * as React from "react";
import {
  Sparkles,
  Send,
  Loader2,
  X,
  ChevronDown,
  RefreshCw,
  WifiOff,
  Copy,
  Check,
  Download,
  Share2,
  Link,
} from "lucide-react";
import type { Question } from "@/lib/questions/types";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/ui/markdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { QUICK_ACTIONS, type QuickActionId } from "@/lib/ai/prompts";
import {
  FREE_DAILY_LIMIT_CLIENT,
  incrementAiUsage,
  readAiUsage,
} from "@/lib/storage/rate-limit-client";
import { downloadMarkdown } from "@/lib/chat/export-markdown";
import { useChatSession } from "@/hooks/useChatSession";
import type { ChatSession, SharePayload } from "@/lib/chat/types";
import { examLabel, formatYearSeason } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  quickAction?: QuickActionId;
}

interface Props {
  question: Question;
  selectedChoice?: string;
  isCorrect?: boolean;
  premium: boolean;
  onRateLimitHit: () => void;
  onClose?: () => void;
  headerRight?: React.ReactNode;
  className?: string;
}

const WRONG_ONLY: QuickActionId = "why-wrong";

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
  premium,
  onRateLimitHit,
  onClose,
  headerRight,
  className,
}: Props) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [streaming, setStreaming] = React.useState(false);
  const [usage, setUsage] = React.useState(() => readAiUsage());
  const [errorState, setErrorState] = React.useState<{
    type: "server_error" | "network_error";
    retryFn: () => void;
  } | null>(null);
  const [copiedIdx, setCopiedIdx] = React.useState<number | null>(null);
  const [copiedAll, setCopiedAll] = React.useState(false);
  const [copiedShareUrl, setCopiedShareUrl] = React.useState(false);
  const [shareOpen, setShareOpen] = React.useState(false);
  const [shareUrl, setShareUrl] = React.useState("");
  const [toast, setToast] = React.useState<string | null>(null);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const abortRef = React.useRef<AbortController | null>(null);
  const lastSendArgsRef = React.useRef<{ text: string; quickAction?: QuickActionId } | null>(null);
  const toastTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const { sessionId, createdAt } = useChatSession(question, messages);

  const showToast = React.useCallback((msg: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(msg);
    toastTimerRef.current = setTimeout(() => setToast(null), 2200);
  }, []);

  React.useEffect(() => {
    setMessages([]);
    setInput("");
    abortRef.current?.abort();
    setCopiedIdx(null);
    setCopiedAll(false);
    setShareOpen(false);
    setToast(null);
  }, [question.id]);

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

      if (!premium && usage.count >= FREE_DAILY_LIMIT_CLIENT) {
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

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/copilot", {
          method: "POST",
          headers: { "content-type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            question,
            selectedChoice,
            isCorrect,
            tier: premium ? "premium" : "free",
            quickAction,
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
          return;
        }

        if (!res.ok || !res.body) {
          const args = lastSendArgsRef.current;
          setErrorState({
            type: "server_error",
            retryFn: () => args && send(args.text, args.quickAction),
          });
          setStreaming(false);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          acc += chunk;
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: "assistant", content: acc };
            return copy;
          });
        }

        if (!premium) setUsage(incrementAiUsage());
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "(キャンセルされました)" },
          ]);
        } else {
          const args = lastSendArgsRef.current;
          setErrorState({
            type: "network_error",
            retryFn: () => args && send(args.text, args.quickAction),
          });
        }
      } finally {
        setStreaming(false);
      }
    },
    [streaming, premium, usage.count, messages, question, selectedChoice, isCorrect, onRateLimitHit],
  );

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
    "analyze-a",
    "analyze-i",
    "analyze-u",
    "analyze-e",
    "simplify",
    "similar",
    "prerequisite",
  ];
  if (isCorrect === false) quickActionIds.unshift(WRONG_ONLY);

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
          {!premium && (() => {
            const remaining = Math.max(FREE_DAILY_LIMIT_CLIENT - usage.count, 0);
            return (
              <div className="group/usage relative ml-2">
                <span
                  className={cn(
                    "cursor-default rounded-full px-2 py-0.5 text-[10px] font-medium",
                    usageCounterClass(remaining),
                  )}
                >
                  残り {remaining}/{FREE_DAILY_LIMIT_CLIENT} 回
                </span>
                <div className="invisible absolute left-0 top-full z-50 mt-1.5 w-56 rounded-xl border border-zinc-200 bg-white p-3 text-[11px] leading-relaxed text-zinc-600 shadow-lg group-hover/usage:visible dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                  <p className="mb-1 font-semibold text-zinc-800 dark:text-zinc-200">AI 利用回数について</p>
                  <p>クイックアクションまたはテキスト送信のたびに 1 回消費します。</p>
                  <p className="mt-1">毎日 JST 0:00（{jstResetTime()} ごろ）にリセットされます。</p>
                  {remaining === 0 && (
                    <p className="mt-1 font-semibold text-red-600 dark:text-red-400">
                      本日の上限に達しました。
                    </p>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
        <div className="flex items-center gap-1">
          {hasMessages && (
            <>
              <button
                onClick={handleCopyAll}
                title="全体コピー"
                className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                aria-label="全体コピー"
              >
                {copiedAll ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={handleOpenShare}
                title="共有"
                className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                aria-label="共有"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button
                onClick={handleDownloadMd}
                title="Markdownダウンロード"
                className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                aria-label="Markdownダウンロード"
              >
                <Download className="h-4 w-4" />
              </button>
            </>
          )}
          {headerRight}
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="閉じる">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="border-b border-zinc-200 p-3 dark:border-zinc-800">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">クイックアクション</span>
          {!premium && (
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500">各ボタンで AI 1 回消費</span>
          )}
        </div>
        {!premium && Math.max(FREE_DAILY_LIMIT_CLIENT - usage.count, 0) === 0 ? (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-950/30 dark:text-red-300">
            本日の AI 利用上限（{FREE_DAILY_LIMIT_CLIENT} 回）に達しました。JST 0:00 にリセットされます。
          </p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {quickActionIds.map((id) => (
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
          <div className="rounded-xl border border-dashed border-zinc-300 p-4 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
            問題文は既にAIに共有されています。分からないところを聞いたり、上のボタンでサッと深掘りできます。
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
              <Markdown>{m.content || "..."}</Markdown>
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
        {streaming && (
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <Loader2 className="h-3 w-3 animate-spin" />
            生成中...
          </div>
        )}
      </div>

      {/* Error banner */}
      {errorState && (
        <div
          className={cn(
            "mx-3 mb-2 flex items-start gap-2 rounded-xl border px-3 py-2.5 text-xs",
            errorState.type === "server_error"
              ? "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200"
              : "border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400",
          )}
        >
          {errorState.type === "server_error" ? (
            <RefreshCw className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          ) : (
            <WifiOff className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          )}
          <div className="flex-1">
            <span>
              {errorState.type === "server_error"
                ? "AIが一時的に応答できません。"
                : "接続を確認してください。"}
            </span>
            {errorState.type === "server_error" && (
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
          placeholder="AIに質問… (Enter 送信 / Shift+Enter 改行)"
          className="min-h-[44px] flex-1 resize-none rounded-xl border border-zinc-300 bg-white px-3 py-2 text-base placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-600 sm:text-sm"
        />
        <Button
          type="submit"
          variant="primary"
          size="icon"
          disabled={streaming || !input.trim()}
          aria-label="送信"
        >
          {streaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
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

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-[200] flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-xl dark:bg-zinc-100 dark:text-zinc-900">
          <Check className="h-4 w-4 shrink-0 text-emerald-400 dark:text-emerald-600" />
          {toast}
        </div>
      )}
    </div>
  );
}

export function CopilotMobileSheet({
  question,
  selectedChoice,
  isCorrect,
  premium,
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
              premium={premium}
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
