"use client";

import * as React from "react";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const RATE_KEY = "ipa-quiz:tts-rate:v1";

interface ActiveReading {
  utterance: SpeechSynthesisUtterance;
  release: () => void;
}
// Ownership among this module's buttons only. Explicit play still replaces the
// browser speech queue; unrelated lifecycle cleanup must not cancel that queue.
let activeReading: ActiveReading | null = null;

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
  const [error, setError] = React.useState<string | null>(null);
  const readingRef = React.useRef<ActiveReading | null>(null);

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

  // Invalidate handlers before cancel: browsers may deliver cancellation events later.
  const cancelCurrent = React.useCallback(() => {
    const reading = readingRef.current;
    if (!reading) return;
    const ownsSpeech = activeReading === reading;
    if (ownsSpeech) activeReading = null;
    reading.release();
    if (ownsSpeech) window.speechSynthesis?.cancel();
  }, []);

  React.useEffect(() => {
    setSpeaking(false);
    setError(null);
    try { cancelCurrent(); } catch { /* A failed stop must not strand the control. */ }
    return () => { try { cancelCurrent(); } catch { /* Browser teardown. */ } };
  }, [text, lang, cancelCurrent]);

  const startReading = React.useCallback((speed: number) => {
    setError(null);
    setSpeaking(false);
    let reading: ActiveReading | null = null;
    try {
      const previous = activeReading;
      activeReading = null;
      previous?.release();
      readingRef.current?.release();
      window.speechSynthesis.cancel();
      const u = new window.SpeechSynthesisUtterance(text);
      u.lang = lang;
      u.rate = speed;
      const current: ActiveReading = { utterance: u, release: () => {
        if (readingRef.current !== current) return;
        readingRef.current = null;
        setSpeaking(false);
      } };
      reading = current;
      const finish = (failed: boolean) => {
        if (readingRef.current !== current) return;
        if (activeReading === current) activeReading = null;
        current.release();
        if (failed) setError("読み上げに失敗しました。もう一度お試しください。");
      };
      u.onend = () => finish(false);
      u.onerror = (event) => finish(event.error !== "interrupted" && event.error !== "canceled");
      readingRef.current = current;
      activeReading = current;
      setSpeaking(true);
      window.speechSynthesis.speak(u);
    } catch {
      if (reading && activeReading === reading) activeReading = null;
      reading?.release();
      setSpeaking(false);
      setError("読み上げに失敗しました。もう一度お試しください。");
    }
  }, [text, lang]);

  const handleClick = React.useCallback(() => {
    if (!isTTSAvailable()) return;
    if (speaking) {
      try { cancelCurrent(); setError(null); }
      catch { setError("読み上げを停止できませんでした。もう一度お試しください。"); }
      setSpeaking(false);
    } else startReading(rate);
  }, [speaking, rate, cancelCurrent, startReading]);

  const updateRate = (r: number) => {
    setRate(r);
    try { window.localStorage.setItem(RATE_KEY, String(r)); } catch { /* Optional preference. */ }
    if (speaking && isTTSAvailable()) startReading(r);
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
      {error && <span role="status" className="text-xs text-red-700 dark:text-red-300">{error}</span>}
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
