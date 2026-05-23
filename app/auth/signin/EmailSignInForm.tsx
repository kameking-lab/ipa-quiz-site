"use client";

import * as React from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics/events";

export function EmailSignInForm({ callbackUrl }: { callbackUrl?: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || loading) {
      if (!email) {
        setError("メールアドレスを入力してください。");
        emailRef.current?.focus();
      }
      return;
    }
    setError(null);
    setLoading(true);
    try {
      trackEvent({ name: "signin_started", provider: "email", source: callbackUrl });
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
      <div className="rounded-xl border border-primary/30 bg-primary-soft px-4 py-4 text-sm text-primary-soft-foreground">
        <p className="font-semibold">メールを送信しました</p>
        <p className="mt-1 text-xs leading-relaxed opacity-90">
          {email} 宛のリンクからログインしてください。迷惑メールフォルダもご確認ください。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <label htmlFor="email" className="text-xs font-medium text-muted-foreground">
        メールアドレスでログイン（Magic Link）
      </label>
      <input
        id="email"
        ref={emailRef}
        type="email"
        required
        aria-required="true"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "email-signin-error" : undefined}
        autoComplete="email"
        placeholder="you@example.com"
        className="h-11 rounded-xl border border-input bg-background px-3.5 text-base text-foreground transition placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      {error && (
        <p id="email-signin-error" role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
      <Button
        type="submit"
        variant="gradient"
        size="lg"
        disabled={loading || !email}
        className="w-full"
      >
        {loading ? "送信中..." : "ログインリンクを送信"}
      </Button>
    </form>
  );
}
