"use client";

import { useState, useEffect, useRef, useId, cloneElement, isValidElement } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Monitor,
  Moon,
  Palette,
  RotateCcw,
  Sun,
  TrendingUp,
  Upload,
} from "lucide-react";
import { SettingsSwitch as Switch } from "@/components/account/SettingsSwitch";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useRovingRadioGroup } from "@/lib/a11y/use-roving-radio";
import { readSettings, writeSettings, type AppSettings } from "@/lib/storage/settings";
import { createHistoryStore } from "@/lib/storage/history";
import { clearLastQuestion } from "@/lib/storage/last-question";
import { BookmarkDataControls } from "@/components/account/BookmarkDataControls";
import { NotificationSettings } from "@/app/account/notifications/NotificationSettings";
import { CloudSyncPanel } from "@/components/account/CloudSyncPanel";
import { AccountNavigationLink } from "@/components/account/AccountNavigation";
import { MobileInstallControl } from "@/components/pwa/MobileInstallControl";

type Theme = "light" | "dark" | "system";

const THEME_OPTIONS: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: "light", label: "ライト", icon: <Sun className="h-4 w-4" /> },
  { value: "system", label: "自動", icon: <Monitor className="h-4 w-4" /> },
  { value: "dark", label: "ダーク", icon: <Moon className="h-4 w-4" /> },
];

function SectionTitle({
  icon,
  children,
  description,
  id,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  description?: string;
  id?: string;
}) {
  return (
    <div className="mb-3 flex scroll-mt-20 items-center gap-3" id={id}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-soft-foreground">
        {icon}
      </span>
      <div className="min-w-0">
        <h2 className="text-base font-semibold text-foreground">{children}</h2>
        {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
      </div>
    </div>
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
  // Radix <Switch> renders a bare <button role="switch"> with no text content,
  // so without this the control has no accessible name (WCAG 4.1.2). Associate
  // the visible label with the control via aria-labelledby (name stays in sync).
  const labelId = useId();
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="min-w-0 flex-1">
        <p id={labelId} className="text-sm font-medium text-foreground">{label}</p>
        {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
      </div>
      <div className="shrink-0">
        {isValidElement<{ "aria-labelledby"?: string }>(children)
          ? cloneElement(children, { "aria-labelledby": labelId })
          : children}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { getRadioProps: getThemeRadioProps } = useRovingRadioGroup(
    THEME_OPTIONS.map((o) => o.value),
    theme,
    setTheme,
  );
  const [settings, setSettings] = useState<AppSettings>({
    randomizeChoices: false,
    excludeRecent: false,
    calculationOnly: false,
    recordHistory: true,
  });
  const [stats, setStats] = useState({ total: 0, correct: 0, accuracy: 0, uniqueAnswered: 0 });
  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  useEffect(() => {
    setSettings(readSettings());
    const store = createHistoryStore();
    setStats(store.getStats());
  }, []);

  function showToast(type: "ok" | "err", msg: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ type, msg });
    toastTimer.current = setTimeout(() => setToast(null), 3000);
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
    reader.onerror = () => showToast("err", "ファイルを読み込めませんでした");
    reader.onabort = () => showToast("err", "ファイルの読み込みを中止しました");
    reader.readAsText(file);
    e.target.value = "";
  }

  function handleReset() {
    if (!window.confirm("学習履歴をすべて削除しますか？この操作は取り消せません。")) return;
    const store = createHistoryStore();
    store.reset();
    clearLastQuestion();
    setStats({ total: 0, correct: 0, accuracy: 0, uniqueAnswered: 0 });
    showToast("ok", "履歴を削除しました");
  }

  return (
    <main className="relative flex-1">

      <div className="relative mx-auto w-full max-w-2xl px-4 pb-20 pt-6 sm:px-6 sm:pt-10">
        <header className="mb-6">
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            設定
          </h1>
        </header>

        {/* Section nav (anchor links) */}
        <AccountNavigationLink settings className="mb-6 flex min-h-11 items-center rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium hover:bg-muted" />
        <div className="space-y-6">
          {/* Appearance */}
          <section>
            <SectionTitle
              id="appearance"
              icon={<Palette className="h-5 w-5" />}
            >
              読みやすさ
            </SectionTitle>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                テーマ
              </p>
              <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="テーマ選択">
                {THEME_OPTIONS.map(({ value, label, icon }, index) => {
                  const active = theme === value;
                  return (
                    <button
                      key={value}
                      onClick={() => setTheme(value)}
                      role="radio"
                      aria-checked={active}
                      aria-label={`テーマを${label}に切り替え`}
                      {...getThemeRadioProps(index)}
                      className={`flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                        active
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      <span className={active ? "" : "text-muted-foreground"} aria-hidden="true">{icon}</span>
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <span id="character" className="scroll-mt-20" aria-hidden="true" />

          {/* History */}
          <section>
            <SectionTitle
              id="history"
              icon={<TrendingUp className="h-5 w-5" />}
            >
              学習履歴
            </SectionTitle>
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="grid grid-cols-3 divide-x divide-border bg-gradient-to-br from-primary-soft/40 to-transparent">
                <Stat label="回答数" value={stats.total.toLocaleString("ja-JP")} />
                <Stat label="問題数" value={stats.uniqueAnswered.toLocaleString("ja-JP")} />
                <Stat
                  label="正答率"
                  value={stats.total > 0 ? `${Math.round(stats.accuracy * 100)}%` : "--"}
                  highlight
                />
              </div>
              <details className="px-4 pb-2">
                <summary className="min-h-11 cursor-pointer py-3 text-sm font-medium">データ管理</summary>
                <SettingRow
                  label="学習履歴を記録する"
                  description="この端末に回答を保存します"
                >
                  <Switch
                    checked={settings.recordHistory}
                    onCheckedChange={(v) => updateSetting("recordHistory", v)}
                  />
                </SettingRow>
                <div className="grid gap-2 pb-3 sm:grid-cols-3">
                <Button variant="outline" size="sm" className="min-h-11 gap-2" onClick={handleExport}>
                  <Download className="h-4 w-4" />
                  エクスポート
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="min-h-11 gap-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4" />
                  インポート
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="min-h-11 gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
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
                <BookmarkDataControls />
              </details>
            </div>
          </section>

          <details id="cloud-sync" className="scroll-mt-20 rounded-xl border border-border px-4 pb-2">
            <summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold">クラウド同期</summary>
            <CloudSyncPanel />
          </details>
          <details id="notifications" className="scroll-mt-20 rounded-xl border border-border px-4 pb-2">
            <summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold">通知設定</summary>
            <NotificationSettings />
          </details>
          <details id="home-screen" className="scroll-mt-20 rounded-xl border border-border px-4 pb-2">
            <summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold">ホーム画面に追加</summary>
            <MobileInstallControl />
          </details>
          <details className="rounded-xl border border-border px-4 pb-2">
            <summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold">その他の設定</summary>
            <a id="exam-schedule" href="https://tsugino-shikaku.jp/calendar" target="_blank" rel="noopener noreferrer" className="block py-3 text-sm underline">次の資格で日程を見る</a>
            <Link id="api-keys" href="/settings/api-keys" className="block py-3 text-sm underline">APIキー管理</Link>
            <p className="py-3 text-xs text-muted-foreground">バージョン 0.1.0</p>
          </details>
        </div>

        {/* 常設の live region。toast 真値時のみ region を描画する条件付きマウントだと、
            live region 自体が文言と同時に DOM 挿入され、SR が変化を捕捉できず読み上げが
            不確実になる。region を常設し中身だけ出し入れして確実に通知する（WCAG 4.1.3）。 */}
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 sm:bottom-6"
        >
          {toast && (
            <div
              className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium shadow-xl animate-slide-up ${
                toast.type === "ok" ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"
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
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="py-5 text-center">
      <p
        className={`text-2xl font-bold tracking-tight ${
          highlight ? "text-primary" : "text-foreground"
        }`}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
