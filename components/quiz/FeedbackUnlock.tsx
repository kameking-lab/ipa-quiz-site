"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IMPROVEMENT_CHOICES, UnlockFeedbackSchema, type UnlockStatus } from "@/lib/feedback/unlock-contract";
import { posthogCapture } from "@/lib/posthog";
import { TurnstileWidget } from "@/components/TurnstileWidget";

const DRAFT_KEY = "feedback-unlock-draft:v1";
const returnPath = () => window.location.pathname + window.location.search;

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
      if (active) {
        setStatus(value);
        if (value.eligible && window.location.hash === "#feedback-unlock") {
          try {
            const raw = sessionStorage.getItem(DRAFT_KEY);
            if (raw) {
              const draft = JSON.parse(raw);
              if (draft.path === returnPath() && Date.now() - draft.savedAt < 30 * 60 * 1000
                && Array.isArray(draft.choices) && draft.choices.every((c: unknown) => IMPROVEMENT_CHOICES.some(choice => choice.id === c))
                && typeof draft.qualifications === "string" && draft.qualifications.length <= 809
                && typeof draft.comment === "string" && draft.comment.length <= 1000) {
                setChoices(draft.choices); setQualifications(draft.qualifications); setComment(draft.comment);
              }
            }
            sessionStorage.removeItem(DRAFT_KEY);
          } catch { /* Storage is optional for a new login, never for permissions. */ }
          setOpen(true);
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
      }
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
        if (res.status === 401) {
          setStatus({ submitted: false, eligible: false, remaining: 0, requiresLogin: true });
          throw new Error("ログインの有効期限が切れました。入力を保って再ログインすると、続きから送信できます。");
        }
        if (res.status === 409) {
          const state = await fetch("/api/feedback-unlock", { cache: "no-store" });
          if (state.ok) setStatus(await state.json());
          setOpen(false);
          throw new Error("この特典は受け取り済みです。残りがあれば続きから再開できます。");
        }
        throw new Error(res.status === 429 ? "短時間に送信が集中しています。1分ほど待ってお試しください。" : "送信できませんでした。入力内容を残しています。もう一度お試しください。");
      }
      try { sessionStorage.removeItem(DRAFT_KEY); } catch {}
      posthogCapture("practice_feedback_submitted", { choiceCount: choices.length, hasComment: !!comment.trim() });
      setStatus({ submitted: true, eligible: false, remaining: 10 });
      setOpen(false);
      onUnlocked();
    } catch (err) {
      setError(err instanceof Error ? err.message : "送信できませんでした。");
      setToken(""); setCaptchaAttempt(n => n + 1);
    } finally { setBusy(false); }
  }
  function saveDraft(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!open) return;
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ path: returnPath(), savedAt: Date.now(), choices, qualifications, comment }));
    } catch {
      e.preventDefault();
      setError("入力の一時保存ができません。この画面を残し、別のタブでログインしてから送信してください。");
    }
  }
  async function checkLogin() {
    try {
      const res = await fetch("/api/feedback-unlock", { cache: "no-store" });
      if (!res.ok) return;
      const value: UnlockStatus = await res.json();
      setStatus(value);
      if (!value.requiresLogin) setError("");
      if (value.submitted) setOpen(false);
    } catch { /* Keep the draft visible on connection failure. */ }
  }
  return <div className="space-y-3 text-left">
    {status?.requiresLogin && <Link href={`/auth/signin?callbackUrl=${encodeURIComponent(window.location.pathname + window.location.search + "#feedback-unlock")}`} onClick={saveDraft} className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-border px-4 py-3 text-sm font-semibold">意見を送ってあと10問</Link>}
    {status?.requiresLogin && open && <button type="button" onClick={checkLogin} className="min-h-11 px-3 text-sm underline">別タブでログインした後に再確認</button>}
    {status?.eligible && <button type="button" className="min-h-11 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold hover:bg-muted" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-controls="feedback-unlock-form">意見を送ってあと10問</button>}
    {status?.submitted && status.remaining > 0 && <button type="button" onClick={onUnlocked} className="min-h-11 w-full rounded-xl border border-border px-4 py-3 text-sm font-semibold">追加の{status.remaining}問で続ける</button>}
    {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
    {open && <form id="feedback-unlock-form" onSubmit={submit} className="space-y-4 rounded-xl border border-border bg-background p-4">
      <fieldset disabled={busy} className="space-y-2"><legend className="mb-3 font-semibold">どんな改善を希望しますか？（複数選択可）</legend>
        {IMPROVEMENT_CHOICES.map(c => <label key={c.id} className="flex min-h-11 cursor-pointer items-center gap-3 text-sm"><input type="checkbox" value={c.id} checked={choices.includes(c.id)} onChange={e => setChoices(v => e.target.checked ? [...v, c.id] : v.filter(id => id !== c.id))} />{c.label}</label>)}
      </fieldset>
      {choices.includes("qualifications") && <label className="block text-sm">希望資格（必須・複数は読点で区切る）<input value={qualifications} onChange={e => setQualifications(e.target.value)} maxLength={809} required disabled={busy} placeholder="例：行政書士、中小企業診断士" className="mt-2 min-h-11 w-full rounded-lg border bg-background p-2" /></label>}
      <label className="block text-sm">自由記述（任意・選択が0個なら必須／1000文字まで）<textarea value={comment} onChange={e => setComment(e.target.value)} maxLength={1000} required={!choices.length} disabled={busy} rows={4} className="mt-2 w-full rounded-lg border bg-background p-2" /><span className="text-xs text-muted-foreground">{comment.length}/1000文字</span></label>
      <p className="text-xs text-muted-foreground">氏名・住所・メールアドレスなどの個人情報は入力しないでください。意見は運営の管理画面・noteダッシュボードで改善のために利用します。追加10問はログイン済みの1アカウントにつき1回限り。通常の無料枠を使い切った後に消費し、未使用分は翌日以降も残ります。AIへの質問回数は増えません。</p>
      {siteKey && <TurnstileWidget key={captchaAttempt} siteKey={siteKey} onToken={setToken} onError={() => { setToken(""); setError("確認を読み込めませんでした。時間をおいて再度お試しください。"); }} />}
      <button type="submit" disabled={busy || !!status?.requiresLogin || !!siteKey && !token} className="min-h-11 w-full rounded-lg border border-border px-4 py-3 font-semibold disabled:opacity-50">{busy ? "送信中…" : "意見を送信して10問追加"}</button>
      <p role="status" aria-live="polite" className="sr-only">{busy ? "意見を送信しています" : ""}</p>
    </form>}
  </div>;
}
