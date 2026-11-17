import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "メールを確認してください",
  robots: { index: false, follow: false },
};

export default function VerifyRequestPage() {
  return (
    <main className="relative flex flex-1 items-center justify-center px-4 py-8 sm:py-12">

      <div className="relative w-full max-w-md text-center">
        <div className="overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm sm:p-8">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary-soft-foreground">
            <MailCheck className="h-7 w-7" />
          </div>
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
            <Button asChild variant="outline" size="lg" className="w-full">
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
