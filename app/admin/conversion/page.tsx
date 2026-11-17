import type { Metadata } from "next";
import Link from "next/link";
import { readConversions } from "@/lib/billing/conversion";
import { CONVERSION_CHANNELS, CONVERSION_LABELS, CONVERSION_METRICS, CONVERSION_STEPS, conversionRate } from "@/lib/billing/conversion-contract";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "課金までの流れ", robots: { index: false, follow: false } };
const channels = { web: "Web", ios: "iOSアプリ", unknown: "経路不明" };
export default async function ConversionPage() {
  const data = await readConversions(14);
  return <main className="mx-auto max-w-screen-2xl space-y-6 px-4 py-8">
    <Link href="/admin" className="text-sm underline">管理画面</Link>
    <h1 className="text-2xl font-bold">課金までの流れ</h1>
    <p className="text-sm text-muted-foreground">直近14日・日本時間。①②は日別ゲスト数、③④⑤⑧は延べ回数、⑥⑦は申込件数、⑨は追加10問を利用した日別人数。ログイン済みの回答は①②に含みません。</p>
    <p className="text-sm text-muted-foreground">割合は同日集計の比率で、同じ人の追跡ではありません。100%を超える場合があります。iOSのApp Store決済は⑥⑦に含みません。「—」は記録なし・分母0です。</p>
    {!data.available ? <p role="status">集計を取得できません。KVの接続状態をご確認ください。</p> : CONVERSION_CHANNELS.map(channel => {
      const rows = data.rows.filter(row => row.channel === channel);
      return <section key={channel} aria-labelledby={`channel-${channel}`} className="space-y-3">
        <h2 id={`channel-${channel}`} className="text-xl font-semibold">{channels[channel]}</h2>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full whitespace-nowrap text-right text-sm">
            <caption className="p-3 text-left">{channels[channel]}の日別件数と段階ごとの割合</caption>
            <thead><tr className="border-b bg-muted"><th scope="col" className="p-3 text-left">日付</th>{CONVERSION_METRICS.map(metric => <th key={metric} scope="col" className="p-3">{CONVERSION_LABELS[metric]}</th>)}{CONVERSION_STEPS.slice(1).map((step, i) => <th key={step} scope="col" className="p-3">{CONVERSION_LABELS[CONVERSION_STEPS[i]].slice(0, 1)}→{CONVERSION_LABELS[step].slice(0, 1)}</th>)}</tr></thead>
            <tbody>{rows.map(row => <tr key={row.day} className="border-b last:border-0"><th scope="row" className="p-3 text-left font-normal">{row.day}</th>{CONVERSION_METRICS.map(metric => <td key={metric} className="p-3 tabular-nums">{row.measured ? row.counts[metric] : "—"}</td>)}{CONVERSION_STEPS.slice(1).map((step, i) => <td key={step} className="p-3 tabular-nums">{conversionRate(row.counts[step], row.counts[CONVERSION_STEPS[i]])}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>;
    })}
  </main>;
}
