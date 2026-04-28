"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PRESETS = [
  { name: "20 名", count: 20 },
  { name: "50 名", count: 50 },
  { name: "100 名", count: 100 },
  { name: "200 名", count: 200 },
];

const PER_SEAT_MONTHLY = 2500;
const DEFAULT_PASSRATE_BASE = 25;
const DEFAULT_PASSRATE_LIFT = 20;
const TIME_SAVED_HOURS_PER_MONTH = 4;
const HOURLY_RATE = 4500;

function yen(n: number) {
  return n.toLocaleString("ja-JP");
}

export function RoiCalculator() {
  const [seats, setSeats] = React.useState(20);
  const [baseRate, setBaseRate] = React.useState(DEFAULT_PASSRATE_BASE);
  const [lift, setLift] = React.useState(DEFAULT_PASSRATE_LIFT);

  const annualLicense = seats * PER_SEAT_MONTHLY * 12;
  const additionalPasses = Math.round(seats * (lift / 100));
  const timeSavingPerYen =
    seats * TIME_SAVED_HOURS_PER_MONTH * HOURLY_RATE * 12;
  const trainingDeductedYen = Math.max(timeSavingPerYen - annualLicense, 0);
  const newPassrate = Math.min(100, baseRate + lift);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-base">ROI 計算機</CardTitle>
          <Badge variant="outline">月額 {yen(PER_SEAT_MONTHLY)} 円 / 人 を仮定</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            利用人数
          </label>
          <div className="mb-2 flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                type="button"
                key={p.count}
                onClick={() => setSeats(p.count)}
                className={
                  seats === p.count
                    ? "rounded-full border border-sky-500 bg-sky-500 px-3 py-1 text-xs font-semibold text-white"
                    : "rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700 hover:border-sky-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
                }
              >
                {p.name}
              </button>
            ))}
          </div>
          <input
            type="range"
            min={5}
            max={500}
            step={5}
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
            className="w-full"
          />
          <div className="mt-1 text-right text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            {seats} 名
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              現状の合格率（%）
            </label>
            <input
              type="range"
              min={5}
              max={80}
              step={1}
              value={baseRate}
              onChange={(e) => setBaseRate(Number(e.target.value))}
              className="w-full"
            />
            <div className="mt-1 text-right text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              {baseRate}%
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              想定 合格率向上（pt）
            </label>
            <input
              type="range"
              min={5}
              max={40}
              step={1}
              value={lift}
              onChange={(e) => setLift(Number(e.target.value))}
              className="w-full"
            />
            <div className="mt-1 text-right text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              +{lift} pt
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4 dark:border-sky-800 dark:bg-sky-950/20">
            <div className="text-xs text-zinc-500 dark:text-zinc-400">年間ライセンス費用</div>
            <div className="mt-1 text-2xl font-bold tabular-nums text-sky-700 dark:text-sky-300">
              {yen(annualLicense)}
              <span className="ml-0.5 text-sm font-normal">円</span>
            </div>
            <div className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
              {yen(PER_SEAT_MONTHLY)} 円 × {seats} 名 × 12 ヶ月
            </div>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 dark:border-emerald-800 dark:bg-emerald-950/20">
            <div className="text-xs text-zinc-500 dark:text-zinc-400">合格率の見込み変化</div>
            <div className="mt-1 text-2xl font-bold tabular-nums text-emerald-700 dark:text-emerald-300">
              {baseRate}% → {newPassrate}%
            </div>
            <div className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
              想定追加合格者 +{additionalPasses} 名
            </div>
          </div>
          <div className="rounded-xl border border-violet-200 bg-violet-50/40 p-4 dark:border-violet-800 dark:bg-violet-950/20">
            <div className="text-xs text-zinc-500 dark:text-zinc-400">学習時間削減の金銭価値</div>
            <div className="mt-1 text-2xl font-bold tabular-nums text-violet-700 dark:text-violet-300">
              {yen(timeSavingPerYen)}
              <span className="ml-0.5 text-sm font-normal">円 / 年</span>
            </div>
            <div className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
              1 人 月 {TIME_SAVED_HOURS_PER_MONTH} 時間削減 × {yen(HOURLY_RATE)} 円 × {seats} 名
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            ライセンス費を差し引いた純価値（学習時間削減のみで計算）
          </div>
          <div className="mt-1 text-3xl font-bold tabular-nums text-zinc-900 dark:text-zinc-50">
            {yen(trainingDeductedYen)}
            <span className="ml-1 text-base font-normal">円 / 年</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            ※ 合格率向上による事業貢献（人材ローテーション促進・案件獲得力向上）は本計算から除外しています。
            実プロジェクトでは追加で年間数百万円規模の効果が見込まれます。
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
