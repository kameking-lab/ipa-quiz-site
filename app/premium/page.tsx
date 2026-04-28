import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  FileEdit,
  Gauge,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Premium 機能 — 過去問AI",
  description:
    "弱点ヒートマップ・合格判定シミュレータ・AI論述添削など、Premium会員が使える高度な学習支援機能。",
  alternates: { canonical: "/premium" },
};

const FEATURES = [
  {
    href: "/premium/heatmap",
    icon: BarChart3,
    title: "弱点ヒートマップ",
    desc: "全試験区分×全分野の正答率を可視化。苦手分野を一目で特定し、その場で集中演習に進めます。",
    badge: "可視化",
  },
  {
    href: "/premium/simulator",
    icon: Gauge,
    title: "合格判定シミュレータ",
    desc: "試験日と志望区分から、現在の実力で合格できる確率と、1日あたりの目標問題数を算出します。",
    badge: "学習計画",
  },
  {
    href: "/premium/essay",
    icon: FileEdit,
    title: "AI 論述添削",
    desc: "ST/SA/PM/SM/AU の高度区分 午後II 論述を AI が採点・添削。観点別5段階評価＋具体的な書き換え提案。",
    badge: "高度区分",
  },
];

export default function PremiumHomePage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-12">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" /> ホームに戻る
        </Link>
      </Button>

      <div className="mb-8">
        <Badge variant="soft" className="mb-3">
          <Sparkles className="h-3 w-3" />
          Premium 機能
        </Badge>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            合格までの最短ルートを、データで描く。
          </span>
        </h1>
        <p className="mt-3 max-w-2xl text-pretty text-sm text-muted-foreground sm:text-base">
          Premium 会員が使える3つの高度な学習支援機能。
          ヒートマップで弱点を特定し、シミュレータで合格確率を読み、AIで論述まで磨く。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <Link
              key={f.href}
              href={f.href}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-xl bg-primary-soft p-2.5 text-primary-soft-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <Badge variant="outline" className="text-[10px]">
                  {f.badge}
                </Badge>
              </div>
              <h2 className="mb-1.5 text-base font-bold text-foreground">
                {f.title}
              </h2>
              <p className="flex-1 text-xs leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
              <div className="mt-3 flex items-center text-xs font-medium text-primary">
                試す
                <ArrowRight className="ml-1 h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}
      </div>

      <section className="mt-10 rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-2 text-base font-semibold text-foreground">
          Premium 全機能（β中は全ユーザー無料公開）
        </h2>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>• 弱点ヒートマップ・合格判定シミュレータ・AI論述添削</li>
          <li>• AI コパイロット 月 15,000 回 (Free 月 1,500 回)</li>
          <li>• 学習プラン自動生成（試験日から逆算）</li>
          <li>• 模擬試験モード・間隔反復学習・クラウド同期</li>
          <li>• 広告非表示</li>
        </ul>
        <div className="mt-4">
          <Button asChild variant="primary" size="sm">
            <Link href="/pricing">
              料金プランを見る
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
