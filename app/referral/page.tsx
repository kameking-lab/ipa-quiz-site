import { AI_ACCESS_DESCRIPTION, AI_ATTEMPT_DESCRIPTION, BROWSER_AUDIO_DESCRIPTION, aiAccessClaimsEnabled } from "@/components/ai/ai-access-copy";
import { MONTHLY_PUBLIC_OFFER } from "@/lib/billing/subscription/public-offer";
import type { Metadata } from "next";
import Link from "next/link";
import { PRICE_PAGE_LINK } from "@/lib/billing/price-page-link";
import { ReferralClient } from "./ReferralClient";

export function generateMetadata(): Metadata {
  return {title:"友達紹介についてのご案内", description:"紹介リンク作成はプレビューです。紹介特典の付与状況を確認するものではありません。個別案内の確認先とAIの利用条件をご案内します。", alternates:{canonical:"/referral"}};
}

export default function ReferralPage() {
  const activeAiPolicy = aiAccessClaimsEnabled();
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 pb-12 pt-8 sm:px-6">
      <h1 className="text-3xl font-bold">友達紹介についてのご案内</h1>
      <section aria-label="紹介特典の確認" className="space-y-3 text-sm leading-relaxed">
        <p>このページの紹介リンク作成・共有だけでは、Premium特典の付与や有効化は行われません。</p>
        <p>すでに紹介特典を個別にご案内している場合は、その案内内容について<Link href="/contact" className="underline">お問い合わせください</Link>。</p>
      </section>
      <section aria-label="連続演習の月額プランとAIの利用条件" className="space-y-3 text-sm leading-relaxed">
        <p>対象の連続演習の月額プランの案内額は税込{MONTHLY_PUBLIC_OFFER.priceYen.toLocaleString("ja-JP")}円です。販売状況・対象範囲・契約条件は<Link href={PRICE_PAGE_LINK.href} className="underline">{PRICE_PAGE_LINK.label}</Link>でご確認ください。</p>
        {activeAiPolicy ? <>
          <p>無料AIの新規生成にはログインが必要です。{AI_ACCESS_DESCRIPTION}</p>
          <p>{AI_ATTEMPT_DESCRIPTION}</p>
        </> : <p>AI コパイロットは無料で試用できます。その他のAI機能は各画面の利用条件をご確認ください。AI応答の利用条件は連続演習の月額プランとは別に管理しています。</p>}
        <p>{BROWSER_AUDIO_DESCRIPTION}</p>
      </section>
      <details className="rounded-xl border p-4">
        <summary className="cursor-pointer font-semibold">紹介リンクの作成・コピー（プレビュー）</summary>
        <div aria-label="紹介リンクのプレビュー説明" className="mt-3 space-y-3">
          <p className="text-sm">人数はこの端末に保存されたプレビュー値で、実際の登録人数や特典の付与状況を確認する表示ではありません。「近日実装」等の表示は受付日・提供開始日や特典を保証するものではありません。</p>
          <ReferralClient />
        </div>
      </details>
      <Link href="/about" className="text-sm underline">サービスについて</Link>
    </main>
  );

}
