import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";

import { AiContentNotice } from "@/components/AiContentNotice";
import { ESSAY_EXAM_CODES, getEssayQuestionsByExam } from "@/lib/essays/load";
import { examLabel } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "業種別合格答案サンプル",
  description:
    "IPA 高度情報処理技術者試験（SC/ST/SA/PM/SM/AU）午後 II 論述問題の業種別合格答案サンプル集。製造業・金融・公共・SaaS など実務シーンを想定した AI 生成の参考例で、設問への論点整理・章立て・字数配分まで一気通貫の構成骨格として活用できます。",
  alternates: { canonical: "/essays" },
  // 致命傷③: AI生成の架空の参考答案集なので検索インデックス対象外。
  robots: { index: false, follow: false },
};

export default function EssaysIndexPage() {
  const examStats = ESSAY_EXAM_CODES.map((exam) => ({
    exam,
    label: examLabel(exam),
    count: getEssayQuestionsByExam(exam).length,
  }));


  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16 pt-8 sm:px-6">
      <nav
        aria-label="パンくずリスト"
        className="mb-4 text-xs text-zinc-500 dark:text-zinc-400"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-zinc-700 dark:text-zinc-300">
            業種別合格答案サンプル
          </li>
        </ol>
      </nav>

      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <Shield className="h-6 w-6 text-sky-600 dark:text-sky-400" />
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            業種別{" "}
            <span className="text-sky-600 dark:text-sky-400">合格答案サンプル</span>
          </h1>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          IPA 高度情報処理技術者試験（SC / ST / SA / PM / SM / AU）午後 II 論述問題の
          業種別参考答案です。製造・金融・公共など自分の業務経験に近い業種を選んで、
          論述の骨格づくりにお役立てください。
        </p>
        <AiContentNotice
          className="mt-4"
          headline="AI生成の参考答案（架空）"
          body="IPA公式の合格答案ではありません。論述構成を学ぶために過去問AIが生成した架空の参考例で、合格を保証するものではありません。業種別シナリオも架空の事例であり、各業界の専門的助言・実務指南ではありません。"
        />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {examStats.map(({ exam, label, count }) => (
          <Card key={exam} className="flex flex-col">
            <CardHeader className="pb-2">
              <div className="mb-1">
                <Badge variant="soft" className="text-xs">
                  {label}
                </Badge>
              </div>
              <CardTitle className="text-base leading-snug">
                {label} 午後II 論述
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between">
              <p className="mb-4 text-xs text-zinc-500 dark:text-zinc-400">
                {count} 問の業種別サンプル答案を掲載中
              </p>
              <Button asChild variant="primary" size="md" className="w-full">
                <Link href={`/essays/${exam}`}>
                  答案サンプルを見る
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
