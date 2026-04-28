"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Download,
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
import { readSettings, writeSettings, type AppSettings } from "@/lib/storage/settings";
import {
  readCharacterState,
  writeCharacterId,
  writeCharacterEnabled,
} from "@/lib/storage/character";
import { CharacterSelector } from "@/components/character/CharacterSelector";
import { DEFAULT_CHARACTER_ID, type CharacterId } from "@/lib/ai/characters";
import { createHistoryStore } from "@/lib/storage/history";
import {
  readMotivationSettings,
  writeMotivationSettings,
  type MotivationSettings,
} from "@/lib/motivation/combo";

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
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-soft-foreground">
        {icon}
      </span>
      <div className="min-w-0">
        <h2 className="text-base font-semibold text-foreground">{children}</h2>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
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
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
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
  const [motivation, setMotivation] = useState<MotivationSettings>({
    soundEnabled: true,
    reduceMotion: false,
  });
  const [stats, setStats] = useState({ total: 0, correct: 0, accuracy: 0, uniqueAnswered: 0 });
  const [characterId, setCharacterId] = useState<CharacterId>(DEFAULT_CHARACTER_ID);
  const [characterEnabled, setCharacterEnabledState] = useState(true);
  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSettings(readSettings());
    setMotivation(readMotivationSettings());
    const store = createHistoryStore();
    setStats(store.getStats());
    const cs = readCharacterState();
    setCharacterId(cs.id);
    setCharacterEnabledState(cs.enabled);
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

  return (
    <main className="relative flex-1">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-spotlight"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-grid opacity-30 [mask-image:radial-gradient(60%_50%_at_50%_0%,#000_30%,transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-2xl px-4 pb-20 pt-6 sm:px-6 sm:pt-10">
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            戻る
          </Link>
        </Button>

        <header className="mb-8 animate-fade-in">
          <Badge variant="soft" className="mb-3">
            <SettingsIcon className="h-3 w-3" />
            設定
          </Badge>
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            設定とプリファレンス
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            外観・クイズオプション・学習履歴の管理ができます。
          </p>
        </header>

        <div className="space-y-6">
          {/* Appearance */}
          <section>
            <SectionTitle
              icon={<Palette className="h-5 w-5" />}
              description="アプリ全体の表示テーマ"
            >
              外観
            </SectionTitle>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                テーマ
              </p>
              <div className="grid grid-cols-3 gap-2">
                {THEME_OPTIONS.map(({ value, label, icon }) => {
                  const active = theme === value;
                  return (
                    <button
                      key={value}
                      onClick={() => setTheme(value)}
                      className={`flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-sm font-medium transition-all ${
                        active
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      <span className={active ? "" : "text-muted-foreground"}>{icon}</span>
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

          {/* Quiz Options */}
          <section>
            <SectionTitle
              icon={<Sliders className="h-5 w-5" />}
              description="出題ロジックのカスタマイズ"
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
            </div>
          </section>

          {/* Motivation */}
          <section>
            <SectionTitle
              icon={<Sliders className="h-5 w-5" />}
              description="正解時の演出と効果音"
            >
              演出と効果音
            </SectionTitle>
            <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-sm">
              <SettingRow
                label="正解音"
                description="3連続以上で「ピロロロ」が鳴ります"
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

          {/* History */}
          <section>
            <SectionTitle
              icon={<TrendingUp className="h-5 w-5" />}
              description="ブラウザに保存された履歴の管理"
            >
              学習履歴
            </SectionTitle>
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              {/* Stats */}
              <div className="grid grid-cols-3 divide-x divide-border border-b border-border bg-gradient-to-br from-primary-soft/40 to-transparent">
                <Stat label="回答数" value={stats.total.toLocaleString("ja-JP")} />
                <Stat label="問題数" value={stats.uniqueAnswered.toLocaleString("ja-JP")} />
                <Stat
                  label="正答率"
                  value={
                    stats.total > 0 ? `${Math.round(stats.accuracy * 100)}%` : "--"
                  }
                  highlight
                />
              </div>

              {/* Actions */}
              <div className="grid gap-2 p-4 sm:grid-cols-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={handleExport}
                >
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
            <SectionTitle
              icon={<SettingsIcon className="h-5 w-5" />}
              description="バージョン・関連情報"
            >
              このアプリについて
            </SectionTitle>
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

        {/* Toast */}
        {toast && (
          <div
            role="status"
            aria-live="polite"
            className={`fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white shadow-xl animate-slide-up ${
              toast.type === "ok"
                ? "bg-success"
                : "bg-destructive"
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
