"use client";

import * as React from "react";
import { Shuffle, Save, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AVATAR_STYLES,
  buildAvatarUrl,
  readAvatar,
  writeAvatar,
  type AvatarStyle,
  type AvatarConfig,
} from "@/lib/storage/avatar";

const STYLE_LABELS: Record<AvatarStyle, string> = {
  adventurer: "アドベンチャラー",
  avataaars: "アバターズ",
  bottts: "ロボット",
  lorelei: "ロレライ",
  notionists: "ノーション風",
  "pixel-art": "ピクセル",
  shapes: "図形",
  thumbs: "サムズ",
  "fun-emoji": "絵文字",
  icons: "アイコン",
};

function randomSeed(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function AvatarPicker() {
  const [cfg, setCfg] = React.useState<AvatarConfig | null>(null);
  const [draft, setDraft] = React.useState<AvatarConfig | null>(null);
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    const c = readAvatar();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCfg(c);
    setDraft(c);
  }, []);

  if (!draft || !cfg) {
    return <div className="h-64 animate-pulse rounded-2xl border border-border bg-muted/40" />;
  }

  const dirty = draft.style !== cfg.style || draft.seed !== cfg.seed;

  function handleSave() {
    if (!draft) return;
    writeAvatar(draft);
    setCfg(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <div className="mx-auto mb-3 h-32 w-32 overflow-hidden rounded-2xl border border-border bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={buildAvatarUrl(draft)}
            alt="プレビュー"
            className="h-full w-full object-contain"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          スタイル: {STYLE_LABELS[draft.style]} · シード: {draft.seed}
        </p>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold">スタイル</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDraft({ ...draft, seed: randomSeed() })}
          >
            <Shuffle className="mr-1 h-3.5 w-3.5" />
            シード変更
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {AVATAR_STYLES.map((s) => {
            const url = buildAvatarUrl({ style: s, seed: draft.seed });
            const active = s === draft.style;
            return (
              <button
                key={s}
                onClick={() => setDraft({ ...draft, style: s })}
                className={
                  "relative flex flex-col items-center gap-1 rounded-xl border-2 p-2 transition-colors " +
                  (active
                    ? "border-violet-500 bg-violet-500/10"
                    : "border-border bg-background hover:border-violet-300")
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={s} className="h-12 w-12 object-contain" />
                <span className="truncate text-[10px] text-muted-foreground">
                  {STYLE_LABELS[s]}
                </span>
                {active && (
                  <Check className="absolute right-1 top-1 h-3.5 w-3.5 text-violet-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="seed" className="mb-1 block text-sm font-medium">
          シード文字列
        </label>
        <input
          id="seed"
          type="text"
          value={draft.seed}
          onChange={(e) => setDraft({ ...draft, seed: e.target.value || "ipa-quiz" })}
          maxLength={64}
          className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          同じシードからは常に同じアバターが生成されます。
        </p>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleSave} disabled={!dirty} variant="primary" className="flex-1">
          <Save className="mr-2 h-4 w-4" />
          保存
        </Button>
        {saved && (
          <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
            <Check className="h-3 w-3" />
            保存しました
          </span>
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Powered by{" "}
        <a
          href="https://www.dicebear.com/"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-foreground"
        >
          DiceBear
        </a>
      </p>
    </div>
  );
}
