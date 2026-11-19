import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ESSAY_EXAM_CODES, getEssayQuestionsByExam } from "@/lib/essay/load";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { examLabel } from "@/lib/utils";

const title = "IPA 論文対策";
const description = "ST・SA・PM・AU・SMの論述練習問題と、設問ア・イ・ウの解答骨子。";
const url = SITE_BASE_URL + "/essay";
const ogImage = SITE_BASE_URL + "/api/og?" + new URLSearchParams({ type: "essay", title, body: description });

const ESSAY_GUIDE_POSTS = [
  { slug: "koudo-ronjutsu-kakikata-kotsu", label: "論文の構成と書き方" },
  { slug: "koudo-ronbun-jikan-haibun", label: "論文の時間配分" },
  { slug: "koudo-ronbun-hyouka-rank", label: "評価ランク（A〜D）" },
  { slug: "koudo-ronjutsu-jiko-saiten", label: "自分の論述を見直す観点" },
];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/essay" },
  openGraph: { title, description, url, siteName: SITE_NAME, locale: "ja_JP", images: [ogImage] },
  twitter: { title, description, card: "summary_large_image", images: [ogImage] },
};

export default function EssayHomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LearningResource",
        "@id": url + "#learning-resource",
        name: title,
        url,
        description,
        inLanguage: "ja",
        learningResourceType: "練習問題",
        teaches: ESSAY_EXAM_CODES.map((exam) => examLabel(exam)).join("・") + "の論述対策",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          { "@type": "ListItem", position: 2, name: title, item: url },
        ],
      },
    ],
  };
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16 pt-8 sm:px-6">
      <JsonLd data={jsonLd} />
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">IPA 論文対策</h1>
        <p className="mt-3 text-sm text-muted-foreground">設問ア・イ・ウの練習問題と解答骨子。練習問題は編集部作成です。</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        {ESSAY_EXAM_CODES.map((exam) => (
          <section key={exam} className="rounded-2xl border border-border p-5">
            <h2 className="font-semibold">{examLabel(exam)}</h2>
            <ul className="mt-3 space-y-3 text-sm">
              {getEssayQuestionsByExam(exam).map((question) => (
                <li key={question.id}>
                  <Link href={"/essay/" + exam + "/" + question.id} className="text-primary hover:underline">{question.title}</Link>
                </li>
              ))}
            </ul>
            {exam === "pm" && <details className="mt-3">
              <summary className="min-h-11 cursor-pointer py-3 text-sm font-medium">プロジェクトマネージャの資料</summary>
              <Link href="/essay/preview" className="inline-block py-2 text-sm text-primary underline">ヒアリングから論文を組み立てる例を見る</Link>
            </details>}
          </section>
        ))}
      </div>
      <details className="mt-6 rounded-2xl border border-border px-5 pb-3">
        <summary className="min-h-11 cursor-pointer py-3 font-semibold">論述の書き方・参考書</summary>
        <ul className="mt-3 space-y-2 text-sm">
          {ESSAY_GUIDE_POSTS.map((p) => (
            <li key={p.slug}><Link href={`/blog/${p.slug}`} className="text-primary hover:underline">{p.label}</Link></li>
          ))}
          <li><Link href="/recommended-books" className="text-primary hover:underline">論文対策の参考書</Link></li>
        </ul>
      </details>
    </main>
  );
}
