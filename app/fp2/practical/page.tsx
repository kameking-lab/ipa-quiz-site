import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck } from "lucide-react";
import { FP2_PRACTICAL_EDITIONS, getPracticalEdition } from "@/lib/fp2/practical";

export const metadata: Metadata = {
  title: "FP2級 実技試験の過去問と模範解答",
  description: "日本FP協会公表のFP2級実技試験を2024年・2025年・2026年の5セット、200問収録。設問と公式模範解答を回ごとに確認できます。",
  alternates: { canonical: "/fp2/practical" },
};

export default function Fp2PracticalHome() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <nav className="mb-5 text-sm text-muted-foreground"><Link href="/fp2" className="hover:underline">FP2級</Link> / 実技</nav>
      <h1 className="text-3xl font-bold text-foreground">FP2級 実技の過去問</h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">日本FP協会が公表した2024年・2025年・2026年の全5セット、各40問。計算、複数の空欄、○×問題も公式模範解答の単位と組合せを保って掲載しています。</p>
      <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted-foreground"><span>{FP2_PRACTICAL_EDITIONS.length}セット</span><span>・</span><span>{FP2_PRACTICAL_EDITIONS.reduce((sum, edition) => sum + (getPracticalEdition(edition)?.questions.length ?? 0), 0)}問</span></div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {FP2_PRACTICAL_EDITIONS.map((edition) => {
          const data = getPracticalEdition(edition)!;
          return (
            <Link key={edition} href={`/fp2/practical/${edition}`} className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/50 hover:shadow-md">
              <BookOpenCheck className="mb-3 h-6 w-6 text-primary" />
              <div className="flex items-center justify-between gap-2"><h2 className="text-lg font-semibold">{data.label}</h2><ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></div>
              <p className="mt-1 text-sm text-muted-foreground">実技 {data.questions.length}問 · 法令基準日 {data.lawReferenceDate}</p>
            </Link>
          );
        })}
      </div>
      <p className="mt-8 text-xs leading-relaxed text-muted-foreground">出典：日本FP協会 2級ファイナンシャル・プランニング技能検定 実技試験（資産設計提案業務）。問題文は改行・空白を整え、資料のレイアウトを画像でも示しています。採点配点は協会非公表のため自己採点は参考です。</p>
    </main>
  );
}
