import Link from "next/link";
import { AI_ACCESS_DESCRIPTION, AI_COUNTING_DESCRIPTION, aiAccessClaimsEnabled } from "@/lib/ai/quota-copy";
import { PRICE_PAGE_LINK } from "@/lib/billing/price-page-link";
import { MONTHLY_PUBLIC_OFFER, monthlySellerDisclosure } from "@/lib/billing/subscription/public-offer";
import { SellerDisclosureLine } from "@/components/billing/SellerDisclosureLine";

export const revalidate = 0;

export default function BillingTermsPage() {
  const { priceYen: price, freeDaily: free, trialDays } = MONTHLY_PUBLIC_OFFER;
  const seller = monthlySellerDisclosure();
  return <>
    <h1 className="text-balance text-2xl font-bold leading-snug tracking-tight sm:text-3xl">月額プランの条件・特定商取引法に基づく表示</h1>
    <dl className="divide-y divide-border rounded-2xl border border-border bg-card px-5 text-sm leading-7 [&>div]:py-4 [&_dt]:mb-1 [&_dt]:font-semibold [&_dd]:text-muted-foreground">
      <div><dt>販売価格</dt><dd>月額{price.toLocaleString("ja-JP")}円（税込）。ウェブの申込時に自動終了を選ぶと、受験日の翌日0時（日本時間）に終了します。継続を選んだ場合とApp Storeで購入した場合は毎月自動更新します。</dd></div>
      {trialDays > 0 && <div><dt>無料期間</dt><dd>ウェブで初めて契約する方は、最初の{trialDays}日間が無料です（1アカウント・カード各1回）。申込時にカードの登録が必要です。無料期間内に解約または自動終了した場合は請求しません。無料期間の終了後も契約が続く場合は、無料期間が終わる日に初回請求します。以前に無料期間を使ったカードでは、申込時に請求します。無料期間の終了日は決済画面と契約管理で確認できます。App Storeの購入にはこの無料期間はありません。</dd></div>}
      <div><dt>内容</dt><dd>収録済みの演習が回数制限なく使えます。無料はログインなしでも1日{free}問（ウェブ・アプリ共通、日本時間0時に更新、同じ日に同じ問題を開き直しても追加消費しません）。{aiAccessClaimsEnabled() ? AI_ACCESS_DESCRIPTION : ""} 対応端末・ブラウザーの読み上げは無料です。</dd></div>
      <div><dt>支払・提供期間</dt><dd>初回と毎月の更新日に決済画面で示す方法で請求します。自動終了前の最終請求が50円未満の場合は請求しません。次回請求と利用期限は契約管理で確認できます。月額の1か月は一律30日ではありません。</dd></div>
      <div><dt>解約</dt><dd>契約管理から次回更新を停止できます。期間末解約では支払済みの期間末まで利用できます。解約予約の撤回も契約管理で行えます。購入画面から戻るだけでは既存契約は解約されません。</dd></div>
      <div><dt>更新失敗</dt><dd>確認済みの利用期間を超えて利用権は延長されません。支払方法や追加認証は契約管理で確認してください。支払が回復した場合も、新しい30日間を加算するのではなく請求対象期間に戻ります。</dd></div>
      <div><dt>返金・異議申し立て</dt><dd>日割返金はありません。重複請求・誤請求や当社の障害で利用できなかった場合は個別に確認し返金します。法令上の権利は制限しません。 部分返金だけでは利用権や自動更新は変わりません。全額返金が確認された請求分の利用権は終了し、該当請求期間を利用権の対象から除外します。返金は解約ではなく、次回更新を止めるには契約管理で別途解約してください。支払異議の調査中は対象契約の利用と更新を停止し、解決しても自動更新を勝手に再開しません。</dd></div>
      {aiAccessClaimsEnabled() && <div><dt>AIの回数</dt><dd>{AI_COUNTING_DESCRIPTION}</dd></div>}
      <div><dt>販売者・連絡先</dt><dd><SellerDisclosureLine /><p>メール: <a className="underline" href={seller.requestPath}>{seller.email}</a></p></dd></div>
    </dl>
    <p>自分で契約を申し込むまで課金は始まりません。</p>
    <nav className="flex flex-wrap gap-x-5 gap-y-1 [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center"><Link className="underline" href="/terms">利用規約</Link><Link className="underline" href={PRICE_PAGE_LINK.href}>{PRICE_PAGE_LINK.label}</Link></nav>
  </>;
}
