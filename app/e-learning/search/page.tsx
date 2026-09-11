import type { Metadata } from "next";
import Link from "next/link";
import { EXAM_CATALOG } from "@/lib/exam-library-catalog";
import { loadExamPaper } from "@/lib/exam-library-papers";
import { describeExamDate } from "@/lib/exam-library-model";
import { Button } from "@/components/ui/button";
export const metadata: Metadata = { title: "安全衛生の問題検索", robots: { index: false, follow: true }, alternates: { canonical: "/e-learning/search" } };
export default async function SafetySearchPage({ searchParams }: { searchParams: Promise<{ q?: string; subject?: string }> }) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim().slice(0,100) : "";
  const healthSubjects = new Set(["労働衛生一般", "労働衛生関係法令", "健康管理", "労働衛生工学"]);
  const family = (group: string, subject: string) => group === "lckohyo" ? "免許試験" : group === "emkohyo" ? "作業環境測定士" : healthSubjects.has(subject) ? "労働衛生コンサルタント" : "労働安全コンサルタント";
  const subjects = [...new Map(EXAM_CATALOG.map(p => [`${p.group}:${p.subject}`, { value: `${p.group}:${p.subject}`, label: p.group === "lckohyo" ? p.subject : `${family(p.group,p.subject)}｜${p.subject}` }])).values()];
  const subject = subjects.some(s => s.value === params.subject) ? params.subject! : "";
  const words = q.normalize("NFKC").toLowerCase().split(/\s+/).filter(Boolean);
  const results = words.length ? EXAM_CATALOG.filter(p => !subject || `${p.group}:${p.subject}` === subject).flatMap(p => (loadExamPaper(p.id) ?? []).filter(question => words.every(word => question.text.normalize("NFKC").toLowerCase().includes(word))).map(question => ({ paper:p, question }))) : [];
  return <main className="mx-auto w-full max-w-3xl px-4 py-6">
    <Link href="/e-learning/exams" className="inline-flex min-h-11 items-center text-sm text-muted-foreground">← 安全の試験一覧</Link>
    <h1 className="mt-3 text-2xl font-bold">安全衛生の問題検索</h1>
    <p className="mt-2 text-sm text-muted-foreground">キーワードで問題を探し、その問題から解き始められます。</p>
    <form action="/e-learning/search" role="search" aria-label="安全衛生の問題検索" className="my-6 flex flex-col gap-3">
      <label className="text-sm font-medium">キーワード<input type="search" name="q" defaultValue={q} maxLength={100} placeholder="例：衛生管理者　専任" className="mt-1 min-h-11 w-full rounded-lg border border-border bg-background px-3" /></label>
      <label className="text-sm font-medium">試験・科目<select name="subject" defaultValue={subject} className="mt-1 min-h-11 w-full rounded-lg border border-border bg-background px-3"><option value="">すべての安全衛生試験</option>{subjects.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}</select></label>
      <Button type="submit">検索</Button>
    </form>
    {q ? <section aria-label="検索結果"><h2 className="text-lg font-semibold">「{q}」の検索結果：{results.length}問</h2>
      {!results.length ? <p className="mt-3 text-sm">一致する問題がありません。短いキーワードにするか、試験・科目を「すべて」に変更してください。</p> : <ul className="mt-4 space-y-3">{results.slice(0,80).map(({paper,question}) => <li key={question.id}><Link href={`/e-learning/exams/${paper.id}?question=${encodeURIComponent(question.id)}`} prefetch={false} className="block rounded-xl border border-border p-4 hover:bg-muted"><span className="font-semibold">{paper.subject}・問{question.number}</span><span className="mt-1 block text-xs text-muted-foreground">{family(paper.group,paper.subject)} · {describeExamDate(paper)}</span><p className="mt-2 line-clamp-3 text-sm leading-relaxed">{question.text.slice(0,180)}{question.text.length > 180 ? "…" : ""}</p><span className="mt-3 block text-sm font-medium text-primary">この問題を解く →</span></Link></li>)}</ul>}
      {results.length > 80 ? <p className="mt-4 text-sm text-muted-foreground">先頭80問を表示しています。キーワードや試験・科目で絞り込めます。</p> : null}
    </section> : null}
  </main>;
}
