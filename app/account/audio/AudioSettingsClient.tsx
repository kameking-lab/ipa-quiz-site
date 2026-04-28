"use client";

import * as React from "react";
import { Headphones, Pause, Play, Check, Volume2 } from "lucide-react";
import {
  BGM_TRACKS,
  getStoredBgm,
  getStoredBgmVolume,
  setStoredBgm,
  setStoredBgmVolume,
  type BgmId,
} from "@/lib/audio/bgm";
import { cn } from "@/lib/utils";

const TTS_RATE_KEY = "ipa-quiz:tts-rate:v1";

export function AudioSettingsClient() {
  const [selected, setSelected] = React.useState<BgmId>("off");
  const [volume, setVolume] = React.useState(0.3);
  const [playing, setPlaying] = React.useState<BgmId | null>(null);
  const [ttsRate, setTtsRate] = React.useState(1.0);

  const ctxRef = React.useRef<AudioContext | null>(null);
  const gainRef = React.useRef<GainNode | null>(null);
  const stopperRef = React.useRef<(() => void) | null>(null);

  React.useEffect(() => {
    setSelected(getStoredBgm());
    setVolume(getStoredBgmVolume());
    try {
      const r = Number(window.localStorage.getItem(TTS_RATE_KEY));
      if (Number.isFinite(r) && r >= 0.5 && r <= 2.0) setTtsRate(r);
    } catch {
      // ignore
    }
    return () => {
      if (stopperRef.current) stopperRef.current();
      if (ctxRef.current) {
        try {
          void ctxRef.current.close();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const stopCurrent = React.useCallback(() => {
    if (stopperRef.current) {
      stopperRef.current();
      stopperRef.current = null;
    }
    setPlaying(null);
  }, []);

  const previewBgm = React.useCallback(
    (id: BgmId) => {
      stopCurrent();
      if (id === "off") return;
      const track = BGM_TRACKS.find((t) => t.id === id);
      if (!track) return;
      const Ctx: typeof AudioContext | undefined =
        (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext })
          .AudioContext ??
        (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctx) return;
      if (!ctxRef.current || ctxRef.current.state === "closed") {
        ctxRef.current = new Ctx();
      }
      const ctx = ctxRef.current;
      void ctx.resume();
      if (!gainRef.current || gainRef.current.context !== ctx) {
        gainRef.current = ctx.createGain();
        gainRef.current.connect(ctx.destination);
      }
      gainRef.current.gain.value = volume;
      const stop = track.builder(ctx, gainRef.current);
      stopperRef.current = stop;
      setPlaying(id);
    },
    [volume, stopCurrent],
  );

  const onSelect = (id: BgmId) => {
    setSelected(id);
    setStoredBgm(id);
  };

  const onVolume = (v: number) => {
    setVolume(v);
    setStoredBgmVolume(v);
    if (gainRef.current) gainRef.current.gain.value = v;
  };

  const onTtsRate = (r: number) => {
    setTtsRate(r);
    try {
      window.localStorage.setItem(TTS_RATE_KEY, String(r));
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <header className="mb-3 flex items-center gap-2">
          <Headphones className="h-4 w-4 text-sky-500" />
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            学習中の BGM
          </h2>
        </header>
        <p className="mb-4 text-xs text-zinc-600 dark:text-zinc-400">
          選んだ BGM を「現在の BGM」として保存します。試聴ボタンで聴き比べてください。
        </p>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {BGM_TRACKS.map((t) => (
            <div
              key={t.id}
              className={cn(
                "flex flex-col gap-2 rounded-xl border p-3 transition",
                selected === t.id
                  ? "border-sky-400 bg-sky-50 dark:border-sky-700 dark:bg-sky-950/30"
                  : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700",
              )}
            >
              <div className="flex items-start gap-2">
                <button
                  type="button"
                  onClick={() => onSelect(t.id)}
                  className="flex flex-1 items-start gap-2 text-left"
                  aria-pressed={selected === t.id}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                      selected === t.id
                        ? "border-sky-500 bg-sky-500 text-white"
                        : "border-zinc-300 dark:border-zinc-600",
                    )}
                  >
                    {selected === t.id && <Check className="h-3 w-3" />}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      {t.label}
                    </span>
                    <span className="block text-xs text-zinc-600 dark:text-zinc-400">
                      {t.description}
                    </span>
                  </span>
                </button>
                {t.id !== "off" && (
                  <button
                    type="button"
                    onClick={() => (playing === t.id ? stopCurrent() : previewBgm(t.id))}
                    aria-label={playing === t.id ? "試聴を停止" : `${t.label} を試聴`}
                    className="rounded-md border border-zinc-200 bg-white p-1.5 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  >
                    {playing === t.id ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 text-sm">
          <Volume2 className="h-4 w-4 text-zinc-500" />
          <span className="w-16 text-zinc-600 dark:text-zinc-400">音量</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => onVolume(Number(e.target.value))}
            aria-label="BGM 音量"
            className="flex-1"
          />
          <span className="w-12 text-right tabular-nums text-zinc-600 dark:text-zinc-400">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <header className="mb-3">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            読み上げ速度（TTS / ポッドキャスト共通）
          </h2>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
            問題の読み上げボタンと、耳学ポッドキャストの再生速度に反映されます。
          </p>
        </header>
        <div className="flex items-center gap-3 text-sm">
          <span className="w-16 text-zinc-600 dark:text-zinc-400">速度</span>
          <input
            type="range"
            min={0.5}
            max={2.0}
            step={0.1}
            value={ttsRate}
            onChange={(e) => onTtsRate(Number(e.target.value))}
            aria-label="読み上げ速度"
            className="flex-1"
          />
          <span className="w-12 text-right tabular-nums text-zinc-600 dark:text-zinc-400">
            ×{ttsRate.toFixed(1)}
          </span>
        </div>
      </section>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ BGM はブラウザの Web Audio API でその場で生成される簡易音源です。
        外部音源やストリーミングは使っていないため、データ通信量はゼロです。
      </p>
    </div>
  );
}
