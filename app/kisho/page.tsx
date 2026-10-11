import type { Metadata } from "next";
import Link from "next/link";
import { KISHO_SITTINGS, KISHO_SOURCE_LISTING } from "@/lib/kisho/scope";

export const metadata: Metadata = {
  title: "気象予報士試験の掲載準備状況",
  description: "第65・66回の学科一般・学科専門・実技の対象範囲と公式資料を確認できます。",
  alternates: { canonical: "/kisho" }, robots: { index: false, follow: true },
};

export default function KishoPreparationPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">気象予報士試験</h1>
      <p className="mt-4 leading-relaxed">第65・66回の問題は掲載準備中です。公式原本との照合と利用条件の確認を進めています。</p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <caption className="mb-3 text-left font-semibold">対象となる原問の数</caption>
          <thead><tr>{["実施回", "学科一般", "学科専門", "実技1", "実技2", "合計"].map((label) => <th key={label} scope="col" className="border p-3 text-left">{label}</th>)}</tr></thead>
          <tbody>{KISHO_SITTINGS.map((sitting) => <tr key={sitting.round}>
            <th scope="row" className="border p-3 text-left">{sitting.label}</th>
            <td className="border p-3">{sitting.sections.ippan}問</td><td className="border p-3">{sitting.sections.senmon}問</td>
            <td className="border p-3">{sitting.sections.pm1}大問</td><td className="border p-3">{sitting.sections.pm2}大問</td>
            <td className="border p-3">{Object.values(sitting.sections).reduce((sum, count) => sum + count, 0)}原問</td>
          </tr>)}</tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-relaxed">実技は大問単位で数えています。小問・回答欄は原問数に加算しません。現在の公開数は0原問です。</p>
      <ul className="mt-6 space-y-3">{KISHO_SITTINGS.map((sitting) => <li key={sitting.round}><a href={sitting.sourceZipUrl} className="underline" target="_blank" rel="noopener noreferrer">{sitting.label}の公式問題・解答例（ZIP）</a></li>)}</ul>
      <p className="mt-5 text-sm"><a href={KISHO_SOURCE_LISTING} className="underline" target="_blank" rel="noopener noreferrer">気象業務支援センターの掲載ページと利用条件</a></p>
      <p className="mt-8"><Link href="/qualifications" className="underline">資格一覧へ</Link></p>
    </main>
  );
}
