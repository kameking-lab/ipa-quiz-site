import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { FP3_PRACTICAL_EDITIONS, getPracticalEdition, practicalSourceUrls } from "@/lib/fp3/practical";

export const dynamicParams = false;
export function generateStaticParams() {
  return FP3_PRACTICAL_EDITIONS.flatMap((edition) => Array.from({ length: 20 }, (_, index) => ({ edition, number: String(index + 1) })));
}

export async function generateMetadata({ params }: { params: Promise<{ edition: string; number: string }> }): Promise<Metadata> {
  const { edition, number } = await params;
  const data = getPracticalEdition(edition);
  const q = data?.questions.find((item) => item.number === Number(number));
  if (!q) return { title: "問題が見つかりません", robots: { index: false } };
  return { title: `FP3級 実技 ${data!.label} 問${q.number} 解答`, description: q.stem.replace(/\s+/g, " ").slice(0, 140), alternates: { canonical: `/fp3/practical/${edition}/${q.number}` } };
}

export default async function Fp3PracticalQuestion({ params }: { params: Promise<{ edition: string; number: string }> }) {
  const { edition, number } = await params;
  const data = getPracticalEdition(edition);
  const q = data?.questions.find((item) => item.number === Number(number));
  if (!data || !q) notFound();
  const source = practicalSourceUrls(edition);
  const sourcePdfPage = `${source.question}#page=${q.sourcePage}`;
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <nav className="mb-5 text-sm text-muted-foreground"><Link href="/fp3" className="hover:underline">FP3級</Link> / <Link href="/fp3/practical" className="hover:underline">実技</Link> / <Link href={`/fp3/practical/${edition}`} className="hover:underline">{data.label}</Link> / 問{q.number}</nav>
      <header><h1 className="text-2xl font-bold text-foreground sm:text-3xl">{data.label} 実技 問{q.number}</h1><p className="mt-2 text-sm text-muted-foreground">法令基準日 {data.lawReferenceDate}</p></header>
      <section aria-label="問題文" className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <h2 className="mb-4 text-lg font-semibold">問題</h2>
        <p className="whitespace-pre-wrap text-base leading-[1.9] text-foreground">{q.stem}</p>
        {q.panels.length > 0 && <div aria-label="原典の図表" className="mt-4 space-y-3">
          <p className="text-xs text-muted-foreground">表や系図は公式問題のレイアウトで確認できます。横長の表は左右に動かし、タップで原寸表示できます。</p>
          {q.panels.map((panel) => <div key={panel.url} className="overflow-x-auto rounded border border-border">
            <a href={panel.url} target="_blank" rel="noopener noreferrer" aria-label={`問${q.number}の図表を原寸で開く`}>
              <Image src={panel.url} alt={`${data.label} 実技 問${q.number} 原典の資料（PDF ${panel.pdfPage}ページ）。タップで拡大`} width={panel.width} height={panel.height} unoptimized className={`h-auto ${panel.width >= 800 ? "min-w-[680px]" : "w-full"}`} />
            </a>
          </div>)}
        </div>}
        <ol className="mt-5 space-y-3">
          {q.choices.map((choice, index) => <li key={`${index}-${choice}`} className="rounded-xl border border-border bg-background px-4 py-3"><span className="mr-2 font-semibold text-primary">{index + 1}.</span>{choice}</li>)}
        </ol>
      </section>
      <details className="mt-5 rounded-2xl border border-primary/30 bg-card p-5 sm:p-6">
        <summary className="cursor-pointer text-lg font-bold text-primary">公式模範解答を見る</summary>
        <p className="mt-4 whitespace-pre-wrap text-xl font-bold leading-relaxed text-foreground">{q.answer}. {q.choices[q.answer - 1]}</p>
        <p className="mt-4 whitespace-pre-wrap leading-relaxed text-foreground">{q.explanation}</p>
        <div className="mt-5 space-y-3">
          {(["ア", "イ", "ウ"] as const).map((key, index) => <div key={key} className={`rounded-xl border p-4 ${index + 1 === q.answer ? "border-emerald-500/50 bg-emerald-50/70 dark:bg-emerald-950/20" : "border-border bg-muted/30"}`}><p className="font-semibold">{index + 1}. {index + 1 === q.answer ? "正解" : "誤り"}</p><p className="mt-1 leading-relaxed text-muted-foreground">{q.choiceExplanations[key]}</p></div>)}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">正答番号は日本FP協会の公式模範解答と照合しています。</p>
      </details>
      <div className="mt-6 flex flex-wrap gap-4 text-sm"><a href={sourcePdfPage} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary underline">公式問題PDF <ExternalLink className="h-3 w-3" /></a><a href={source.answer} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary underline">公式模範解答PDF <ExternalLink className="h-3 w-3" /></a></div>
      <nav aria-label="問題を移動" className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6 text-sm">
        {q.number > 1 ? <Link href={`/fp3/practical/${edition}/${q.number - 1}`} className="inline-flex items-center gap-1 text-primary hover:underline"><ChevronLeft className="h-4 w-4" />前の問題</Link> : <span />}
        <Link href={`/fp3/practical/${edition}`} className="text-muted-foreground hover:underline">問題一覧</Link>
        {q.number < 20 ? <Link href={`/fp3/practical/${edition}/${q.number + 1}`} className="inline-flex items-center gap-1 text-primary hover:underline">次の問題<ChevronRight className="h-4 w-4" /></Link> : <span />}
      </nav>
      <p className="mt-8 text-xs leading-relaxed text-muted-foreground">出典：日本FP協会 3級ファイナンシャル・プランニング技能検定 実技試験（資産設計提案業務）{data.label}。改行・空白を整え、原典ページの画像を併記。</p>
    </main>
  );
}

