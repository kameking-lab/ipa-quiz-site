"use client";

import * as React from "react";
import { Play, Pause, Square, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

const RATE_KEY = "ipa-quiz:tts-rate:v1";

export function PodcastPlayer({ text }: { text: string }) {
  const [supported, setSupported] = React.useState<boolean | null>(null);
  const [state, setState] = React.useState<"idle" | "playing" | "paused">("idle");
  const [rate, setRate] = React.useState(1.0);

  React.useEffect(() => {
    const ok = typeof window !== "undefined" && typeof window.speechSynthesis !== "undefined";
    setSupported(ok);
    if (!ok) return;
    try {
      const stored = window.localStorage.getItem(RATE_KEY);
      if (stored) {
        const n = Number(stored);
        if (Number.isFinite(n) && n >= 0.5 && n <= 2.0) setRate(n);
      }
    } catch {
      // ignore
    }
  }, []);

  React.useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const start = () => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = rate;
    u.onend = () => setState("idle");
    u.onerror = () => setState("idle");
    setState("playing");
    synth.speak(u);
  };

  const pause = () => {
    if (!supported) return;
    if (state === "playing") {
      window.speechSynthesis.pause();
      setState("paused");
    } else if (state === "paused") {
      window.speechSynthesis.resume();
      setState("playing");
    }
  };

  const stop = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setState("idle");
  };

  const updateRate = (r: number) => {
    setRate(r);
    try {
      window.localStorage.setItem(RATE_KEY, String(r));
    } catch {
      // ignore
    }
    if (state !== "idle" && supported) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "ja-JP";
      u.rate = r;
      u.onend = () => setState("idle");
      u.onerror = () => setState("idle");
      window.speechSynthesis.speak(u);
      setState("playing");
    }
  };

  if (supported === false) {
    return (
      <div className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-3 py-2 text-xs text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
        <VolumeX className="h-3.5 w-3.5" />
        このブラウザは音声再生に対応していません
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl bg-zinc-50 p-2 dark:bg-zinc-900/60">
      {state === "idle" || state === "paused" ? (
        <button
          type="button"
          onClick={state === "idle" ? start : pause}
          className="inline-flex items-center gap-1 rounded-lg bg-sky-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-sky-700"
        >
          <Play className="h-4 w-4" />
          {state === "idle" ? "再生" : "再開"}
        </button>
      ) : (
        <button
          type="button"
          onClick={pause}
          className="inline-flex items-center gap-1 rounded-lg border border-sky-300 bg-white px-3 py-1.5 text-sm font-medium text-sky-700 transition hover:bg-sky-50 dark:border-sky-700 dark:bg-zinc-950 dark:text-sky-200"
        >
          <Pause className="h-4 w-4" />
          一時停止
        </button>
      )}
      {state !== "idle" && (
        <button
          type="button"
          onClick={stop}
          className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300"
        >
          <Square className="h-4 w-4" />
          停止
        </button>
      )}
      <label className={cn("ml-auto inline-flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400")}>
        速度
        <input
          type="range"
          min={0.5}
          max={2.0}
          step={0.1}
          value={rate}
          onChange={(e) => updateRate(Number(e.target.value))}
          aria-label="再生速度"
          className="w-24"
        />
        <span className="w-10 tabular-nums">×{rate.toFixed(1)}</span>
      </label>
    </div>
  );
}
