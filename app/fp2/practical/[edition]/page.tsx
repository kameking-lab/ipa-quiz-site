import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { FP2_PRACTICAL_EDITIONS, getPracticalEdition, practicalSourceUrls } from "@/lib/fp2/practical";

export const dynamicParams = false;
export function generateStaticParams() { return FP2_PRACTICAL_EDITIONS.map((edition) => ({ edition })); }

export async function generateMetadata({ params }: { params: Promise<{ edition: string }> }): Promise<Metadata> {
  const { edition } = await params;
  const data = getPracticalEdition(edition);
  if (!data) return { title: "実技試験が見つかりません", robots: { index: false } };
  return { title: `FP2級 実技 ${data.label} 全40問`, description: `FP2級実技 ${data.label} の全40問と公式模範解答。`, alternates: { canonical: `/fp2/practical/${edition}` } };
}

export default async function Fp2PracticalEdition({ params }: { params: Promise<{ edition: string }> }) {
  const { edition } = await params;
  const data = getPracticalEdition(edition);
  if (!data) notFound();
  const source = practicalSourceUrls(edition);
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <nav className="mb-5 text-sm text-muted-foreground"><Link href="/fp2" className="hover:underline">FP2級</Link> / <Link href="/fp2/practical" className="hover:underline">実技</Link> / {data.label}</nav>
      <h1 className="text-3xl font-bold text-foreground">{data.label} 実技40問</h1>
      <p className="mt-3 text-sm text-muted-foreground">法令基準日 {data.lawReferenceDate}。問1から順番に解き、各ページで公式模範解答を開けます。</p>
      <div className="mt-4 flex flex-wrap gap-4 text-sm"><a href={source.question} target="_blank" rel="noopener noreferrer" className="text-primary underline">公式問題PDF</a><a href={source.answer} target="_blank" rel="noopener noreferrer" className="text-primary underline">公式模範解答PDF</a></div>
      <ol className="mt-8 grid gap-2">
        {data.questions.map((q) => (
          <li key={q.number}><Link href={`/fp2/practical/${edition}/${q.number}`} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition hover:border-primary/50 hover:bg-muted/40">
            <span className="w-12 shrink-0 font-semibold text-primary">問{q.number}</span>
            <span className="min-w-0 flex-1 truncate text-sm text-foreground">{q.body.replace(/\s+/g, " ").slice(0, 80)}</span>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </Link></li>
        ))}
      </ol>
    </main>
  );
}
