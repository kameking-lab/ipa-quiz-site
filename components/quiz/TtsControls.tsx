"use client";

import * as React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

const SPEEDS = [0.75, 1.0, 1.25, 1.5, 2.0] as const;

interface TtsControlsProps {
  text: string;
}

export function TtsControls({ text }: TtsControlsProps) {
  const [supported, setSupported] = React.useState(false);
  const [speaking, setSpeaking] = React.useState(false);
  const [speedIdx, setSpeedIdx] = React.useState(1);

  React.useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    };
  }, []);

  React.useEffect(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [text, supported]);

  const speak = React.useCallback(
    (rate: number) => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "ja-JP";
      u.rate = rate;
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(u);
      setSpeaking(true);
    },
    [text],
  );

  const handleToggle = React.useCallback(() => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } else {
      speak(SPEEDS[speedIdx]);
    }
  }, [speaking, speak, speedIdx]);

  const handleSpeedCycle = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const next = (speedIdx + 1) % SPEEDS.length;
      setSpeedIdx(next);
      if (speaking) {
        window.speechSynthesis.cancel();
        speak(SPEEDS[next]);
      }
    },
    [speedIdx, speaking, speak],
  );

  if (!supported) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleToggle}
        aria-label={speaking ? "読み上げ停止" : "読み上げ"}
        className={cn(
          "flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors",
          speaking
            ? "border-sky-400 bg-sky-50 text-sky-700 dark:border-sky-600 dark:bg-sky-950/30 dark:text-sky-300"
            : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600",
        )}
      >
        {speaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
        読み上げ
      </button>
      <button
        onClick={handleSpeedCycle}
        aria-label="再生速度切替"
        className="rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600"
      >
        ×{SPEEDS[speedIdx].toFixed(2)}
      </button>
    </div>
  );
}
