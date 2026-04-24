import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "導入事例",
  description:
    "IPA Quiz Team プランの導入事例。IT 企業・金融機関・製造業での活用事例をご紹介。",
  alternates: { canonical: "/case-studies" },
};

const CASES = [
  {
    industry: "IT・ソフトウェア",
    company: "A 社（従業員 200 名）",
    exam: "基本情報技術者試験 / 応用情報技術者試験",
    challenge:
      "新卒・中途採用社員のITスキル底上げを目指していたが、既存の学習教材では進捗の把握が困難だった。",
    solution:
      "IPA Quiz Team プランを導入。法人ダッシュボードで部署別・試験別の正答率を可視化し、研修担当者が弱点を素早く把握できるようになった。",
    result: "基本情報合格率が前年比 +23%。AI コパイロットによる個別解説で自律学習が促進された。",
    stats: [
      { label: "合格率向上", value: "+23%" },
      { label: "学習継続率", value: "87%" },
      { label: "導入メンバー", value: "68名" },
    ],
  },
  {
    industry: "金融・保険",
    company: "B 社（従業員 1,200 名）",
    exam: "情報処理安全確保支援士試験 / ネットワークスペシャリスト試験",
    challenge:
      "サイバーセキュリティ人材育成を急務としていたが、高度試験向けの学習教材が少なく、解説の質にばらつきがあった。",
    solution:
      "AI コパイロットによる詳細解説・類題生成機能を活用。セキュリティ専門用語の解説を AI が補完し、業務知識と試験対策を並行して学べる環境を構築。",
    result: "情報処理安全確保支援士の受験者数が 2 倍に増加。学習時間は従来比 30% 削減。",
    stats: [
      { label: "受験者数増加", value: "×2.0" },
      { label: "学習時間削減", value: "−30%" },
      { label: "部署展開数", value: "12部署" },
    ],
  },
  {
    industry: "製造業",
    company: "C 社（従業員 450 名）",
    exam: "IT パスポート試験 / 基本情報技術者試験",
    challenge:
      "DX 推進に向け、IT 非専門部門の社員に情報処理基礎知識を習得させる必要があった。従来の座学研修は参加率・定着率ともに低かった。",
    solution:
      "IPA Quiz のモバイル対応ゼロ遷移 UI を活用し、スキマ時間での学習を推進。模擬試験モードと間隔反復学習で短期間での合格を支援。",
    result: "IT パスポート取得率 61%（業界平均 32%）を達成。学習ログを人事評価に連携。",
    stats: [
      { label: "ITパスポート取得率", value: "61%" },
      { label: "業界平均比", value: "+91%" },
      { label: "平均学習期間", value: "6.2週" },
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-16 pt-8 sm:px-6">
      <section className="mb-10 text-center">
        <Badge variant="outline" className="mb-3">導入事例</Badge>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          IPA Quiz Team を活用した企業事例
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          IT 企業・金融機関・製造業など、さまざまな業種で活用されています。
          架空の事例をもとにした参考モデルです。
        </p>
      </section>

      <div className="space-y-8 mb-12">
        {CASES.map((c, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Badge variant="outline" className="mb-2 text-xs">{c.industry}</Badge>
                  <CardTitle className="text-lg">{c.company}</CardTitle>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    対象試験: {c.exam}
                  </p>
                </div>
                <div className="flex gap-4">
                  {c.stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="text-2xl font-bold text-sky-600 dark:text-sky-400 tabular-nums">
                        {s.value}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="mb-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    課題
                  </p>
                  <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {c.challenge}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    解決策
                  </p>
                  <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {c.solution}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    成果
                  </p>
                  <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {c.result}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-2xl border border-sky-200 bg-sky-50 p-8 text-center dark:border-sky-900 dark:bg-sky-950/30">
        <h2 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
          貴社での導入をご検討ですか？
        </h2>
        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
          Team プランは月額 ¥50,000（席数無制限）。<br />
          年払いでは ¥540,000（月換算 ¥45,000）とさらにお得です。
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="primary">
            <Link href="/contact/enterprise">お問い合わせ・資料請求</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/team">ダッシュボードデモを見る</Link>
          </Button>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
        ※ 掲載事例はすべて架空のモデルです。実際の導入効果は環境により異なります。
      </p>
    </main>
  );
}
