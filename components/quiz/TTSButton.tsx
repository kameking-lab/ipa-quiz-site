"use client";

import * as React from "react";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { observeSpeech, type SpeechOutput } from "./read-aloud";

const RATE_KEY = "ipa-quiz:tts-rate:v1";
const START_TIMEOUT_MS = 4000;
const unavailable = new WeakMap<object, Set<string>>();
const availabilityChanged = new EventTarget();
let stopActive: (() => void) | null = null;

interface Props {
  text: string;
  lang?: string;
  className?: string;
  label?: string;
}

export function TTSButton({ text, lang = "ja-JP", className, label = "読み上げ" }: Props) {
  const [output, setOutput] = React.useState<SpeechOutput | null>(null);
  const [phase, setPhase] = React.useState<"idle" | "pending" | "speaking">("idle");
  const [rate, setRate] = React.useState(1);
  const [showRate, setShowRate] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const stopOwn = React.useRef<(() => void) | null>(null);

  React.useEffect(() => {
    let candidate: SpeechOutput | null = null;
    const refresh = () => {
      const available = candidate && !unavailable.get(candidate.engine)?.has(lang) ? candidate : null;
      if (!available) stopOwn.current?.();
      setOutput(available);
    };
    setOutput(null);
    availabilityChanged.addEventListener("change", refresh);
    const unsubscribe = observeSpeech(lang, voice => { candidate = voice; refresh(); });
    return () => {
      unsubscribe?.();
      availabilityChanged.removeEventListener("change", refresh);
    };
  }, [lang]);

  React.useEffect(() => {
    try {
      const stored = Number(window.localStorage.getItem(RATE_KEY));
      if (stored >= 0.5 && stored <= 2) setRate(stored);
    } catch { /* Optional preference. */ }
  }, []);

  React.useEffect(() => {
    setError(null);
    const stop = () => stopOwn.current?.();
    window.addEventListener("pagehide", stop);
    return () => {
      window.removeEventListener("pagehide", stop);
      stop();
    };
  }, [text, lang]);

  function startReading(speed: number) {
    if (!output) return;
    stopActive?.();
    const chunks = output.chunks(text, speed);
    if (!chunks.length) return;
    let timer: number;
    let index = 0;
    const release = () => {
      window.clearTimeout(timer);
      stopActive = null;
      stopOwn.current = null;
      setPhase("idle");
    };
    const stop = () => {
      if (stopOwn.current !== stop) return;
      release(); // Ignore cancellation callbacks even if the browser delivers them synchronously.
      try { output.stop(); } catch { setError("読み上げを停止できませんでした。"); }
    };
    const hide = () => {
      stop();
      const languages = unavailable.get(output.engine) ?? new Set<string>();
      unavailable.set(output.engine, languages.add(lang));
      availabilityChanged.dispatchEvent(new Event("change"));
    };
    const speakChunk = () => {
      const part = index;
      const current = () => stopOwn.current === stop && index === part;
      let started = false;
      timer = window.setTimeout(() => { if (current()) hide(); }, START_TIMEOUT_MS);
      try {
        output.speak(chunks[index], speed, {
          started() {
            if (!current()) return;
            started = true;
            window.clearTimeout(timer);
            setPhase("speaking");
          },
          finished() {
            if (!current()) return;
            if (!started) { hide(); return; }
            window.clearTimeout(timer);
            if (++index < chunks.length) speakChunk();
            else release();
          },
          failed() {
            if (!current()) return;
            if (!started) { hide(); return; }
            release();
            setError("読み上げに失敗しました。もう一度お試しください。");
          },
          canceled() { if (current()) release(); },
        });
      } catch {
        if (current()) hide();
      }
    };
    stopOwn.current = stopActive = stop;
    setError(null);
    setPhase("pending");
    speakChunk(); // First speak stays inside the activating click or rate change.
  }

  const speaking = phase !== "idle";
  const handleClick = () => {
    if (stopOwn.current) stopOwn.current();
    else startReading(rate);
  };
  const updateRate = (r: number) => {
    setRate(r);
    try { window.localStorage.setItem(RATE_KEY, String(r)); } catch { /* Optional preference. */ }
    if (stopOwn.current) startReading(r);
  };

  if (!output || !text.trim()) return null;

  return (
    <details className="mt-2 text-sm text-muted-foreground">
      <summary className="min-h-11 cursor-pointer py-3">表示と読み上げ</summary>
      <div className={cn("relative inline-flex items-center gap-1", className)}>
        <button
          type="button"
          onClick={handleClick}
          aria-pressed={speaking}
          aria-label={speaking ? "読み上げを停止" : label}
          className={cn(
            "inline-flex min-h-11 items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium transition",
            speaking
              ? "border-sky-400 bg-sky-50 text-sky-700 dark:border-sky-700 dark:bg-sky-950/40 dark:text-sky-200"
              : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800",
          )}
        >
          {phase === "pending" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : speaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
          {speaking ? "停止" : label}
        </button>
        <button
          type="button"
          onClick={() => setShowRate((v) => !v)}
          aria-expanded={showRate}
          aria-label="読み上げ速度設定"
          className="min-h-11 min-w-11 rounded-md border border-zinc-200 bg-white px-1.5 py-1 text-[10px] text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          ×{rate.toFixed(2)}
        </button>
        {error && <span role="status" className="text-xs text-red-700 dark:text-red-300">{error}</span>}
        {showRate && (
          <div className="absolute right-0 top-full z-30 mt-2 flex flex-col gap-1 rounded-lg border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
            <span className="text-[10px] text-zinc-500">速度</span>
            <input
              type="range"
              min={0.5}
              max={2.0}
              step={0.1}
              value={rate}
              onChange={(e) => updateRate(Number(e.target.value))}
              aria-label="読み上げ速度"
              className="min-h-11 w-32"
            />
            <div className="flex justify-between text-[9px] text-zinc-400">
              <span>0.5×</span>
              <span>{rate.toFixed(1)}×</span>
              <span>2.0×</span>
            </div>
          </div>
        )}
      </div>
    </details>
  );
}
