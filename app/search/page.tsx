import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SearchClient } from "@/components/search/SearchClient";
import { APPROX_QUESTION_COUNT_LABEL } from "@/lib/constants/question-counts";

const SEARCH_DESCRIPTION = `${APPROX_QUESTION_COUNT_LABEL}問超の IPA 情報処理技術者試験 過去問をキーワード・試験区分・年度・分野・難度で横断検索。IP/SG/FE/AP/SC/NW/DB/ES/ST/SA/PM/SM/AU の 13 区分すべてに対応し、ヒットした問題は AI コパイロット付きでそのまま解説まで確認できます。`;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  await searchParams;
  return {
    title: "問題検索",
    description: SEARCH_DESCRIPTION,
    alternates: { canonical: "/search" },
    // The empty form and its result variants are navigation tools. Explained
    // questions and curated collections are the search landing pages.
    robots: { index: false, follow: true },
  };
}

export default function SearchPage() {
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

      <div className="relative mx-auto w-full max-w-4xl px-4 pb-20 pt-6 sm:px-6 sm:pt-10">
        <Breadcrumbs
          items={[
            { name: "ホーム", href: "/" },
            { name: "問題検索", href: "/search" },
          ]}
        />

        <header className="mb-6 animate-fade-in">
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            問題をさがす
          </h1>
        </header>

        <Suspense fallback={<p role="status" className="text-sm text-muted-foreground">検索フォームを準備しています。</p>}>
          <SearchClient />
        </Suspense>
      </div>
    </main>
  );
}
