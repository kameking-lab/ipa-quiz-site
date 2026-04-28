"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const LS_KEY = "ipa-quiz:launch-register:v1";

export function PreRegisterForm() {
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) setDone(true);
    } catch {}
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("有効なメールアドレスを入力してください");
      return;
    }
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ email: trimmed, at: new Date().toISOString() }));
    } catch {}
    setDone(true);
  }

  if (done) {
    return (
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        登録済みです。正式リリース時にお知らせします！
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-sky-900"
      />
      <Button
        type="submit"
        variant="primary"
        size="md"
        className="shrink-0 transition-transform active:scale-95"
        data-track="launch-preregister"
      >
        事前登録する
      </Button>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </form>
  );
}
