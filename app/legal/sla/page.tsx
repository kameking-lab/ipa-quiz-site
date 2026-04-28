import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "サービスレベル契約 (SLA) テンプレート",
  description:
    "過去問AI 法人プラン (Team / Enterprise) のサービスレベル契約 (SLA) テンプレート。月次稼働率 99.9% 目標・サービスクレジット制度・除外条件を明記。",
  alternates: { canonical: "/legal/sla" },
};

const CREDIT_TIERS: Array<{ uptime: string; credit: string }> = [
  { uptime: "99.9% 以上", credit: "0%（SLA 達成）" },
  { uptime: "99.0% 以上 99.9% 未満", credit: "次月分 月額料金の 10%" },
  { uptime: "95.0% 以上 99.0% 未満", credit: "次月分 月額料金の 25%" },
  { uptime: "95.0% 未満", credit: "次月分 月額料金の 50%" },
];

const EXCLUSIONS = [
  "計画メンテナンス（事前 7 日以上前に通知し、原則として日本時間 0:00-6:00 に実施）",
  "緊急セキュリティパッチ適用（事前通知が困難な場合、事後速やかに通知）",
  "DDoS 攻撃その他の悪意ある攻撃に起因する障害",
  "上流クラウドプロバイダ（Vercel、Neon、Google Cloud 等）の障害のうち、復旧に当社の管理が及ばないもの",
  "お客様の機器・ネットワーク・操作に起因する事象",
  "天災・戦争・暴動・労働争議その他の不可抗力",
];

const REPORTING = [
  {
    title: "稼働率の算出方法",
    body:
      "月次稼働率 = (月間総分数 − ダウンタイム分数) ÷ 月間総分数 × 100。ダウンタイムは外部監視（Pingdom 等）の継続的失敗 5 分以上を計測単位とする。",
  },
  {
    title: "クレジット申請手続",
    body:
      "SLA 違反月の翌月末日までに、お客様から書面（メール可）により申請を行うものとし、当社は申請受領から 30 日以内にクレジットを発行する。",
  },
  {
    title: "クレジットの形式",
    body:
      "サービスクレジットは次月以降の請求額からの減額として適用する。お客様の希望により現金返金とすることもできる（送金手数料はお客様負担）。",
  },
  {
    title: "重大インシデント通知 SLA",
    body:
      "重大度 P1 インシデント（情報漏洩・サービス全停止）発生時、認知から 24 時間以内に法人管理者へ通知する。Phase 1 では 4 時間以内への短縮を予定。",
  },
];

const SUPPORT_RESPONSE = [
  { sev: "P1（重大）", desc: "全機能停止 / 情報漏洩疑い", initial: "1 営業時間以内", commit: "24 時間以内に状況報告" },
  { sev: "P2（高）", desc: "主要機能の重大な劣化", initial: "4 営業時間以内", commit: "1 営業日以内に状況報告" },
  { sev: "P3（中）", desc: "一部機能の不具合・回避策あり", initial: "1 営業日以内", commit: "5 営業日以内に状況報告" },
  { sev: "P4（低）", desc: "改善要望・質問", initial: "2 営業日以内", commit: "随時対応" },
];

export default function SlaPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 pt-6 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Link>
      </Button>

      <header className="mb-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="outline">法人向け</Badge>
          <Badge variant="default">テンプレート v1.0</Badge>
          <Badge variant="success">月次稼働率 99.9% 目標</Badge>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          サービスレベル契約 (SLA) テンプレート
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          Team / Enterprise プランの月次稼働率目標と、未達成時のサービスクレジット返金条件を定めるテンプレートです。
          MSA（マスターサービス契約）と組み合わせて締結し、注文書（Order Form）に Sla 適用フラグを記載する形式とします。
        </p>
      </header>

      <Card className="mb-6 border-amber-300 bg-amber-50/40 dark:border-amber-800 dark:bg-amber-950/20">
        <CardContent className="p-4 text-xs leading-relaxed text-amber-900 dark:text-amber-100">
          <strong>SLA の段階的適用:</strong>{" "}
          現時点では SLA 数値は当社内部 SLO として運用しており、契約上の SLA としての明記は Phase 2 以降を予定しています。
          先行導入企業に対しては、本テンプレートの内容を準用し、未達月のクレジット返金を約束します。
        </CardContent>
      </Card>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          第 1 条　稼働率目標
        </h2>
        <Card>
          <CardContent className="space-y-3 p-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <p>
              当社は本サービスの月次稼働率（Monthly Uptime Percentage）として{" "}
              <strong className="text-zinc-900 dark:text-zinc-100">99.9%</strong>{" "}
              を目標とする。
            </p>
            <p>
              99.9% という数値は、月間ダウンタイムが約 43 分以内であることを意味する。
              当社はこの目標を上回るよう、外部監視・自動復旧機構・ロールバック手順を整備して運用する。
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          第 2 条　サービスクレジット
        </h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 text-left text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                    <th className="px-4 py-2.5">月次稼働率</th>
                    <th className="px-4 py-2.5">サービスクレジット</th>
                  </tr>
                </thead>
                <tbody>
                  {CREDIT_TIERS.map((t) => (
                    <tr key={t.uptime} className="border-b border-zinc-100 last:border-b-0 dark:border-zinc-900">
                      <td className="px-4 py-2.5 font-medium text-zinc-900 dark:text-zinc-100">{t.uptime}</td>
                      <td className="px-4 py-2.5 text-zinc-700 dark:text-zinc-300">{t.credit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          サービスクレジットは次月以降の請求額から減額する形式で適用される。クレジットの累積上限は
          年間契約額の 50% を超えないものとする。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          第 3 条　計算方法・申請・通知
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {REPORTING.map((r) => (
            <Card key={r.title}>
              <CardHeader className="pb-1">
                <CardTitle className="text-sm">{r.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                {r.body}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          第 4 条　SLA 計算からの除外事象
        </h2>
        <Card>
          <CardContent className="p-4">
            <ul className="ml-5 list-disc space-y-1.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {EXCLUSIONS.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          第 5 条　サポート応答 SLA
        </h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 text-left text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                    <th className="px-4 py-2.5">重大度</th>
                    <th className="px-4 py-2.5">事象例</th>
                    <th className="px-4 py-2.5">初回応答</th>
                    <th className="px-4 py-2.5">状況報告</th>
                  </tr>
                </thead>
                <tbody>
                  {SUPPORT_RESPONSE.map((s) => (
                    <tr key={s.sev} className="border-b border-zinc-100 last:border-b-0 dark:border-zinc-900">
                      <td className="px-4 py-2.5 font-medium text-zinc-900 dark:text-zinc-100">{s.sev}</td>
                      <td className="px-4 py-2.5 text-zinc-700 dark:text-zinc-300">{s.desc}</td>
                      <td className="px-4 py-2.5 text-zinc-600 dark:text-zinc-400">{s.initial}</td>
                      <td className="px-4 py-2.5 text-zinc-600 dark:text-zinc-400">{s.commit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          営業時間は平日 9:00-18:00（JST）。Enterprise プランでは 24 時間 365 日対応をオプションで提供。
        </p>
      </section>

      <section className="mt-10">
        <Card className="border-sky-200 bg-sky-50/40 dark:border-sky-900/60 dark:bg-sky-950/20">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <div className="mb-1 text-base font-bold text-zinc-900 dark:text-zinc-50">
                関連ドキュメント
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                SLA は MSA / DPA と組み合わせて締結します。
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/legal/msa">MSA</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/legal/dpa">DPA</Link>
              </Button>
              <Button asChild variant="primary" size="sm">
                <Link href="/security">セキュリティ詳細</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
