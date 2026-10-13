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
import { clearQuizResume } from "@/lib/storage/quiz-resume";
import { resetUserContext } from "@/lib/storage/user-context";
import {
  readMotivationSettings,
  writeMotivationSettings,
  type MotivationSettings,
} from "@/lib/motivation/combo";
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
  { id: "quiz-options", label: "問題の出し方", icon: <Sliders className="h-3.5 w-3.5" /> },
  { id: "notifications", label: "通知設定", icon: <Bell className="h-3.5 w-3.5" /> },
  { id: "exam-schedule", label: "試験予定", icon: <CalendarClock className="h-3.5 w-3.5" /> },
  { id: "history", label: "学習の記録", icon: <TrendingUp className="h-3.5 w-3.5" /> },
  { id: "cloud-sync", label: "別の端末に引き継ぐ", icon: <Cloud className="h-3.5 w-3.5" /> },
  { id: "api-keys", label: "開発者向け", icon: <KeyRound className="h-3.5 w-3.5" /> },
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
  const descriptionId = `${labelId}-description`;
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <div className="min-w-0 flex-1">
        <p id={labelId} className="text-sm font-medium text-foreground">{label}</p>
        {description && <p id={descriptionId} className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
      </div>
      <div className="shrink-0">
        {isValidElement<{ "aria-labelledby"?: string; "aria-describedby"?: string }>(children)
          ? cloneElement(children, { "aria-labelledby": labelId, "aria-describedby": description ? descriptionId : undefined })
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
  const [characterId, setCharacterId] = useState<CharacterId>(DEFAULT_CHARACTER_ID);
  const [characterEnabled, setCharacterEnabledState] = useState(true);
  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const [settingsReady, setSettingsReady] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
     
    setSettings(readSettings());
    setMotivation(readMotivationSettings());
    const store = createHistoryStore();
    setStats(store.getStats());
    const cs = readCharacterState();
    setCharacterId(cs.id);
    setCharacterEnabledState(cs.enabled);
    setSettingsReady(true);
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
    showToast("ok", "履歴をファイルに保存しました");
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
        showToast("ok", "ファイルの履歴に戻しました");
      } else {
        showToast("err", "履歴を戻せませんでした。保存した履歴ファイルを選んでください。");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function handleReset() {
    if (!window.confirm("このブラウザの回答履歴・★苦手復習・続きから情報を削除しますか？復習予定・学習日・しおり・同期先の履歴は残ります。削除は取り消せません。")) return;
    const store = createHistoryStore();
    store.reset();
    clearLastQuestion();
    clearQuizResume();
    setStats({ total: 0, correct: 0, accuracy: 0, uniqueAnswered: 0 });
    showToast("ok", "履歴を削除しました");
  }

  function handlePersonalContextReset() {
    if (
      !window.confirm(
        "訪問の記録と続きから情報を初期化しますか？回答履歴・★苦手復習・しおりは残ります。",
      )
    ) {
      return;
    }
    resetUserContext();
    clearLastQuestion();
    clearQuizResume();
    showToast("ok", "訪問の記録と続きから情報を初期化しました");
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
            設定
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            問題の出し方や、学習の記録を変更できます。
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
              description="AIへの質問に答える口調を選べます"
            >
              AI キャラクター
            </SectionTitle>
            <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-sm">
              <SettingRow
                label="AI キャラクターを有効化"
                description="OFF にすると標準の口調で応答します"
              >
                <Switch
                  disabled={!settingsReady}
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
              description="新しく始める通常クイズの設定です。年度別・復習・検索からの演習は対象外です。"
            >
              問題の出し方
            </SectionTitle>
            <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-sm">
              <SettingRow
                label="選択肢を並べ替える"
                description="ア〜エの順番を毎回入れ替えます"
              >
                <Switch
                  disabled={!settingsReady}
                  checked={settings.randomizeChoices}
                  onCheckedChange={(v) => updateSetting("randomizeChoices", v)}
                />
              </SettingRow>
              <SettingRow
                label="最近解いた問題を除く"
                description="新しい通常クイズでは、直近40回の回答に含まれる問題を出題しません"
              >
                <Switch
                  disabled={!settingsReady}
                  checked={settings.excludeRecent}
                  onCheckedChange={(v) => updateSetting("excludeRecent", v)}
                />
              </SettingRow>
              <SettingRow
                label="計算問題のみ"
                description="計算問題として登録された問題だけ出題します"
              >
                <Switch
                  disabled={!settingsReady}
                  checked={settings.calculationOnly}
                  onCheckedChange={(v) => updateSetting("calculationOnly", v)}
                />
              </SettingRow>
              <SettingRow
                label="正解音"
                description="3 連続以上で「ピロロロ」が鳴ります"
              >
                <Switch
                  disabled={!settingsReady}
                  checked={motivation.soundEnabled}
                  onCheckedChange={(v) => updateMotivation("soundEnabled", v)}
                />
              </SettingRow>
              <SettingRow
                label="アニメーションを抑える"
                description="花火などの動く演出を表示しません"
              >
                <Switch
                  disabled={!settingsReady}
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
              description="試験日・申込締切は次の資格で確認"
            >
              試験予定
            </SectionTitle>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <p className="mt-2 text-xs text-muted-foreground">
                資格ごとの試験日と申込締切を確認できます。
              </p>
              <a href="https://tsugino-shikaku.jp/calendar" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">次の資格で日程を見る ↗</a>
            </div>
          </section>

          {/* History */}
          <section>
            <SectionTitle
              id="history"
              icon={<TrendingUp className="h-5 w-5" />}
              description="ブラウザに保存された履歴の管理"
            >
              学習の記録
            </SectionTitle>
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <SettingRow
                label="学習履歴を記録する"
                description="OFF にすると新しい回答履歴を保存しません。これまでの履歴は残り、復習予定・学習日・★・しおり・続きから情報は別に保存されます。"
              >
                <Switch
                  disabled={!settingsReady}
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
                <Button variant="outline" size="sm" className="gap-2" onClick={handleExport} disabled={!settingsReady}>
                  <Download className="h-4 w-4" />
                  ファイルに保存
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={!settingsReady}
                >
                  <Upload className="h-4 w-4" />
                  ファイルから戻す
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={handleReset}
                  disabled={!settingsReady}
                >
                  <RotateCcw className="h-4 w-4" />
                  回答履歴を削除
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  onClick={handlePersonalContextReset}
                  disabled={!settingsReady}
                  title="訪問の記録と続きから情報だけを初期化"
                >
                  <RotateCcw className="h-4 w-4" />
                  訪問・続きからを初期化
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleImport}
                />
              </div>
              <p className="px-4 pb-4 text-xs text-muted-foreground">履歴の削除では、回答履歴・★苦手復習・続きから情報が消えます。復習予定・学習日・しおり・同期先の履歴は残ります。ファイルから戻すと、回答履歴と★はファイルの内容に置き換わります。</p>
            </div>
          </section>

          {/* Cloud sync (opt-in) */}
          <section>
            <SectionTitle
              id="cloud-sync"
              icon={<Cloud className="h-5 w-5" />}
              description="機種変・ブラウザ切替でも履歴を引き継ぐ（任意・サインインが必要）"
            >
              別の端末に引き継ぐ
            </SectionTitle>
            <CloudSyncPanel />
          </section>

          {/* API Keys (link to sub-page) */}
          <section>
            <SectionTitle
              id="api-keys"
              icon={<KeyRound className="h-5 w-5" />}
              description="APIキー：外部のアプリから過去問AIを使うための専用の鍵"
            >
              開発者向け（APIキー）
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

        {/* 常設の live region。toast 真値時のみ region を描画する条件付きマウントだと、
            live region 自体が文言と同時に DOM 挿入され、SR が変化を捕捉できず読み上げが
            不確実になる。region を常設し中身だけ出し入れして確実に通知する（WCAG 4.1.3）。 */}
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
        >
          {toast && (
            <div
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white shadow-xl animate-slide-up ${
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
