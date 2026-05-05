import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Hash } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { isPlaceholderExplanation } from "@/lib/questions/filter";
import type { ExamCode } from "@/lib/questions/types";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { questionPagePath } from "@/lib/seo/question-url";
import {
  findTopicByAnySlug,
  getHubTopics,
  getQuestionsByTopic,
} from "@/lib/seo/topics";
import { examLabel, formatYearSeason } from "@/lib/utils";

export const dynamicParams = false;

interface RouteParams {
  slug: string;
}

export async function generateStaticParams(): Promise<RouteParams[]> {
  return getHubTopics(80, 4).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const topic = findTopicByAnySlug(decoded);
  if (!topic) {
    return { title: "トピックが見つかりません", robots: { index: false } };
  }
  const title = `${topic.tag} の過去問・AI解説 | 情報処理技術者試験`;
  const description = `IPA 情報処理技術者試験の過去問のうち「${topic.tag}」を扱うものを横断的に収録。${topic.count}問の問題と AI 解説を提供します。`;
  const ogParams = new URLSearchParams({
    type: "topic",
    title: `#${topic.tag}`,
    subtitle: "トピック別過去問",
    body: description,
    count: String(topic.count),
  });
  const ogImageUrl = `${SITE_BASE_URL}/api/og?${ogParams.toString()}`;
  return {
    title,
    description,
    alternates: { canonical: `/topics/${encodeURIComponent(topic.slug)}` },
    openGraph: {
      title,
      description,
      url: `/topics/${encodeURIComponent(topic.slug)}`,
      type: "website",
      siteName: SITE_NAME,
      locale: "ja_JP",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function TopicHubPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const topic = findTopicByAnySlug(decoded);
  if (!topic) notFound();

  const pool = getQuestionsByTopic(topic.tag).sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    if (a.exam !== b.exam) return a.exam.localeCompare(b.exam);
    return a.qNumber - b.qNumber;
  });

  const examBreakdown = new Map<ExamCode, number>();
  for (const q of pool) {
    examBreakdown.set(q.exam, (examBreakdown.get(q.exam) ?? 0) + 1);
  }
  const examEntries = [...examBreakdown.entries()].sort((a, b) => b[1] - a[1]);

  const absUrl = `${SITE_BASE_URL}/topics/${encodeURIComponent(topic.slug)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${topic.tag} の過去問`,
        url: absUrl,
        inLanguage: "ja",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          { "@type": "ListItem", position: 2, name: "トピック", item: `${SITE_BASE_URL}/topics` },
          { "@type": "ListItem", position: 3, name: topic.tag, item: absUrl },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <JsonLd data={jsonLd} />

      <nav aria-label="パンくずリスト" className="mb-4 text-xs text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-foreground hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/topics" className="hover:text-foreground hover:underline">
              トピック
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {topic.tag}
          </li>
        </ol>
      </nav>

      <header className="mb-8">
        <Badge variant="soft" className="mb-3">
          <Hash className="h-3 w-3" />
          トピック
        </Badge>
        <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          #{topic.tag}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          IPA 情報処理技術者試験の過去問から「{topic.tag}」を扱う問題を試験区分横断で収録しています。
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <Badge variant="outline">{pool.length} 問</Badge>
          {examEntries.map(([exam, n]) => (
            <Badge key={exam} variant="outline">
              <Link href={`/${exam}`} className="hover:underline">
                {examLabel(exam)}
              </Link>
              <span className="ml-1 text-muted-foreground">{n}</span>
            </Badge>
          ))}
        </div>
      </header>

      <section aria-label="クイズを始める" className="mb-6">
        <Button asChild variant="gradient" size="xl" className="w-full font-semibold">
          <Link href={`/quiz?mode=topic&topic=${encodeURIComponent(topic.tag)}`}>
            このトピックでクイズを始める
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>

      <section aria-label="関連トピック" className="mb-6">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          他のトピックも見る
        </h2>
        <ul className="flex flex-wrap gap-1.5">
          {getHubTopics(20, 4)
            .filter((t) => t.slug !== topic.slug)
            .slice(0, 12)
            .map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/topics/${encodeURIComponent(t.slug)}`}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                >
                  #{t.tag}
                </Link>
              </li>
            ))}
        </ul>
      </section>

      <ul className="space-y-2">
        {pool.slice(0, 200).map((q) => {
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
                    <Badge variant="outline">{examLabel(q.exam)}</Badge>
                    <Badge variant="outline">{formatYearSeason(q.year, q.season)}</Badge>
                    <Badge variant="outline">{q.category}</Badge>
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

      {pool.length > 200 && (
        <p className="mt-6 text-center text-xs text-muted-foreground">
          上位 200 件を表示中（全 {pool.length} 件）
        </p>
      )}
    </main>
  );
}
