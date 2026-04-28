import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, BookOpen, FileCheck2, Globe2, ShieldCheck, UserCheck, Users2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "信頼性ポリシー — なぜ過去問AIが選ばれるのか",
  description:
    "過去問AI が法人 / 個人受験生から選ばれる理由。IPA 公式問題に基づく独立教育プラットフォームとしての位置付け、運営体制、データ保護方針を公開。",
  alternates: { canonical: "/trust" },
};

const REASONS = [
  {
    icon: BookOpen,
    title: "IPA 公式問題に完全準拠",
    body: "全 13 試験区分・12,000 問超を IPA 公表の過去問・解答例・採点講評に基づいて収録。問題文・選択肢を改変せず、各問に出典 PDF へのリンクを保持しています。",
  },
  {
    icon: ShieldCheck,
    title: "AI ハルシネーションを最小化",
    body: "解説は IPA 公式解答 → 編集者レビュー → AI 解説生成の三段プロセス。AI 単独生成のままユーザーに表示することはなく、誤りが判明した解説は速やかに修正します。",
  },
  {
    icon: UserCheck,
    title: "学習データの第三者学習への不使用",
    body: "ユーザーが入力した解答・質問・論述は、原則として LLM 提供者 (Google) のモデル学習に使用されない契約 (Gemini API enterprise terms) を採用しています。",
  },
  {
    icon: BadgeCheck,
    title: "高度試験 100% カバー",
    body: "主要無料サイトでは午前 II 中心で午後の記述・論述採点に未対応。 過去問AI は AI 採点で全 6 高度区分（SC/ST/SA/PM/SM/AU）の午後をカバーします。",
  },
  {
    icon: Globe2,
    title: "出典・著作権の透明性",
    body: "IPA は公式に「過去問の使用は許諾不要・使用料不要」と明示しています。本サイトはこの方針に従い、各ページに出典表記を入れ、必要に応じて出典 PDF へリンクします。",
  },
  {
    icon: Users2,
    title: "運営体制の開示",
    body: "受験生・教育担当者からの問い合わせは平日 9-18 時で 1 営業日以内に応答。 法人パイロットでは個別 NDA 締結後に運営者情報・体制詳細を開示します。",
  },
];

const POSITIONING = [
  {
    label: "正しい表現",
    text: "IPA 公式問題に基づく独立教育プラットフォーム",
    style: "border-emerald-300 bg-emerald-50/60 dark:border-emerald-800 dark:bg-emerald-950/30",
    badge: "推奨表記",
    badgeVariant: "success" as const,
  },
  {
    label: "誤解を招く表現",
    text: "IPA 非公式 / IPA 非提携",
    style: "border-rose-300 bg-rose-50/40 dark:border-rose-800 dark:bg-rose-950/20",
    badge: "回避",
    badgeVariant: "danger" as const,
  },
];

const DATA_PROTECTION = [
  {
    title: "保管時の暗号化",
    body: "永続データは Vercel Postgres / Neon の AES-256 暗号化ストレージに保管。バックアップも同等の暗号化が適用されます。",
  },
  {
    title: "通信時の暗号化",
    body: "全エンドポイントで TLS 1.2 以上を強制（HSTS 有効）。LLM 推論への通信も TLS 経由のみです。",
  },
  {
    title: "第三者学習への不使用",
    body: "Gemini API のエンタープライズ条件下で、入力データを Google モデルの学習に使用しない契約を採用しています。",
  },
  {
    title: "保持期間・削除",
    body: "契約終了時、ユーザーデータは 30 日以内に論理削除、90 日以内に物理削除。法人管理者には削除完了報告書を送付します。",
  },
  {
    title: "サブプロセッサー透明性",
    body: "Vercel / Neon / Google / Stripe など委託先一覧を公開し、追加・変更時は 30 日前までに法人管理者へ通知します。",
  },
  {
    title: "監査ログ",
    body: "管理者操作（メンバー追加・権限変更・データエクスポート）を 90 日保持、Phase 1 で 1 年・WORM 化。法人管理者は CSV ダウンロード可能。",
  },
];

export default function TrustPage() {
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
          <Badge variant="outline">信頼性ポリシー</Badge>
          <Badge variant="success">受験生 / 法人 共通</Badge>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          過去問AI が選ばれる理由
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          AI ネイティブな学習プラットフォームだからこそ、出典の正確さ・データ保護・運営体制の透明性を最優先しています。
          本ページは受験生・教育担当者・法人稟議担当者の判断材料となるよう、信頼性に関する方針を一括公開するものです。
        </p>
      </header>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          選ばれる 6 つの理由
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {REASONS.map((r) => (
            <Card key={r.title}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <r.icon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  <CardTitle className="text-sm">{r.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                {r.body}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          IPA との関係性 — 表現の整理
        </h2>
        <p className="mb-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          IPA は公式に「過去問の使用は許諾不要・使用料不要」と明示しています。本サイトは IPA から
          公式認定や提携を受けたサービスではありませんが、IPA の方針に基づき公式問題を使用する
          独立した教育プラットフォームです。「IPA 非公式」という表現は、提携がないことを示すと同時に
          「IPA に背いている」と誤読される懸念があるため、当方では以下の表記を推奨しています。
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {POSITIONING.map((p) => (
            <Card key={p.label} className={p.style}>
              <CardHeader className="pb-1">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-xs uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                    {p.label}
                  </CardTitle>
                  <Badge variant={p.badgeVariant}>{p.badge}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-base font-semibold leading-relaxed text-zinc-900 dark:text-zinc-50">
                  「{p.text}」
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          データ保護方針
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {DATA_PROTECTION.map((d) => (
            <Card key={d.title}>
              <CardHeader className="pb-1">
                <CardTitle className="text-sm">{d.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                {d.body}
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          詳細は{" "}
          <Link href="/security" className="underline">
            セキュリティ・コンプライアンス
          </Link>
          {" / "}
          <Link href="/legal/dpa" className="underline">
            データ処理委託契約 (DPA)
          </Link>
          {" / "}
          <Link href="/privacy" className="underline">
            プライバシーポリシー
          </Link>
          を参照してください。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          運営体制の信頼性
        </h2>
        <Card>
          <CardContent className="space-y-3 p-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <p>
              <strong>運営者:</strong> 過去問AI 運営チーム（個人事業 / 法人化準備中）。法人パイロット申込時に
              個別 NDA 締結のうえ、代表者氏名・本店所在地・登記情報を開示いたします。
            </p>
            <p>
              <strong>サポート対応:</strong> 平日 9-18 時（JST）、1 営業日以内に初回応答。
            </p>
            <p>
              <strong>アフィリエイト・広告掲載方針:</strong> 教材・参考書のアフィリエイトを掲載していますが、
              採点・解説の中立性に影響を与える優遇は行いません。広告は本文と完全分離して表示します。
            </p>
            <p>
              <strong>個人情報保護:</strong> 個人情報保護法および関連ガイドラインに準拠。Cookie・解析の
              詳細は <Link href="/privacy" className="underline">プライバシーポリシー</Link> を参照。
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mt-10">
        <Card className="border-sky-200 bg-sky-50/40 dark:border-sky-900/60 dark:bg-sky-950/20">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <div className="mb-1 text-base font-bold text-zinc-900 dark:text-zinc-50">
                法人導入をご検討の方へ
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                セキュリティ質問票 (CAIQ / SIG-Lite) 対応 / 個別 NDA 締結 / 3 ヶ月無料パイロット まで一気通貫でサポートします。
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="primary" size="sm">
                <Link href="/enterprise/pilot">パイロット申込</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/security">
                  <FileCheck2 className="h-3.5 w-3.5" />
                  セキュリティ詳細
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <p className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-400">
        出典: IPA 情報処理技術者試験
      </p>
    </main>
  );
}
