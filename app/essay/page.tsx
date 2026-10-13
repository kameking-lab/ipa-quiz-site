import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";

const IPA_PAST_PAPERS = "https://www.ipa.go.jp/shiken/mondai-kaiotu/index.html";

const OFFICIAL_YEARS = [
  { year: "2025年度", href: "https://www.ipa.go.jp/shiken/mondai-kaiotu/2025r07.html" },
  { year: "2024年度", href: "https://www.ipa.go.jp/shiken/mondai-kaiotu/2024r06.html" },
  { year: "2023年度", href: "https://www.ipa.go.jp/shiken/mondai-kaiotu/2023r05.html" },
] as const;

export const metadata: Metadata = {
  title: "IPA 午後II 論述の公式過去問",
  description:
    "ITストラテジスト・システムアーキテクト・プロジェクトマネージャ・ITサービスマネージャ・システム監査技術者の午後II論述について、IPA公式の過去問題・解答例・採点講評をご案内します。",
  alternates: { canonical: "/essay" },
};

export default function EssayHomePage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-16 pt-8 sm:px-6">
      <nav aria-label="パンくずリスト" className="mb-5 text-xs text-muted-foreground">
        <Link href="/" className="hover:underline">ホーム</Link> / 午後II 論述の公式過去問
      </nav>

      <header className="mb-8">
        <div className="mb-3 flex items-center gap-2 text-sky-700 dark:text-sky-300">
          <BookOpen className="h-6 w-6" aria-hidden="true" />
          <span className="text-sm font-semibold">IPA 公式資料</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          午後II 論述の公式過去問
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          論述対策は、IPA が公表した実際の問題冊子・解答例・採点講評から始められます。
          年度ページを開き、受験する試験区分の「午後Ⅱ」を選んでください。
        </p>
      </header>

      <section aria-labelledby="official-years-heading" className="mb-8">
        <h2 id="official-years-heading" className="mb-3 text-lg font-semibold text-foreground">
          IPA 公式の問題冊子・解答例・採点講評
        </h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {OFFICIAL_YEARS.map(({ year, href }) => (
            <li key={year}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="flex h-full items-center justify-between rounded-xl border border-border bg-card p-4 text-sm font-medium text-foreground transition-colors hover:border-sky-400 hover:text-sky-700 dark:hover:text-sky-300">
                {year}の公式過去問
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          他の年度は{" "}
          <a href={IPA_PAST_PAPERS} target="_blank" rel="noopener noreferrer" className="font-medium text-sky-700 underline dark:text-sky-300">
            IPA の過去問題一覧
          </a>
          から確認できます。
        </p>
      </section>

      <p className="rounded-xl border border-border bg-muted/40 p-4 text-sm leading-relaxed text-muted-foreground">
        現在、このページでは論述の自動採点を受け付けていません。サイト内の問題検索では、出典を確認した過去問を探せます。{" "}
        <Link href="/search" className="font-medium text-sky-700 underline dark:text-sky-300">問題検索へ</Link>
      </p>
    </main>
  );
}
