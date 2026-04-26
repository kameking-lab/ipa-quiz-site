import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EssayGraderClient } from "./EssayGraderClient";

export const metadata: Metadata = {
  title: "AI 論述添削 — Premium",
  description:
    "ST/SA/PM/SM/AU の論述試験(午後II)の答案を AI が添削。論旨の評価・観点の漏れ・改善提案をフィードバック。",
  robots: { index: false, follow: false },
};

export default function EssayGraderPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" /> ホームに戻る
        </Link>
      </Button>

      <div className="mb-6">
        <Badge variant="soft" className="mb-2">
          <Sparkles className="h-3 w-3" />
          Premium 機能 (β)
        </Badge>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          AI 論述添削
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          ST / SA / PM / SM / AU の高度試験 午後II 論述の答案を AI が採点・添削。
          論旨展開、観点漏れ、改善提案をフィードバックします。
        </p>
      </div>

      <EssayGraderClient />
    </main>
  );
}
