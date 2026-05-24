import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogMarkdown } from "@/components/blog/BlogMarkdown";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getAllSuccessStorySlugs,
  getRelatedSuccessStories,
  getSimilarPersonaStories,
  getSuccessStoryBySlug,
} from "@/data/success-stories";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { EXAM_LABELS, examLabel } from "@/lib/utils";

const VALID_EXAMS = new Set(Object.keys(EXAM_LABELS));

export async function generateStaticParams() {
  return getAllSuccessStorySlugs();
}

interface PageProps {
  params: Promise<{ exam: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { exam, slug } = await params;
  const story = getSuccessStoryBySlug(slug);
  if (!story || story.exam !== exam) return { title: "体験記が見つかりません" };
  const url = `/success-stories/${exam}/${slug}`;
  const ogParams = new URLSearchParams({
    type: "blog",
    title: story.title,
    subtitle: `${examLabel(exam)} 合格体験記`,
    body: story.description,
  });
  const ogImage = `${SITE_BASE_URL}/api/og?${ogParams.toString()}`;
  return {
    title: story.title,
    description: story.description,
    alternates: { canonical: url },
    openGraph: {
      title: story.title,
      description: story.description,
      type: "article",
      url,
      siteName: SITE_NAME,
      locale: "ja_JP",
      publishedTime: story.publishedAt,
      modifiedTime: story.updatedAt ?? story.publishedAt,
      images: [{ url: ogImage, width: 1200, height: 630, alt: story.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.description,
      images: [ogImage],
    },
  };
}

export default async function SuccessStoryArticlePage({ params }: PageProps) {
  const { exam, slug } = await params;
  if (!VALID_EXAMS.has(exam)) notFound();
  const story = getSuccessStoryBySlug(slug);
  if (!story || story.exam !== exam) notFound();

  const url = `${SITE_BASE_URL}/success-stories/${exam}/${slug}`;
  const related = getRelatedSuccessStories(slug, 4);
  const similarPersonas = getSimilarPersonaStories(slug, 4);
  const label = examLabel(exam);

  const articleOgParams = new URLSearchParams({
    type: "blog",
    title: story.title,
    subtitle: `${label} 合格体験記`,
    body: story.description,
  });
  const articleImage = `${SITE_BASE_URL}/api/og?${articleOgParams.toString()}`;

  const personaName = `${story.persona.occupation}（${story.persona.ageRange}）`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: story.title,
        description: story.description,
        url,
        image: {
          "@type": "ImageObject",
          url: articleImage,
          width: 1200,
          height: 630,
        },
        datePublished: story.publishedAt,
        dateModified: story.updatedAt ?? story.publishedAt,
        inLanguage: "ja",
        articleSection: `${label} 合格体験記`,
        author: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_BASE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_BASE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_BASE_URL}/icon-512.svg`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        about: [
          { "@id": `${url}#course` },
          { "@id": `${url}#persona` },
        ],
        additionalProperty: {
          "@type": "PropertyValue",
          name: "contentGenerationMethod",
          value: "AI-generated fictional persona based on typical exam candidate patterns. Not based on a real individual.",
        },
      },
      {
        "@type": "Person",
        "@id": `${url}#persona`,
        name: personaName,
        description: story.persona.background,
        jobTitle: story.persona.occupation,
        // Explicit fiction/AI-generated disclaimer per schema.org best practice
        disambiguatingDescription:
          "AI生成の架空ペルソナ。実在の人物ではありません。典型的な合格者像をもとに過去問AIが構成した学習ガイドです。",
      },
      {
        "@type": "Review",
        "@id": `${url}#review`,
        itemReviewed: {
          "@type": "Course",
          "@id": `${url}#course`,
        },
        author: { "@id": `${url}#persona` },
        reviewBody: story.description,
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
        datePublished: story.publishedAt,
        inLanguage: "ja",
      },
      {
        "@type": "Course",
        "@id": `${url}#course`,
        name: `${label} 試験対策 — AIコパイロット過去問演習`,
        description: `${label}の公開過去問を網羅するAIネイティブ学習サービス。AIコパイロットが用語解説・誤答分析・類題生成を無制限で提供します。`,
        url: `${SITE_BASE_URL}/${exam}`,
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_BASE_URL,
        },
        educationalCredentialAwarded: `IPA ${label}`,
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "Online",
          inLanguage: "ja",
          name: `${label} AIコパイロット付き過去問演習`,
          courseWorkload: `PT${story.persona.totalStudyHours}H`,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "JPY",
            availability: "https://schema.org/InStock",
          },
        },
        teaches: story.keyTakeaways.join(" / "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "合格体験記",
            item: `${SITE_BASE_URL}/success-stories`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: label,
            item: `${SITE_BASE_URL}/success-stories/${exam}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: story.title,
            item: url,
          },
        ],
      },
    ],
  };

  const formattedDate = story.publishedAt.slice(0, 10);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:py-10">
      <JsonLd data={jsonLd} />
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
          <li>
            <Link href="/success-stories" className="hover:underline">
              合格体験記
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/success-stories/${exam}`}
              className="hover:underline"
            >
              {label}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li
            aria-current="page"
            className="line-clamp-1 text-zinc-700 dark:text-zinc-300"
          >
            {story.title}
          </li>
        </ol>
      </nav>

      <header className="mb-6 border-b border-zinc-200 pb-5 dark:border-zinc-800">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px]">
          <Link
            href={`/success-stories/${exam}`}
            className="rounded-full bg-sky-100 px-2 py-0.5 font-semibold text-sky-700 hover:bg-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:hover:bg-sky-900"
          >
            {label}
          </Link>
          <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {story.persona.ageRange}
          </span>
          <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {story.persona.occupation}
          </span>
          <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            {story.persona.studyMonths}か月 / {story.persona.totalStudyHours}h
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          {story.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {story.description}
        </p>
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
          公開: <time dateTime={story.publishedAt}>{formattedDate}</time>
          {story.updatedAt ? (
            <>
              {" "}
              / 更新: <time dateTime={story.updatedAt}>{story.updatedAt.slice(0, 10)}</time>
            </>
          ) : null}
        </p>
      </header>

      <aside className="mb-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-xs leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300 sm:text-sm">
        <h2 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          受験者プロフィール
        </h2>
        <dl className="space-y-1">
          <div>
            <dt className="inline font-medium">年代・職種:</dt>{" "}
            <dd className="inline">{story.persona.ageRange} / {story.persona.occupation}</dd>
          </div>
          <div>
            <dt className="inline font-medium">背景:</dt>{" "}
            <dd className="inline">{story.persona.background}</dd>
          </div>
          <div>
            <dt className="inline font-medium">学習期間:</dt>{" "}
            <dd className="inline">
              {story.persona.studyMonths}か月 / 合計{story.persona.totalStudyHours}時間
            </dd>
          </div>
          <div>
            <dt className="inline font-medium">合格時期:</dt>{" "}
            <dd className="inline">{story.persona.passedAt}</dd>
          </div>
          {story.persona.score ? (
            <div>
              <dt className="inline font-medium">結果:</dt>{" "}
              <dd className="inline">{story.persona.score}</dd>
            </div>
          ) : null}
        </dl>
      </aside>

      <article>
        <BlogMarkdown>{story.body}</BlogMarkdown>
      </article>

      <section className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 text-sm text-zinc-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-zinc-300">
        <h2 className="mb-3 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          学んだ要点（キー・ティクアウェイ）
        </h2>
        <ul className="space-y-2">
          {story.keyTakeaways.map((t, i) => (
            <li key={i} className="leading-relaxed">
              <span className="mr-2 font-semibold text-emerald-700 dark:text-emerald-300">
                {i + 1}.
              </span>
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 rounded-2xl border border-sky-200 bg-sky-50/60 p-5 text-sm text-zinc-700 dark:border-sky-800 dark:bg-sky-950/30 dark:text-zinc-300">
        <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          自分の{label}挑戦を始める
        </h2>
        <p className="mb-3 leading-relaxed">
          体験記を読んだら次は行動です。AI コパイロット付きの過去問演習で、自分の合格ストーリーを作り始めましょう。
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/${exam}`}
            className="inline-block rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
          >
            {label} 過去問一覧へ →
          </Link>
          <Link
            href={`/quiz?mode=random&exam=${exam}`}
            className="inline-block rounded-full border border-sky-300 bg-white px-4 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-50 dark:border-sky-800 dark:bg-zinc-950 dark:text-sky-300 dark:hover:bg-sky-950/40"
          >
            ランダム出題で開始
          </Link>
          {story.relatedEssayExam ? (
            <Link
              href={`/essays/${story.relatedEssayExam}`}
              className="inline-block rounded-full border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:bg-zinc-950 dark:text-amber-300 dark:hover:bg-amber-950/40"
            >
              {examLabel(story.relatedEssayExam)} 論文・記述対策
            </Link>
          ) : null}
          {story.relatedBlogSlug ? (
            <Link
              href={`/blog/${story.relatedBlogSlug}`}
              className="inline-block rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              関連学習ガイドを読む
            </Link>
          ) : null}
        </div>
      </section>

      {related.length > 0 ? (
        <section
          aria-label="他の合格体験記"
          className="mt-10 border-t border-zinc-200 pt-6 dark:border-zinc-800"
        >
          <h2 className="mb-4 text-base font-bold text-zinc-900 dark:text-zinc-50 sm:text-lg">
            他の合格体験記
          </h2>
          <ul className="space-y-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/success-stories/${r.exam}/${r.slug}`}
                  className="block rounded-2xl border border-zinc-200 bg-white p-4 transition-colors hover:border-sky-300 hover:bg-sky-50/40 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-sky-700 dark:hover:bg-sky-950/20"
                >
                  <div className="mb-1 flex flex-wrap items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                    <span className="rounded bg-sky-100 px-1.5 py-0.5 font-semibold text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                      {examLabel(r.exam)}
                    </span>
                    <span className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
                      {r.ageRange} / {r.occupation}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {r.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-zinc-600 dark:text-zinc-400">
                    {r.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {similarPersonas.length > 0 ? (
        <section
          aria-label="あなたに似た人の体験記"
          className="mt-10 border-t border-zinc-200 pt-6 dark:border-zinc-800"
          style={{ minHeight: 280 }}
        >
          <h2 className="mb-4 text-base font-bold text-zinc-900 dark:text-zinc-50 sm:text-lg">
            あなたに似た人の体験記
          </h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {similarPersonas.map((m) => (
              <li key={m.story.slug}>
                <Link
                  href={`/success-stories/${m.story.exam}/${m.story.slug}`}
                  className="block h-full rounded-2xl border border-zinc-200 bg-white p-4 transition-colors hover:border-sky-300 hover:bg-sky-50/40 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-sky-700 dark:hover:bg-sky-950/20"
                >
                  <div className="mb-1.5 flex flex-wrap items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                    <span className="rounded bg-sky-100 px-1.5 py-0.5 font-semibold text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                      {examLabel(m.story.exam)}
                    </span>
                    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-800 dark:bg-amber-950/60 dark:text-amber-200">
                      {m.reason}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {m.story.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-zinc-600 dark:text-zinc-400">
                    {m.story.description}
                  </p>
                  <p className="mt-1.5 text-[11px] text-zinc-500 dark:text-zinc-500">
                    {m.story.ageRange} / {m.story.occupation} / {m.story.studyMonths}か月
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-10 text-xs text-zinc-500 dark:text-zinc-500">
        <p>
          ※ 本記事は 過去問AI が学習者の典型像をもとに構成した合格者ペルソナです。
          実在モデルへの取材ではありませんが、学習法・スケジュールは実証されたパターンに基づきます。
          試験要項の最新情報は必ず{" "}
          <a
            href="https://www.ipa.go.jp/shiken/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
          >
            IPA 公式ページ
          </a>
          で確認してください。
        </p>
      </section>
    </main>
  );
}
