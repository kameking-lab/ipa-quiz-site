import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Tags } from "lucide-react";

import type { ExamCode } from "@/lib/questions/types";
import { examLabel, formatYearSeason } from "@/lib/utils";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import {
  getAvailableExams,
  getQuestionsByExamStrict,
  groupByCategory,
} from "@/lib/seo/exam-meta";
import { questionPagePath } from "@/lib/seo/question-url";
import { isPlaceholderExplanation } from "@/lib/questions/filter";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamicParams = false;

interface RouteParams {
  exam: string;
  topicSlug: string;
}

export async function generateStaticParams(): Promise<RouteParams[]> {
  const out: RouteParams[] = [];
  for (const exam of getAvailableExams()) {
    const cats = groupByCategory(getQuestionsByExamStrict(exam));
    for (const c of cats) {
      out.push({ exam, topicSlug: c.category });
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { exam, topicSlug } = await params;
  if (!getAvailableExams().includes(exam as ExamCode)) {
    return { title: "分野が見つかりません", robots: { index: false } };
  }
  const category = decodeURIComponent(topicSlug);
  const title = `${examLabel(exam as ExamCode)} ${category} 過去問・解説`;
  const description = `${examLabel(exam as ExamCode)}試験の「${category}」分野の過去問をまとめて確認できます。AI解説付きで理解を深められます。`;
  const ogImageUrl = `${SITE_BASE_URL}/api/og?${new URLSearchParams({
    type: "topic",
    title: category,
    subtitle: `${examLabel(exam as ExamCode)} 分野別`,
  }).toString()}`;
  return {
    title,
    description,
    alternates: { canonical: `/${exam}/topic/${encodeURIComponent(category)}` },
    openGraph: {
      title,
      description,
      url: `/${exam}/topic/${encodeURIComponent(category)}`,
      type: "website",
      siteName: SITE_NAME,
      locale: "ja_JP",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImageUrl] },
  };
}

export default async function ExamTopicPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { exam, topicSlug } = await params;
  if (!getAvailableExams().includes(exam as ExamCode)) notFound();
  const category = decodeURIComponent(topicSlug);
  const code = exam as ExamCode;
  const pool = getQuestionsByExamStrict(code)
    .filter((q) => q.category === category)
    .sort((a, b) => (b.year !== a.year ? b.year - a.year : a.qNumber - b.qNumber));
  if (pool.length === 0) notFound();

  const absUrl = `${SITE_BASE_URL}/${exam}/topic/${encodeURIComponent(category)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${examLabel(code)} ${category} 過去問`,
        url: absUrl,
        inLanguage: "ja",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: examLabel(code),
            item: `${SITE_BASE_URL}/${exam}`,
          },
          { "@type": "ListItem", position: 3, name: category, item: absUrl },
        ],
      },
    ],
  };

  return (
    <main className="relative flex-1">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-spotlight"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-grid opacity-30 [mask-image:radial-gradient(60%_50%_at_50%_0%,#000_30%,transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-3xl px-4 pb-20 pt-6 sm:px-6 sm:pt-10">
        <JsonLd data={jsonLd} />

        <nav
          aria-label="パンくずリスト"
          className="mb-4 text-xs text-muted-foreground"
        >
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="inline-block py-1.5 hover:text-foreground hover:underline">
                ホーム
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/${exam}`}
                className="inline-block py-1.5 hover:text-foreground hover:underline"
              >
                {examLabel(code)}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {category}
            </li>
          </ol>
        </nav>

        <header className="mb-8 animate-fade-in">
          <Badge variant="soft" className="mb-3">
            <Tags className="h-3 w-3" />
            {examLabel(code)}
          </Badge>
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {examLabel(code)}{" "}
            <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              {category}
            </span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            分野「{category}」の過去問を一覧で確認できます。
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <Badge variant="outline">{pool.length} 問</Badge>
          </div>
        </header>

        <section aria-label="クイズを始める" className="mb-8">
          <Button
            asChild
            variant="gradient"
            size="xl"
            className="w-full font-semibold shadow-md hover:shadow-lg"
          >
            <Link
              href={`/quiz?mode=topic&exam=${exam}&category=${encodeURIComponent(category)}`}
            >
              この分野でクイズを始める
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </section>

        <ul className="space-y-2">
          {pool.map((q) => {
            const isPlaceholder = isPlaceholderExplanation(q);
            return (
              <li key={q.id}>
                <Link
                  href={questionPagePath(q)}
                  className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <span className="flex h-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft px-2.5 text-xs font-bold text-primary-soft-foreground">
                    {q.qNumber}
                  </span>
                  <span className="flex-1 space-y-1.5 min-w-0">
                    <span className="flex flex-wrap items-center gap-1.5 text-xs">
                      <Badge variant="outline">
                        {formatYearSeason(q.year, q.season)}
                      </Badge>
                      {q.isCalculation && <Badge variant="warn">計算</Badge>}
                      {isPlaceholder && <Badge variant="warn">解説準備中</Badge>}
                    </span>
                    <span className="line-clamp-2 block text-sm leading-relaxed text-foreground">
                      {q.question.slice(0, 140)}
                      {q.question.length > 140 ? "…" : ""}
                    </span>
                  </span>
                  <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
