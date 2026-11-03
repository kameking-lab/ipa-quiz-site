"use client";
import { useEffect, useState } from "react";
import { IMPROVEMENT_CHOICES, UnlockFeedbackSchema, type UnlockStatus } from "@/lib/feedback/unlock-contract";
import { LS_KEYS } from "@/lib/storage/keys";
import { posthogCapture } from "@/lib/posthog";
import { TurnstileWidget } from "@/components/TurnstileWidget";

export function FeedbackUnlock({ onUnlocked }: { onUnlocked: () => void }) {
  const [status, setStatus] = useState<UnlockStatus | null>(null);
  const [open, setOpen] = useState(false);
  const [choices, setChoices] = useState<string[]>([]);
  const [qualifications, setQualifications] = useState("");
  const [comment, setComment] = useState("");
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [captchaAttempt, setCaptchaAttempt] = useState(0);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  useEffect(() => {
    let active = true;
    void fetch("/api/feedback-unlock", { cache: "no-store" }).then(async res => {
      if (!res.ok) return;
      const value = await res.json();
      if (active) setStatus(value);
    }).catch(() => {});
    return () => { active = false; };
  }, []);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    const parsed = UnlockFeedbackSchema.safeParse({ choices, requestedQualifications: choices.includes("qualifications") ? qualifications.split(/[,、\n]/).map(q => q.trim()).filter(Boolean) : [], comment, turnstileToken: token });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "入力をご確認ください。"); return; }
    setBusy(true); setError("");
    try {
      const res = await fetch("/api/feedback-unlock", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(parsed.data) });
      if (!res.ok) {
        if (res.status === 409) {
          const state = await fetch("/api/feedback-unlock", { cache: "no-store" });
          if (state.ok) setStatus(await state.json());
          setOpen(false);
          throw new Error("この特典は受け取り済みです。残りがあれば続きから再開できます。");
        }
        throw new Error(res.status === 429 ? "短時間の送信、または同じ接続からの重複送信です。時間をおいてお試しください。" : "送信できませんでした。入力内容を残しています。もう一度お試しください。");
      }
      posthogCapture("practice_feedback_submitted", { choiceCount: choices.length, hasComment: !!comment.trim() });
      try { localStorage.setItem(LS_KEYS.feedbackUnlockPendingClaim, "1"); } catch { /* Server-side identity remains authoritative. */ }
      setStatus({ submitted: true, eligible: false, remaining: 10 });
      setOpen(false);
      onUnlocked();
    } catch (err) {
      setError(err instanceof Error ? err.message : "送信できませんでした。");
      setToken(""); setCaptchaAttempt(n => n + 1);
    } finally { setBusy(false); }
  }
  return <div className="space-y-3 text-left">
    {status?.eligible && <button type="button" className="min-h-11 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold hover:bg-muted" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-controls="feedback-unlock-form">意見を送って、さらに10問無料で解く</button>}
    {status?.submitted && <div className="text-center text-sm"><p>意見による追加枠は受け取り済みです（残り{status.remaining}問）。</p>{status.remaining > 0 && <button type="button" onClick={onUnlocked} className="min-h-11 px-3 underline">追加枠で続きを解く</button>}</div>}
    {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
    {open && <form id="feedback-unlock-form" onSubmit={submit} className="space-y-4 rounded-xl border border-border bg-background p-4">
      <fieldset disabled={busy} className="space-y-2"><legend className="mb-3 font-semibold">どんな改善を希望しますか？（複数選択可）</legend>
        {IMPROVEMENT_CHOICES.map(c => <label key={c.id} className="flex min-h-11 cursor-pointer items-center gap-3 text-sm"><input type="checkbox" value={c.id} checked={choices.includes(c.id)} onChange={e => setChoices(v => e.target.checked ? [...v, c.id] : v.filter(id => id !== c.id))} />{c.label}</label>)}
      </fieldset>
      {choices.includes("qualifications") && <label className="block text-sm">希望資格（必須・複数は読点で区切る）<input value={qualifications} onChange={e => setQualifications(e.target.value)} maxLength={809} required disabled={busy} placeholder="例：行政書士、中小企業診断士" className="mt-2 min-h-11 w-full rounded-lg border bg-background p-2" /></label>}
      <label className="block text-sm">自由記述（任意・選択が0個なら必須／1000文字まで）<textarea value={comment} onChange={e => setComment(e.target.value)} maxLength={1000} required={!choices.length} disabled={busy} rows={4} className="mt-2 w-full rounded-lg border bg-background p-2" /><span className="text-xs text-muted-foreground">{comment.length}/1000文字</span></label>
      <p className="text-xs text-muted-foreground">氏名・住所・メールアドレスなどの個人情報は入力しないでください。意見は運営の管理画面・noteダッシュボードで改善のために利用します。追加10問は1人1回限り。通常の無料枠を使い切った後に消費し、未使用分は翌日以降も残ります。AIへの質問回数は増えません。</p>
      {siteKey && <TurnstileWidget key={captchaAttempt} siteKey={siteKey} onToken={setToken} onError={() => { setToken(""); setError("確認を読み込めませんでした。時間をおいて再度お試しください。"); }} />}
      <button type="submit" disabled={busy || !!siteKey && !token} className="min-h-11 w-full rounded-lg border border-border px-4 py-3 font-semibold disabled:opacity-50">{busy ? "送信中…" : "意見を送信して10問追加"}</button>
      <p role="status" aria-live="polite" className="sr-only">{busy ? "意見を送信しています" : ""}</p>
    </form>}
  </div>;
}
