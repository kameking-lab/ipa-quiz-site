import { practiceSessionLabel } from "@/lib/questions/practice-session";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, ChevronRight, Clock, Code2, FileText, PenLine, Sparkles, TrendingUp } from "lucide-react";

import type { ExamCode } from "@/lib/questions/types";
import { examLabel } from "@/lib/utils";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { ORG_ID, buildOrgNode } from "@/lib/seo/structured-data";
import { EXAM_STATS } from "@/lib/seo/exam-stats";
import { FP2_PRACTICAL_EDITIONS, getPracticalEdition } from "@/lib/fp2/practical";
import { FP3_PRACTICAL_EDITIONS, getPracticalEdition as getFp3PracticalEdition } from "@/lib/fp3/practical";
import {
  EXAM_DESCRIPTIONS,
  examFullName,
  examMetaDescription,
  examTopDescription,
  examTopTitle,
  getAvailableExams,
  getQuestionsByExamStrict,
  groupByCategory,
  groupByYearSeason,
} from "@/lib/seo/exam-meta";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { ExamAiTransparencyNote } from "@/components/exam/ExamAiTransparencyNote";
const ExamBrowseTabs = dynamic(
  () => import("@/components/exam/ExamBrowseTabs").then((m) => m.ExamBrowseTabs),
  {
    loading: () => (
      <div className="h-48 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900" />
    ),
  },
);
import { ExamOfficialResources } from "@/components/exam/ExamOfficialResources";
import { ExamRoadmap } from "@/components/exam/ExamRoadmap";
import { ExamNoteGuide } from "@/components/exam/ExamNoteGuide";
import {
  ExamDeepLead,
  ExamMainTopics,
  ExamRelatedExams,
} from "@/components/exam/ExamDeepContent";

// localStorage 依存のクライアント専用コンポーネント。
// 初期ロードのバンドルから外して TBT を削減する目的で dynamic import する。
const ExamProgressBar = dynamic(
  () => import("@/components/exam/ExamProgressBar").then((m) => m.ExamProgressBar),
  {
    loading: () => (
      <div className="h-24 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900" />
    ),
  },
);
import {
  RECOMMENDED_BOOKS,
  buildAmazonUrl,
  getDifficultyLabel,
  isAsinFilled,
} from "@/data/recommended-books";
import { getBlogPostsByExam } from "@/data/blog";
import { getRelatedSuccessStoriesByExam } from "@/lib/success-stories/related-content";
import { EXAM_ROADMAP } from "@/lib/seo/exam-resources";
import { ContentEndAd } from "@/components/ads/ContentEndAd";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";

export const dynamicParams = false;
const fp2PracticalCount = FP2_PRACTICAL_EDITIONS.reduce(
  (sum, edition) => sum + (getPracticalEdition(edition)?.questions.length ?? 0), 0,
);
const fp3PracticalCount = FP3_PRACTICAL_EDITIONS.reduce(
  (sum, edition) => sum + (getFp3PracticalEdition(edition)?.questions.length ?? 0), 0,
);

interface RouteParams {
  exam: string;
}

export async function generateStaticParams(): Promise<RouteParams[]> {
  // denken3/denken2 have dedicated launch pages under app/. Including them
  // in this catch-all route's static params makes Next emit a conflicting
  // fallback entry, which turns unknown one-segment URLs into soft 404s (200).
  return getAvailableExams()
    .filter((exam) => exam !== "denken3" && exam !== "denken2")
    .map((exam) => ({ exam }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { exam } = await params;
  if (!getAvailableExams().includes(exam as ExamCode)) {
    return { title: "試験区分が見つかりません", robots: { index: false } };
  }
  const code = exam as ExamCode;
  const count = getQuestionsByExamStrict(code).length;
  const title = examTopTitle(code);
  const description = examMetaDescription(code, count);
  const ogParams = new URLSearchParams({
    type: "exam",
    title: examLabel(code),
    subtitle: `${examLabel(code)} 過去問一覧`,
    body: description,
    count: String(count),
  });
  const ogImageUrl = `${SITE_BASE_URL}/api/og?${ogParams.toString()}`;
  return {
    title,
    description,
    alternates: { canonical: `/${exam}` },
    openGraph: {
      title,
      description,
      url: `/${exam}`,
      type: "website",
      siteName: SITE_NAME,
      locale: "ja_JP",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImageUrl] },
  };
}

export default async function ExamTopPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { exam } = await params;
  if (!getAvailableExams().includes(exam as ExamCode)) notFound();
  const code = exam as ExamCode;
  const questions = getQuestionsByExamStrict(code);
  const years = groupByYearSeason(questions).map((group) => {
    const items = questions.filter((q) => q.year === group.year && q.season === group.season);
    const sessions = [...new Set(items.map((q) => q.session))];
    const coverageLabels = sessions.map(practiceSessionLabel);
    return {
      ...group,
      // The card's badge owns the total question count. Keep this line for the
      // covered range only so assistive technology and visual readers do not
      // encounter a duplicated value such as "67問 67問".
      coverage: coverageLabels.length === 1
        ? `${coverageLabels[0]}のみ`
        : coverageLabels.join("・"),
      missingSpecialist: sessions.includes("am1") && !sessions.includes("am2"),
    };
  });
  const categories = groupByCategory(questions);
  const books = (RECOMMENDED_BOOKS[code] ?? []).slice(0, 3);
  const posts = getBlogPostsByExam(code).slice(0, 3);
  const successStories = getRelatedSuccessStoriesByExam(code, 3);
  const absUrl = `${SITE_BASE_URL}/${exam}`;
  const roadmapSteps = EXAM_ROADMAP[code] ?? [];
  const externalQualification = getQualificationByExamCode(code);

  const credentialId = `${absUrl}#credential`;
  const courseNode = {
    "@type": "Course",
    "@id": `${absUrl}#course`,
    name: `${examFullName(code)} 過去問学習コース`,
    description: examTopDescription(code, questions.length),
    url: absUrl,
    inLanguage: "ja",
    courseCode: code.toUpperCase(),
    isAccessibleForFree: true,
    educationalLevel: "Professional",
    teaches: categories.map((c) => c.category).slice(0, 12),
    offers: [
      {
        "@type": "Offer",
        price: 0,
        priceCurrency: "JPY",
        availability: "https://schema.org/InStock",
        url: absUrl,
      },
    ],
    provider: {
      "@type": "EducationalOrganization",
      "@id": ORG_ID,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      inLanguage: "ja",
    },
  };
  const howToNode =
    roadmapSteps.length > 0
      ? {
          "@type": "HowTo",
          "@id": `${absUrl}#howto`,
          name: `${examLabel(code)} 合格への学習ロードマップ`,
          description: "試験本番から逆算した、月単位の進め方の目安",
          inLanguage: "ja",
          step: roadmapSteps.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.title,
            text: s.body,
          })),
        }
      : null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // Define the full Organization node so the Course.provider `@id` reference
      // resolves to a node with name/logo/sameAs within this document. Google
      // evaluates each page independently and does not follow `@id` to the home
      // page, so without this the provider has no resolvable name on all 13
      // exam hubs (sitemap priority 0.9).
      buildOrgNode(),
      {
        "@type": "CollectionPage",
        "@id": `${absUrl}#collection`,
        name: examTopTitle(code),
        description: examTopDescription(code, questions.length),
        url: absUrl,
        inLanguage: "ja",
        about: { "@id": credentialId },
      },
      {
        "@type": "EducationalOccupationalCredential",
        "@id": credentialId,
        name: examFullName(code),
        credentialCategory: "Certification",
        url: absUrl,
        inLanguage: "ja",
        description: EXAM_DESCRIPTIONS[code] ?? `${examLabel(code)}の国家試験。`,
        recognizedBy: {
          "@type": "Organization",
          name: externalQualification?.administrator ?? "情報処理推進機構（IPA）",
          url: externalQualification?.officialQuestionsUrl ?? "https://www.ipa.go.jp/",
        },
        educationalLevel: "Professional",
        competencyRequired: categories.map((c) => c.category).slice(0, 12),
      },
      courseNode,
      ...(howToNode ? [howToNode] : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: examLabel(code),
            item: absUrl,
          },
        ],
      },
    ],
  };

  const hasAm1 = questions.some((q) => q.session === "am1");
  const hasAm2 = questions.some((q) => q.session === "am2");
  const isHighLevel = hasAm1 && hasAm2;
  const summary = EXAM_DESCRIPTIONS[code] ?? `${examLabel(code)}の過去問演習。`;

  return (
    <main className="relative flex-1">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-spotlight"
      />

      <div className="relative mx-auto w-full max-w-3xl px-4 pb-20 pt-6 sm:px-6 sm:pt-10">
        <JsonLd data={jsonLd} />

        <nav aria-label="パンくずリスト" className="mb-4 text-xs text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="inline-block py-1.5 hover:text-foreground hover:underline">
                ホーム
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={externalQualification ? "/qualifications" : "/ipa"}
                className="inline-block py-1.5 hover:underline"
              >
                {externalQualification ? "その他資格" : "IPA"}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {examLabel(code)}
            </li>
          </ol>
        </nav>

        <header className="mb-6">
          <Badge variant="soft" className="mb-3">
            <Sparkles className="h-3 w-3" />
            {examLabel(code)}
          </Badge>
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {examLabel(code)} 過去問
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{summary}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <Badge variant="outline">収録 {questions.length} 問</Badge>
            <Badge variant="outline">{years.length} 期分</Badge>
            <Badge variant="outline">{categories.length} 分野</Badge>
          </div>
          {code === "kaigo" && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">第38回（令和7年度）介護福祉士国家試験の全125問（総合問題を含む）を収録しています。出典は公益財団法人社会福祉振興・試験センター。解説は過去問AIが独自に作成したもので、同センターとは関係ありません。過去問題には、その後の法改正等により現時点では問題として成立していないものが含まれる場合があります。</p>}
          {code === "civil2" && <p className="mt-3 text-sm text-muted-foreground">令和8年度前期と令和7年度10月実施分の第一次検定（土木）各全66問を収録。実試験ではNo.1〜5とNo.48〜66が必須、No.6〜16から9問、No.17〜36から6問、No.37〜47から6問を選びます。演習では全問を自由に解けます。</p>}
          {code === "kankoji2" && <p className="mt-3 text-sm text-muted-foreground">令和8年度前期と令和7年度後期の第一次検定を各全52問収録。実試験ではNo.1〜6・No.24〜28・No.49〜52が必須、No.7〜23から9問、No.29〜38から8問、No.39〜48から8問を選びます。No.49〜52は正解が二つあり、両方を選ぶと正解です。演習では全問を自由に解けます。</p>}
        </header>

        {/* Big CTA */}
        <section aria-label="今すぐ解く" className="mb-8">
          {code === "fp2" || code === "fp3" ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <Button asChild variant="gradient" size="lg" className="w-full font-semibold">
                <Link href={`/quiz?mode=random&exam=${code}&session=gakka`}>学科を解く</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full font-semibold">
                <Link href={`/${code}/practical`}>
                  実技の問題と模範解答（{code === "fp2" ? fp2PracticalCount : fp3PracticalCount}問）
                </Link>
              </Button>
            </div>
          ) : isHighLevel ? (
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h2 className="mb-3 text-sm font-semibold text-foreground">
                ランダム出題の範囲を選択
              </h2>
              <div className="grid gap-2 sm:grid-cols-2">
                <Button asChild variant="gradient" size="lg" className="font-semibold">
                  <Link href={`/quiz?mode=random&exam=${exam}&session=am2`}>
                    午前 II
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`/quiz?mode=random&exam=${exam}&session=am1`}>午前 I</Link>
                </Button>
              </div>
            </div>
          ) : (
            <Button
              asChild
              variant="gradient"
              size="xl"
              className="w-full font-semibold shadow-md hover:shadow-lg"
            >
              <Link href={`/quiz?mode=random&exam=${exam}`}>
                今すぐ解く
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </section>

        {code === "denko2" && (
          <section aria-label="技能試験" className="mb-8 rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <h2 className="text-lg font-bold text-slate-950">技能試験の問題図・完成例</h2>
            <p className="mt-1 text-sm text-slate-700">試験日と候補No.から、施工条件、公式の概念図・複線図・完成作品例を確認できます。</p>
            <Button asChild variant="outline" className="mt-4 bg-white">
              <Link href="/denko2/skill">技能試験を探す <ChevronRight className="h-4 w-4" /></Link>
            </Button>
          </section>
        )}

        {/* Browse tabs */}
        <section aria-label="問題を探す" className="mb-8">
          {/* Deep-link targets for sitemap "年度別一覧 (#years)" / "分野別一覧 (#topics)".
              ExamBrowseTabs reads the hash to pre-select the matching tab. */}
          <span id="years" aria-hidden className="block scroll-mt-20" />
          <span id="topics" aria-hidden className="block scroll-mt-20" />
          <ExamBrowseTabs exam={code} years={years} categories={categories} />
        </section>

        {/* Progress */}
        <section aria-label="進捗" className="mb-8">
          <ExamProgressBar exam={code} totalQuestions={questions.length} />
        </section>

        {/* Stats: pass rate / study hours / topic trend */}
        {(() => {
          const stats = EXAM_STATS[code];
          if (!stats) return null;
          const topCategories = categories.slice(0, 3);
          return (
            <section aria-label="試験統計" className="mb-8">
              <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-foreground">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                試験統計と出題傾向
              </h2>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    合格率（直近）
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.passRateRecent}
                    <span className="ml-0.5 text-base font-medium text-muted-foreground">%</span>
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    {stats.passRateTrend}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    学習時間の目安
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.studyHoursLow}–{stats.studyHoursHigh}
                    <span className="ml-0.5 text-base font-medium text-muted-foreground">時間</span>
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    IT 経験・前提資格に応じて変動。1 日 1-2 時間で 3-6 ヶ月が目安。
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    <Sparkles className="h-3 w-3" />
                    出題傾向
                  </div>
                  <p className="text-[13px] leading-relaxed text-foreground">
                    {stats.topicTrend}
                  </p>
                  {topCategories.length > 0 && (
                    <ul className="mt-2 flex flex-wrap gap-1">
                      {topCategories.map((c) => (
                        <li key={c.category}>
                          <Badge variant="outline" className="text-[10px]">
                            {c.category}
                            <span className="ml-1 text-muted-foreground">{c.count}</span>
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <p className="mt-2 text-[10px] text-muted-foreground">
                ※ 合格率はおおよそのレンジ。最新の確定値は IPA 公式統計をご確認ください。
              </p>
            </section>
          );
        })()}

        {/* Exam characteristic lead text */}
        <ExamDeepLead exam={code} />

        {/* Main topics — exam-specific syllabus highlights */}
        <ExamMainTopics exam={code} />

        {/* Study roadmap — month-by-month plan */}
        <ExamRoadmap exam={code} />

        {/* Official IPA resources — E-E-A-T */}
        <ExamOfficialResources exam={code} />

        <ExamNoteGuide exam={code} />

        {/* Recommended books */}
        {books.length > 0 && (
          <section aria-label="おすすめ書籍" className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                おすすめ書籍
              </h2>
              <Link
                href={`/recommended-books/${exam}`}
                className="text-xs text-sky-600 hover:underline dark:text-sky-400"
              >
                すべて見る →
              </Link>
            </div>
            <ul className="space-y-2">
              {books.map((b) => (
                <li
                  key={b.id}
                  className="rounded-xl border border-border bg-card p-3.5 text-sm shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">{b.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {b.author}・{b.publisher}（{b.year}）
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px]">
                        <Badge variant="outline">{getDifficultyLabel(b.difficulty)}</Badge>
                        <span className="text-muted-foreground">{b.recommendedFor}</span>
                      </div>
                    </div>
                    {isAsinFilled(b.asin) && (
                      <div className="flex shrink-0 flex-col items-end gap-0.5">
                        <span className="text-[9px] text-zinc-400 dark:text-zinc-500">PR</span>
                        <a
                          href={buildAmazonUrl(b.asin)}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-600"
                          style={{ minWidth: 88, minHeight: 44 }}
                        >
                          Amazon →
                        </a>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* High-level exam: AI essay / description grading CTA */}
        {(["st", "sa", "pm", "sm", "au", "sc", "nw", "db", "es"] as ExamCode[]).includes(code) && (
          <section
            aria-label="AI 午後問題対策"
            className="mb-8 overflow-hidden rounded-2xl border border-violet-200/70 bg-gradient-to-br from-violet-50 via-card to-card p-5 shadow-sm dark:border-violet-900/40 dark:from-violet-950/40"
          >
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-2.5 py-0.5 text-[11px] font-semibold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              <PenLine className="h-3 w-3" />
              {(["st", "sa", "pm", "sm", "au"] as ExamCode[]).includes(code)
                ? "午後 II 論述対策"
                : "午後 記述対策"}
            </div>
            <h2 className="mb-1.5 text-base font-bold tracking-tight text-foreground sm:text-lg">
              AI 論述添削で午後問題対策
            </h2>
            {(["st", "sa", "pm", "sm", "au"] as ExamCode[]).includes(code) ? (
              <>
                <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                  AI が学習用の「適合度／論理性／具体性／業種事例」の 4 観点で評価。
                  業種別の合格答案サンプルも参照しながら、設問ア・イ・ウを段階的に仕上げます。
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="primary" size="sm">
                    {/* 旗艦＝実際の IPA 午後II 過去問を AI 採点する indexable ハブ /essay
                        (LearningResource/OG/sitemap 済・session34-36)。高オーソリティな
                        試験ハブ(sitemap priority 0.9)から旗艦へ内部リンク equity を流す。
                        /[exam]/afternoon は練習用モック(AI採点ベータ・HD-4)のため primary は旗艦に寄せる。 */}
                    <Link href="/essay">
                      実際の午後II過去問で AI 添削
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    {/* 練習用オリジナル問題（AI採点ベータ・モック=HD-4）。誇大回避のため
                        旗艦の実過去問採点とは別物として「練習・ベータ」を明示する。 */}
                    <Link href={`/${code}/afternoon`}>練習問題で腕試し（ベータ）</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    {/* 業種別サンプルは複数形 /essays/[exam] (200・noindex)。 */}
                    <Link href={`/essays/${code}`}>業種別 合格答案サンプル</Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                  {examLabel(code)} 午後の記述・論述問題を AI が採点・フィードバック。
                  根拠・論理展開・キーワードの網羅を軸に改善点を提示します。
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-600 dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-300">
                    <Sparkles className="h-3.5 w-3.5" />
                    Coming Soon
                  </span>
                  <span className="text-xs text-muted-foreground">
                    順次対応予定 — 通知を受け取るには
                  </span>
                  <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs">
                    <Link href="/settings#notifications">通知設定</Link>
                  </Button>
                </div>
              </>
            )}
          </section>
        )}

        {/* 土台＝基本情報 科目B（アルゴリズム・擬似言語）対策。FE ハブにのみ表示し、
            旗艦の「AI 午後問題対策」(高度試験) と対称の通年・即金の入口を作る。
            リンク先は土台ピラー /blog/fe-kamoku-b-taisaku（indexable）と
            アルゴリズム分野別プール（実演習・AIコパイロット）の 2 つ。 */}
        {code === "fe" && (
          <section
            aria-label="科目B（アルゴリズム・擬似言語）対策"
            className="mb-8 overflow-hidden rounded-2xl border border-indigo-200/70 bg-gradient-to-br from-indigo-50 via-card to-card p-5 shadow-sm dark:border-indigo-900/40 dark:from-indigo-950/40"
          >
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              <Code2 className="h-3 w-3" />
              科目B（アルゴリズム）対策
            </div>
            <h2 className="mb-1.5 text-base font-bold tracking-tight text-foreground sm:text-lg">
              科目B（擬似言語）を AI と体系的に攻略
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              基本情報の合否は科目B＝擬似言語のトレース力で決まります。読み方の型から
              整理し、AI コパイロットに「1 行ずつトレースして」と聞きながら解けます。
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="primary" size="sm">
                <Link href="/blog/fe-kamoku-b-taisaku">
                  科目B 完全対策を読む
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/fe/topic/アルゴリズムとプログラミング">
                  アルゴリズム問題で演習
                </Link>
              </Button>
            </div>
          </section>
        )}

        {/* Related exams — cross-link to neighboring exam categories */}
        <ExamRelatedExams exam={code} />

        {/* AI transparency for the exam page */}
        <ExamAiTransparencyNote />

        {/* Related blog posts */}
        {posts.length > 0 && (
          <section aria-label="関連ブログ" className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
                <FileText className="h-4 w-4 text-muted-foreground" />
                関連ブログ
              </h2>
              <Link
                href="/blog"
                className="text-xs text-sky-600 hover:underline dark:text-sky-400"
              >
                すべて見る →
              </Link>
            </div>
            <ul className="space-y-2">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-3.5 text-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-foreground group-hover:text-primary">
                        {p.title}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                        {p.description}
                      </p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Fictional learning cases — labels must not imply real testimonials. */}
        {successStories.length > 0 && (
          <section aria-label="架空の学習ケース" className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
                <FileText className="h-4 w-4 text-muted-foreground" />
                {examLabel(code)} 学習ケース（架空）
              </h2>
              <Link
                href={`/success-stories/${exam}`}
                className="text-xs text-sky-600 hover:underline dark:text-sky-400"
              >
                ケース一覧 →
              </Link>
            </div>
            <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
              実在の合格者の証言ではなく、学習上の判断例を示す架空ケースです。
            </p>
            <ul className="space-y-2">
              {successStories.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/success-stories/${s.exam}/${s.slug}`}
                    className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-3.5 text-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                  >
                    <div className="min-w-0">
                      <div className="mb-1 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                        <span className="rounded bg-muted px-1.5 py-0.5">
                          {s.ageRange} / {s.occupation}
                        </span>
                        <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                          {s.studyMonths}か月 / {s.totalStudyHours}h
                        </span>
                      </div>
                      <p className="font-medium text-foreground group-hover:text-primary">
                        {s.title}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                        {s.description}
                      </p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <ContentEndAd />
      </div>
    </main>
  );
}
