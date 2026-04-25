import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "お問い合わせを受け付けました",
  description:
    "Team プランへのお問い合わせを受け付けました。2 営業日以内に担当者よりご連絡いたします。",
  robots: { index: false, follow: false },
  alternates: { canonical: "/contact/enterprise/thanks" },
};

export default function EnterpriseContactThanksPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 py-16 sm:px-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            お問い合わせありがとうございました
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            Team プランへのお問い合わせを正常に受け付けました。
            担当者より 2 営業日以内にメールにてご連絡いたします。
          </p>
          <p className="text-zinc-500 dark:text-zinc-400">
            メールが届かない場合は迷惑メールフォルダもご確認ください。
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild variant="primary">
              <Link href="/">ホームに戻る</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/pricing">料金プランを確認</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
