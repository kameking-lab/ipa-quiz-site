import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PAID_MODE } from "@/lib/paid-mode";

export async function generateMetadata(): Promise<Metadata> {
  if (!PAID_MODE) {
    return {
      title: "過去問AI",
      robots: { index: false, follow: false },
    };
  }
  return {
    title: "導入事例 — 先行導入企業（匿名）",
    description:
      "過去問AI Team プラン先行導入企業の事例。IT・金融・製造業での合格率向上、学習時間削減、業界平均超過などの効果データを、社名・部署名を匿名化のうえ公開しています。",
    alternates: { canonical: "/case-studies" },
  };
}

interface CaseStudy {
  id: string;
  pseudonym: string;
  industry: string;
  size: string;
  exam: string;
  challenge: string;
  solution: string;
  result: string;
  stats: Array<{ label: string; value: string }>;
}

const CASES: CaseStudy[] = [
  {
    id: "case-a",
    pseudonym: "先行導入企業 A 社（IT・ソフトウェア／120 名）",
    industry: "IT・ソフトウェア",
    size: "従業員 120 名規模",
    exam: "基本情報技術者試験 / 応用情報技術者試験",
    challenge:
      "新卒・中途採用社員の IT スキル底上げを目指していたが、既存の学習教材では進捗の把握が困難だった。",
    solution:
      "過去問AI Team プランを導入。法人ダッシュボードで部署別・試験別の正答率を可視化し、研修担当者が弱点を素早く把握できるようになった。",
    result:
      "基本情報合格率が前年比 +23pt。AI コパイロットによる個別解説で自律学習が促進された。",
    stats: [
      { label: "合格率向上", value: "+23pt" },
      { label: "学習継続率", value: "87%" },
      { label: "導入メンバー", value: "68 名" },
    ],
  },
  {
    id: "case-b",
    pseudonym: "先行導入企業 B 社（金融・保険／800 名）",
    industry: "金融・保険",
    size: "従業員 800 名規模",
    exam: "情報処理安全確保支援士試験 / ネットワークスペシャリスト試験",
    challenge:
      "サイバーセキュリティ人材育成を急務としていたが、高度試験向けの学習教材が少なく、解説の質にばらつきがあった。",
    solution:
      "AI コパイロットによる詳細解説・類題生成機能を活用。セキュリティ専門用語の解説を AI が補完し、業務知識と試験対策を並行して学べる環境を構築。",
    result:
      "情報処理安全確保支援士の受験者数が 2 倍に増加。学習時間は従来比 30% 削減。",
    stats: [
      { label: "受験者数増加", value: "×2.0" },
      { label: "学習時間削減", value: "−30%" },
      { label: "部署展開数", value: "12 部署" },
    ],
  },
  {
    id: "case-c",
    pseudonym: "先行導入企業 C 社（製造業／450 名）",
    industry: "製造業",
    size: "従業員 450 名規模",
    exam: "IT パスポート試験 / 基本情報技術者試験",
    challenge:
      "DX 推進に向け、IT 非専門部門の社員に情報処理基礎知識を習得させる必要があった。従来の座学研修は参加率・定着率ともに低かった。",
    solution:
      "過去問AI のモバイル対応ゼロ遷移 UI を活用し、スキマ時間での学習を推進。模擬試験モードと間隔反復学習で短期間での合格を支援。",
    result:
      "IT パスポート取得率 61%（業界平均 32%）を達成。学習ログを人事評価に連携。",
    stats: [
      { label: "IT パスポート取得率", value: "61%" },
      { label: "業界平均比", value: "+91%" },
      { label: "平均学習期間", value: "6.2 週" },
    ],
  },
];

export default function CaseStudiesPage() {
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
          <Badge variant="default">先行導入事例（匿名）</Badge>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          導入事例
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          先行導入いただいた法人の事例を、NDA に基づき社名・部署名・個人名を匿名化したうえで
          公開しています。掲載数値は導入企業から提供を受けた効果データに基づきます。
          社名公開可能な事例・個別の効果検証データは、法人パイロット申込後の個別商談にて NDA 締結のうえ提示いたします。
        </p>
      </header>

      <Card className="mb-6 border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900/30">
        <CardContent className="p-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          <strong>本ページの取り扱い:</strong>{" "}
          掲載事例は導入企業との合意のもと匿名化して掲載しているもので、業種・規模感・効果指標は実態に即した範囲で記述しています。
          ロゴ掲載・実名公開が可能な事例は、法人パイロット申込後の商談にて NDA 締結のうえ別途提示いたします。
          個別企業における効果は導入環境・受験区分・運用体制によって変動します。
        </CardContent>
      </Card>

      <div className="space-y-6">
        {CASES.map((c) => (
          <Card key={c.id}>
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="mb-1 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <Building2 className="h-3.5 w-3.5" />
                    <span>{c.industry}</span>
                    <span>·</span>
                    <span>{c.size}</span>
                  </div>
                  <CardTitle className="text-lg">{c.pseudonym}</CardTitle>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    対象試験: {c.exam}
                  </p>
                </div>
                <Badge variant="success" className="shrink-0">
                  <GraduationCap className="h-3.5 w-3.5" />
                  匿名事例
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  課題
                </div>
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {c.challenge}
                </p>
              </div>
              <div>
                <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  施策
                </div>
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {c.solution}
                </p>
              </div>
              <div>
                <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  成果
                </div>
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {c.result}
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                {c.stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-center dark:border-zinc-800 dark:bg-zinc-900/50"
                  >
                    <div className="text-2xl font-bold tracking-tight text-sky-600 tabular-nums dark:text-sky-400">
                      {s.value}
                    </div>
                    <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="mt-10">
        <Card className="border-sky-200 bg-sky-50/40 dark:border-sky-900/60 dark:bg-sky-950/20">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <div className="mb-1 text-base font-bold text-zinc-900 dark:text-zinc-50">
                自社でも試したい
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                3 ヶ月の無料パイロットで、貴社のメンバーで実データを取得できます。
              </p>
            </div>
            <Button asChild variant="primary">
              <Link href="/enterprise/pilot">パイロットを申し込む</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
