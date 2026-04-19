"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PlanId } from "@/lib/plans";

interface Props {
  plan?: Extract<PlanId, "premium" | "team">;
  source?: "pricing" | "upsell-dialog" | "other";
  className?: string;
}

type Status = "idle" | "submitting" | "success" | "duplicate" | "error";

export function EmailSignupForm({ plan, source = "pricing", className }: Props) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setError(null);
    setStatus("submitting");
    try {
      const res = await fetch("/api/email-list", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source, plan }),
      });
      const data = (await res.json()) as { ok?: boolean; duplicate?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error ?? "登録に失敗しました");
        return;
      }
      setStatus(data.duplicate ? "duplicate" : "success");
    } catch {
      setStatus("error");
      setError("通信に失敗しました");
    }
  }

  if (status === "success" || status === "duplicate") {
    return (
      <div
        className={cn(
          "rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-300",
          className,
        )}
      >
        {status === "duplicate"
          ? "既に登録済みのメールアドレスです。公開時にご連絡します。"
          : "登録ありがとうございます。公開時にこちらのアドレスへご連絡します。"}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-2 sm:flex-row", className)}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="flex-1 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 dark:border-zinc-700 dark:bg-zinc-900"
        disabled={status === "submitting"}
        aria-label="通知用メールアドレス"
      />
      <Button type="submit" variant="primary" disabled={status === "submitting"}>
        {status === "submitting" ? "登録中..." : "公開時に通知を受け取る"}
      </Button>
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400 sm:basis-full" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
