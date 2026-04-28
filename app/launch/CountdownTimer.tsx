"use client";

import * as React from "react";

const LAUNCH_DATE = new Date("2026-05-01T00:00:00+09:00");

function useCountdown() {
  const [diff, setDiff] = React.useState<number | null>(null);

  React.useEffect(() => {
    const tick = () => setDiff(Math.max(0, LAUNCH_DATE.getTime() - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (diff === null) return null;

  const totalSecs = Math.floor(diff / 1000);
  const days = Math.floor(totalSecs / 86400);
  const hours = Math.floor((totalSecs % 86400) / 3600);
  const minutes = Math.floor((totalSecs % 3600) / 60);
  const seconds = totalSecs % 60;
  return { days, hours, minutes, seconds };
}

function Block({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-sky-100 bg-sky-50/60 px-4 py-3 dark:border-sky-900/40 dark:bg-sky-950/20 sm:px-6">
      <span className="text-3xl font-bold tabular-nums text-sky-700 dark:text-sky-300 sm:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[10px] text-zinc-500 dark:text-zinc-400">{label}</span>
    </div>
  );
}

export function CountdownTimer() {
  const t = useCountdown();
  if (!t) return null;
  if (t.days === 0 && t.hours === 0 && t.minutes === 0 && t.seconds === 0) {
    return (
      <p className="text-center text-lg font-bold text-sky-600 dark:text-sky-400">
        正式リリースしました！
      </p>
    );
  }
  return (
    <div className="flex justify-center gap-3">
      <Block value={t.days} label="日" />
      <Block value={t.hours} label="時間" />
      <Block value={t.minutes} label="分" />
      <Block value={t.seconds} label="秒" />
    </div>
  );
}
