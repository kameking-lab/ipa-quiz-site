import Link from "next/link";
import { Compass, FileCheck, HelpCircle, HomeIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WEB_ADS_ERROR_PAGE_ID } from "@/lib/ads/web-ads";

export default function NotFound() {
  return (
    <main id={WEB_ADS_ERROR_PAGE_ID} className="relative flex flex-1 items-center justify-center px-4 py-12">

      <div className="relative w-full max-w-lg">
        <div className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary-soft-foreground">
              <Compass className="h-7 w-7" />
            </div>
            <p className="text-5xl font-bold tracking-tight text-primary sm:text-6xl">
              404
            </p>
            <h1 className="mt-3 text-balance text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              ページが見つかりません
            </h1>
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button asChild variant="primary" size="lg" className="flex-1 min-h-12 min-w-11 h-auto whitespace-normal py-2.5">
              <Link href="/">
                <HomeIcon className="h-4 w-4" />
                トップへ戻る
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1 min-h-12 min-w-11 h-auto whitespace-normal py-2.5">
              <Link href="/search">
                <Search className="h-4 w-4" />
                問題をさがす
              </Link>
            </Button>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 border-t border-border pt-5">
            <Link
              href="/essay"
              className="inline-flex min-h-11 items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <FileCheck className="h-3.5 w-3.5" />
              IPA 論文対策
            </Link>
            <Link
              href="/faq"
              className="inline-flex min-h-11 items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              よくある質問
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
