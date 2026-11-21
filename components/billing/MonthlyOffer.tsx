import Link from "next/link";
import { PLAN_OFFER } from "@/lib/billing/plan-offer";
import { planStartHref } from "@/lib/billing/quiz-return";
import { examDateLabel, nextJstDate } from "@/lib/billing/exam-end";

export function MonthlyPrice() {
  return <p id="monthly-price-amount" className="font-semibold">
    月額<strong className="mx-1 text-4xl font-semibold tracking-tight">{PLAN_OFFER.priceYen.toLocaleString("ja-JP")}</strong>円
    <span className="ml-1 text-sm font-normal text-muted-foreground">（税込）</span>
  </p>;
}

export const monthlyActionClass = "flex min-h-12 w-full items-center justify-center rounded-xl px-4 py-3 text-base font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export function MonthlyPlanLink({ returnTo, onClick }: { returnTo: string; onClick?: () => void }) {
  return <a data-monthly-plan href={planStartHref(returnTo)} onClick={onClick} aria-label="月額プランに申し込む" aria-describedby="monthly-price-amount monthly-terms"
    className={monthlyActionClass + " bg-primary text-primary-foreground hover:bg-primary/90"}>
    申し込む
  </a>;
}

export function MonthlyConditions({ showTrial = true, keepPracticeOpen = false, signup, contract = false }: { showTrial?: boolean; keepPracticeOpen?: boolean; contract?: boolean;
  signup?: { date: string | null; trialDays: number; endsDuringTrial: boolean; automatic?: boolean }; }) {
  const linkProps = keepPracticeOpen ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return <div className="space-y-1 text-[13px] leading-5 text-muted-foreground">
    <p id="monthly-terms">
      {signup?.date && <span className="block">{examDateLabel(signup.date)}まで利用可（{examDateLabel(nextJstDate(signup.date))} 0時に自動終了・日本時間）。</span>}
      {signup ? signup.trialDays > 0 ? <>
        初回{signup.trialDays}日間無料（アカウント・カード各1回）。{signup.endsDuringTrial || signup.automatic && !signup.date ? "無料期間内に終了する場合は請求なし。" : "無料期間の終了日に初回請求。"}
      </> : "初回は決済時に請求。" : showTrial && PLAN_OFFER.trialDays > 0 && <span className="block [.native-app_&]:hidden">初回{PLAN_OFFER.trialDays}日間無料（アカウント・カード各1回）。<span className="inline-block">無料期間中の解約は請求なし。</span></span>}
      {!signup?.date && !signup?.automatic && !contract && <>毎月自動更新。<span className="[.native-app_&]:hidden">解約は契約管理から。</span>
        <span className="hidden [.native-app_&]:inline">解約はApp Storeのサブスクリプションから。</span></>}
    </p>
    <nav aria-label="契約に関する情報" className="flex flex-wrap gap-x-4 [&_a]:inline-flex [&_a]:min-h-8 [&_a]:items-center [&_a]:underline [&_a]:underline-offset-4">
      <Link href="/billing/terms" {...linkProps}>条件・特商法表示</Link>
      <Link href="/terms" {...linkProps}>利用規約</Link>
      <Link href="/privacy" {...linkProps}>プライバシーポリシー</Link>
    </nav>
  </div>;
}
