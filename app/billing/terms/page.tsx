import Link from "next/link";
import { AI_ACCESS_DESCRIPTION, AI_ATTEMPT_DESCRIPTION, aiAccessClaimsEnabled } from "@/components/ai/ai-access-copy";
import { PRICE_PAGE_LINK } from "@/lib/billing/price-page-link";
import { MONTHLY_PUBLIC_OFFER, monthlySellerDisclosure } from "@/lib/billing/subscription/public-offer";
import { SellerDisclosureLine } from "@/components/billing/SellerDisclosureLine";

export default function BillingTermsPage() {
  const { priceYen: price, freeDaily: free } = MONTHLY_PUBLIC_OFFER;
  const seller = monthlySellerDisclosure();
  return <>
    <h1 className="text-3xl font-bold">月額プランの条件・特定商取引法に基づく表示</h1>
    <dl className="space-y-3 rounded-xl border p-5">
      <div><dt>販売価格</dt><dd>月額{price.toLocaleString("ja-JP")}円（税込）。毎月自動更新。</dd></div>
      <div><dt>内容</dt><dd>収録済みの演習が回数制限なく使えます。無料はログインなしでも1日{free}問（ウェブ・アプリ共通、日本時間0時に更新、同じ日に同じ問題を開き直しても追加消費しません）。{aiAccessClaimsEnabled() ? AI_ACCESS_DESCRIPTION : "AI応答の利用条件は提供準備中です。"} 対応端末・ブラウザーの読み上げは無料です。</dd></div>
      <div><dt>支払・提供期間</dt><dd>初回と毎月の更新日に決済画面で示す方法で請求します。支払確認後、確認済みの請求対象期間をご利用いただけます。次回請求と期限は契約管理で確認できます。月額の1か月は一律30日ではありません。</dd></div>
      <div><dt>解約</dt><dd>契約管理から次回更新を停止できます。期間末解約では支払済みの期間末まで利用できます。解約予約の撤回も契約管理で行えます。購入画面から戻るだけでは既存契約は解約されません。</dd></div>
      <div><dt>更新失敗</dt><dd>確認済みの利用期間を超えて利用権は延長されません。支払方法や追加認証は契約管理で確認してください。支払が回復した場合も、新しい30日間を加算するのではなく請求対象期間に戻ります。</dd></div>
      <div><dt>返金・異議申し立て</dt><dd>日割返金はありません。重複請求・誤請求や当社の障害で利用できなかった場合は個別に確認し返金します。法令上の権利は制限しません。 部分返金だけでは利用権や自動更新は変わりません。全額返金が確認された請求分の利用権は終了し、該当請求期間を利用権の対象から除外します。返金は解約ではなく、次回更新を止めるには契約管理で別途解約してください。支払異議の調査中は対象契約の利用と更新を停止し、解決しても自動更新を勝手に再開しません。</dd></div>
      {aiAccessClaimsEnabled() && <div><dt>AIの回数</dt><dd>{AI_ATTEMPT_DESCRIPTION}</dd></div>}
      <div><dt>販売者・連絡先</dt><dd><SellerDisclosureLine /><p>メール: <a className="underline" href={seller.requestPath}>{seller.email}</a></p></dd></div>
    </dl>
    <p>自分で契約を申し込むまで課金は始まりません。</p>
    <nav className="flex flex-wrap gap-4"><Link className="underline" href="/terms">利用規約</Link><Link className="underline" href={PRICE_PAGE_LINK.href}>{PRICE_PAGE_LINK.label}</Link></nav>
  </>;
}
