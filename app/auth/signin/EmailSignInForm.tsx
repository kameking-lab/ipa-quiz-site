"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function EmailSignInForm({ callbackUrl }: { callbackUrl?: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || loading) return;
    setError(null);
    setLoading(true);
    try {
      const res = await signIn("nodemailer", {
        email,
        callbackUrl: callbackUrl || "/",
        redirect: false,
      });
      if (res?.error) {
        setError("メール送信に失敗しました。");
      } else {
        setSent(true);
      }
    } catch {
      setError("メール送信に失敗しました。");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-md border border-sky-300 bg-sky-50 px-4 py-4 text-sm dark:border-sky-800 dark:bg-sky-950">
        <p className="font-medium">メールを送信しました</p>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          {email} 宛のリンクからログインしてください。迷惑メールフォルダもご確認ください。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <label htmlFor="email" className="text-xs font-medium">
        メールアドレスでログイン（Magic Link）
      </label>
      <input
        id="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
        className="h-11 rounded-md border border-zinc-300 bg-white px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-zinc-700 dark:bg-zinc-900"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
      <Button type="submit" variant="primary" disabled={loading || !email} className="w-full">
        {loading ? "送信中..." : "ログインリンクを送信"}
      </Button>
    </form>
  );
}
