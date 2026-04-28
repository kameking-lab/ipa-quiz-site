"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Upload, RotateCcw, CheckCircle2, AlertCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { readSettings, writeSettings, type AppSettings } from "@/lib/storage/settings";
import { createHistoryStore } from "@/lib/storage/history";

type Theme = "light" | "dark" | "system";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-sm font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
      {children}
    </h2>
  );
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{label}</p>
        {description && (
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState<AppSettings>({
    randomizeChoices: false,
    excludeRecent: false,
    calculationOnly: false,
  });
  const [stats, setStats] = useState({ total: 0, correct: 0, accuracy: 0, uniqueAnswered: 0 });
  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSettings(readSettings());
    const store = createHistoryStore();
    setStats(store.getStats());
  }, []);

  function showToast(type: "ok" | "err", msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  }

  function updateSetting<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
    const next = { ...settings, [key]: value };
    setSettings(next);
    writeSettings(next);
  }

  function handleExport() {
    const store = createHistoryStore();
    const json = store.exportJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ipa-quiz-history-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("ok", "履歴をエクスポートしました");
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (typeof text !== "string") return;
      const store = createHistoryStore();
      const ok = store.importJson(text);
      if (ok) {
        setStats(store.getStats());
        showToast("ok", "履歴をインポートしました");
      } else {
        showToast("err", "インポートに失敗しました（ファイル形式エラー）");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function handleReset() {
    if (!window.confirm("学習履歴をすべて削除しますか？この操作は取り消せません。")) return;
    const store = createHistoryStore();
    store.reset();
    setStats({ total: 0, correct: 0, accuracy: 0, uniqueAnswered: 0 });
    showToast("ok", "履歴を削除しました");
  }

  const THEME_OPTIONS: { value: Theme; label: string }[] = [
    { value: "light", label: "ライト" },
    { value: "system", label: "自動" },
    { value: "dark", label: "ダーク" },
  ];

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/"
          className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          aria-label="ホームへ戻る"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">設定</h1>
      </div>

      <div className="space-y-8">
        {/* Appearance */}
        <section>
          <SectionTitle>外観</SectionTitle>
          <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="px-4 py-3">
              <p className="mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">テーマ</p>
              <div className="flex gap-2">
                {THEME_OPTIONS.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setTheme(value)}
                    className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
                      theme === value
                        ? "bg-sky-600 text-white"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Options */}
        <section>
          <SectionTitle>クイズオプション</SectionTitle>
          <div className="divide-y divide-zinc-100 rounded-xl border border-zinc-200 bg-white px-4 dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
            <SettingRow label="選択肢をランダム化" description="ア〜エの順番を毎回入れ替えます">
              <Switch
                checked={settings.randomizeChoices}
                onCheckedChange={(v) => updateSetting("randomizeChoices", v)}
              />
            </SettingRow>
            <SettingRow
              label="直近2回を除外"
              description="直近2回で正解した問題を出題から外します"
            >
              <Switch
                checked={settings.excludeRecent}
                onCheckedChange={(v) => updateSetting("excludeRecent", v)}
              />
            </SettingRow>
            <SettingRow label="計算問題のみ" description="isCalculationフラグが付いた問題だけ出題">
              <Switch
                checked={settings.calculationOnly}
                onCheckedChange={(v) => updateSetting("calculationOnly", v)}
              />
            </SettingRow>
          </div>
        </section>

        {/* Premium section hidden during beta — code kept for Phase 4 */}

        {/* History */}
        <section>
          <SectionTitle>学習履歴</SectionTitle>
          <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            {/* Stats */}
            <div className="grid grid-cols-3 divide-x divide-zinc-100 border-b border-zinc-100 dark:divide-zinc-800 dark:border-zinc-800">
              <div className="py-4 text-center">
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{stats.total}</p>
                <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">回答数</p>
              </div>
              <div className="py-4 text-center">
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {stats.uniqueAnswered}
                </p>
                <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">問題数</p>
              </div>
              <div className="py-4 text-center">
                <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                  {stats.total > 0 ? Math.round(stats.accuracy * 100) : "--"}%
                </p>
                <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">正答率</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 p-4 sm:flex-row">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-2"
                onClick={handleExport}
              >
                <Download className="h-4 w-4" />
                エクスポート
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4" />
                インポート
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-2 text-red-600 hover:border-red-300 hover:bg-red-50 dark:text-red-400 dark:hover:border-red-800 dark:hover:bg-red-950/30"
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4" />
                リセット
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImport}
              />
            </div>
          </div>
        </section>

        {/* About */}
        <section>
          <SectionTitle>このアプリについて</SectionTitle>
          <div className="rounded-xl border border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-zinc-700 dark:text-zinc-300">バージョン</span>
                <span className="text-sm font-mono text-zinc-500 dark:text-zinc-400">0.1.0</span>
              </div>
              <div className="py-3">
                <Link
                  href="/about"
                  className="text-sm text-sky-600 hover:underline dark:text-sky-400"
                >
                  著作権・利用条件
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white shadow-lg transition-all ${
            toast.type === "ok" ? "bg-emerald-600" : "bg-red-600"
          }`}
        >
          {toast.type === "ok" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          {toast.msg}
        </div>
      )}
    </div>
  );
}
