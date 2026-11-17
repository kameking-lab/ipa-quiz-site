"use client";

import { useState, useEffect, useRef, useId, cloneElement, isValidElement } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Bell,
  CalendarClock,
  CheckCircle2,
  Cloud,
  Download,
  KeyRound,
  Monitor,
  Moon,
  Palette,
  RotateCcw,
  Sliders,
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
import { resetUserContext } from "@/lib/storage/user-context";
import {
  readMotivationSettings,
  writeMotivationSettings,
  type MotivationSettings,
} from "@/lib/motivation/combo";
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

const SECTIONS = [
  { id: "appearance", label: "外観", icon: <Palette className="h-3.5 w-3.5" /> },
  { id: "quiz-options", label: "出題・演出", icon: <Sliders className="h-3.5 w-3.5" /> },
  { id: "notifications", label: "通知設定", icon: <Bell className="h-3.5 w-3.5" /> },
  { id: "exam-schedule", label: "試験予定", icon: <CalendarClock className="h-3.5 w-3.5" /> },
  { id: "history", label: "学習履歴", icon: <TrendingUp className="h-3.5 w-3.5" /> },
  { id: "cloud-sync", label: "クラウド同期", icon: <Cloud className="h-3.5 w-3.5" /> },
  { id: "api-keys", label: "APIキー管理", icon: <KeyRound className="h-3.5 w-3.5" /> },
  { id: "home-screen", label: "ホーム画面に追加", icon: <Download className="h-3.5 w-3.5" /> },
] as const;

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
    <div className="flex items-center justify-between gap-4 px-5 py-4">
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
  const [motivation, setMotivation] = useState<MotivationSettings>({
    soundEnabled: true,
    reduceMotion: false,
  });
  const [stats, setStats] = useState({ total: 0, correct: 0, accuracy: 0, uniqueAnswered: 0 });
  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  useEffect(() => {
    setSettings(readSettings());
    setMotivation(readMotivationSettings());
    const store = createHistoryStore();
    setStats(store.getStats());
  }, []);

  function updateMotivation<K extends keyof MotivationSettings>(
    key: K,
    value: MotivationSettings[K],
  ) {
    const next = { ...motivation, [key]: value };
    setMotivation(next);
    writeMotivationSettings(next);
  }

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

  function handlePersonalContextReset() {
    if (
      !window.confirm(
        "個人設定（訪問回数・続きから情報・おすすめ問題のシード）をリセットしますか？学習履歴は残ります。",
      )
    ) {
      return;
    }
    resetUserContext();
    clearLastQuestion();
    showToast("ok", "個人設定をリセットしました");
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
        <nav
          aria-label="セクション一覧"
          className="mb-6 flex flex-wrap gap-1.5 rounded-2xl border border-border bg-muted/30 p-2"
        >
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-background px-3 py-2 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {s.icon}
              {s.label}
            </a>
          ))}
        </nav>

        <div className="space-y-6">
          {/* Appearance */}
          <section>
            <SectionTitle
              id="appearance"
              icon={<Palette className="h-5 w-5" />}
            >
              外観
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

          {/* Quiz Options + Motivation */}
          <section>
            <SectionTitle
              id="quiz-options"
              icon={<Sliders className="h-5 w-5" />}
            >
              出題・演出
            </SectionTitle>
            <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-sm">
              <SettingRow
                label="選択肢をランダム化"
                description="ア〜エの順番を毎回入れ替えます"
              >
                <Switch
                  checked={settings.randomizeChoices}
                  onCheckedChange={(v) => updateSetting("randomizeChoices", v)}
                />
              </SettingRow>
              <SettingRow
                label="直近 2 回を除外"
                description="直近 2 回で正解した問題を出題から外します"
              >
                <Switch
                  checked={settings.excludeRecent}
                  onCheckedChange={(v) => updateSetting("excludeRecent", v)}
                />
              </SettingRow>
              <SettingRow
                label="計算問題のみ"
                description="計算が必要な問題だけを出題します"
              >
                <Switch
                  checked={settings.calculationOnly}
                  onCheckedChange={(v) => updateSetting("calculationOnly", v)}
                />
              </SettingRow>
              <SettingRow
                label="正解音"
                description="3問以上続けて正解すると音を鳴らします"
              >
                <Switch
                  checked={motivation.soundEnabled}
                  onCheckedChange={(v) => updateMotivation("soundEnabled", v)}
                />
              </SettingRow>
              <SettingRow
                label="アニメーションを抑える"
                description="花火などの動きを抑えます"
              >
                <Switch
                  checked={motivation.reduceMotion}
                  onCheckedChange={(v) => updateMotivation("reduceMotion", v)}
                />
              </SettingRow>
            </div>
          </section>

          {/* Notifications */}
          <section>
            <SectionTitle
              id="notifications"
              icon={<Bell className="h-5 w-5" />}
            >
              通知設定
            </SectionTitle>
            <NotificationSettings />
          </section>

          {/* Exam Schedule */}
          <section>
            <SectionTitle
              id="exam-schedule"
              icon={<CalendarClock className="h-5 w-5" />}
            >
              試験予定
            </SectionTitle>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <a href="https://tsugino-shikaku.jp/calendar" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4">次の資格で日程を見る ↗</a>
            </div>
          </section>

          {/* History */}
          <section>
            <SectionTitle
              id="history"
              icon={<TrendingUp className="h-5 w-5" />}
            >
              学習履歴
            </SectionTitle>
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <SettingRow
                label="学習履歴を記録する"
                description="この端末に回答を保存します"
              >
                <Switch
                  checked={settings.recordHistory}
                  onCheckedChange={(v) => updateSetting("recordHistory", v)}
                />
              </SettingRow>
              <div className="grid grid-cols-3 divide-x divide-border border-t border-border bg-gradient-to-br from-primary-soft/40 to-transparent">
                <Stat label="回答数" value={stats.total.toLocaleString("ja-JP")} />
                <Stat label="問題数" value={stats.uniqueAnswered.toLocaleString("ja-JP")} />
                <Stat
                  label="正答率"
                  value={stats.total > 0 ? `${Math.round(stats.accuracy * 100)}%` : "--"}
                  highlight
                />
              </div>
              <div className="grid gap-2 p-4 sm:grid-cols-3">
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
                <Button
                  variant="ghost"
                  size="sm"
                  className="min-h-11 gap-2"
                  onClick={handlePersonalContextReset}
                  title="訪問回数 / 続きから情報 / おすすめ問題のシードを初期化"
                >
                  <RotateCcw className="h-4 w-4" />
                  個人設定をリセット
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

          {/* Cloud sync (opt-in) */}
          <section>
            <SectionTitle
              id="cloud-sync"
              icon={<Cloud className="h-5 w-5" />}
            >
              クラウド同期
            </SectionTitle>
            <CloudSyncPanel />
          </section>

          {/* API Keys (link to sub-page) */}
          <section>
            <SectionTitle
              id="api-keys"
              icon={<KeyRound className="h-5 w-5" />}
            >
              API キー管理
            </SectionTitle>
            <Link
              href="/settings/api-keys"
              className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/40 hover:bg-muted"
            >
              <div>
                <p className="text-sm font-medium text-foreground">API キー管理</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          </section>

          <section aria-labelledby="home-screen">
            <SectionTitle id="home-screen" icon={<Download className="h-5 w-5" />}>
              ホーム画面に追加
            </SectionTitle>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <MobileInstallControl />
            </div>
          </section>
          {/* About / footer info */}
          <section>
            <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-sm text-muted-foreground">バージョン</span>
                <span className="font-mono text-xs text-muted-foreground">0.1.0</span>
              </div>
              <Link
                href="/about"
                className="flex min-h-12 items-center justify-between gap-3 px-5 py-4 text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              >
                <span className="text-foreground">著作権・利用条件</span>
                <span className="text-primary">→</span>
              </Link>
              <Link
                href="/privacy"
                className="flex min-h-12 items-center justify-between gap-3 px-5 py-4 text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              >
                <span className="text-foreground">プライバシーポリシー</span>
                <span className="text-primary">→</span>
              </Link>
            </div>
          </section>
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
