import { AI_ACCESS_DESCRIPTION, AI_ATTEMPT_DESCRIPTION, aiAccessClaimsEnabled } from "@/components/ai/ai-access-copy";
import Link from "next/link";
import { billingIdentity } from "@/lib/billing/runtime";
import { monthlyConfig } from "@/lib/billing/subscription/config";
import { MONTHLY_PUBLIC_OFFER, monthlySellerDisclosure } from "@/lib/billing/subscription/public-offer";
import { monthlyTerms } from "@/lib/billing/subscription/service";
import { monthlyRuntime } from "@/lib/billing/subscription/runtime";
import { QuizResumeLinks } from "./QuizResumeLinks";
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
  const aiReady = aiAccessClaimsEnabled();
  return <>
    <h1 className="text-3xl font-bold">連続演習 月額プラン</h1>
    <section aria-labelledby="monthly-price" className="space-y-3 rounded-2xl border border-border bg-card p-5 sm:p-6">
      <h2 id="monthly-price" className="text-2xl font-bold">月額{price.toLocaleString("ja-JP")}円<span className="text-base">（税込）</span></h2>
      <p><strong>解約まで毎月自動更新</strong>。契約管理から次回更新を停止できます。</p>
      <p>期間末解約では支払済みの期間末まで利用できます。日割返金はありません。</p>
      <p className="text-sm">自分で契約を申し込むまで課金は始まりません。</p>
    </section>
    {config?.mode === "stripe-test" && <p>テスト環境です。ここでの操作による実際の請求はありません。</p>}
    {!config?.enabled && <p role="status">現在、新規申込を受け付けていません。既存契約は自動解約されません。契約条件・お問い合わせは以下をご確認ください。</p>}
    <p>収録済み範囲の年度別・通常の連続演習を回数制限なく進める利用権です。解説の収録範囲は問題によって異なります。</p>
    <section aria-labelledby="plan-comparison" className="space-y-4">
      <h2 id="plan-comparison" className="text-xl font-bold">無料と月額の違い</h2>
      <div className="grid items-stretch gap-4 sm:grid-cols-2">
        <section aria-labelledby="free-plan" className="h-full space-y-4 rounded-xl border border-border p-5">
          <h3 id="free-plan" className="text-lg font-bold">無料</h3>
          <dl className="space-y-4">
            <div><dt className="font-semibold">連続演習</dt><dd>ログインなしでも<strong>1日{free}問</strong>。日本時間0時に更新します。</dd></div>
            <div><dt className="font-semibold">履歴の同期</dt><dd>無料ログインで利用できます。ログインで演習枠は増えません。</dd></div>
            <div><dt className="font-semibold">AIの新規生成</dt><dd>{!aiReady && <strong>提供準備中。確定方針：</strong>}ログイン後、対象のAI機能で共通<strong>1日3回</strong>。日本時間0時に更新します。</dd></div>
            <div><dt className="font-semibold">閲覧・復習・読み上げ</dt><dd>個別問題・原紙・保存済み履歴は無料。対応端末の読み上げも追加料金なし。</dd></div>
          </dl>
        </section>
        <section aria-labelledby="paid-plan" className="h-full space-y-4 rounded-xl border border-border p-5">
          <h3 id="paid-plan" className="text-lg font-bold">月額プラン</h3>
          <dl className="space-y-4">
            <div><dt className="font-semibold">連続演習</dt><dd>収録済み範囲の年度別・通常の連続演習が<strong>回数制限なし</strong>。</dd></div>
            <div><dt className="font-semibold">履歴の同期</dt><dd>ログインして利用できます。履歴は解約後も削除しません。</dd></div>
            <div><dt className="font-semibold">AIの新規生成</dt><dd>{!aiReady && <strong>提供準備中。確定方針：</strong>}対象のAI機能を<strong>通常利用で回数無制限</strong>。</dd></div>
            <div><dt className="font-semibold">閲覧・復習・読み上げ</dt><dd>無料と共通。対応端末の読み上げに追加料金はかかりません。</dd></div>
          </dl>
        </section>
      </div>
      <p aria-label="AIの利用条件" className="text-sm">{!aiReady && <>AIの新しい利用条件は提供準備中です。以下は確定した方針で、提供開始の案内ではありません。 </>}{AI_ACCESS_DESCRIPTION} {AI_ATTEMPT_DESCRIPTION}</p>
    </section>
    <p>読み上げボタンのある問題では、対応する端末・ブラウザーの読み上げを無料・有料どちらでも追加料金なしで利用できます。音声や再生できる環境は端末によって異なります。</p>
    <p>個別問題・原紙・保存済み履歴の閲覧と復習は無料です。履歴は解約後も削除しません。</p>
    <dl className="space-y-3 rounded-xl border p-5">
      <div><dt className="font-bold">無料の演習枠</dt><dd>ログインなしでも1日{free}問、日本時間0時に更新します。同じ日に同じ問題を再開しても追加消費しません。履歴の同期などは無料ログインで利用できます。ログインだけで本日の無料枠は追加されません。</dd></div>
      <div><dt className="font-bold">支払・提供</dt><dd>初回と毎月の更新日に決済画面で示す方法で請求します。支払確認後、確認済みの請求対象期間をご利用いただけます。</dd></div>
      <div><dt className="font-bold">更新失敗</dt><dd>確認済みの利用期間を超えて利用権は延長されません。</dd></div>
      <div><dt className="font-bold">解約</dt><dd>契約管理から次回更新を停止できます。期間末解約では支払済みの期間末まで利用できます。</dd></div>
      <div><dt className="font-bold">返金</dt><dd>日割返金はありません。重複請求・誤請求や当社の障害で利用できなかった場合は個別に確認し返金します。法令上の権利は制限しません。返金は解約ではなく、次回更新を止めるには別途解約してください。</dd></div>
    </dl>
    <p><Link className="underline underline-offset-2" href="/billing/terms" target="_blank" rel="noopener noreferrer">月額プランの詳細条件・利用規約（新しいタブで開きます）</Link></p>
    <p>既存会員向けの90日優遇は設けません。自分で契約を申し込むまで課金は始まりません。</p>
    <section><h2>販売者情報の開示・お問い合わせ</h2><p>事業者の氏名・住所・電話番号は、ご請求に応じて本人がメールで手動開示します。申込前にメールを送り、返信を受けて内容を確認してから申込をご検討ください。</p>
      <p><a href={seller.requestPath}>事業者情報の開示をメールで請求する</a>（{seller.email}）</p><p>返信は24時間が目安です。返信が届かない場合は再度ご連絡ください。メールを送信しただけでは開示は完了しません。</p><Link href="/contact">一般のお問い合わせ</Link></section>
    {canManage && <ManageSubscriptionButton />}
    {hasContract ? <p role="status">契約または支払確認待ちの申込があります。追加契約はせず、契約管理をご確認ください。</p>
      : <CheckoutButton recurring terms={config ? monthlyTerms(config) : ""} amount={price} enabled={!!config?.enabled && signedIn} testMode={config?.mode === "stripe-test"} />}
    <QuizResumeLinks showLogin />
    <nav><Link href="/review">履歴・復習</Link></nav>
  </>;
}
