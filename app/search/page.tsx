import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SearchClient } from "@/components/search/SearchClient";
import { APPROX_QUESTION_COUNT_LABEL } from "@/lib/constants/question-counts";

export const metadata: Metadata = {
  title: "問題検索",
  description: `${APPROX_QUESTION_COUNT_LABEL}問超の IPA 情報処理技術者試験 過去問をキーワード・試験区分・年度・分野・難度で横断検索。IP/SG/FE/AP/SC/NW/DB/ES/ST/SA/PM/SM/AU の 13 区分すべてに対応し、ヒットした問題は AI コパイロット付きでそのまま解説まで確認できます。`,
  alternates: { canonical: "/search" },
};

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
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            戻る
          </Link>
        </Button>

        <Breadcrumbs
          items={[
            { name: "ホーム", href: "/" },
            { name: "問題検索", href: "/search" },
          ]}
        />

        <header className="mb-6 animate-fade-in">
          <Badge variant="soft" className="mb-3">
            <SearchIcon className="h-3 w-3" />
            問題検索
          </Badge>
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              IPA過去問 横断検索
            </span>
          </h1>
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted-foreground sm:text-base">
            キーワードと試験区分・年度・分野・難度で {APPROX_QUESTION_COUNT_LABEL} 問超の過去問を一括検索。
            ヒット件数は分野・年度ごとに即座に確認できます。
          </p>
        </header>

        <SearchClient />
      </div>
    </main>
  );
}
