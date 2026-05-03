import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApiKeysClient } from "@/app/account/api-keys/ApiKeysClient";

export const metadata: Metadata = {
  title: "API キー管理｜設定",
  description:
    "過去問AI Public API（β）で利用する API キーを発行・管理します。",
  alternates: { canonical: "/settings/api-keys" },
  robots: { index: false, follow: false },
};

export default function ApiKeysSettingsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/settings#api-keys">
          <ArrowLeft className="h-4 w-4" />
          設定に戻る
        </Link>
      </Button>
      <ApiKeysClient />
    </main>
  );
}
