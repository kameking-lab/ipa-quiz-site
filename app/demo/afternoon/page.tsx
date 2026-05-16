import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, FileEdit, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AfternoonGradingDemo } from "@/components/demo/AfternoonGradingDemo";

export const metadata: Metadata = {
  title: "午後 AI 採点デモ — 高度試験6区分の記述・論述添削を体験",
  description:
    "SC/ST/SA/PM/SM/AU の午後問題を AI が観点別に採点する流れを、ログイン不要のデモで体験できます。模範解答・採点コメント例・改善ポイントを提示。",
  alternates: { canonical: "/demo/afternoon" },
  robots: { index: false, follow: true },
};

export default function AfternoonDemoPage() {
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
          <Badge variant="success">
            <Sparkles className="h-3 w-3" /> ログイン不要 / 体験デモ
          </Badge>
          <Badge variant="outline">高度試験 6 区分対応</Badge>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          午後 AI 採点デモ
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          高度試験の合否を分けるのは午後の記述・論述。 過去問AI は
          SC（情報処理安全確保支援士）/ ST / SA / PM / SM / AU の各区分について、
          AI による採点・観点別フィードバックを提供しています。
          以下のデモはモック結果を返します（本番採点は <Link href="/essay" className="font-medium text-sky-600 underline-offset-2 hover:underline dark:text-sky-400">/essay</Link> から）。
        </p>
      </header>

      <Card className="mb-8 border-sky-200 bg-sky-50/40 dark:border-sky-900/60 dark:bg-sky-950/20">
        <CardContent className="p-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          <strong className="text-zinc-900 dark:text-zinc-100">体験フロー:</strong>{" "}
          ① 区分を選択 → ② 設問を読む → ③ 解答を入力（または「サンプル答案を流し込む」） →
          ④「AI 採点を実行（デモ）」をクリック → ⑤ 観点別スコアと改善コメントが表示されます。
        </CardContent>
      </Card>

      <AfternoonGradingDemo />

      <section className="mt-12">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          競合との違い
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">
                <CheckCircle2 className="mr-1 inline h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                高度試験 100% カバー
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              主要な無料学習サイトでは午前 II 中心で、午後の記述・論述採点は対象外。 過去問AI
              は IPA 全 13 区分の午後を AI 採点でカバー。
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">
                <CheckCircle2 className="mr-1 inline h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                観点別ルーブリック
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              「適合度」「論理性」「具体性」「業種適合」の 4 軸で採点。総合スコアだけでなく、
              どの観点が弱かったかが一目で分かります。
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">
                <CheckCircle2 className="mr-1 inline h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                IPA 出典準拠
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              採点の基準は IPA 公表の出題趣旨・採点講評・解答例に基づきます。
              AI が独自の基準で採点するわけではありません。
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-10">
        <Card className="border-violet-200 bg-violet-50/40 dark:border-violet-900/60 dark:bg-violet-950/20">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <div className="mb-1 text-base font-bold text-zinc-900 dark:text-zinc-50">
                本番の採点を試す
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                論述添削（ST/SA/PM/SM/AU）と記述採点（SC/DB/NW/ES など）は
                <Link href="/essay" className="mx-1 font-medium text-violet-700 underline-offset-2 hover:underline dark:text-violet-300">
                  /essay
                </Link>
                から。β中は月 3 回まで無料。
              </p>
            </div>
            <Button asChild variant="primary">
              <Link href="/essay">
                論述添削を試す
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <p className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-400">
        <FileEdit className="mr-1 inline h-3.5 w-3.5" />
        本ページの採点結果はデモ目的のモックデータです。実際の採点は本番フローでご利用ください。
      </p>
      <p className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-400">
        出典: IPA 情報処理技術者試験
      </p>
    </main>
  );
}
