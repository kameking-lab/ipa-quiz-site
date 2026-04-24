"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  company: string;
  name: string;
  email: string;
  phone: string;
  memberCount: string;
  targetExam: string;
  message: string;
}

const EXAM_OPTIONS = [
  "IT パスポート",
  "情報セキュリティマネジメント",
  "基本情報技術者",
  "応用情報技術者",
  "情報処理安全確保支援士",
  "ネットワークスペシャリスト",
  "データベーススペシャリスト",
  "その他・複数試験",
];

export function EnterpriseContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [data, setData] = useState<FormData>({
    company: "",
    name: "",
    email: "",
    phone: "",
    memberCount: "",
    targetExam: "",
    message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("submitting");
    try {
      const res = await fetch("/api/email-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          source: "enterprise-contact",
          meta: data,
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-6 text-center dark:border-emerald-800 dark:bg-emerald-950/30">
        <div className="text-3xl mb-2">✅</div>
        <p className="font-medium text-emerald-800 dark:text-emerald-300">
          お問い合わせを受け付けました
        </p>
        <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">
          2 営業日以内に担当者よりご連絡いたします。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="会社名 *" name="company" value={data.company} onChange={handleChange} required />
        <Field label="お名前 *" name="name" value={data.name} onChange={handleChange} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="メールアドレス *" name="email" type="email" value={data.email} onChange={handleChange} required />
        <Field label="電話番号" name="phone" type="tel" value={data.phone} onChange={handleChange} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="対象人数（目安）" name="memberCount" value={data.memberCount} onChange={handleChange} placeholder="例: 50名" />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            対象試験
          </label>
          <select
            name="targetExam"
            value={data.targetExam}
            onChange={handleChange}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          >
            <option value="">選択してください</option>
            {EXAM_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          ご質問・ご要望
        </label>
        <textarea
          name="message"
          value={data.message}
          onChange={handleChange}
          rows={4}
          placeholder="導入目的、現在の課題、ご要望などをご記入ください"
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
      </div>

      {formState === "error" && (
        <p className="text-sm text-rose-600 dark:text-rose-400">
          送信に失敗しました。時間をおいて再度お試しください。
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={formState === "submitting" || !data.company || !data.name || !data.email}
      >
        {formState === "submitting" ? "送信中..." : "送信する"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
      />
    </div>
  );
}
