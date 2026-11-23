import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchClient } from "@/components/search/SearchClient";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { BrowseQualifications } from "@/components/home/pace/BrowseQualifications";
export async function generateMetadata({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }): Promise<Metadata> {
  await searchParams;
  return { title: "さがす", alternates: { canonical: "/search" }, robots: { index: false, follow: true } };
}
export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const query = (Array.isArray(params.q) ? params.q[0] : params.q) ?? "";
  const hasQuery = ["q", "exam", "year", "season", "category", "difficulty", "calc", "sort", "recent"].some((key) => Boolean(params[key]));
  return <main className="p3-page p3-search study-column flex-1 pb-6">
    <BrowseQualifications key={query} domains={getHomeDirectory()} initialQuery={query} illustrated />
    <details open={hasQuery || undefined} className="mt-6 rounded-lg border border-hairline bg-card px-4">
      <summary className="study-focus min-h-12 cursor-pointer py-3.5 text-sm font-semibold">問題文で探す</summary>
      <div className="pb-4">
        <Suspense fallback={<p role="status">検索を準備中…</p>}><SearchClient /></Suspense>
      </div>
    </details>
  </main>;
}
