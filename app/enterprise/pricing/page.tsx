import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RoiCalculator } from "@/components/enterprise/RoiCalculator";

export const metadata: Metadata = {
  title: "法人プラン料金 — Team / Enterprise の機能比較と ROI",
  description:
    "過去問AI 法人プラン (Team / Enterprise) の機能比較表と、利用人数別 ROI を計算できるシミュレータ。20 名規模で年間 60 万円・合格率 +20pt を試算。",
  alternates: { canonical: "/enterprise/pricing" },
};

interface PlanRow {
  feature: string;
  individual: string | boolean;
  team: string | boolean;
  enterprise: string | boolean;
  highlight?: boolean;
}

const PLAN_ROWS: PlanRow[] = [
  { feature: "全 13 試験区分・12,000 問超アクセス", individual: true, team: true, enterprise: true },
  { feature: "AI コパイロット（無制限対話）", individual: "Premium のみ", team: true, enterprise: true },
  { feature: "午後 AI 採点（記述・論述）", individual: "月 3 回", team: "無制限", enterprise: "無制限", highlight: true },
  { feature: "業種別 合格答案例（6 業種）", individual: true, team: true, enterprise: true },
  { feature: "学習履歴クラウド同期", individual: true, team: true, enterprise: true },
  { feature: "法人ダッシュボード（部署別統計）", individual: false, team: true, enterprise: true, highlight: true },
  { feature: "メンバー一括招待・権限管理", individual: false, team: true, enterprise: true },
  { feature: "学習進捗 CSV エクスポート", individual: false, team: true, enterprise: true },
  { feature: "SAML 2.0 SSO", individual: false, team: "Phase 1 予定", enterprise: "Phase 1 予定" },
  { feature: "SCIM 2.0 自動プロビジョニング", individual: false, team: false, enterprise: "Phase 1 予定" },
  { feature: "監査ログ保管期間", individual: "—", team: "90 日", enterprise: "1 年（WORM 化予定）" },
  { feature: "SLA 月次稼働率 99.9%", individual: false, team: true, enterprise: true, highlight: true },
  { feature: "個別 NDA / DPA 締結", individual: false, team: true, enterprise: true },
  { feature: "セキュリティ質問票対応 (CAIQ/SIG-Lite)", individual: false, team: "個別対応", enterprise: "標準対応" },
  { feature: "専任カスタマーサクセス", individual: false, team: false, enterprise: true },
  { feature: "オンプレ / VPC 展開", individual: false, team: false, enterprise: "個別相談" },
];

const PRICE_CARDS = [
  {
    name: "Individual",
    price: "¥300",
    period: "/ 月",
    desc: "受験生個人向け。フェーズ移行までは β 中で全機能無料公開。",
    badge: "受験生向け",
    href: "/pricing",
    cta: "プランを見る",
    variant: "outline" as const,
    highlight: false,
  },
  {
    name: "Team",
    price: "¥2,500",
    period: "/ 人 / 月",
    desc: "20-200 名規模の法人向け。ダッシュボード・SLA・DPA を標準提供。",
    badge: "法人向け推奨",
    href: "/enterprise/pilot",
    cta: "3 ヶ月パイロット申込",
    variant: "primary" as const,
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "個別見積",
    period: "",
    desc: "200 名以上 / 高度コンプライアンス要件。SCIM・専任 CS・オンプレ対応。",
    badge: "大規模向け",
    href: "/contact",
    cta: "お問い合わせ",
    variant: "outline" as const,
    highlight: false,
  },
];

function PlanCell({ value }: { value: string | boolean }) {
  if (value === true) {
    return <Check className="mx-auto h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
  }
  if (value === false) {
    return <Minus className="mx-auto h-4 w-4 text-zinc-300 dark:text-zinc-700" />;
  }
  return <span className="text-xs text-zinc-700 dark:text-zinc-300">{value}</span>;
}

export default function EnterprisePricingPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16 pt-6 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Link>
      </Button>

      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="outline">法人向け</Badge>
          <Badge variant="success">3 ヶ月無料パイロット可</Badge>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          法人プラン料金
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          受験生 1 人あたり月 2,500 円から。20 名規模なら年間 60 万円で、想定合格率を 20 ポイント引き上げられる
          試算結果を ROI 計算機でご確認いただけます。Team / Enterprise の機能差分は下表で比較できます。
        </p>
      </header>

      <section className="mb-10 grid gap-3 sm:grid-cols-3">
        {PRICE_CARDS.map((p) => (
          <Card
            key={p.name}
            className={
              p.highlight
                ? "border-2 border-sky-400 bg-sky-50/40 shadow-md dark:border-sky-700 dark:bg-sky-950/20"
                : ""
            }
          >
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base">{p.name}</CardTitle>
                <Badge variant={p.highlight ? "primary" : "outline"}>{p.badge}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tabular-nums text-zinc-900 dark:text-zinc-50">
                  {p.price}
                </span>
                {p.period && (
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">{p.period}</span>
                )}
              </div>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{p.desc}</p>
              <Button
                asChild
                variant={p.variant}
                size="sm"
                className="w-full"
              >
                <Link href={p.href}>
                  {p.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          詳細機能比較
        </h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 text-left text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                    <th className="px-4 py-2.5">機能</th>
                    <th className="px-4 py-2.5 text-center">Individual</th>
                    <th className="px-4 py-2.5 text-center">
                      <span className="rounded-full bg-sky-100 px-2 py-0.5 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
                        Team（推奨）
                      </span>
                    </th>
                    <th className="px-4 py-2.5 text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {PLAN_ROWS.map((r) => (
                    <tr
                      key={r.feature}
                      className={
                        r.highlight
                          ? "border-b border-zinc-100 bg-sky-50/30 last:border-b-0 dark:border-zinc-900 dark:bg-sky-950/10"
                          : "border-b border-zinc-100 last:border-b-0 dark:border-zinc-900"
                      }
                    >
                      <td className="px-4 py-2.5 font-medium text-zinc-900 dark:text-zinc-100">
                        {r.feature}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <PlanCell value={r.individual} />
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <PlanCell value={r.team} />
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <PlanCell value={r.enterprise} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          ROI シミュレーション
        </h2>
        <p className="mb-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          利用人数・現状の合格率・想定向上ポイントを入力すると、年間ライセンス費用と
          学習時間削減による金銭価値、追加合格者数の見込みを試算します。
          数値はすべてブラウザ内で計算され、サーバーへ送信されません。
        </p>
        <RoiCalculator />
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          よくあるご質問
        </h2>
        <div className="space-y-3">
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-sm">利用人数の途中変更はできますか？</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-zinc-700 dark:text-zinc-300">
              月単位で増減可能です。年契約の場合、増員は即時、減員は次回更新時に反映します。
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-sm">パイロット期間中のデータは引き継げますか？</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-zinc-700 dark:text-zinc-300">
              はい。学習履歴・採点履歴は本契約後もそのまま継続利用できます。契約しなかった場合は、
              ご希望に応じて DPA に基づき 30 日以内にデータを削除します。
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-sm">SOC2 取得前でも導入できますか？</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-zinc-700 dark:text-zinc-300">
              はい。先行導入企業様にはセキュリティ質問票（CAIQ / SIG-Lite）への個別対応・NDA 締結のうえ
              Readiness Assessment 共有をご提供しています。詳しくは{" "}
              <Link href="/security" className="underline">/security</Link> ページをご参照ください。
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-10">
        <Card className="border-violet-200 bg-violet-50/40 dark:border-violet-900/60 dark:bg-violet-950/20">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <div className="mb-1 text-base font-bold text-zinc-900 dark:text-zinc-50">
                まずは 3 ヶ月の無料パイロットを
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                貴社のメンバーで実データを取得していただき、合格率・学習時間・継続率の効果を
                ご自身でご確認いただけます。
              </p>
            </div>
            <Button asChild variant="primary">
              <Link href="/enterprise/pilot">
                パイロットを申し込む
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
