import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, FileText, History, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { ORG_ID, SITE_LOGO_IMAGE, STUDENT_AUDIENCE } from "@/lib/seo/structured-data";
import { ESSAY_EXAM_CODES, getEssayQuestionsByExam } from "@/lib/essay/load";
import { examLabel } from "@/lib/utils";

const ESSAY_DESCRIPTION =
  "ST/SA/PM/SM/AU の午後II論述問題を AI が IPA 元採点者プロンプトで添削。設問ア・イ・ウを業種別にフィードバック。";

export const metadata: Metadata = {
  title: "AI 論述添削 (午後II)",
  description: ESSAY_DESCRIPTION,
  alternates: { canonical: "/essay" },
};

export default function EssayHomePage() {
  const url = `${SITE_BASE_URL}/essay`;
  const examNames = ESSAY_EXAM_CODES.map((exam) => examLabel(exam)).join("・");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LearningResource",
        "@id": `${url}#learning-resource`,
        name: "AI 論述添削（午後II）",
        url,
        inLanguage: "ja",
        description: ESSAY_DESCRIPTION,
        learningResourceType: "AI 採点・添削",
        educationalLevel: "Professional",
        educationalUse: "Self-study",
        audience: STUDENT_AUDIENCE,
        teaches: `${examNames} の午後II論述対策`,
        publisher: {
          "@type": "Organization",
          "@id": ORG_ID,
          name: SITE_NAME,
          url: SITE_BASE_URL,
          logo: SITE_LOGO_IMAGE,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "AI 論述添削（午後II）",
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16 pt-8 sm:px-6">
      <JsonLd data={jsonLd} />
      <div
        role="note"
        className="mb-6 flex items-start gap-2 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100"
      >
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-300" />
        <p>
          <strong>本機能は AI（Gemini Flash-Lite）による参考評価です。</strong>
          IPA 公式の採点基準とは異なる場合があります。合否判定の根拠としてはご利用にならず、
          学習の参考としてご活用ください。
        </p>
      </div>
      <section className="mb-8 text-center">
        <div className="mb-3 flex justify-center">
          <Badge variant="success">
            <Sparkles className="h-3 w-3" /> Premium / β中は月3回まで無料
          </Badge>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          AI 論述添削 <span className="text-sky-600 dark:text-sky-400">（午後II）</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          高度試験の合否を分ける論述。IPA 元採点者プロンプトで AI が「適合度／論理性／具体性／業種事例」の 4 軸で採点。
          設問ア・イ・ウそれぞれに、良かった点・改善点・足りなかった要素を提示します。
        </p>
        <div className="mt-5 flex justify-center gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/account/essay-history">
              <History className="h-4 w-4" /> 採点履歴
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ESSAY_EXAM_CODES.map((exam) => {
          const questions = getEssayQuestionsByExam(exam);
          return (
            <Card key={exam}>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base">{examLabel(exam)}</CardTitle>
                  <Badge variant="outline">{questions.length} 問</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="mb-4 space-y-2 text-sm">
                  {questions.slice(0, 3).map((q) => (
                    <li key={q.id} className="flex items-start gap-2">
                      <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-zinc-400" />
                      <Link
                        href={`/essay/${exam}/${q.id}`}
                        className="text-zinc-700 hover:text-sky-700 hover:underline dark:text-zinc-300 dark:hover:text-sky-400"
                      >
                        {q.year}{q.season === "spring" ? "春" : "秋"} 問{q.qNumber} ──{" "}
                        {q.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                {questions.length > 3 && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    他 {questions.length - 3} 問
                  </p>
                )}
                {questions.length === 0 && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    準備中（順次追加）
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm dark:border-zinc-800 dark:bg-zinc-900/50">
        <h2 className="mb-2 text-base font-semibold">AI 添削の仕組み</h2>
        <ol className="list-decimal space-y-1 pl-5 text-zinc-600 dark:text-zinc-400">
          <li>業種を選択して、設問ア・イ・ウを記述（自動保存）</li>
          <li>AI（IPA 元採点者プロンプト）が 4 軸で採点 → A/B/C/不合格 のランク判定</li>
          <li>設問ごとの良かった点・改善点・不足要素・改善版例を表示</li>
          <li>採点結果は履歴に保存され、ランク推移を確認可能</li>
        </ol>
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          ※ AI 添削は学習補助です。実際の合否判定とは異なる場合があります。
        </p>
      </section>

      <p className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
        出典: IPA 情報処理技術者試験
      </p>
    </main>
  );
}
