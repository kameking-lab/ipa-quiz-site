import { AI_ACCESS_DESCRIPTION, AI_ATTEMPT_DESCRIPTION, BROWSER_AUDIO_DESCRIPTION, aiAccessClaimsEnabled } from "@/components/ai/ai-access-copy";
import { MONTHLY_PUBLIC_OFFER } from "@/lib/billing/subscription/public-offer";
import type { Metadata } from "next";
import Link from "next/link";
import { PRICE_PAGE_LINK } from "@/lib/billing/price-page-link";

export function generateMetadata(): Metadata {
  return {title:"学割についてのご案内", description:"このページでは学割の申請・資料送信・割引適用はできません。月額の連続演習とAIの利用条件、個別案内の確認先をご案内します。", alternates:{canonical:"/student"}};
}

export default function StudentPage() {
  const activeAiPolicy = aiAccessClaimsEnabled();
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 pb-12 pt-8 sm:px-6">
      <h1 className="text-3xl font-bold">学割についてのご案内</h1>
      <section aria-label="学割の受付状況" className="space-y-3 text-sm leading-relaxed">
        <p>このページから学割の申請・資料送信・割引適用はできません。学生証などの資料は送らないでください。</p>
        <p>以前に個別の学割条件をご案内している場合は、その案内内容について<Link href="/contact" className="underline">お問い合わせください</Link>。</p>
      </section>
      <section aria-label="連続演習の月額プランとAIの利用条件" className="space-y-3 text-sm leading-relaxed">
        <p>対象の連続演習の月額プランの案内額は税込{MONTHLY_PUBLIC_OFFER.priceYen.toLocaleString("ja-JP")}円です。販売状況・対象範囲・契約条件は<Link href={PRICE_PAGE_LINK.href} className="underline">{PRICE_PAGE_LINK.label}</Link>でご確認ください。</p>
        {activeAiPolicy ? <>
          <p>無料AIの新規生成にはログインが必要です。{AI_ACCESS_DESCRIPTION}</p>
          <p>{AI_ATTEMPT_DESCRIPTION}</p>
        </> : <p>AI コパイロットは無料で試用できます。その他のAI機能は各画面の利用条件をご確認ください。AI応答の利用条件は連続演習の月額プランとは別に管理しています。</p>}
        <p>{BROWSER_AUDIO_DESCRIPTION}</p>
      </section>

      <Link href="/about" className="text-sm underline">サービスについて</Link>
    </main>
  );

}
