import Link from "next/link";
import { billingIdentity } from "@/lib/billing/runtime";
import { monthlyConfig } from "@/lib/billing/subscription/config";
import { MONTHLY_PUBLIC_OFFER, monthlySellerDisclosure } from "@/lib/billing/subscription/public-offer";
import { monthlyTerms } from "@/lib/billing/subscription/service";
import { monthlyRuntime } from "@/lib/billing/subscription/runtime";
import { CheckoutButton } from "./CheckoutButton";
import { ManageSubscriptionButton } from "./ManageSubscriptionButton";
export default async function MonthlyPage() {
  let config: ReturnType<typeof monthlyConfig> | null = null;
  try { config = monthlyConfig(); } catch { /* Keep the unconfigured sales page closed. */ }
  let signedIn = false, canManage = false, hasContract = false;
  try {
    if (config) {
      const state = await monthlyRuntime().service.status(await billingIdentity());
      signedIn = true; canManage = state.canManage; hasContract = !!state.subscription && !["canceled", "incomplete_expired"].includes(state.subscription.status);
    }
  } catch { /* Never enable checkout when identity/storage is unavailable. */ }
  const { priceYen: price, freeDaily: free } = MONTHLY_PUBLIC_OFFER;
  const seller = monthlySellerDisclosure();
  return <>
    <h1 className="text-3xl font-bold">連続演習 月額プラン</h1>
    <p className="text-2xl font-bold">月額{price.toLocaleString("ja-JP")}円（税込）・毎月自動更新</p>
    {config?.mode === "stripe-test" && <p>テスト環境です。ここでの操作による実際の請求はありません。</p>}
    {!config?.enabled && <p role="status">現在、新規申込を受け付けていません。既存契約は自動解約されません。契約条件・お問い合わせは以下をご確認ください。</p>}
    <p>収録済み範囲の年度別・通常の連続演習を回数制限なく進める利用権です。解説の収録範囲は問題によって異なり、AI応答や音声は含みません。</p>
    <p>個別問題・原紙・保存済み履歴の閲覧と復習は無料です。履歴は解約後も削除しません。</p>
    <dl className="space-y-3 rounded-xl border p-5">
      <div><dt>無料の演習枠</dt><dd>ログイン後は1日{free}問、日本時間0時に更新します。同じ日に同じ問題を再開しても追加消費しません。未ログインでは固定例題をご利用いただけます。</dd></div>
      <div><dt>支払・提供期間</dt><dd>初回と毎月の更新日に決済画面で示す方法で請求します。支払確認後、確認済みの請求対象期間をご利用いただけます。次回請求と期限は契約管理で確認できます。月額の1か月は一律30日ではありません。</dd></div>
      <div><dt>解約</dt><dd>契約管理から次回更新を停止できます。期間末解約では支払済みの期間末まで利用できます。解約予約の撤回も契約管理で行えます。購入画面から戻るだけでは既存契約は解約されません。</dd></div>
      <div><dt>更新失敗</dt><dd>確認済みの利用期間を超えて利用権は延長されません。支払方法や追加認証は契約管理で確認してください。支払が回復した場合も、新しい30日間を加算するのではなく請求対象期間に戻ります。</dd></div>
      <div><dt>返金・異議申し立て</dt><dd>日割返金はありません。重複請求・誤請求や当社の障害で利用できなかった場合は個別に確認し返金します。法令上の権利は制限しません。 部分返金だけでは利用権や自動更新は変わりません。全額返金が確認された請求分の利用権は終了し、該当請求期間を利用権の対象から除外します。返金は解約ではなく、次回更新を止めるには契約管理で別途解約してください。支払異議の調査中は対象契約の利用と更新を停止し、解決しても自動更新を勝手に再開しません。</dd></div>
    </dl>
    <p>既存会員向けの90日優遇は設けません。自分で契約を申し込むまで課金は始まりません。</p>
    <section><h2>販売者情報の開示・お問い合わせ</h2><p>事業者の氏名・住所・電話番号は、ご請求に応じて本人がメールで手動開示します。申込前にメールを送り、返信を受けて内容を確認してから申込をご検討ください。</p>
      <p><a href={seller.requestPath}>事業者情報の開示をメールで請求する</a>（{seller.email}）</p><p>返信は24時間が目安です。返信が届かない場合は再度ご連絡ください。メールを送信しただけでは開示は完了しません。</p><Link href="/contact">一般のお問い合わせ</Link></section>
    {canManage && <ManageSubscriptionButton />}
    {hasContract ? <p role="status">契約または支払確認待ちの申込があります。追加契約はせず、契約管理をご確認ください。</p>
      : <CheckoutButton recurring terms={config ? monthlyTerms(config) : ""} amount={price} enabled={!!config?.enabled && signedIn} testMode={config?.mode === "stripe-test"} />}
    <nav><Link href="/auth/signin?callbackUrl=%2Fbilling">ログイン</Link> · <Link href="/modes/year">学習へ</Link> · <Link href="/review">履歴・復習</Link></nav>
  </>;
}
