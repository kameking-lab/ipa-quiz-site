"use client";

import * as React from "react";
import { Upload, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StudentIdUpload() {
  const [preview, setPreview] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState(false);
  const fileRef = React.useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  function handleRemove() {
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200"
      >
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        申請を受け付けました。審査後（1〜3営業日）にメールでご連絡します。
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <input
        ref={fileRef}
        type="file"
        accept="image/*,.pdf"
        className="sr-only"
        id="student-id-file"
        onChange={handleFile}
      />
      {!preview ? (
        <label
          htmlFor="student-id-file"
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 px-6 py-8 text-center transition hover:border-sky-400 hover:bg-sky-50 dark:border-zinc-700 dark:bg-zinc-900/40 dark:hover:border-sky-600 dark:hover:bg-sky-950/20"
        >
          <Upload className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            学生証・在学証明書をアップロード
          </span>
          <span className="text-xs text-zinc-500">JPG / PNG / PDF — 最大 10 MB</span>
        </label>
      ) : (
        <div className="relative rounded-2xl border border-zinc-200 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-900">
          {/* eslint-disable-next-line @next/next/no-img-element -- blob URL from createObjectURL; next/image cannot handle it */}
          <img
            src={preview}
            alt="学生証プレビュー"
            className="max-h-56 w-full rounded-xl object-contain"
          />
          <button
            onClick={handleRemove}
            className="absolute right-3 top-3 rounded-full bg-white/80 p-1 text-zinc-600 shadow transition hover:bg-white hover:text-red-500 dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-red-400"
            aria-label="削除"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      {preview && (
        <Button
          variant="primary"
          size="md"
          onClick={handleSubmit}
          className="w-full transition-transform active:scale-95"
          data-track="student-upload-submit"
        >
          申請を送信する
        </Button>
      )}
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ アップロードされた書類は申請確認後に削除します。個人情報は学割確認のみに使用します。
      </p>
    </div>
  );
}
