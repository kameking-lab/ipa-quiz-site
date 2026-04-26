"use client";

import * as React from "react";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const RATE_KEY = "ipa-quiz:tts-rate:v1";

interface Props {
  text: string;
  lang?: string;
  className?: string;
  label?: string;
}

function isTTSAvailable(): boolean {
  if (typeof window === "undefined") return false;
  return typeof window.speechSynthesis !== "undefined" && typeof window.SpeechSynthesisUtterance !== "undefined";
}

export function TTSButton({ text, lang = "ja-JP", className, label = "読み上げ" }: Props) {
  const [supported, setSupported] = React.useState<boolean | null>(null);
  const [speaking, setSpeaking] = React.useState(false);
  const [rate, setRate] = React.useState(1.0);
  const [showRate, setShowRate] = React.useState(false);
  const utteranceRef = React.useRef<SpeechSynthesisUtterance | null>(null);

  React.useEffect(() => {
    setSupported(isTTSAvailable());
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

  const handleClick = React.useCallback(() => {
    if (!isTTSAvailable()) return;
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = rate;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    utteranceRef.current = u;
    setSpeaking(true);
    synth.speak(u);
  }, [text, lang, rate, speaking]);

  const updateRate = (r: number) => {
    setRate(r);
    try {
      window.localStorage.setItem(RATE_KEY, String(r));
    } catch {
      // ignore
    }
    if (speaking && isTTSAvailable()) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      u.rate = r;
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      utteranceRef.current = u;
      window.speechSynthesis.speak(u);
    }
  };

  if (supported === null) {
    return (
      <button
        type="button"
        disabled
        className={cn("inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-zinc-400", className)}
      >
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        {label}
      </button>
    );
  }

  if (!supported) {
    return (
      <span className={cn("inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-zinc-400", className)}>
        <VolumeX className="h-3.5 w-3.5" />
        読み上げ非対応
      </span>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={speaking}
        aria-label={speaking ? "読み上げを停止" : label}
        className={cn(
          "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium transition",
          speaking
            ? "border-sky-400 bg-sky-50 text-sky-700 dark:border-sky-700 dark:bg-sky-950/40 dark:text-sky-200"
            : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800",
        )}
      >
        {speaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
        {speaking ? "停止" : label}
      </button>
      <button
        type="button"
        onClick={() => setShowRate((v) => !v)}
        aria-expanded={showRate}
        aria-label="読み上げ速度設定"
        className="rounded-md border border-zinc-200 bg-white px-1.5 py-1 text-[10px] text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
      >
        ×{rate.toFixed(2)}
      </button>
      {showRate && (
        <div className="absolute z-30 mt-8 flex flex-col gap-1 rounded-lg border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
          <span className="text-[10px] text-zinc-500">速度</span>
          <input
            type="range"
            min={0.5}
            max={2.0}
            step={0.1}
            value={rate}
            onChange={(e) => updateRate(Number(e.target.value))}
            aria-label="読み上げ速度"
            className="w-32"
          />
          <div className="flex justify-between text-[9px] text-zinc-400">
            <span>0.5×</span>
            <span>{rate.toFixed(1)}×</span>
            <span>2.0×</span>
          </div>
        </div>
      )}
    </div>
  );
}
