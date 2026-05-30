"use client";

import { useState, useEffect, useRef, useId, cloneElement, isValidElement } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
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
  Settings as SettingsIcon,
  Sliders,
  Sparkles,
  Sun,
  TrendingUp,
  Upload,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/theme-provider";
import { useRovingRadioGroup } from "@/lib/a11y/use-roving-radio";
import { readSettings, writeSettings, type AppSettings } from "@/lib/storage/settings";
import {
  readCharacterState,
  writeCharacterId,
  writeCharacterEnabled,
} from "@/lib/storage/character";
import { CharacterSelector } from "@/components/character/CharacterSelector";
import { DEFAULT_CHARACTER_ID, type CharacterId } from "@/lib/ai/characters";
import { createHistoryStore } from "@/lib/storage/history";
import { clearLastQuestion } from "@/lib/storage/last-question";
import { resetUserContext } from "@/lib/storage/user-context";
import {
  readMotivationSettings,
  writeMotivationSettings,
  type MotivationSettings,
} from "@/lib/motivation/combo";
import { LS_KEYS } from "@/lib/storage/keys";
import { NotificationSettings } from "@/app/account/notifications/NotificationSettings";
import { CloudSyncPanel } from "@/components/account/CloudSyncPanel";

type Theme = "light" | "dark" | "system";

const THEME_OPTIONS: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: "light", label: "ライト", icon: <Sun className="h-4 w-4" /> },
  { value: "system", label: "自動", icon: <Monitor className="h-4 w-4" /> },
  { value: "dark", label: "ダーク", icon: <Moon className="h-4 w-4" /> },
];

const SECTIONS = [
  { id: "appearance", label: "外観", icon: <Palette className="h-3.5 w-3.5" /> },
  { id: "character", label: "AIキャラ", icon: <Sparkles className="h-3.5 w-3.5" /> },
  { id: "quiz-options", label: "クイズオプション", icon: <Sliders className="h-3.5 w-3.5" /> },
  { id: "notifications", label: "通知設定", icon: <Bell className="h-3.5 w-3.5" /> },
  { id: "exam-schedule", label: "試験予定", icon: <CalendarClock className="h-3.5 w-3.5" /> },
  { id: "history", label: "学習履歴管理", icon: <TrendingUp className="h-3.5 w-3.5" /> },
  { id: "cloud-sync", label: "クラウド同期", icon: <Cloud className="h-3.5 w-3.5" /> },
  { id: "api-keys", label: "APIキー管理", icon: <KeyRound className="h-3.5 w-3.5" /> },
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

function readExamDate(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(LS_KEYS.examDate) ?? "";
  } catch {
    return "";
  }
}

function writeExamDate(date: string): void {
  if (typeof window === "undefined") return;
  try {
    if (!date) window.localStorage.removeItem(LS_KEYS.examDate);
    else window.localStorage.setItem(LS_KEYS.examDate, date);
  } catch {
    // ignore
  }
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
  const [characterId, setCharacterId] = useState<CharacterId>(DEFAULT_CHARACTER_ID);
  const [characterEnabled, setCharacterEnabledState] = useState(true);
  const [examDate, setExamDate] = useState("");
  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
     
    setSettings(readSettings());
    setMotivation(readMotivationSettings());
    const store = createHistoryStore();
    setStats(store.getStats());
    const cs = readCharacterState();
    setCharacterId(cs.id);
    setCharacterEnabledState(cs.enabled);
    setExamDate(readExamDate());
  }, []);

  function updateMotivation<K extends keyof MotivationSettings>(
    key: K,
    value: MotivationSettings[K],
  ) {
    const next = { ...motivation, [key]: value };
    setMotivation(next);
    writeMotivationSettings(next);
  }

  function handleCharacterChange(id: CharacterId) {
    setCharacterId(id);
    writeCharacterId(id);
  }

  function handleCharacterEnabledChange(on: boolean) {
    setCharacterEnabledState(on);
    writeCharacterEnabled(on);
  }

  function handleExamDateChange(value: string) {
    setExamDate(value);
    writeExamDate(value);
  }

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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-spotlight"
      />

      <div className="relative mx-auto w-full max-w-2xl px-4 pb-20 pt-6 sm:px-6 sm:pt-10">
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            戻る
          </Link>
        </Button>

        <header className="mb-6 animate-fade-in">
          <Badge variant="soft" className="mb-3">
            <SettingsIcon className="h-3 w-3" />
            設定
          </Badge>
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            設定とプリファレンス
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            7 つのセクションで全機能を一元管理できます。
          </p>
        </header>

        {/* Section nav (anchor links) */}
        <nav
          aria-label="セクション一覧"
          className="mb-6 flex flex-wrap gap-1.5 rounded-2xl border border-border bg-muted/30 p-2"
        >
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="inline-flex items-center gap-1 rounded-lg bg-background px-2.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
              description="アプリ全体の表示テーマ"
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

          {/* AI Character */}
          <section>
            <SectionTitle
              id="character"
              icon={<Sparkles className="h-5 w-5" />}
              description="AI コパイロットの口調・キャラクター"
            >
              AI キャラクター
            </SectionTitle>
            <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-sm">
              <SettingRow
                label="AI キャラクターを有効化"
                description="OFF にすると従来のニュートラルな口調で応答します"
              >
                <Switch
                  checked={characterEnabled}
                  onCheckedChange={handleCharacterEnabledChange}
                />
              </SettingRow>
              <div className="p-5">
                <CharacterSelector
                  value={characterId}
                  onChange={handleCharacterChange}
                  disabled={!characterEnabled}
                />
              </div>
            </div>
          </section>

          {/* Quiz Options + Motivation */}
          <section>
            <SectionTitle
              id="quiz-options"
              icon={<Sliders className="h-5 w-5" />}
              description="出題ロジックと演出のカスタマイズ"
            >
              クイズオプション
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
                description="isCalculation フラグが付いた問題だけ出題"
              >
                <Switch
                  checked={settings.calculationOnly}
                  onCheckedChange={(v) => updateSetting("calculationOnly", v)}
                />
              </SettingRow>
              <SettingRow
                label="正解音"
                description="3 連続以上で「ピロロロ」が鳴ります"
              >
                <Switch
                  checked={motivation.soundEnabled}
                  onCheckedChange={(v) => updateMotivation("soundEnabled", v)}
                />
              </SettingRow>
              <SettingRow
                label="アニメーションを抑える"
                description="花火やパーティクルを無効化（軽量モード）"
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
              description="メール / プッシュ通知の管理"
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
              description="次の試験日を登録するとカウントダウンが有効化"
            >
              試験予定
            </SectionTitle>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <label className="mb-2 block text-sm font-medium" htmlFor="exam-date">
                次の受験予定日
              </label>
              <input
                id="exam-date"
                type="date"
                value={examDate}
                onChange={(e) => handleExamDateChange(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                ダッシュボードや AI チューターでこの日付までの残り日数が表示されます。
              </p>
            </div>
          </section>

          {/* History */}
          <section>
            <SectionTitle
              id="history"
              icon={<TrendingUp className="h-5 w-5" />}
              description="ブラウザに保存された履歴の管理"
            >
              学習履歴管理
            </SectionTitle>
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <SettingRow
                label="学習履歴を記録する"
                description="OFF にすると回答を localStorage に保存しません（プライバシー重視の方向け）"
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
                <Button variant="outline" size="sm" className="gap-2" onClick={handleExport}>
                  <Download className="h-4 w-4" />
                  エクスポート
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4" />
                  インポート
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={handleReset}
                >
                  <RotateCcw className="h-4 w-4" />
                  リセット
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
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
              description="機種変・ブラウザ切替でも履歴を引き継ぐ（任意・サインインが必要）"
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
              description="過去問AI Public API（β）のキーを発行・管理"
            >
              API キー管理
            </SectionTitle>
            <Link
              href="/settings/api-keys"
              className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div>
                <p className="text-sm font-medium text-foreground">API キー管理ページを開く</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  キーの発行・コピー・無効化が可能です
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
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
                className="flex items-center justify-between px-5 py-4 text-sm transition-colors hover:bg-muted"
              >
                <span className="text-foreground">著作権・利用条件</span>
                <span className="text-primary">→</span>
              </Link>
              <Link
                href="/privacy"
                className="flex items-center justify-between px-5 py-4 text-sm transition-colors hover:bg-muted"
              >
                <span className="text-foreground">プライバシーポリシー</span>
                <span className="text-primary">→</span>
              </Link>
            </div>
          </section>
        </div>

        {toast && (
          <div
            role="status"
            aria-live="polite"
            className={`fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white shadow-xl animate-slide-up ${
              toast.type === "ok" ? "bg-success" : "bg-destructive"
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
