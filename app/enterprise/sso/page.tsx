import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, KeyRound, Users, ShieldCheck, Workflow } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Enterprise SSO（SAML / SCIM）対応予定",
  description:
    "過去問AI の SAML 2.0 SSO / SCIM 2.0 プロビジョニング対応予定。Okta / Azure AD / Google Workspace 連携を Phase 1 で実装予定。",
  alternates: { canonical: "/enterprise/sso" },
};

const PROVIDERS = [
  { name: "Okta", desc: "Workforce Identity Cloud に対応予定" },
  { name: "Microsoft Entra ID (旧 Azure AD)", desc: "ギャラリーアプリ登録予定" },
  { name: "Google Workspace", desc: "Cloud Identity / SAML カスタムアプリ対応予定" },
];

const FEATURES = [
  {
    icon: KeyRound,
    title: "SAML 2.0 シングルサインオン",
    desc: "貴社 IdP からの SP-Initiated / IdP-Initiated 両方の SSO に対応予定。Just-In-Time プロビジョニング対応。",
  },
  {
    icon: Users,
    title: "SCIM 2.0 自動プロビジョニング",
    desc: "アカウントの作成・更新・無効化を IdP 側のグループ操作で自動同期。退職者の即時アクセス遮断を実現。",
  },
  {
    icon: ShieldCheck,
    title: "強制 SSO ポリシー",
    desc: "貴社ドメイン (例: @example.co.jp) のメンバーは SSO 経由でのみログイン可能とする強制設定が可能。",
  },
  {
    icon: Workflow,
    title: "属性マッピング",
    desc: "IdP 属性 (department, manager, costCenter 等) を 過去問AI 側の部署・グループに自動マッピング。",
  },
];

export default function EnterpriseSsoPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 pt-6 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/security">
          <ArrowLeft className="h-4 w-4" />
          セキュリティページに戻る
        </Link>
      </Button>

      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="outline">法人向け</Badge>
          <Badge variant="default">Phase 1 (2026 Q3) 予定</Badge>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Enterprise SSO 対応予定
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          法人での導入を前提に、SAML 2.0 SSO および SCIM 2.0 プロビジョニング対応を
          2026 年 Q3 (Phase 1) で実装予定です。本ページは予定機能を稟議用にまとめたランディングです。
        </p>
      </header>

      <Card className="mb-6 border-amber-300 bg-amber-50/60 dark:border-amber-800 dark:bg-amber-950/30">
        <CardContent className="p-4 text-sm leading-relaxed text-amber-900 dark:text-amber-100">
          <strong>現状 (2026-04-26 時点):</strong> SAML SSO は<strong>未実装</strong>です。
          現在のログイン方式は Email + パスワード のみ。Phase 1 リリース時に{" "}
          <code className="rounded bg-amber-200/50 px-1 font-mono text-xs dark:bg-amber-900/40">
            /api/auth/saml
          </code>
          {" "}エンドポイントが有効化され、本ページに設定手順を追記します。
        </CardContent>
      </Card>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          対応予定 IdP
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {PROVIDERS.map((p) => (
            <Card key={p.name}>
              <CardContent className="p-4">
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {p.name}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {p.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          実装予定機能
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <Card key={f.title}>
              <CardHeader className="pb-2">
                <div className="flex items-start gap-2">
                  <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-sky-600 dark:text-sky-400" />
                  <CardTitle className="text-sm leading-tight">{f.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                {f.desc}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">パイロット申込時の SSO 事前準備</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <p>
              法人パイロット契約時点では Email 認証でご利用開始いただきますが、
              Phase 1 リリース時にスムーズに移行できるよう、以下の事前情報を申込フォームの
              自由記述欄でお知らせください。
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>使用予定の IdP（Okta / Entra ID / Google Workspace 等）</li>
              <li>SSO 必須の社内ポリシーがあるか</li>
              <li>SCIM 自動プロビジョニング要件の有無</li>
              <li>強制 SSO とすべき会社ドメイン</li>
            </ul>
            <div className="pt-2">
              <Button asChild variant="primary" size="sm">
                <Link href="/enterprise/pilot">パイロットを申し込む</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
