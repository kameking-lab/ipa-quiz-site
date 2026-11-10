import Link from "next/link";

/** Informational destination; never starts a web purchase in the app. */
export function NativeBillingTerms() {
  return <section className="mx-auto w-full max-w-2xl space-y-4 px-4 py-8">
    <h1 className="text-2xl font-bold">App Store月額プランの条件・返金</h1>
    <p>価格はアプリの会員・設定とAppleの購入確認画面に表示されます。月額プランは自動更新です。購入確認時にApple IDへ請求されます。</p>
    <p>更新の停止・契約状況はApp Storeのサブスクリプション管理で確認してください。解約後も有効期間の末日までは利用できます。</p>
    <p>App Storeで購入したプランの返金はAppleへ申請してください。返金の可否はAppleが適用条件に基づいて判断します。運営者への障害連絡とは別の手続きです。法令上の権利は制限しません。</p>
    <p><a className="underline" href="https://support.apple.com/118223">Appleの返金申請方法</a></p>
    <p><a className="underline" href="https://apps.apple.com/account/subscriptions">App Storeで管理・解約</a></p>
    <Link className="underline" href="/terms">利用規約</Link>
  </section>;
}
