import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { feedbackRealm, feedbackStore } from "@/lib/feedback/unlock-runtime";
import { IMPROVEMENT_CHOICES } from "@/lib/feedback/unlock-contract";
export const dynamic = "force-dynamic";
export const metadata = { title: "改善の意見", robots: { index: false, follow: false } };

/** Covered by the existing /admin/:path* Basic Auth middleware. */
async function loadData(after: string) {
  try {
    const realm = feedbackRealm();
    return await Promise.all([
      feedbackStore().page(realm, after),
      prisma.$queryRawUnsafe<{ choice: string; count: number }[]>(`SELECT choice,count(*)::int AS count
        FROM feedback_unlock CROSS JOIN LATERAL unnest(choices) AS choice WHERE realm=$1 GROUP BY choice`, realm),
    ]);
  } catch { return null; }
}
export default async function FeedbackAdmin({ searchParams }: { searchParams: Promise<{ after?: string }> }) {
  const { after = "0" } = await searchParams;
  if (!/^(0|[1-9]\d{0,17})$/.test(after)) return <main className="p-6">ページ指定が不正です。</main>;
  const data = await loadData(after);
  if (!data) return <main className="p-6"><h1>改善の意見</h1><p role="alert">意見を取得できません。DB設定とマイグレーションの適用状況をご確認ください。</p></main>;
  const [page, counts] = data;
  return <main className="mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">改善の意見</h1>
      <p>過去問AIに保存した原本です。noteダッシュボードは専用APIから取得します。件数は全履歴、一覧は受付順で100件ずつ表示します。</p>
      <ul className="space-y-2">{IMPROVEMENT_CHOICES.map(c => <li key={c.id}>{c.label}：{counts.find(r => r.choice === c.id)?.count ?? 0}件</li>)}</ul>
      <h2 className="text-xl font-bold">自由記述・希望資格</h2>
      {!page.events.length && <p>意見はまだありません。</p>}
      {page.events.map(e => <article key={e.eventId} className="space-y-2 rounded-xl border p-4">
        <time dateTime={e.receivedAt}>{new Date(e.receivedAt).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}</time>
        <p>{e.choices.map(id => IMPROVEMENT_CHOICES.find(c => c.id === id)?.label ?? id).join("、") || "自由記述のみ"}</p>
        {!!e.requestedQualifications.length && <p>希望資格：{e.requestedQualifications.join("、")}</p>}
        <p className="whitespace-pre-wrap break-words">{e.commentMasked || "（自由記述なし）"}</p>
      </article>)}
      <nav className="flex gap-4"><Link href="/admin/feedback" className="underline">最初へ</Link>{page.hasMore && <Link href={`/admin/feedback?after=${page.nextCursor}`} className="underline">次の100件</Link>}<Link href="/admin" className="underline">管理トップ</Link></nav>
    </main>;
}
