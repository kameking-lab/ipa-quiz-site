import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Shield, Lock, Activity, FileSearch, Server, KeyRound, Users, AlertTriangle, Database, Clock, FileSpreadsheet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PAID_MODE } from "@/lib/paid-mode";

export const metadata: Metadata = {
  title: "セキュリティ・コンプライアンス",
  description:
    "過去問AI の法人向けセキュリティ統制・SOC2 Type1 取得計画・データ保護・SLA・SAML SSO 対応予定について。",
  alternates: { canonical: "/security" },
};

const SOC2_TIMELINE: Array<{ phase: string; period: string; status: "done" | "inprogress" | "planned"; items: string[] }> = [
  {
    phase: "Phase 0: 体制整備",
    period: "2026 Q2 (現在)",
    status: "inprogress",
    items: [
      "情報セキュリティポリシー策定",
      "アクセス制御・権限管理ベースライン文書化",
      "サブプロセッサー一覧公開（DPA）",
    ],
  },
  {
    phase: "Phase 1: 統制実装",
    period: "2026 Q3",
    status: "planned",
    items: [
      "監査ログ基盤の本番投入（90日保持 → 1年保持へ拡張）",
      "SAML SSO（Okta / Azure AD / Google Workspace）対応",
      "インシデント対応 Runbook 完備、年次訓練実施",
    ],
  },
  {
    phase: "Phase 2: SOC2 Type1 取得",
    period: "2026 Q4",
    status: "planned",
    items: [
      "監査法人選定・Readiness Assessment",
      "Type1 監査実施（特定時点での統制設計の検証）",
      "Type1 報告書の取得 → 法人顧客に NDA 締結後開示",
    ],
  },
  {
    phase: "Phase 3: SOC2 Type2 取得",
    period: "2027 Q2-Q3",
    status: "planned",
    items: [
      "6ヶ月以上の運用実績に基づく Type2 監査",
      "ISO 27001 取得準備の並行開始",
    ],
  },
];

interface ControlItem {
  title: string;
  current: string;
  planned?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CONTROLS: ControlItem[] = [
  {
    title: "保管時の暗号化 (Encryption at Rest)",
    icon: Lock,
    current:
      "すべての永続データは Vercel Postgres / Neon の AES-256 暗号化ストレージに保管。バックアップも同等の暗号化が適用される。",
  },
  {
    title: "通信時の暗号化 (Encryption in Transit)",
    icon: Server,
    current:
      "全エンドポイントで TLS 1.2 以上を強制（HSTS 有効）。LLM 推論（Google Gemini API）への通信も TLS 経由のみ。",
  },
  {
    title: "アクセスログ・監査ログ",
    icon: FileSearch,
    current:
      "管理者操作（メンバー追加・権限変更・データエクスポート）を 90 日間保持し、法人管理者がダウンロード可能。",
    planned: "Phase 1 で 1 年保持、改ざん防止 (WORM) ストレージへ移行予定。",
  },
  {
    title: "アクセス制御・最小権限",
    icon: KeyRound,
    current:
      "本番環境への管理者アクセスは MFA 必須。役割は (Owner / Admin / Member / Viewer) の 4 段階。法人管理者はメンバーの権限変更を即時行える。",
    planned: "Phase 1 で SAML SSO + SCIM プロビジョニング対応予定。",
  },
  {
    title: "インシデント対応",
    icon: AlertTriangle,
    current:
      "重大度 P1 (情報漏洩・サービス全停止) は 24 時間以内に法人管理者へ通知。Runbook に基づく初動対応・再発防止策を文書化。",
    planned: "Phase 1 で年次インシデント対応訓練を実施予定。",
  },
  {
    title: "定期監査・脆弱性管理",
    icon: Activity,
    current:
      "依存パッケージの脆弱性スキャンを CI で毎 PR 実施。重大脆弱性は 7 日以内、高脆弱性は 30 日以内にパッチ適用を SLO とする。",
    planned: "Phase 2 で外部ペネトレーションテストを年 1 回実施予定。",
  },
  {
    title: "SLA (サービスレベル目標)",
    icon: Shield,
    current:
      "Team プラン: 月次稼働率 99.9% を目標 SLO（メンテナンス時間除く）。未達時は法人管理者へ次月分の利用料割引を返金。",
    planned: "Phase 2 で正式 SLA として契約書面に明記予定（クレジット還付方式）。",
  },
  {
    title: "バックアップ・災害復旧 (DR)",
    icon: Database,
    current:
      "Postgres は Point-in-Time Recovery で過去 24 時間の任意時点へ復旧可能。日次フルバックアップを 30 日間保持し、別リージョンへレプリケーション。RPO 目標 1 時間以内、RTO 目標 4 時間以内。",
    planned: "Phase 2 で年 1 回の DR 演習（疑似障害シナリオ）を実施し、結果を法人管理者へ報告予定。",
  },
  {
    title: "保持期間・データ削除",
    icon: Clock,
    current:
      "契約終了時、ユーザーデータは 30 日以内に論理削除、90 日以内にバックアップを含めて物理削除。証跡は法人管理者へ削除完了報告書として送付。",
    planned: "Phase 1 でデータ削除証明書（NIST SP 800-88 準拠）の自動発行を予定。",
  },
  {
    title: "シングルサインオン (SAML SSO)",
    icon: Users,
    current:
      "現状は Email + パスワード認証のみ。Phase 1 で Okta / Azure AD / Google Workspace の SAML 2.0 対応を予定。詳細は /enterprise/sso 参照。",
    planned: "Phase 1 で /api/auth/saml エンドポイント有効化、SCIM 2.0 プロビジョニング追加予定。",
  },
];

const SUBPROCESSORS = [
  { name: "Vercel Inc.", purpose: "アプリケーション・CDN ホスティング", region: "米国 / グローバル CDN" },
  { name: "Neon (Databricks 系)", purpose: "Postgres データベース", region: "東京 (ap-northeast-1)" },
  { name: "Google LLC (Gemini API)", purpose: "AI コパイロット推論", region: "米国 / グローバル" },
  { name: "Stripe Inc.", purpose: "決済処理（料金プラン）", region: "米国 / 日本" },
];

function statusBadge(status: "done" | "inprogress" | "planned") {
  if (status === "done") return <Badge variant="success">完了</Badge>;
  if (status === "inprogress") return <Badge variant="default">進行中</Badge>;
  return <Badge variant="outline">予定</Badge>;
}

export default function SecurityPage() {
  if (!PAID_MODE) {
    notFound();
  }
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
          <Badge variant="outline">法人向け</Badge>
          <Badge variant="success">Team プラン対象</Badge>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          セキュリティ・コンプライアンス
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          過去問AI は法人での導入に耐えるセキュリティ統制を構築しています。本ページは現状の統制と
          SOC2 Type1 取得に向けた計画を、稟議資料として参照可能な粒度で公開するものです。
          すべての記載は <span className="font-semibold text-zinc-800 dark:text-zinc-200">「現状」と「予定」を明確に区別</span>
          しており、未取得の認証を取得済みと誤認させる表記は行いません。
        </p>
      </header>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          法人向けコミットメント（一目で分かる）
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                <CardTitle className="text-sm">SLA 99.9% 公開</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
              Team プラン月次稼働率 99.9% を SLO として公開。未達月はサービスクレジットを返金。
              メンテ時間と除外条件は <Link href="/legal/sla" className="underline">/legal/sla</Link> 参照。
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <CardTitle className="text-sm">インシデント対応</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
              重大度 P1（情報漏洩・全停止）は 24 時間以内に法人管理者へ通知。
              Runbook 文書化済み・年次訓練を Phase 1 で導入予定。
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <CardTitle className="text-sm">暗号化（保管 / 通信）</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
              保管時 AES-256（Postgres / Neon）、通信時 TLS 1.2 以上強制（HSTS 有効）。
              LLM 推論への通信も TLS のみ。
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <FileSearch className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                <CardTitle className="text-sm">監査ログ保管</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
              管理者操作ログを現状 90 日保持、Phase 1 で 1 年・WORM ストレージへ。
              法人管理者は CSV ダウンロード可能。
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                <CardTitle className="text-sm">バックアップ / DR</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
              Postgres は PITR（Point-in-Time Recovery）24 時間遡及・日次フルバックアップ 30 日保持。
              RPO ≤ 1 時間 / RTO ≤ 4 時間を目標値として運用。
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-fuchsia-600 dark:text-fuchsia-400" />
                <CardTitle className="text-sm">監査計画</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
              Phase 2（2026 Q4）で SOC2 Type1 取得、Phase 3 で Type2 / ISO 27001 準備開始。
              年 1 回の外部ペネトレーションテスト計画あり。
            </CardContent>
          </Card>
        </div>
      </section>

      <Card className="mb-8 border-amber-300 bg-amber-50/60 dark:border-amber-800 dark:bg-amber-950/30">
        <CardContent className="p-4 text-sm leading-relaxed text-amber-900 dark:text-amber-100">
          <strong>重要 (Disclaimer):</strong> 現時点で 過去問AI は SOC2 / ISO 27001 等の第三者認証を
          <span className="font-semibold">未取得</span>です。下記タイムラインは取得計画であり、
          稟議の際は本ページを「取得計画ロードマップ」としてご参照ください。法人パイロット導入時には、
          別紙で個別のセキュリティ質問票（CAIQ / SIG-Lite 等）にも対応いたします。
        </CardContent>
      </Card>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          SOC2 Type1 取得タイムライン
        </h2>
        <div className="space-y-3">
          {SOC2_TIMELINE.map((entry) => (
            <Card key={entry.phase}>
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="text-base">{entry.phase}</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{entry.period}</span>
                    {statusBadge(entry.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="ml-5 list-disc space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                  {entry.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          セキュリティ統制一覧
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {CONTROLS.map((c) => (
            <Card key={c.title}>
              <CardHeader className="pb-2">
                <div className="flex items-start gap-2">
                  <c.icon className="mt-0.5 h-5 w-5 shrink-0 text-sky-600 dark:text-sky-400" />
                  <CardTitle className="text-sm leading-tight">{c.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <div>
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                    現状
                  </div>
                  <p className="leading-relaxed">{c.current}</p>
                </div>
                {c.planned && (
                  <div>
                    <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-400">
                      予定
                    </div>
                    <p className="leading-relaxed">{c.planned}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          サブプロセッサー一覧
        </h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 text-left text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                    <th className="px-4 py-2.5">事業者名</th>
                    <th className="px-4 py-2.5">処理目的</th>
                    <th className="px-4 py-2.5">処理地域</th>
                  </tr>
                </thead>
                <tbody>
                  {SUBPROCESSORS.map((s) => (
                    <tr
                      key={s.name}
                      className="border-b border-zinc-100 last:border-b-0 dark:border-zinc-900"
                    >
                      <td className="px-4 py-2.5 font-medium text-zinc-900 dark:text-zinc-100">
                        {s.name}
                      </td>
                      <td className="px-4 py-2.5 text-zinc-700 dark:text-zinc-300">{s.purpose}</td>
                      <td className="px-4 py-2.5 text-zinc-600 dark:text-zinc-400">{s.region}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          サブプロセッサーの追加・変更は{" "}
          <Link href="/legal/dpa" className="underline">
            データ処理委託契約 (DPA)
          </Link>
          に従い、変更日 30 日前までに法人管理者へ通知します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          法人パイロット・お問い合わせ
        </h2>
        <Card>
          <CardContent className="space-y-3 p-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <p>
              法人での導入検討にあたり、CAIQ / SIG-Lite 等のセキュリティ質問票へのご回答、
              個別 NDA 締結後の Readiness Assessment 共有、PoC 期間中のサポートをご提供します。
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="primary" size="sm">
                <Link href="/enterprise/pilot">無料 3ヶ月パイロットを申し込む</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/legal/msa">MSA テンプレート</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/legal/dpa">DPA を確認する</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/legal/sla">SLA を確認する</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/enterprise/sso">SSO 対応予定を見る</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/trust">信頼性ポリシー</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/case-studies">導入事例を見る</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
