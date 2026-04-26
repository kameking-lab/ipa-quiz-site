import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NotificationSettings } from "./NotificationSettings";

export const metadata: Metadata = {
  title: "通知設定",
  description: "メール通知とプッシュ通知の設定。",
  robots: { index: false, follow: false },
};

export default function NotificationsPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8">
      <Link
        href="/account"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        アカウントへ戻る
      </Link>
      <h1 className="mb-2 text-2xl font-bold tracking-tight">通知設定</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        学習継続リマインダーや週次ダイジェストの配信を管理できます。
      </p>
      <NotificationSettings />
    </main>
  );
}
