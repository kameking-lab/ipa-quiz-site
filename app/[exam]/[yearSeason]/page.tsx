import { practiceSessionLabel } from "@/lib/questions/practice-session";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Sparkles } from "lucide-react";

import type { ExamCode, Season } from "@/lib/questions/types";
import { examLabelAt } from "@/lib/exam-naming/history";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { examLabel, formatYearSeason } from "@/lib/utils";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import {
  getAvailableExams,
  getQuestionsByExamStrict,
  groupByYearSeason,
} from "@/lib/seo/exam-meta";
import { questionPagePath } from "@/lib/seo/question-url";
import { isPlaceholderExplanation } from "@/lib/questions/filter";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  QuestionListWithFilter,
  type SessionGroup,
} from "./QuestionListWithFilter";

export const dynamicParams = false;

interface RouteParams {
  exam: string;
  yearSeason: string;
}

const CIVIL2_EXAM_SECTIONS = [
  { id: "civil2-required-basic", label: "土木一般・必須 1〜5", first: 1, last: 5 },
  { id: "civil2-select-basic", label: "土木一般・9問選択 6〜16", first: 6, last: 16 },
  { id: "civil2-select-specialized", label: "専門土木・6問選択 17〜36", first: 17, last: 36 },
  { id: "civil2-select-law", label: "法規・6問選択 37〜47", first: 37, last: 47 },
  { id: "civil2-required-management", label: "施工管理・必須 48〜66", first: 48, last: 66 },
] as const;

/** 2級管工事 第一次検定の公式区分（前期・後期とも同じ番号構成）。 */
/** 1級土木 第一次検定の公式区分。問題Aと問題Bは同じ番号を使うため session で区別する。 */
const CIVIL1_EXAM_SECTIONS = [
  { id: "civil1-a-required", label: "問題A・必須 1〜5", session: "mondai-a", first: 1, last: 5 },
  { id: "civil1-a-select-basic", label: "問題A・土木一般・12問選択 6〜20", session: "mondai-a", first: 6, last: 20 },
  { id: "civil1-a-select-specialized", label: "問題A・専門土木・10問選択 21〜54", session: "mondai-a", first: 21, last: 54 },
  { id: "civil1-a-select-law", label: "問題A・法規・8問選択 55〜66", session: "mondai-a", first: 55, last: 66 },
  { id: "civil1-b-required", label: "問題B・必須 1〜20", session: "mondai-b", first: 1, last: 20 },
  { id: "civil1-b-required-applied", label: "問題B・施工管理法（応用能力）・必須 21〜35", session: "mondai-b", first: 21, last: 35 },
] as const;

const KANKOJI2_EXAM_SECTIONS = [
  { id: "kankoji2-required-basic", label: "一般基礎・必須 1〜6", first: 1, last: 6 },
  { id: "kankoji2-select-equipment", label: "空調・衛生設備・9問選択 7〜23", first: 7, last: 23 },
  { id: "kankoji2-required-materials", label: "設備機器・材料・必須 24〜28", first: 24, last: 28 },
  { id: "kankoji2-select-management", label: "施工管理法・8問選択 29〜38", first: 29, last: 38 },
  { id: "kankoji2-select-law", label: "法規・8問選択 39〜48", first: 39, last: 48 },
  { id: "kankoji2-required-ability", label: "施工管理法（基礎的な能力）・必須・各2肢選択 49〜52", first: 49, last: 52 },
] as const;

export async function generateStaticParams(): Promise<RouteParams[]> {
  const out: RouteParams[] = [];
  for (const exam of getAvailableExams()) {
    const groups = groupByYearSeason(getQuestionsByExamStrict(exam));
    for (const g of groups) {
      out.push({ exam, yearSeason: g.key });
    }
  }
  return out;
}

function parseYearSeason(slug: string): { year: number; season: Season } | null {
  const m = /^(\d{4})-(spring|autumn|cbt|published|first|second|early|may|september|january|october|late|annual|july)$/.exec(slug);
  if (!m) return null;
  return { year: Number(m[1]), season: m[2] as Season };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { exam, yearSeason } = await params;
  if (!getAvailableExams().includes(exam as ExamCode)) {
    return { title: "年度が見つかりません", robots: { index: false } };
  }
  const parsed = parseYearSeason(yearSeason);
  if (!parsed) return { title: "年度が見つかりません", robots: { index: false } };
  const pool = getQuestionsByExamStrict(exam as ExamCode).filter(q => q.year === parsed.year && q.season === parsed.season);
  const commonOnly = pool.length > 0 && pool.every(q => q.session === "am1");
  const label = pool[0] ? questionSourceEdition(pool[0]) : formatYearSeason(parsed.year, parsed.season);
  const histLabel = commonOnly ? "高度試験共通 午前I" : examLabelAt(exam as ExamCode, parsed.year, parsed.season);
  const title = `${label} ${histLabel} 過去問一覧`;
  const description = `${label}の${histLabel}の収録問題を一覧で確認できます。解説付きで効率的に学習を進められます。`;
  const ogImageUrl = `${SITE_BASE_URL}/api/og?${new URLSearchParams({
    type: "exam",
    title: `${label} ${histLabel}`,
    subtitle: "過去問一覧",
  }).toString()}`;
  return {
    title,
    description,
    alternates: { canonical: `/${exam}/${yearSeason}` },
    openGraph: {
      title,
      description,
      url: `/${exam}/${yearSeason}`,
      type: "website",
      siteName: SITE_NAME,
      locale: "ja_JP",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImageUrl] },
  };
}

export default async function ExamYearSeasonPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { exam, yearSeason } = await params;
  if (!getAvailableExams().includes(exam as ExamCode)) notFound();
  const parsed = parseYearSeason(yearSeason);
  if (!parsed) notFound();

  const code = exam as ExamCode;
  const all = getQuestionsByExamStrict(code);
  const pool = all
    .filter((q) => q.year === parsed.year && q.season === parsed.season)
    .sort((a, b) => (a.session === b.session ? a.qNumber - b.qNumber : a.session.localeCompare(b.session)));
  if (pool.length === 0) notFound();

  const commonOnly = pool.every(q => q.session === "am1");
  const label = questionSourceEdition(pool[0]!);
  const histLabel = commonOnly ? "高度試験共通 午前I" : examLabelAt(code, parsed.year, parsed.season);
  const absUrl = `${SITE_BASE_URL}/${exam}/${yearSeason}`;

  const sessionMap = new Map<string, typeof pool>();
  for (const q of pool) {
    if (!sessionMap.has(q.session)) sessionMap.set(q.session, []);
    sessionMap.get(q.session)!.push(q);
  }
  let sessionGroups: SessionGroup[] = [...sessionMap.entries()].map(
    ([session, items]) => ({
      session,
      items: items.map((q) => ({
        id: q.id,
        qNumber: q.qNumber,
        category: q.category,
        isCalculation: !!q.isCalculation,
        isPlaceholder: isPlaceholderExplanation(q),
        questionPreview:
          q.question.length > 140
            ? `${q.question.slice(0, 140)}…`
            : q.question,
        href: questionPagePath(q),
      })),
    }),
  );
  const civil2Sections = code === "civil2" && parsed.year === 2026 && parsed.season === "early"
    ? CIVIL2_EXAM_SECTIONS
    : code === "kankoji2"
      ? KANKOJI2_EXAM_SECTIONS
      : null;
  if (code === "civil1") {
    sessionGroups = CIVIL1_EXAM_SECTIONS.map((section) => ({
      session: section.label,
      id: section.id,
      items: (sessionGroups.find((group) => group.session === section.session)?.items ?? [])
        .filter((item) => item.qNumber >= section.first && item.qNumber <= section.last),
    })).filter((group) => group.items.length > 0);
  } else if (civil2Sections) {
    const allItems = sessionGroups.flatMap((group) => group.items);
    sessionGroups = civil2Sections.map((section) => ({
      session: section.label,
      id: section.id,
      items: allItems.filter((item) => item.qNumber >= section.first && item.qNumber <= section.last),
    }));
  }
  // 介護福祉士は公式問題冊子の科目順に区切って一覧する（問題番号は通し番号）。
  const subjectSections = code === "kaigo";
  if (subjectSections) {
    const allItems = sessionGroups.flatMap((group) => group.items).sort((a, b) => a.qNumber - b.qNumber);
    const sections: SessionGroup[] = [];
    for (const item of allItems) {
      const current = sections.at(-1);
      if (current && current.items.at(-1)?.category === item.category) current.items.push(item);
      else sections.push({ session: item.category, id: `kaigo-q${item.qNumber}`, items: [item] });
    }
    sessionGroups = sections.map((section) => ({
      ...section,
      session: `${section.session} 問題${section.items[0]!.qNumber}〜${section.items.at(-1)!.qNumber}`,
    }));
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${label} ${histLabel} 過去問一覧`,
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
          { "@type": "ListItem", position: 3, name: label, item: absUrl },
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
              {label}
            </li>
          </ol>
        </nav>

        <header className="mb-8 animate-fade-in">
          <Badge variant="soft" className="mb-3">
            <Sparkles className="h-3 w-3" />
            {histLabel}
          </Badge>
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              {label}
            </span>{" "}
            {histLabel}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            過去問一覧 — AI 解説付きで効率的に学習を進められます。
          </p>
          {code === "kaigo" && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              第38回（試験日 令和8年1月25日）の全125問です。出典は公益財団法人社会福祉振興・試験センター。解説は過去問AIが独自に作成したもので、公益財団法人社会福祉振興・試験センターとは関係ありません。過去問題には、その後の法改正等により現時点では問題として成立していないものが含まれる場合があります。
            </p>
          )}
          {code === "civil2" && parsed.year === 2025 && parsed.season === "october" && (
            <p className="mt-2 text-sm text-muted-foreground">
              令和7年度10月実施分は、公式問題・正答・図表を照合した全66問を収録しています。
            </p>
          )}
          {code === "kankoji2" && (
            <p className="mt-2 text-sm text-muted-foreground">
              公式問題・正答・図表を照合した全52問を収録。No.49〜52は本試験どおり「適当でないもの」を二つとも選ぶと正解です。
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <Badge variant="outline">{pool.length} 問</Badge>
            {[...sessionMap.entries()].map(([session, items]) => <Badge key={session} variant="outline">{practiceSessionLabel(session as typeof pool[number]["session"])} {items.length}問</Badge>)}
            {commonOnly && <p className="w-full text-muted-foreground">{examLabel(code)}の学習に使える共通の午前I問題です。この一覧には午前IIの問題は含まれません。</p>}
          </div>
        </header>

        <section aria-label="クイズを始める" className="mb-8">
          <div className="grid gap-2 sm:grid-cols-2">
            {[...sessionMap.entries()].filter(([, items]) => items.some((q) => q.type === "multiple-choice")).map(([session]) => (
              <Button key={session} asChild variant="gradient" size="lg" className="w-full">
                <Link href={`/quiz?mode=year&exam=${exam}&year=${parsed.year}&season=${parsed.season}&session=${session}&order=1&returnTo=${encodeURIComponent(`/${exam}/${yearSeason}`)}`}>
                  {practiceSessionLabel(session as typeof pool[number]["session"])}を解く
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            ))}
          </div>
        </section>

        <QuestionListWithFilter groups={sessionGroups} showSectionNavigation={!!civil2Sections || subjectSections || code === "civil1"} />
      </div>
    </main>
  );
}
