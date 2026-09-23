import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { FP2_PRACTICAL_EDITIONS, getPracticalEdition, practicalSourceUrls } from "@/lib/fp2/practical";

export const dynamicParams = false;
export function generateStaticParams() {
  return FP2_PRACTICAL_EDITIONS.flatMap((edition) => Array.from({ length: 40 }, (_, index) => ({ edition, number: String(index + 1) })));
}

export async function generateMetadata({ params }: { params: Promise<{ edition: string; number: string }> }): Promise<Metadata> {
  const { edition, number } = await params;
  const data = getPracticalEdition(edition);
  const q = data?.questions.find((item) => item.number === Number(number));
  if (!q) return { title: "問題が見つかりません", robots: { index: false } };
  return { title: `FP2級 実技 ${data!.label} 問${q.number} 模範解答`, description: q.body.replace(/\s+/g, " ").slice(0, 140), alternates: { canonical: `/fp2/practical/${edition}/${q.number}` } };
}

export default async function Fp2PracticalQuestion({ params }: { params: Promise<{ edition: string; number: string }> }) {
  const { edition, number } = await params;
  const data = getPracticalEdition(edition);
  const q = data?.questions.find((item) => item.number === Number(number));
  if (!data || !q) notFound();
  const source = practicalSourceUrls(edition);
  const sourcePdfPage = `${source.question}#page=${q.sourcePage}`;
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <nav className="mb-5 text-sm text-muted-foreground"><Link href="/fp2" className="hover:underline">FP2級</Link> / <Link href="/fp2/practical" className="hover:underline">実技</Link> / <Link href={`/fp2/practical/${edition}`} className="hover:underline">{data.label}</Link> / 問{q.number}</nav>
      <header><h1 className="text-2xl font-bold text-foreground sm:text-3xl">{data.label} 実技 問{q.number}</h1><p className="mt-2 text-sm text-muted-foreground">法令基準日 {data.lawReferenceDate}</p></header>
      <section aria-label="問題文" className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <h2 className="mb-4 text-lg font-semibold">問題</h2>
        <p className="whitespace-pre-wrap text-base leading-[1.9] text-foreground">{q.body}</p>
      </section>
      {q.panels.length > 0 ? <section aria-label="原典の図表" className="mt-4">
        <details open className="rounded-2xl border border-border bg-card p-4 sm:p-5">
          <summary className="cursor-pointer font-semibold">図表・資料の画像を見る</summary>
          <p className="my-3 text-xs text-muted-foreground">図表と資料の配置を原典の該当部分から表示しています。問題文は上のテキストで読めます。</p>
          <div className="space-y-3">
            {q.panels.map((panel) => <Image key={panel.url} src={panel.url} alt={`${data.label} 実技 問${q.number} の図表（原典PDF ${panel.pdfPage}ページ）`} width={panel.width} height={panel.height} unoptimized className="h-auto w-full rounded border border-border" />)}
          </div>
        </details>
      </section> : null}
      <details className="mt-5 rounded-2xl border border-primary/30 bg-card p-5 sm:p-6">
        <summary className="cursor-pointer text-lg font-bold text-primary">公式模範解答を見る</summary>
        <p className="mt-4 whitespace-pre-wrap text-xl font-bold leading-relaxed text-foreground">{q.modelAnswer}</p>
        <p className="mt-3 text-xs text-muted-foreground">表記・単位・複数空欄の組合せは公式模範解答に合わせています。配点は協会非公表です。</p>
      </details>
      <div className="mt-6 flex flex-wrap gap-4 text-sm"><a href={sourcePdfPage} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary underline">公式問題PDF <ExternalLink className="h-3 w-3" /></a><a href={source.answer} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary underline">公式模範解答PDF <ExternalLink className="h-3 w-3" /></a></div>
      <nav aria-label="問題を移動" className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6 text-sm">
        {q.number > 1 ? <Link href={`/fp2/practical/${edition}/${q.number - 1}`} className="inline-flex items-center gap-1 text-primary hover:underline"><ChevronLeft className="h-4 w-4" />前の問題</Link> : <span />}
        <Link href={`/fp2/practical/${edition}`} className="text-muted-foreground hover:underline">問題一覧</Link>
        {q.number < 40 ? <Link href={`/fp2/practical/${edition}/${q.number + 1}`} className="inline-flex items-center gap-1 text-primary hover:underline">次の問題<ChevronRight className="h-4 w-4" /></Link> : <span />}
      </nav>
      <p className="mt-8 text-xs leading-relaxed text-muted-foreground">出典：日本FP協会 2級ファイナンシャル・プランニング技能検定 実技試験（資産設計提案業務）{data.label}。改行・空白を整え、図表がある設問では原典の該当箇所を画像で併記。</p>
    </main>
  );
}
