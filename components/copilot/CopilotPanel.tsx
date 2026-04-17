"use client";

import * as React from "react";
import { Sparkles, Send, Loader2, X, ChevronDown } from "lucide-react";
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
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const abortRef = React.useRef<AbortController | null>(null);

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
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "AI応答の取得に失敗しました。時間を空けて再試行してください。" },
          ]);
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
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: `エラー: ${(err as Error).message}` },
          ]);
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
          {!premium && (
            <span className="ml-2 rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              残り {Math.max(FREE_DAILY_LIMIT_CLIENT - usage.count, 0)}/
              {FREE_DAILY_LIMIT_CLIENT} 回
            </span>
          )}
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
        <div className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
          クイックアクション
        </div>
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
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-3"
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
              "mb-3 rounded-xl px-3 py-2",
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
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              send(input);
            }
          }}
          rows={2}
          placeholder="AIに質問…"
          className="min-h-[44px] flex-1 resize-none rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-600"
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
          className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-xl hover:bg-sky-700 md:hidden"
        >
          <Sparkles className="h-4 w-4" />
          AIに聞く
        </button>
      )}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
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
