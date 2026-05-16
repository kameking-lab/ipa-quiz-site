import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, MessageCircle } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const FAQ_OG = (() => {
  const params = new URLSearchParams({
    type: "faq",
    title: "よくある質問",
    subtitle: "過去問AI の使い方",
    body: "対象試験・AI 解説の精度・出典・履歴・PWA 対応など 49 問。",
  });
  return `${SITE_BASE_URL}/api/og?${params.toString()}`;
})();

export const metadata: Metadata = {
  title: "よくある質問（FAQ）— 過去問AIの使い方・AI解説の精度",
  description:
    "過去問AIの対象試験・AIコパイロットの精度・過去問の出典・オフライン利用など、よくある質問にまとめてお答えします。教育貢献プロジェクトとして全機能無料で公開しています。",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "よくある質問（FAQ） | 過去問AI",
    description:
      "過去問AI の利用方法・AI解説・過去問の出典などのよくある質問と回答。教育貢献プロジェクトとして全機能無料。",
    url: "/faq",
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
    images: [{ url: FAQ_OG, width: 1200, height: 630, alt: "よくある質問" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "よくある質問（FAQ） | 過去問AI",
    description:
      "過去問AI の利用方法・AI解説・過去問の出典などのよくある質問と回答。教育貢献プロジェクトとして全機能無料。",
    images: [FAQ_OG],
  },
};

import { FAQS, FAQ_CATEGORY_LABELS, type FaqItem } from "@/data/faq";
import { FaqItem as FaqItemComponent } from "@/components/faq/FaqItem";

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${SITE_BASE_URL}/faq#faqpage`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "よくある質問",
            item: `${SITE_BASE_URL}/faq`,
          },
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
              <Link href="/" className="hover:text-foreground hover:underline">
                ホーム
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              よくある質問
            </li>
          </ol>
        </nav>

        <header className="mb-10 animate-fade-in">
          <Badge variant="soft" className="mb-4">
            <HelpCircle className="h-3 w-3" />
            FAQ
          </Badge>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              よくある質問
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            過去問AI の使い方・AI 解説の精度・過去問の出典など、利用開始前によくいただく質問にまとめてお答えします（教育貢献プロジェクト・全機能無料）。
          </p>
        </header>

        {(() => {
          const grouped = new Map<FaqItem["category"], FaqItem[]>();
          for (const f of FAQS) {
            const arr = grouped.get(f.category) ?? [];
            arr.push(f);
            grouped.set(f.category, arr);
          }
          let runningIndex = 0;
          return (
            <div className="space-y-10">
              {[...grouped.entries()].map(([cat, items]) => (
                <section
                  key={cat}
                  aria-label={FAQ_CATEGORY_LABELS[cat]}
                  id={`faq-${cat}`}
                >
                  <h2 className="mb-3 text-base font-bold tracking-tight text-foreground sm:text-lg">
                    {FAQ_CATEGORY_LABELS[cat]}
                  </h2>
                  <div className="space-y-3">
                    {items.map((f) => {
                      runningIndex += 1;
                      const i = runningIndex;
                      return (
                        <FaqItemComponent
                          key={`${cat}-${i}`}
                          index={i}
                          category={cat}
                          question={f.question}
                          answer={f.answer}
                        />
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          );
        })()}

        <section className="mt-10 rounded-2xl border border-border bg-card p-6 text-center shadow-sm sm:p-8">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary-soft-foreground">
            <MessageCircle className="h-5 w-5" />
          </div>
          <h2 className="mb-1 text-base font-semibold text-foreground">
            ここに質問が見つかりませんか？
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            運営者情報のお問い合わせ先からお気軽にご連絡ください。
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button asChild variant="primary" size="md">
              <Link href="/operator">運営者情報</Link>
            </Button>
            <Button asChild variant="outline" size="md">
              <Link href="/about">サイトについて</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
