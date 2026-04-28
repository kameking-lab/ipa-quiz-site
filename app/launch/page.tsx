import type { Metadata } from "next";
import Link from "next/link";
import { Rocket, CheckCircle2, Clock, Sparkles, Shield, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CountdownTimer } from "./CountdownTimer";
import { PreRegisterForm } from "./PreRegisterForm";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://ipa-quiz-site.vercel.app");

export const metadata: Metadata = {
  title: "正式リリース — 2026年5月",
  description:
    "IPA Quiz が2026年5月に正式リリース。AIコパイロット付き過去問学習プラットフォームが全機能フル公開。事前登録で最新情報をお届けします。",
  alternates: { canonical: "/launch" },
  openGraph: {
    title: "IPA Quiz — 2026年5月 正式リリース",
    description:
      "全13試験区分・12,000問以上のIPA過去問をAIコパイロット付きで学習。2026年5月正式リリース。",
    type: "website",
    locale: "ja_JP",
    siteName: "IPA Quiz",
    url: `${BASE_URL}/launch`,
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "IPA Quiz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IPA Quiz — 2026年5月 正式リリース",
    description: "全13区分のIPA過去問をAIコパイロット付きで学習。2026年5月正式リリース。",
  },
};

const ROADMAP = [
  {
    icon: <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
    phase: "完了",
    title: "MVP β公開",
    items: ["応用情報 午前問題 収録", "ゼロ遷移クイズUI", "AI コパイロット（Gemini）", "ランダム・年度別・分野別・復習モード"],
    done: true,
  },
  {
    icon: <Rocket className="h-5 w-5 text-sky-600 dark:text-sky-400" />,
    phase: "2026年5月",
    title: "正式リリース",
    items: ["全13試験区分 午前問題フル収録", "模試モード（全問/半分/20問）", "学習履歴クラウド同期", "段級ランキング"],
    done: false,
  },
  {
    icon: <Clock className="h-5 w-5 text-zinc-400" />,
    phase: "2026年下半期",
    title: "フェーズ3 — 午後AI採点",
    items: ["午後記述問題AI採点（AP/DB/NW/SC）", "弱点マップ・学習プラン自動生成", "CSV エクスポート", "タグ横断弱点分析"],
    done: false,
  },
  {
    icon: <Clock className="h-5 w-5 text-zinc-400" />,
    phase: "2027年以降",
    title: "フェーズ4 — 論文添削・課金",
    items: ["論文添削AI（ST/PM/SA/AU）", "Stripe 決済（月300円 Premium）", "参考書アフィリエイト", "法人チームプラン"],
    done: false,
  },
];

export default function LaunchPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-12 pt-8 sm:px-6">
      {/* Hero */}
      <section className="mb-10 text-center">
        <div className="mb-3 flex justify-center">
          <Badge variant="success">正式リリース予告</Badge>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          2026年5月、正式リリース
        </h1>
        <p className="mb-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          IPA Quiz が全13試験区分・12,000問以上を揃えて正式公開します。
          <br />
          AIコパイロットと一緒に、合格への最短ルートを走りましょう。
        </p>
        <CountdownTimer />
      </section>

      {/* Pre-register */}
      <Card className="mb-10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            リリース通知を受け取る
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            正式リリース時にメールでお知らせします。登録解除はいつでも可能です。
          </p>
          <PreRegisterForm />
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            メールアドレスはリリース通知のみに使用します。{" "}
            <Link href="/privacy" className="underline hover:text-zinc-900 dark:hover:text-zinc-100">
              プライバシーポリシー
            </Link>
          </p>
        </CardContent>
      </Card>

      {/* Roadmap */}
      <section className="mb-10">
        <h2 className="mb-5 text-lg font-bold text-zinc-900 dark:text-zinc-50">
          ロードマップ
        </h2>
        <div className="space-y-4">
          {ROADMAP.map((r) => (
            <div
              key={r.phase}
              className={`rounded-2xl border p-4 ${
                r.done
                  ? "border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/40 dark:bg-emerald-950/20"
                  : r.phase === "2026年5月"
                  ? "border-sky-200 bg-sky-50/40 ring-2 ring-sky-200/60 dark:border-sky-800 dark:bg-sky-950/20 dark:ring-sky-800/40"
                  : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40"
              }`}
            >
              <div className="mb-2 flex items-center gap-2">
                {r.icon}
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{r.phase}</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{r.title}</span>
                {r.done && <Badge variant="success" className="text-[10px]">完了</Badge>}
              </div>
              <ul className="ml-7 space-y-1">
                {r.items.map((item) => (
                  <li key={item} className="text-xs text-zinc-600 dark:text-zinc-400 before:mr-1.5 before:content-['·']">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Key features */}
      <section className="mb-10">
        <h2 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-50">
          IPA Quiz でできること
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: <Sparkles className="h-5 w-5" />, title: "AI コパイロット", desc: "分からない問題は即座にAIへ質問。用語解説・選択肢分析・類題生成。" },
            { icon: <Shield className="h-5 w-5" />, title: "全13試験区分", desc: "IP/SG/FE/AP/ST/SA/PM/NW/DB/ES/SC/SM/AU すべてに対応。" },
            { icon: <Users className="h-5 w-5" />, title: "ゼロ遷移 UI", desc: "解答→解説→次の問題を画面遷移なしで。モバイル片手操作完結。" },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/40"
            >
              <span className="mb-2 inline-flex rounded-lg bg-sky-100 p-2 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                {f.icon}
              </span>
              <h3 className="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{f.title}</h3>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center">
        <Link
          href="/"
          className="text-sm text-sky-600 underline-offset-2 hover:underline dark:text-sky-400"
        >
          ← ホームに戻る（βは今すぐ使えます）
        </Link>
      </div>
    </main>
  );
}
