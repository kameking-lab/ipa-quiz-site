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

const ESSAY_OG_TITLE = "AI 論述添削（午後II）";
const ESSAY_OG_IMAGE = `${SITE_BASE_URL}/api/og?${new URLSearchParams({
  type: "essay",
  title: ESSAY_OG_TITLE,
  body: ESSAY_DESCRIPTION,
}).toString()}`;

// Objection-handling FAQ for the flagship hub. Single source for both the
// rendered <section> and the FAQPage JSON-LD so the visible text and structured
// data can never drift. Content is strictly factual: covered exams come from the
// 論文5区分 only (no AP/FE over-claim), accuracy is framed as 参考評価, and no
// quota/price numbers are asserted (those are 承認必須 / SSOT-owned elsewhere).
const ESSAY_FAQ: { question: string; answer: string }[] = [
  {
    question: "AI 論述添削は何の試験区分に対応していますか？",
    answer:
      "午後II に論述（論文）が出題される高度試験5区分 ── ITストラテジスト・システムアーキテクト・プロジェクトマネージャ・ITサービスマネージャ・システム監査技術者 ── に対応しています。設問ア・イ・ウの記述を AI が添削します。",
  },
  {
    question: "AI の採点はどのくらい正確ですか？",
    answer:
      "AI（Gemini Flash-Lite）による参考評価です。「適合度・論理性・具体性・業種事例」の4軸でフィードバックしますが、IPA 公式の採点基準とは異なる場合があります。合否判定の根拠にはご利用にならず、学習の参考としてお使いください。",
  },
  {
    question: "ほかの過去問サイトと何が違うのですか？",
    answer:
      "多くの過去問サイトは午前の四択問題や解説の閲覧が中心で、午後II の論述を「採点」する機能は提供していません。過去問AI は、あなたが書いた論述を AI が採点し、設問ごとの良かった点・改善点・改善版例まで提示する点が特徴です。",
  },
  {
    question: "採点結果は保存されますか？",
    answer:
      "採点結果は A／B／C／不合格 のランク判定とともに採点履歴に保存され、複数回の採点を通じてランクの推移を確認できます。",
  },
];

export const metadata: Metadata = {
  title: "AI 論述添削 (午後II)",
  description: ESSAY_DESCRIPTION,
  alternates: { canonical: "/essay" },
  openGraph: {
    title: ESSAY_OG_TITLE,
    description: ESSAY_DESCRIPTION,
    url: "/essay",
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
    images: [{ url: ESSAY_OG_IMAGE, width: 1200, height: 630, alt: ESSAY_OG_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: ESSAY_OG_TITLE,
    description: ESSAY_DESCRIPTION,
    images: [ESSAY_OG_IMAGE],
  },
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
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: ESSAY_FAQ.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
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

      <section
        aria-labelledby="essay-faq-heading"
        className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm dark:border-zinc-800 dark:bg-zinc-900/50"
      >
        <h2
          id="essay-faq-heading"
          className="mb-3 text-base font-semibold text-zinc-900 dark:text-zinc-50"
        >
          よくある質問
        </h2>
        <dl className="space-y-4">
          {ESSAY_FAQ.map((f) => (
            <div key={f.question}>
              <dt className="font-medium text-zinc-800 dark:text-zinc-200">
                {f.question}
              </dt>
              <dd className="mt-1 leading-relaxed text-zinc-600 dark:text-zinc-400">
                {f.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
        論述対策をさらに深めるなら{" "}
        <Link
          href="/recommended-books"
          className="font-medium text-sky-600 hover:underline dark:text-sky-400"
        >
          各区分の合格論文・午後対策の参考書
        </Link>
        も活用できます。
      </p>

      <p className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
        出典: IPA 情報処理技術者試験
      </p>
    </main>
  );
}
