import Link from "next/link";
import { Compass, HomeIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex flex-1 items-center justify-center px-4 py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-spotlight"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-grid opacity-30 [mask-image:radial-gradient(60%_50%_at_50%_0%,#000_30%,transparent_70%)]"
      />

      <div className="relative w-full max-w-md text-center">
        <div className="overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-lg sm:p-8">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary-soft-foreground">
            <Compass className="h-7 w-7" />
          </div>
          <p className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
            404
          </p>
          <h1 className="mt-3 text-balance text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            ページが見つかりません
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            URL を確認するか、下のリンクからトップページへお戻りください。
          </p>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button asChild variant="primary" size="lg" className="flex-1">
              <Link href="/">
                <HomeIcon className="h-4 w-4" />
                トップへ戻る
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1">
              <Link href="/quiz?mode=random&exam=ap">
                <Search className="h-4 w-4" />
                問題を解く
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
