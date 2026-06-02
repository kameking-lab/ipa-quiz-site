import Link from "next/link";
import { BookOpen, Compass, FileCheck, FileQuestion, HelpCircle, HomeIcon, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const EXAM_LINKS = [
  { code: "ip", label: "ITパスポート" },
  { code: "sg", label: "情報セキュリティ" },
  { code: "fe", label: "基本情報" },
  { code: "ap", label: "応用情報" },
  { code: "st", label: "ITストラテジスト" },
  { code: "sa", label: "システムアーキテクト" },
  { code: "pm", label: "プロジェクトマネージャ" },
  { code: "nw", label: "ネットワークSP" },
  { code: "db", label: "データベースSP" },
  { code: "es", label: "エンベデッドSP" },
  { code: "sc", label: "情報処理安全確保支援士" },
  { code: "sm", label: "ITサービスマネージャ" },
  { code: "au", label: "システム監査技術者" },
];

export default function NotFound() {
  return (
    <main className="relative flex flex-1 items-center justify-center px-4 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-spotlight"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-grid opacity-30 [mask-image:radial-gradient(60%_50%_at_50%_0%,#000_30%,transparent_70%)]"
      />

      <div className="relative w-full max-w-lg">
        <div className="overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-lg sm:p-8">
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary-soft-foreground">
              <Compass className="h-7 w-7" />
            </div>
            <p className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
              404
            </p>
            <h1 className="mt-3 text-balance text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              お探しのページが見つかりませんでした
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              IPA 全 13 試験区分の過去問を無料で学べます。
              <br />
              下のリンクから学習を再開してください。
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button asChild variant="primary" size="lg" className="flex-1">
              <Link href="/">
                <HomeIcon className="h-4 w-4" />
                トップへ戻る
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1">
              <Link href="/quiz?mode=random&exam=ap">
                <FileQuestion className="h-4 w-4" />
                問題を解く
              </Link>
            </Button>
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <p className="mb-3 text-xs font-medium text-muted-foreground">
              試験区分から探す
            </p>
            <div className="flex flex-wrap gap-1.5">
              {EXAM_LINKS.map(({ code, label }) => (
                <Link
                  key={code}
                  href={`/${code}`}
                  className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs text-foreground/80 transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 border-t border-border pt-5">
            <Link
              href="/essay"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <FileCheck className="h-3.5 w-3.5" />
              午後論述のAI採点
            </Link>
            <Link
              href="/faq"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              よくある質問
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <Info className="h-3.5 w-3.5" />
              このサービスについて
            </Link>
            <Link
              href="/blog"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <BookOpen className="h-3.5 w-3.5" />
              学習ガイド
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
