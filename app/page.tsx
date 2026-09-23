import { ChihuahuaMascot } from "@/components/ChihuahuaMascot";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Monitor, HardHat, Landmark } from "lucide-react";
import { TotalAnswerCounter } from "@/components/home/TotalAnswerCounter";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildOrgNode, buildWebsiteNode } from "@/lib/seo/structured-data";

const title = "IPA・安全衛生・FPの過去問を無料で学習 — 過去問AI";
const description = "IPA情報処理技術者試験、安全衛生、FP2級・FP3級の公式公開過去問を無料で学習。選択肢を押して解答し、公式正答やAIによる各選択肢の学習用解説を確認できます。";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  openGraph: { title, description, url: "/" },
  twitter: { title, description },
};

const categories = [
  { name: "IPA", description: "情報処理技術者試験", examples: "ITパスポート・基本情報・応用情報など", href: "/ipa", icon: Monitor, color: "border-sky-300 bg-sky-50 hover:border-sky-500 dark:border-sky-700 dark:bg-sky-950/40", iconColor: "text-sky-700 dark:text-sky-300" },
  { name: "安全", description: "安全衛生の資格試験", examples: "衛生管理者・ボイラー技士・作業環境測定士など", href: "/e-learning/exams", icon: HardHat, color: "border-emerald-300 bg-emerald-50 hover:border-emerald-500 dark:border-emerald-700 dark:bg-emerald-950/40", iconColor: "text-emerald-700 dark:text-emerald-300" },
];

export default function HomePage() {
  return <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-5 sm:px-6 sm:py-10">
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [buildWebsiteNode(description), buildOrgNode()] }} />
    <div className="mb-3 flex justify-center"><ChihuahuaMascot size={72} alt="一緒に学ぶチワワ" /></div>
    <h1 className="text-center text-2xl font-bold sm:text-3xl">学習する試験を選ぶ</h1>
    <p className="mb-5 mt-3 text-center text-sm text-muted-foreground">分野を選んで、公式公開過去問の学習を始めましょう。</p>
    <nav aria-label="IPAか安全を選ぶ" className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {categories.map(({ name, description, examples, href, icon: Icon, color, iconColor }) => <Link key={name} href={href} className={`flex min-h-48 flex-col items-center justify-center rounded-3xl border-2 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary sm:min-h-72 ${color}`}>
        <Icon className={`mb-3 h-10 w-10 ${iconColor}`} aria-hidden="true" />
        <span className="text-4xl font-bold sm:text-5xl">{name}</span>
        <span className="mt-3 font-semibold">{description}</span>
        <span className="mt-2 text-xs text-muted-foreground sm:text-sm">{examples}</span>
        <span className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${iconColor}`}>資格を選ぶ<ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
      </Link>)}
    </nav>
    <section aria-labelledby="other-qualifications" className="mt-6">
      <h2 id="other-qualifications" className="mb-2 text-sm font-semibold text-muted-foreground">その他の資格・金融</h2>
      <Link href="/qualifications" className="flex items-center gap-4 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 shadow-sm transition hover:border-amber-500 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary dark:border-amber-700 dark:bg-amber-950/40">
        <Landmark className="h-8 w-8 shrink-0 text-amber-700 dark:text-amber-300" aria-hidden="true" />
        <span className="min-w-0 flex-1">
          <span className="block font-bold">FP2級・FP3級</span>
          <span className="block text-sm text-muted-foreground">公式公開問題を選択肢ごとの解説付きで学習</span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-amber-700 dark:text-amber-300">一覧へ<ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
      </Link>
    </section>
    <div className="mt-8"><TotalAnswerCounter /></div>
  </main>;
}
