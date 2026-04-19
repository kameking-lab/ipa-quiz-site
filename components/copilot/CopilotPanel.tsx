"use client";

import * as React from "react";
import { Sparkles, Send, Loader2, X, ChevronDown, RefreshCw, WifiOff } from "lucide-react";
import type { Question } from "@/lib/questions/types";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/ui/markdown";
import { cn } from "@/lib/utils";
import { QUICK_ACTIONS, type QuickActionId } from "@/lib/ai/prompts";
import {
  FREE_DAILY_LIMIT_CLIENT,
  incrementAiUsage,
  readAiUsage,
} from "@/lib/storage/rate-limit-client";

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
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const abortRef = React.useRef<AbortController | null>(null);
  const lastSendArgsRef = React.useRef<{ text: string; quickAction?: QuickActionId } | null>(null);

  // Reset conversation when question changes
  React.useEffect(() => {
    setMessages([]);
    setInput("");
    abortRef.current?.abort();
  }, [question.id]);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

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
            {
              role: "assistant",
              content: body.message ?? "レート制限に達しました。",
            },
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
    [
      streaming,
      premium,
      usage.count,
      messages,
      question,
      selectedChoice,
      isCorrect,
      onRateLimitHit,
    ],
  );

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

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col bg-white dark:bg-zinc-950",
        className,
      )}
    >
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
          {headerRight}
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="閉じる">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

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
              "selectable-content mb-3 rounded-xl px-3 py-2",
              m.role === "user"
                ? "ml-6 bg-sky-50 text-sky-900 dark:bg-sky-950/40 dark:text-sky-100"
                : "mr-2 bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100",
            )}
          >
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
          {streaming ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
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
        <div className="fixed inset-0 z-50 sm:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
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
