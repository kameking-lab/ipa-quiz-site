import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";

import { ExamSourceNotes } from "@/components/exam-library/exam-source-notes";
import { ExamNoteLinks, collectSubjectNoteLinks } from "@/components/exam-library/exam-note-links";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  QUALIFICATION_HUBS,
  findQualificationHub,
  qualificationHubPath,
  type QualificationHub,
} from "@/lib/exam-qualification-hubs";
import { getQualificationHubEntries } from "@/lib/exam-qualification-hub-data";
import {
  describeExamDate,
  examPath,
  type ExamCatalogEntry,
} from "@/lib/exam-library-model";
import { getExamPaperStats } from "@/lib/exam-library-papers";
import { SITE_BASE_URL } from "@/lib/seo/config";

interface QualificationHubPageProps {
  params: Promise<{ slug: string }>;
}

interface HubPaper {
  entry: ExamCatalogEntry;
  questionCount: number;
  scoredCount: number;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return QUALIFICATION_HUBS.map((hub) => ({ slug: hub.slug }));
}

function getHubPapers(hub: QualificationHub): HubPaper[] {
  return getQualificationHubEntries(hub).flatMap((entry) => {
    const stats = getExamPaperStats(entry.id);
    return stats
      ? [{ entry, questionCount: stats.questionCount, scoredCount: stats.scoredCount }]
      : [];
  });
}

function hubDescription(hub: QualificationHub, papers: readonly HubPaper[]): string {
  const subjectCount = new Set(papers.map(({ entry }) => entry.subject)).size;
  const questionCount = papers.reduce((sum, paper) => sum + paper.questionCount, 0);
  return `${hub.description} 現在、${subjectCount}科目・${papers.length}回・${questionCount.toLocaleString("ja-JP")}問を掲載しています。`;
}

export async function generateMetadata({ params }: QualificationHubPageProps): Promise<Metadata> {
  const { slug } = await params;
  const hub = findQualificationHub(slug);
  if (!hub) return {};
  const papers = getHubPapers(hub);
  return {
    title: `${hub.name}の過去問｜公表問題を無料で演習`,
    description: hubDescription(hub, papers),
    alternates: { canonical: qualificationHubPath(hub.slug) },
    robots: { index: true, follow: true },
  };
}

export default async function QualificationHubPage({ params }: QualificationHubPageProps) {
  const { slug } = await params;
  const hub = findQualificationHub(slug);
  if (!hub) notFound();

  const papers = getHubPapers(hub);
  if (papers.length === 0) notFound();

  const subjects = [...new Set(papers.map(({ entry }) => entry.subject))];
  const questionCount = papers.reduce((sum, paper) => sum + paper.questionCount, 0);
  const scoredCount = papers.reduce((sum, paper) => sum + paper.scoredCount, 0);
  const latest = [...papers].sort((a, b) => b.entry.date.localeCompare(a.entry.date))[0];
  const path = qualificationHubPath(hub.slug);
  const url = `${SITE_BASE_URL}${path}`;
  const description = hubDescription(hub, papers);
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${hub.name}の過去問`,
      description,
      url,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: papers.length,
        itemListElement: papers.map(({ entry }, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${entry.subject} ${describeExamDate(entry)}`,
          url: `${SITE_BASE_URL}${examPath(entry.id)}`,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "安全衛生の過去問",
          item: `${SITE_BASE_URL}/e-learning/exams`,
        },
        { "@type": "ListItem", position: 3, name: hub.name, item: url },
      ],
    },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <JsonLd data={schemas} />

      <nav aria-label="パンくずリスト" className="mb-5 text-sm text-muted-foreground">
        <Link
          href="/e-learning/exams"
          className="inline-flex min-h-11 items-center gap-2 hover:text-foreground hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          安全衛生の資格一覧へ
        </Link>
      </nav>

      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {hub.name}の過去問
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2" aria-label="掲載内容">
          <Badge variant="outline">{subjects.length}科目</Badge>
          <Badge variant="outline">{papers.length}回</Badge>
          <Badge variant="outline">{questionCount.toLocaleString("ja-JP")}問</Badge>
          <Badge variant="outline">公式正答で採点 {scoredCount.toLocaleString("ja-JP")}問</Badge>
        </div>
        {latest ? (
          <Button asChild variant="primary" size="lg" className="mt-5">
            <Link href={examPath(latest.entry.id)} prefetch={false}>
              最新の公表問題を解く
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        ) : null}
      </header>

      <section aria-labelledby="qualification-papers-heading">
        <h2 id="qualification-papers-heading" className="text-xl font-bold">
          科目・公表回を選ぶ
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          免許試験は公表時期、測定士・コンサルタント試験は実施日を表示しています。
        </p>

        <div className="mt-6 space-y-8">
          {subjects.map((subject) => {
            const subjectPapers = papers.filter(({ entry }) => entry.subject === subject);
            return (
              <section key={subject} id={`subject-section-${subject}`} aria-labelledby={`subject-${subject}`} className="scroll-mt-24">
                <h3 id={`subject-${subject}`} className="text-lg font-semibold">
                  {subject}
                </h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {subjectPapers.map(({ entry, questionCount: count, scoredCount: scored }) => (
                    <li key={entry.id}>
                      <Link
                        href={examPath(entry.id)}
                        prefetch={false}
                        className="group flex min-h-20 items-center justify-between gap-3 rounded-xl border border-border bg-card p-3.5 text-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                      >
                        <span>
                          <span className="block font-medium text-foreground">
                            {describeExamDate(entry)}
                          </span>
                          <span className="mt-1 block text-xs text-muted-foreground">
                            {scored > 0 ? `公式正答で採点 ${scored}問` : "模範解答で自己確認"}
                          </span>
                        </span>
                        <span className="flex shrink-0 items-center gap-2">
                          <Badge>{count}問</Badge>
                          <ChevronRight
                            className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <ExamNoteLinks
                  links={collectSubjectNoteLinks(subjectPapers.map(({ entry }) => entry), hub.group, subject)}
                  headingId={`subject-note-links-${subject}`}
                  heading={`${subject}の解説記事`}
                  headingLevel="h4"
                  className="mt-4"
                />
              </section>
            );
          })}
        </div>
      </section>

      <ExamSourceNotes groupIds={[hub.group]} className="mt-10" />

      <section aria-labelledby="related-qualifications-heading" className="mt-10">
        <h2 id="related-qualifications-heading" className="text-lg font-bold">
          ほかの安全衛生資格
        </h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {QUALIFICATION_HUBS.filter((candidate) => candidate.slug !== hub.slug).map(
            (candidate) => (
              <li key={candidate.slug}>
                <Link
                  href={qualificationHubPath(candidate.slug)}
                  className="flex min-h-11 items-center justify-between rounded-xl border border-border px-3 py-2 text-sm font-medium hover:border-primary/40 hover:bg-muted"
                >
                  {candidate.name}の過去問
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            ),
          )}
        </ul>
      </section>
    </div>
  );
}
