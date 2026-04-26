"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EXAM_OPTIONS: Array<{ code: string; label: string }> = [
  { code: "ip", label: "ITパスポート (IP)" },
  { code: "sg", label: "情報セキュリティマネジメント (SG)" },
  { code: "fe", label: "基本情報 (FE)" },
  { code: "ap", label: "応用情報 (AP)" },
  { code: "sc", label: "情報処理安全確保支援士 (SC)" },
  { code: "nw", label: "ネットワークスペシャリスト (NW)" },
  { code: "db", label: "データベーススペシャリスト (DB)" },
  { code: "es", label: "エンベデッドシステムスペシャリスト (ES)" },
  { code: "pm", label: "プロジェクトマネージャ (PM)" },
  { code: "sm", label: "ITサービスマネージャ (SM)" },
  { code: "st", label: "ITストラテジスト (ST)" },
  { code: "sa", label: "システムアーキテクト (SA)" },
  { code: "au", label: "システム監査技術者 (AU)" },
];

const HEADCOUNT_OPTIONS = ["1-9名", "10-49名", "50-99名", "100-299名", "300-999名", "1000名以上"];

type Status = "idle" | "submitting" | "success" | "error";

export function PilotForm() {
  const [companyName, setCompanyName] = React.useState("");
  const [contactName, setContactName] = React.useState("");
  const [contactEmail, setContactEmail] = React.useState("");
  const [headcount, setHeadcount] = React.useState(HEADCOUNT_OPTIONS[1]);
  const [targetExams, setTargetExams] = React.useState<string[]>([]);
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | null>(null);

  function toggleExam(code: string) {
    setTargetExams((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setError(null);
    setStatus("submitting");
    try {
      const res = await fetch("/api/enterprise/pilot", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          companyName,
          contactName,
          contactEmail,
          headcount,
          targetExams,
          message: message || undefined,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error ?? "申込に失敗しました");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setError("通信に失敗しました");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-relaxed text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-200">
        <div className="mb-2 text-base font-semibold">申込を受け付けました</div>
        <p>
          担当より 2 営業日以内にご連絡いたします。NDA テンプレートおよびセキュリティ質問票への
          回答ドラフトを併せてお送りします。
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 dark:border-zinc-700 dark:bg-zinc-900";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="会社名" required>
        <input
          type="text"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="株式会社○○"
          className={inputClass}
          disabled={status === "submitting"}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="ご担当者名" required>
          <input
            type="text"
            required
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="山田 太郎"
            className={inputClass}
            disabled={status === "submitting"}
          />
        </Field>

        <Field label="ご連絡先メール" required>
          <input
            type="email"
            required
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="contact@example.com"
            className={inputClass}
            disabled={status === "submitting"}
          />
        </Field>
      </div>

      <Field label="想定ご利用人数" required>
        <select
          required
          value={headcount}
          onChange={(e) => setHeadcount(e.target.value)}
          className={inputClass}
          disabled={status === "submitting"}
        >
          {HEADCOUNT_OPTIONS.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
      </Field>

      <Field label="希望される試験区分（複数選択可）">
        <div className="grid gap-2 sm:grid-cols-2">
          {EXAM_OPTIONS.map((exam) => {
            const checked = targetExams.includes(exam.code);
            return (
              <label
                key={exam.code}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors",
                  checked
                    ? "border-sky-500 bg-sky-50 dark:bg-sky-950/30"
                    : "border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900",
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleExam(exam.code)}
                  disabled={status === "submitting"}
                  className="h-4 w-4 accent-sky-600"
                />
                <span>{exam.label}</span>
              </label>
            );
          })}
        </div>
      </Field>

      <Field label="ご要望・ご質問（任意）">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="導入時期・既存ツールとの連携・SAML SSO 必須かどうか等、ご自由にお書きください。"
          rows={4}
          maxLength={2000}
          className={cn(inputClass, "resize-y")}
          disabled={status === "submitting"}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "送信中..." : "無料 3ヶ月パイロットを申し込む"}
        </Button>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          送信後、担当より 2 営業日以内にご連絡します
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
        {label}
        {required && <span className="ml-1 text-red-600 dark:text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}
