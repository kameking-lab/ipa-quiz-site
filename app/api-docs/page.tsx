import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Key, Terminal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE_BASE_URL } from "@/lib/seo/config";
import { SwaggerUiClient } from "./SwaggerUiClient";

export const metadata: Metadata = {
  title: "Public API ドキュメント",
  description:
    "過去問AI Public API（β）の OpenAPI 仕様。13 試験区分の問題データ・採点機能を JSON で提供します。",
  alternates: { canonical: "/api-docs" },
  robots: { index: false, follow: true },
};

export default function ApiDocsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
      <header className="mb-8">
        <div className="mb-3 flex items-center gap-1.5">
          <Badge variant="primary">
            <Terminal className="mr-1 h-3 w-3" />
            Public API β
          </Badge>
        </div>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          API ドキュメント
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          IPA 情報処理技術者試験 13 区分の問題データを JSON で取得できる Public API。
          学習塾・教育系プロダクト・社内研修など、過去問AI 以外の場所でも利用できます。
          β 版のためレスポンス構造・URL は変更になる可能性があります。
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild variant="primary" size="sm">
            <Link href="/settings/api-keys">
              <Key className="h-4 w-4" />
              API キーを取得
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href="/api/v1/openapi" target="_blank" rel="noreferrer">
              OpenAPI JSON
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Stat label="エンドポイント" value="3" sub="exams / questions / grade" />
          <Stat label="認証" value="Bearer" sub="任意（無くても動作）" />
          <Stat label="レート制限" value="10/日" sub="1 分 15 リクエスト" />
        </div>
      </header>

      <section className="mb-8 rounded-2xl border border-border bg-card p-5">
        <h2 className="text-base font-semibold text-foreground">クイックスタート</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          curl で疎通確認したい場合は次のコマンドが使えます（API キーなしでも動作）。
        </p>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-muted/40 p-3 text-xs leading-relaxed">
          <code>{`curl ${SITE_BASE_URL}/api/v1/exams

curl "${SITE_BASE_URL}/api/v1/questions?exam=ap&limit=5"

curl -X POST ${SITE_BASE_URL}/api/v1/grade \\
  -H "Content-Type: application/json" \\
  -d '{"questionId":"ap-2024a-am-q1","answer":"ア"}'`}</code>
        </pre>
      </section>

      <SwaggerUiClient />
    </main>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-xl font-bold tracking-tight text-foreground">{value}</div>
      <div className="mt-0.5 text-[11px] text-muted-foreground">{sub}</div>
    </div>
  );
}
