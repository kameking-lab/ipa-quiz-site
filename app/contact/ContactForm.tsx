"use client";

import * as React from "react";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "improvement", label: "改善提案" },
  { id: "question", label: "質問" },
  { id: "education", label: "教育機関での活用ご相談" },
  { id: "enterprise", label: "企業での活用ご相談" },
  { id: "media", label: "取材・メディア" },
  { id: "other", label: "その他" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

export function ContactForm() {
  const [category, setCategory] = React.useState<CategoryId>("improvement");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [body, setBody] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = React.useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (body.trim().length < 5) {
      setError("お問い合わせ内容は 5 文字以上でお願いします。");
      return;
    }
    if (email && !/^[\w.+-]+@[\w-]+\.[\w.-]+$/i.test(email)) {
      setError("メールアドレスの形式をご確認ください。");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          kind: "contact",
          category,
          name: name.trim().slice(0, 80),
          email: email.trim().slice(0, 120),
          body: body.trim().slice(0, 4000),
        }),
      });
      if (!res.ok) {
        setStatus("error");
        setError("送信に失敗しました。時間をおいて再度お試しください。");
        return;
      }
      setStatus("ok");
      setBody("");
    } catch {
      setStatus("error");
      setError("ネットワークエラーが発生しました。");
    }
  };

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm dark:border-emerald-900/60 dark:bg-emerald-950/30">
        <div className="mb-2 flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-semibold">お問い合わせを受け付けました</span>
        </div>
        <p className="text-zinc-700 dark:text-zinc-300">
          いただいた内容にすべて目を通します。返信が必要な場合は、ご記入いただいたメールアドレス宛てにご連絡します。
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setName("");
            setEmail("");
            setBody("");
          }}
          className="mt-3 text-xs underline hover:text-zinc-900 dark:hover:text-zinc-50"
        >
          続けて別のお問い合わせをする
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-100">
          お問い合わせ種別
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {CATEGORIES.map((c) => (
            <label
              key={c.id}
              className={cn(
                "flex min-h-[44px] cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-xs transition-colors",
                "focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 focus-within:ring-offset-background dark:focus-within:ring-sky-400",
                category === c.id
                  ? "border-sky-400 bg-sky-50 dark:border-sky-500 dark:bg-sky-950/40"
                  : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800",
              )}
            >
              <input
                type="radio"
                name="category"
                value={c.id}
                checked={category === c.id}
                onChange={() => setCategory(c.id)}
                className="sr-only"
              />
              <span className="text-zinc-800 dark:text-zinc-100">{c.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-name"
          className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-100"
        >
          お名前 <span className="text-xs text-zinc-400">（任意）</span>
        </label>
        <input
          id="contact-name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, 80))}
          maxLength={80}
          placeholder="山田 太郎"
          className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-base placeholder:text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-600"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-100"
        >
          メールアドレス <span className="text-xs text-zinc-400">（任意・返信が必要な場合）</span>
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value.slice(0, 120))}
          maxLength={120}
          placeholder="example@example.com"
          className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-base placeholder:text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-600"
        />
      </div>

      <div>
        <label
          htmlFor="contact-body"
          className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-100"
        >
          お問い合わせ内容 <span className="text-xs text-rose-500">*</span>
        </label>
        <textarea
          id="contact-body"
          value={body}
          onChange={(e) => setBody(e.target.value.slice(0, 4000))}
          rows={6}
          maxLength={4000}
          required
          placeholder="どんなことでもお気軽にどうぞ"
          className="w-full resize-vertical rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-base placeholder:text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-600"
        />
        <p
          className={cn(
            "mt-1 text-right text-xs tabular-nums",
            body.length >= 3600
              ? "font-medium text-rose-600 dark:text-rose-400"
              : body.length >= 3200
                ? "text-amber-600 dark:text-amber-400"
                : "text-zinc-500 dark:text-zinc-400",
          )}
          aria-live={body.length >= 3600 ? "polite" : "off"}
        >
          {body.length.toLocaleString("ja-JP")} / 4,000
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm font-medium text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <Button type="submit" variant="primary" disabled={status === "sending"} className="w-full sm:w-auto">
        <Send className="h-4 w-4" />
        {status === "sending" ? "送信中..." : "送信する"}
      </Button>
    </form>
  );
}
