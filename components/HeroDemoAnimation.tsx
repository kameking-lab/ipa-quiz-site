"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";

const DEMOS = [
  {
    question: "「割り込み」って何ですか？",
    answer:
      "CPUが実行中の処理を一時停止して、優先度の高い処理に切り替えるしくみです。タイマー・I/O完了・障害検出などがトリガーになります。",
  },
  {
    question: "AESとRSAの違いを簡単に教えて",
    answer:
      "AESは共通鍵暗号（同じ鍵で暗号化・復号）、RSAは公開鍵暗号（公開鍵で暗号化、秘密鍵で復号）です。AESは速度が速く、RSAは鍵交換に使われます。",
  },
  {
    question: "なぜ「ウ」が正解なんですか？",
    answer:
      "OSI参照モデルのトランスポート層は端末間の通信品質を保証する役割を担うからです。ア・イはネットワーク層、エはセッション層の説明です。",
  },
];

const TYPING_SPEED_Q = 55;
const TYPING_SPEED_A = 20;
const PAUSE_AFTER = 3200;

export function HeroDemoAnimation() {
  const [demoIdx, setDemoIdx] = React.useState(0);
  const [qText, setQText] = React.useState("");
  const [aText, setAText] = React.useState("");
  const [phase, setPhase] = React.useState<"typing-q" | "waiting" | "typing-a" | "pause">(
    "typing-q",
  );
  const demo = DEMOS[demoIdx];

  React.useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing-q") {
      if (qText.length < demo.question.length) {
        t = setTimeout(
          () => setQText(demo.question.slice(0, qText.length + 1)),
          TYPING_SPEED_Q,
        );
      } else {
        t = setTimeout(() => setPhase("waiting"), 600);
      }
    } else if (phase === "waiting") {
      t = setTimeout(() => setPhase("typing-a"), 400);
    } else if (phase === "typing-a") {
      if (aText.length < demo.answer.length) {
        t = setTimeout(
          () => setAText(demo.answer.slice(0, aText.length + 1)),
          TYPING_SPEED_A,
        );
      } else {
        t = setTimeout(() => setPhase("pause"), PAUSE_AFTER);
      }
    } else {
      t = setTimeout(() => {
        setQText("");
        setAText("");
        setDemoIdx((i) => (i + 1) % DEMOS.length);
        setPhase("typing-q");
      }, 400);
    }
    return () => clearTimeout(t);
  }, [phase, qText, aText, demo]);

  return (
    <div className="my-5 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/80 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="flex items-center gap-1.5 border-b border-zinc-200 bg-white px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
        <span className="ml-2 flex items-center gap-1 text-[10px] font-medium text-zinc-400">
          <Sparkles className="h-2.5 w-2.5" />
          AI コパイロット — ライブデモ
        </span>
      </div>
      <div className="min-h-[90px] space-y-3 p-4">
        {qText && (
          <div className="ml-8 rounded-xl bg-sky-50 px-3 py-2 text-sm text-sky-900 dark:bg-sky-950/50 dark:text-sky-100">
            {qText}
            {phase === "typing-q" && (
              <span className="ml-0.5 inline-block h-[14px] w-[2px] translate-y-0.5 animate-pulse bg-sky-500" />
            )}
          </div>
        )}
        {aText && (
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 flex-shrink-0 rounded-full bg-sky-100 p-1 dark:bg-sky-900/60">
              <Sparkles className="h-3 w-3 text-sky-600 dark:text-sky-400" />
            </span>
            <div className="flex-1 rounded-xl bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm ring-1 ring-zinc-200/60 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700/60">
              {aText}
              {phase === "typing-a" && (
                <span className="ml-0.5 inline-block h-[14px] w-[2px] translate-y-0.5 animate-pulse bg-zinc-500" />
              )}
            </div>
          </div>
        )}
        {phase === "waiting" && (
          <div className="flex items-center gap-1 pl-10">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:0ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:120ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:240ms]" />
          </div>
        )}
      </div>
    </div>
  );
}
