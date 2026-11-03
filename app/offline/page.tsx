import type { Metadata } from "next";
import { OfflineHome } from "@/components/offline/OfflineHome";
import { ALL_QUESTIONS } from "@/data/questions";
import { questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition,questionSourceExam } from "@/lib/questions/source-label";
import { strictContentGateEnabled } from "@/lib/billing/content-policy";

export const metadata: Metadata = {
  title: "オフラインモード",
  description:
    "ネットワーク接続がない状態で、ブックマーク済み・最近閲覧した問題を演習できます。",
  robots: { index: false, follow: false },
  alternates: { canonical: "/offline" },
};

// Static so it gets precached by the service worker.
export const dynamic = "force-static";

export default function OfflinePage() {
  if(strictContentGateEnabled())return <main className="p-6"><h1>オフライン学習</h1><p>事前ダウンロードは有料会員専用です。iPhoneアプリの「端末内で学習」で、有効な署名付き権利と保存済み教材を確認して利用します。</p></main>;
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-10 pt-6 sm:px-6 sm:pt-8">
      <OfflineHome catalog={ALL_QUESTIONS.map(q=>({id:q.id,href:questionPagePath(q),label:`${questionSourceExam(q)} ${questionSourceEdition(q)} 問${q.qNumber}`}))}/>
    </main>
  );
}
