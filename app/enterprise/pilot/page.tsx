import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Calendar, Users, ShieldCheck, BookOpenCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PilotForm } from "./PilotForm";

export const metadata: Metadata = {
  title: "法人パイロット申込 — 無料3ヶ月",
  description:
    "IPA Quiz の法人向け無料 3 ヶ月パイロット。最大 50 席まで、AI コパイロット無制限・全試験区分対応・法人ダッシュボード付き。",
  alternates: { canonical: "/enterprise/pilot" },
};

const PILOT_INCLUDES = [
  { icon: Users, label: "最大 50 席まで無料", desc: "追加席は 1 席 980円/月の Team プラン料金で対応可能" },
  { icon: BookOpenCheck, label: "全 13 試験区分・全機能アクセス", desc: "IP / SG / FE / AP / SC / NW / DB / ES / PM / SM / ST / SA / AU 全対応" },
  { icon: ShieldCheck, label: "AI コパイロット無制限", desc: "Gemini 2.5 Flash モデル使用、用語解説・誤答分析・類題生成" },
  { icon: Calendar, label: "法人ダッシュボード", desc: "メンバー進捗・試験別解答数・正答率を一元可視化、CSV エクスポート対応" },
];

const SETUP_STEPS: Array<{ step: number; title: string; body: string }> = [
  {
    step: 1,
    title: "申込フォーム送信",
    body: "本ページ下部のフォームから会社情報・ご担当者情報・想定人数・希望試験区分をお送りください。2 営業日以内にご連絡します。",
  },
  {
    step: 2,
    title: "NDA 締結・キックオフ",
    body: "弊社標準 NDA テンプレ（または貴社雛形）をクラウドサインで締結後、30 分のキックオフ MTG（オンライン）を実施します。",
  },
  {
    step: 3,
    title: "Team ワークスペース発行",
    body: "貴社専用ワークスペース URL を発行し、管理者アカウントを 1 名分セットアップ。CSV による一括メンバー招待が可能です。",
  },
  {
    step: 4,
    title: "セキュリティ質問票への回答",
    body: "CAIQ / SIG-Lite / 貴社独自のセキュリティ質問票に最短 5 営業日で回答。SOC2 Type1 取得計画ロードマップも併せて提出します。",
  },
  {
    step: 5,
    title: "パイロット運用開始",
    body: "3 ヶ月の利用期間中、専任担当が月次でレビュー MTG を実施。学習効果レポートと改善提案をご提供します。",
  },
  {
    step: 6,
    title: "本契約 or 終了",
    body: "3 ヶ月終了 1 ヶ月前にご判断をいただきます。本契約に進まれない場合、データは申し出から 30 日以内に削除します。",
  },
];

export default function EnterprisePilotPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-16 pt-6 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Link>
      </Button>

      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="success">無料パイロット</Badge>
          <Badge variant="outline">最大 3 ヶ月</Badge>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          法人パイロット導入プログラム
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          IPA 情報処理技術者試験の合格率向上を目指す情報システム部門・人事研修担当者の方へ。
          最大 50 席・3 ヶ月間の無料パイロットで、AI コパイロット付き学習プラットフォームの
          効果を稟議用の実データとともにご評価いただけます。
        </p>
      </header>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          パイロットに含まれるもの
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {PILOT_INCLUDES.map((item) => (
            <Card key={item.label}>
              <CardContent className="flex gap-3 p-4">
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-sky-600 dark:text-sky-400" />
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.label}
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {item.desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          初期セットアップガイド
        </h2>
        <Card>
          <CardContent className="p-0">
            <ol className="divide-y divide-zinc-100 dark:divide-zinc-900">
              {SETUP_STEPS.map((s) => (
                <li key={s.step} className="flex gap-3 px-4 py-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-600 text-xs font-bold text-white">
                    {s.step}
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {s.title}
                    </div>
                    <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </section>

      <section className="mb-8">
        <Card className="border-sky-200 bg-sky-50/40 dark:border-sky-900/60 dark:bg-sky-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">稟議突破に必要な資料を一通り揃えています</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <ul className="ml-5 list-disc space-y-1">
              <li>
                <Link href="/security" className="underline">セキュリティ統制一覧</Link>
                {" "}（SOC2 Type1 取得計画タイムライン付き）
              </li>
              <li>
                <Link href="/legal/dpa" className="underline">データ処理委託契約 (DPA)</Link>
                {" "}雛形（サブプロセッサー一覧含む）
              </li>
              <li>
                <Link href="/admin/team" className="underline">法人ダッシュボードのプロトタイプ</Link>
                （CSV エクスポート機能付き）
              </li>
              <li>NDA 標準テンプレート（クラウドサイン提出可能）</li>
              <li>
                個別のセキュリティ質問票（CAIQ / SIG-Lite / 貴社独自フォーマット）への回答
                — 最短 5 営業日
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section id="apply" className="mb-8">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          パイロット申込フォーム
        </h2>
        <Card>
          <CardContent className="p-5">
            <PilotForm />
          </CardContent>
        </Card>
      </section>

      <section className="mb-8 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-xs leading-relaxed text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
        <div className="mb-1 flex items-center gap-1.5 font-semibold text-zinc-700 dark:text-zinc-300">
          <CheckCircle2 className="h-4 w-4" />
          パイロット規約の要点
        </div>
        <ul className="ml-5 list-disc space-y-1">
          <li>パイロット期間中の料金・追加費用は発生しません。</li>
          <li>本契約に進まない場合、申し出から 30 日以内に学習データを完全削除します。</li>
          <li>個人情報の取扱は <Link href="/privacy" className="underline">プライバシーポリシー</Link> に従います。</li>
          <li>稼働率 SLA、サポート対応時間、サブプロセッサーの取扱は <Link href="/security" className="underline">セキュリティページ</Link> を参照してください。</li>
        </ul>
      </section>
    </main>
  );
}
