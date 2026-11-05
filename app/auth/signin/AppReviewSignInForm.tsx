"use client";
import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { safeAuthCallback } from "@/lib/auth/redirect";

export function AppReviewSignInForm({ callbackUrl }: { callbackUrl: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const destination = safeAuthCallback(callbackUrl);
    setPending(true); setError("");
    try {
      const result = await signIn("app-review", { code: values.get("code"), redirect: false, redirectTo: destination });
      form.reset();
      if (!result || result.error) setError("認証できませんでした。入力内容を確認し、時間をおいてお試しください。");
      else window.location.assign(destination);
    } catch { form.reset(); setError("認証できませんでした。時間をおいてお試しください。"); }
    finally { setPending(false); }
  }
  return <details className="mt-5 border-t border-border pt-4">
    <summary>App Review 審査用ログイン</summary>
    <form onSubmit={submit} className="mt-3 flex flex-col gap-3">
      <label htmlFor="review-code">審査用コード</label>
      <input id="review-code" name="code" type="password" autoComplete="current-password" required minLength={43} maxLength={128} disabled={pending} className="rounded border p-2" />
      <Button type="submit" disabled={pending}>{pending ? "確認中…" : "審査用アカウントでログイン"}</Button>
      {error && <p role="alert">{error}</p>}
    </form>
  </details>;
}
