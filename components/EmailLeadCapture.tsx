"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const MOCK_COUNT = 1247;
const LS_KEY = "ipa-quiz:email-registered:v1";

type Status = "idle" | "submitting" | "success" | "duplicate" | "error";

interface Props {
  variant?: "home" | "footer";
  className?: string;
}

export function EmailLeadCapture({ variant = "home", className }: Props) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [toast, setToast] = React.useState<string | null>(null);
  const [alreadyRegistered, setAlreadyRegistered] = React.useState(false);

  React.useEffect(() => {
    setAlreadyRegistered(!!localStorage.getItem(LS_KEY));
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/email-list", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source: "home" }),
      });
      const data = (await res.json()) as { ok?: boolean; duplicate?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        showToast(data.error ?? "登録に失敗しました");
        return;
      }
      const isDup = !!data.duplicate;
      setStatus(isDup ? "duplicate" : "success");
      localStorage.setItem(LS_KEY, email);
      setAlreadyRegistered(true);
      showToast(isDup ? "すでに登録済みです！" : "登録しました！週1レポートをお届けします 🎉");
    } catch {
      setStatus("error");
      showToast("通信に失敗しました");
    }
  }

  if (alreadyRegistered) return null;

  if (variant === "footer") {
    return (
      <div className={cn("relative w-full min-w-0", className)}>
        {toast && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-medium text-white shadow-lg">
            {toast}
          </div>
        )}
        <form onSubmit={onSubmit} className="flex w-full min-w-0 gap-2">
          <input
            type="email"
            required
            autoComplete="email"
            aria-label="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={status === "submitting"}
            className="w-full min-w-0 flex-1 rounded-lg border border-zinc-300 bg-white px-2.5 py-2.5 text-xs focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="shrink-0 rounded-lg bg-sky-600 px-2.5 py-2.5 text-xs font-medium text-white hover:bg-sky-700 disabled:opacity-60"
          >
            {status === "submitting" ? "…" : "登録"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={cn("relative rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-900/50 dark:bg-sky-950/20", className)}>
      {toast && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-sky-900 dark:text-sky-200">
            📬 週1回の学習レポートをお届け
          </h3>
          <p className="mt-0.5 text-xs text-sky-700 dark:text-sky-400">
            正答率推移・おすすめ弱点分野・新着問題をまとめてお届けします
          </p>
        </div>
        <span className="ml-3 shrink-0 rounded-full bg-sky-100 px-2.5 py-1 text-[11px] font-medium text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">
          {MOCK_COUNT.toLocaleString("ja-JP")}人が登録済み
        </span>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          autoComplete="email"
          aria-label="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={status === "submitting"}
          className="flex-1 rounded-xl border border-sky-200 bg-white px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 dark:border-sky-900 dark:bg-zinc-900 dark:text-zinc-100"
        />
        <Button type="submit" variant="primary" disabled={status === "submitting"}>
          {status === "submitting" ? "登録中…" : "無料で登録する"}
        </Button>
      </form>
      <p className="mt-2 text-[11px] text-sky-600 dark:text-sky-500">
        迷惑メールは送りません。いつでも解除可能です。
      </p>
    </div>
  );
}
