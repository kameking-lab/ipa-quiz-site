import type { Metadata } from "next";
import Link from "next/link";
import { readJourney } from "@/lib/billing/journey";
import { readFunnel } from "@/lib/billing/funnel";
import type { JourneyPage, JourneyStage } from "@/lib/billing/journey-contract";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "課金前の学習と離脱（管理画面）", robots: { index: false, follow: false } };
const pages: Record<JourneyPage | "none", string> = { none: "案内未観測", home: "トップ", quiz: "連続演習", question: "個別問題", exam_library: "公表問題", qualification: "資格一覧", pricing: "料金", signin: "ログイン", billing: "契約・決済開始", billing_success: "購入確認", billing_cancel: "決済から戻る", other: "その他" };
const stages: Record<JourneyStage, string> = { learning: "学習・閲覧", offer: "課金案内", plan_click: "プラン選択", signin: "ログイン", billing: "契約画面", checkout: "決済画面へ移動", canceled: "決済から戻る", purchased: "購入確認済み" };
const average = (answers: number, sessions: number) => sessions > 0 && answers >= 0 ? (answers / sessions).toFixed(1) : "—";

export default async function JourneyPage({ searchParams }: { searchParams: Promise<{ days?: string }> }) {
  const value = Number((await searchParams).days ?? 14);
  const days = [7, 14, 30, 90].includes(value) ? value : 14;
  const [report, funnel] = await Promise.all([readJourney(days), readFunnel(days)]);
  const groups = new Map<string, { day: string; qualification: string; outcome: string; sessions: number; answers: number }>();
  for (const row of report.rows) {
    const key = `${row.day}|${row.qualification}|${row.outcome}`;
    const group = groups.get(key) ?? { day: row.day, qualification: row.qualification, outcome: row.outcome, sessions: 0, answers: 0 };
    group.sessions += row.sessions; group.answers += row.answers; groups.set(key, group);
  }
  const rows = [...groups.values()].sort((a, b) => b.day.localeCompare(a.day) || a.qualification.localeCompare(b.qualification));
  const purchases = funnel.days.reduce((sum, day) => sum + day.counts.checkout_completed, 0);
  return <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8">
    <Link href="/admin/funnel" className="underline">ファネル管理へ</Link>
    <h1 className="text-2xl font-bold">課金前の学習と最終到達点</h1>
    <nav aria-label="集計期間" className="flex gap-4">{[7, 14, 30, 90].map(n => <Link key={n} href={`?days=${n}`} aria-current={n === days ? "page" : undefined} className="underline">{n}日</Link>)}</nav>
    <p>JST・過去{days}日。Webhookの購入完了数: {funnel.available ? purchases : "取得不可"}件。</p>
    <p className="text-sm text-muted-foreground">学習セッション単位（同じタブで30分無操作まで）。購入確認済みは、決済後に戻り注文の支払済みを確認できたセッションです。購入未確認には学習中・既契約者・決済後に戻らなかった人も含みます。平均はそのセッションで購入確認までに解答した回数で、同じ問題の解き直しも含みます。複数資格を解くと資格ごとに数えます。</p>
    <p className="text-sm text-muted-foreground">最終到達点は最後に観測したページ種別と段階です。購入未確認の行を離脱候補として比較できます。ページを閉じた事実や最終的な未購入は断定しません。決済中は最大24時間セッションを保持し、日をまたぐ購入は学習開始側の日に反映します。</p>
    {!report.available ? <p role="status">KV集計を取得できません。未設定または通信失敗です。</p> : !report.consistent ? <p role="alert">集計の差分が整合していません。通信欠落の可能性があるため平均・内訳を表示していません。</p> : <>
      <section className="space-y-3"><h2 className="text-xl font-semibold">購入確認別の解答数</h2>
        {!rows.length ? <p>この期間の新しい計測データはまだありません。</p> : <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr>{["日", "資格", "購入確認", "セッション数", "解答数", "平均解答数"].map(h => <th key={h} scope="col" className="p-2">{h}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={`${row.day}:${row.qualification}:${row.outcome}`} className="border-t"><td className="p-2">{row.day}</td><td className="p-2">{row.qualification}</td><td className="p-2">{row.outcome === "purchased" ? "確認済み" : "未確認"}</td><td className="p-2">{row.sessions}</td><td className="p-2">{row.answers}</td><td className="p-2">{average(row.answers, row.sessions)}</td></tr>)}</tbody></table></div>}
      </section>
      <section className="space-y-3"><h2 className="text-xl font-semibold">案内を見た場所と最終到達点</h2>
        <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr>{["日", "資格", "最初の課金案内", "最終ページ", "最終段階", "セッション数"].map(h => <th key={h} scope="col" className="p-2">{h}</th>)}</tr></thead><tbody>{report.rows.map(row => <tr key={[row.day, row.qualification, row.outcome, row.page, row.offer, row.stage].join(":")} className="border-t"><td className="p-2">{row.day}</td><td className="p-2">{row.qualification}</td><td className="p-2">{pages[row.offer]}</td><td className="p-2">{pages[row.page]}</td><td className="p-2">{stages[row.stage]}</td><td className="p-2">{row.sessions}</td></tr>)}</tbody></table></div>
      </section>
    </>}
    <p className="text-sm text-muted-foreground">既存KVに集計値だけを95日保存。ブラウザの保存無効・送信失敗・複数タブ・別端末・アプリ内課金では欠落や重複が生じます。人物単位の生涯解答数ではありません。過去のデータは遡って補完されません。</p>
  </main>;
}
