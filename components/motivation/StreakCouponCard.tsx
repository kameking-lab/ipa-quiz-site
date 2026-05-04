"use client";

import * as React from "react";
import { Copy, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ensureCouponForStreak, type CouponState } from "@/lib/motivation/coupon";
import { readStreak } from "@/lib/streak/storage";

interface Props {
  variant?: "compact" | "full";
}

export function StreakCouponCard({ variant = "full" }: Props) {
  const [coupon, setCoupon] = React.useState<CouponState | null>(null);
  const [revealed, setRevealed] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [longest, setLongest] = React.useState(0);

  React.useEffect(() => {
    const s = readStreak();
    const { state } = ensureCouponForStreak(s.currentStreak, s.longestStreak);
     
    setCoupon(state);
    setLongest(s.longestStreak);
  }, []);

  if (!coupon) {
    if (variant === "compact") return null;
    return (
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-start gap-2">
          <Crown className="mt-0.5 h-4 w-4 text-amber-500" />
          <div>
            <p className="font-semibold">30日連続達成バッジ</p>
            <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
              30日連続学習を達成するとバッジが付与されます。最高連続: {longest}日
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleCopy = async () => {
    const nav = (typeof navigator !== "undefined" ? navigator : null) as
      | (Navigator & { clipboard?: { writeText: (s: string) => Promise<void> } })
      | null;
    try {
      await nav?.clipboard?.writeText(coupon.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const issuedDate = new Date(coupon.issuedAt);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-5 shadow-sm dark:border-amber-700/60 dark:from-amber-950/40 dark:via-yellow-950/40 dark:to-orange-950/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-gradient-to-br from-amber-400/40 to-orange-400/40 blur-2xl"
      />
      <div className="relative">
        <div className="mb-2 flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow">
            <Crown className="h-4 w-4" />
          </span>
          <div className="flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
              30日連続達成記念
            </p>
            <h3 className="text-base font-bold text-amber-950 dark:text-amber-50">
              30日連続達成バッジ
            </h3>
          </div>
          {coupon.redeemed && (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200">
              使用済み
            </span>
          )}
        </div>

        <div className="my-3 rounded-xl border border-dashed border-amber-300 bg-white/70 p-3 text-center dark:border-amber-700/60 dark:bg-zinc-900/70">
          {revealed ? (
            <div className="flex items-center justify-between gap-2">
              <code className="font-mono text-base font-bold tracking-wider text-amber-900 dark:text-amber-100">
                {coupon.code}
              </code>
              <Button variant="outline" size="sm" className="gap-1" onClick={handleCopy}>
                <Copy className="h-3.5 w-3.5" />
                {copied ? "コピー済" : "コピー"}
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              className="w-full gap-2"
              onClick={() => setRevealed(true)}
            >
              <Sparkles className="h-4 w-4" />
              クーポンコードを表示
            </Button>
          )}
        </div>

        <p className="text-[11px] text-amber-800 dark:text-amber-200">
          発行日: {issuedDate.getFullYear()}/{issuedDate.getMonth() + 1}/{issuedDate.getDate()}
          {" · "}30日達成のご褒美
        </p>

        {variant === "full" && (
          <p className="mt-3 text-[11px] text-zinc-600 dark:text-zinc-400">
            本サービスはボランティア有志運営の教育貢献プロジェクトのため、本バッジは記念表示のみです。
          </p>
        )}
      </div>
    </div>
  );
}
