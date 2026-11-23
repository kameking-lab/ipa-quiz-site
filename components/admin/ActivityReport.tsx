import type { ActivityData, ActivityRow } from "@/lib/analytics/activity-contract";

const LABELS: Record<string, string> = { page_view: "ページ閲覧", quiz_started: "演習開始", question_answered: "問題に解答", exam_library_answered: "公表問題に解答", quiz_completed: "演習完了", ai_query_sent: "AI質問", exam_library_ai_query: "公表問題のAI質問", practice_limit_viewed: "無料上限の案内表示", practice_free_limit_reached: "無料上限に到達", practice_upgrade_clicked: "プラン選択", essay_viewed: "論文閲覧", blog_viewed: "ブログ閲覧", blog_article_scrolled: "ブログ読了", feedback_submitted: "意見送信", contact_form_submitted: "問い合わせ送信", book_click: "書籍リンク", home: "トップ", quiz: "演習", question: "個別問題", exam_library: "公表問題", qualification: "資格", pricing: "プラン", signin: "ログイン", billing: "契約", billing_success: "決済後", billing_cancel: "決済から戻る", blog: "ブログ", essay: "論文", other: "その他", unknown: "資格未指定" };
const answers = (row: ActivityRow) => row.event === "question_answered" || row.event === "exam_library_answered";
const sum = (rows: ActivityRow[], match: (row: ActivityRow) => boolean) => rows.filter(match).reduce((n, row) => n + row.count, 0);

export function ActivityReport({ data, period }: { data: ActivityData; period: string }) {
  if (!data.available) return <section role="status" className="mb-6 rounded-xl border border-amber-300 p-5"><h2 className="font-semibold">アクセス集計は未取得です</h2><p className="mt-2 text-sm">KVの接続設定または取得エラーを確認してください。</p></section>;
  if (!data.rows.length) return <section role="status" className="mb-6 rounded-xl border p-5"><h2 className="font-semibold">アクセス集計（{period}・JST）</h2><p className="mt-2 text-sm">この期間の記録はまだありません。計測開始後の閲覧・利用から表示されます。</p></section>;
  const cards = [
    ["ページ閲覧", sum(data.rows, r => r.event === "page_view")],
    ["解答", sum(data.rows, answers)],
    ["AI質問", sum(data.rows, r => r.event === "ai_query_sent" || r.event === "exam_library_ai_query")],
    ["無料上限の案内表示", sum(data.rows, r => r.event === "practice_limit_viewed")],
  ] as const;
  const days = [...new Set(data.rows.map(r => r.day))].sort().reverse();
  const qualifications = [...new Set(data.rows.map(r => r.qualification))].map(q => ({ q, pv: sum(data.rows, r => r.qualification === q && r.event === "page_view"), answers: sum(data.rows, r => r.qualification === q && answers(r)) })).sort((a, b) => b.answers - a.answers || b.pv - a.pv);
  const events = [...new Set(data.rows.map(r => r.event))].map(event => ({ event, count: sum(data.rows, r => r.event === event) })).sort((a, b) => b.count - a.count);
  const pages = [...new Set(data.rows.filter(r => r.event === "page_view").map(r => r.page))].map(page => ({ page, count: sum(data.rows, r => r.event === "page_view" && r.page === page) })).sort((a, b) => b.count - a.count);
  return <section className="mb-8 space-y-4" aria-label="匿名アクセス集計">
    <div><h2 className="text-lg font-semibold">アクセス・利用回数（{period}・JST）</h2><p className="mt-1 text-sm text-muted-foreground">既存KVの匿名集計。数値は回数です。人数・DAU・継続率は集計しません。保存期間は95日です。</p></div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{cards.map(([label, value]) => <div key={label} className="rounded-xl border p-4"><p className="text-sm">{label}</p><p className="mt-1 text-2xl font-bold tabular-nums">{value.toLocaleString("ja-JP")}</p></div>)}</div>
    <div className="grid gap-4 lg:grid-cols-2">
      <Table title="日別" headings={["日付", "閲覧", "解答"]} rows={days.map(day => [day, sum(data.rows, r => r.day === day && r.event === "page_view"), sum(data.rows, r => r.day === day && answers(r))])} />
      <Table title="資格別（解答数順）" headings={["資格コード", "閲覧", "解答"]} rows={qualifications.map(r => [LABELS[r.q] ?? r.q, r.pv, r.answers])} />
      <Table title="ページ種別" headings={["ページ", "閲覧"]} rows={pages.map(r => [LABELS[r.page] ?? r.page, r.count])} />
      <Table title="利用・案内のイベント" headings={["操作", "回数"]} rows={events.map(r => [LABELS[r.event] ?? r.event, r.count])} />
    </div>
  </section>;
}

function Table({ title, headings, rows }: { title: string; headings: string[]; rows: (string | number)[][] }) {
  return <div className="overflow-x-auto rounded-xl border p-4"><table className="w-full text-sm"><caption className="mb-2 text-left font-semibold">{title}</caption><thead><tr>{headings.map((h, i) => <th scope="col" key={h} className={`border-b py-2 ${i ? "text-right" : "text-left"}`}>{h}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={row[0]}>{row.map((value, i) => <td key={i} className={`border-b py-2 tabular-nums ${i ? "text-right" : "text-left"}`}>{typeof value === "number" ? value.toLocaleString("ja-JP") : value}</td>)}</tr>)}</tbody></table></div>;
}
