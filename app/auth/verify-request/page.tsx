import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MailCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "メールを確認してください",
  robots: { index: false, follow: false },
};

export default function VerifyRequestPage() {
  return (
    <main className="relative flex flex-1 items-center justify-center px-4 py-12 sm:py-16">
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
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-violet-500 text-primary-foreground shadow-md">
            <MailCheck className="h-7 w-7" />
          </div>
          <Badge variant="success" className="mb-3">
            送信完了
          </Badge>
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground">
            メールを送信しました
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            届いたメールのリンクからログインを完了してください。
          </p>
          <p className="mt-1.5 text-xs text-muted-foreground">
            メールが届かない場合は、迷惑メールフォルダをご確認ください。
          </p>

          <div className="mt-6">
            <Button asChild variant="outline" size="md" className="w-full">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                ホームに戻る
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
