"use client";

import * as React from "react";
import Link from "next/link";
import { MessageCircle, Trash2, ChevronRight, LogIn } from "lucide-react";
import { listLocalSessions, deleteFromLocalStorage } from "@/lib/chat/storage";
import type { ChatSession } from "@/lib/chat/types";
import { examLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Props {
  isLoggedIn: boolean;
}

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "たった今";
  if (mins < 60) return `${mins}分前`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}時間前`;
  const days = Math.floor(hours / 24);
  return `${days}日前`;
}

export function ChatHistoryPanel({ isLoggedIn }: Props) {
  const [sessions, setSessions] = React.useState<ChatSession[]>([]);

  React.useEffect(() => {
    setSessions(listLocalSessions());
  }, []);

  function handleDelete(id: string) {
    deleteFromLocalStorage(id);
    setSessions((prev) => prev.filter((s) => s.id !== id));
  }

  if (sessions.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 p-6 text-center dark:border-zinc-700">
        <MessageCircle className="mx-auto mb-2 h-8 w-8 text-zinc-300 dark:text-zinc-600" />
        <p className="mb-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          まだAIコパイロットとの会話がありません
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          問題を解きながらAIに質問すると、ここに履歴が残ります。
        </p>
        {!isLoggedIn && (
          <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500">
            <Link href="/auth/signin" className="text-sky-600 underline hover:no-underline dark:text-sky-400">
              ログイン
            </Link>
            するとクラウドに同期されます。
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {!isLoggedIn && (
        <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
          <LogIn className="h-3.5 w-3.5 shrink-0" />
          <span>
            現在 localStorage に保存中。
            <Link href="/auth/signin" className="ml-1 text-sky-600 underline hover:no-underline dark:text-sky-400">
              ログイン
            </Link>
            でクラウド同期・別端末共有が可能になります。
          </span>
        </div>
      )}
      {sessions.map((s) => {
        const msgCount = s.messages.length;
        const lastMsg = s.messages[msgCount - 1];
        const preview = lastMsg?.content.slice(0, 60) ?? "";
        return (
          <div
            key={s.id}
            className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 transition-colors hover:border-sky-200 hover:bg-sky-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-sky-900/50 dark:hover:bg-sky-950/20"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-950">
              <MessageCircle className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {examLabel(s.examCode)} 問{s.qNumber}
              </p>
              {preview && (
                <p className="truncate text-xs text-zinc-400 dark:text-zinc-500">{preview}</p>
              )}
              <p className="text-[10px] text-zinc-400 dark:text-zinc-600">
                {msgCount}件のメッセージ · {formatRelative(s.updatedAt)}
              </p>
            </div>
            <button
              onClick={() => handleDelete(s.id)}
              className={cn(
                "shrink-0 rounded-lg p-1.5 text-zinc-300 transition-colors hover:bg-red-50 hover:text-red-500 dark:text-zinc-600 dark:hover:bg-red-950/30 dark:hover:text-red-400",
                "opacity-0 group-hover:opacity-100",
              )}
              aria-label="削除"
              title="この会話を削除"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
