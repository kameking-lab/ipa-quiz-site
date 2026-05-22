import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Sparkles, ExternalLink } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FEATURE_LANDING_PAGES, getFeatureBySlug } from "@/data/features";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";

export const dynamicParams = false;

interface RouteParams {
  slug: string;
}

export async function generateStaticParams(): Promise<RouteParams[]> {
  return FEATURE_LANDING_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getFeatureBySlug(slug);
  if (!page) return { title: "ページが見つかりません", robots: { index: false } };
  const ogParams = new URLSearchParams({
    type: "feature",
    title: page.hero.headline,
    subtitle: page.hero.badge,
    body: page.hero.subhead,
  });
  const ogImageUrl = `${SITE_BASE_URL}/api/og?${ogParams.toString()}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/features/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/features/${page.slug}`,
      type: "website",
      siteName: SITE_NAME,
      locale: "ja_JP",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [ogImageUrl],
    },
  };
}

export default async function FeatureLandingPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const page = getFeatureBySlug(slug);
  if (!page) notFound();

  const absUrl = `${SITE_BASE_URL}/features/${page.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: page.title,
        description: page.description,
        url: absUrl,
        inLanguage: "ja",
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_BASE_URL },
      },
      {
        "@type": "Service",
        name: page.hero.headline,
        description: page.hero.subhead,
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_BASE_URL },
        areaServed: "JP",
        serviceType: page.hero.badge,
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          { "@type": "ListItem", position: 2, name: "機能特集", item: `${SITE_BASE_URL}/features` },
          { "@type": "ListItem", position: 3, name: page.hero.headline, item: absUrl },
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
            <Link href="/" className="inline-block py-1.5 hover:text-foreground hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/features" className="inline-block py-1.5 hover:text-foreground hover:underline">
              機能特集
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {page.hero.headline}
          </li>
        </ol>
      </nav>

      <header className="mb-8">
        <Badge variant="soft" className="mb-3">
          <Sparkles className="h-3 w-3" />
          {page.hero.badge}
        </Badge>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {page.hero.headline}
        </h1>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          {page.hero.subhead}
        </p>
        <div className="mt-5">
          <Button asChild variant="gradient" size="xl" className="font-semibold">
            <Link href={page.primaryCta.href}>
              {page.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      <section aria-label="特長" className="mb-10">
        <h2 className="mb-4 text-base font-bold tracking-tight text-foreground sm:text-lg">
          この機能の特長
        </h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {page.benefits.map((b) => (
            <li
              key={b.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <h3 className="text-sm font-bold text-foreground">{b.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {b.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="使い方" className="mb-10">
        <h2 className="mb-4 text-base font-bold tracking-tight text-foreground sm:text-lg">
          使い方
        </h2>
        <ol className="space-y-3">
          {page.howItWorks.map((s) => (
            <li
              key={s.step}
              className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5"
            >
              <span className="text-2xl font-extrabold tracking-tight text-primary">
                {s.step}
              </span>
              <div>
                <h3 className="text-sm font-bold text-foreground">{s.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-label="関連リンク" className="mb-10">
        <h2 className="mb-4 text-base font-bold tracking-tight text-foreground sm:text-lg">
          関連リンク
        </h2>
        <ul className="space-y-2">
          {page.relatedLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary">
                    {l.label}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {l.description}
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="FAQ" className="mb-10">
        <h2 className="mb-4 text-base font-bold tracking-tight text-foreground sm:text-lg">
          よくある質問
        </h2>
        <ul className="space-y-3">
          {page.faqs.map((f, i) => (
            <li key={i}>
              <details className="group rounded-2xl border border-border bg-card p-4 transition open:border-primary/40 open:shadow-md sm:p-5">
                <summary className="cursor-pointer text-sm font-semibold text-foreground">
                  {f.q}
                </summary>
                <p className="mt-2 border-t border-border pt-2 text-xs leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-primary/30 bg-primary-soft p-6 text-center shadow-sm">
        <h2 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
          いますぐ試してみる
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          会員登録不要・無料で全機能をお使いいただけます。
        </p>
        <Button asChild variant="primary" size="lg" className="mt-4 font-semibold">
          <Link href={page.primaryCta.href}>
            {page.primaryCta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>

      <section aria-label="他の機能特集" className="mt-10">
        <h2 className="mb-3 text-sm font-semibold text-foreground">他の機能特集</h2>
        <ul className="space-y-2">
          {FEATURE_LANDING_PAGES.filter((p) => p.slug !== page.slug).map((p) => (
            <li key={p.slug}>
              <Link
                href={`/features/${p.slug}`}
                className="group block rounded-xl border border-border bg-card p-3 text-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <p className="font-medium text-foreground group-hover:text-primary">
                  {p.hero.headline}
                </p>
                <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                  {p.hero.subhead}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
