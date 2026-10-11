import Image from "next/image";
import type { ChushoCase } from "@/lib/chusho-secondary/data";

export function CaseSource({ paper }: { paper: ChushoCase }) {
  return <section className="mt-6 space-y-4" aria-label="公式資料と与件">
    <div className="flex flex-wrap gap-4 text-sm">
      <a href={paper.sourcePdfUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">公式問題PDF</a>
      <a href={paper.sourceIntentUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">公式の出題趣旨PDF</a>
    </div>
    <p className="text-xs leading-6 text-muted-foreground">出典：一般社団法人 日本中小企業診断士協会連合会「{paper.year}年度 中小企業診断士第2次試験 {paper.caseTitle}」。出題趣旨は解答を示す資料ではありません。</p>
    <details className="rounded-xl border border-border bg-muted/20 p-4" open={paper.case !== "case4"}>
      <summary className="min-h-11 cursor-pointer font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">この事例の与件を読む</summary>
      <p className="mt-4 whitespace-pre-line text-sm leading-8">{paper.context}</p>
    </details>
    <details className="rounded-xl border border-border p-4">
      <summary className="min-h-11 cursor-pointer font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">図表・数値を公式原本の画像で確認する</summary>
      <p className="mt-2 text-xs text-muted-foreground">表の列、記号、解答欄の指定は原本で確認してください。画像は拡大できます。</p>
      <div className="mt-4 space-y-5">{paper.sourcePages.map(page => <figure key={page.url}>
        <a href={page.url} target="_blank" rel="noopener noreferrer" className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <Image src={page.url} alt={`${paper.year}年度 ${paper.caseTitle} 公式問題PDF ${page.page}ページ：与件・問題・図表の原本`} width={893} height={1263} unoptimized className="h-auto w-full rounded-lg border border-border bg-white" />
        </a>
        <figcaption className="mt-1 text-xs text-muted-foreground">公式PDF {page.page}ページ</figcaption>
      </figure>)}</div>
    </details>
  </section>;
}
