import Link from "next/link";

/** Shared footer has no question/exam context: never infer a publishing body here. */
export function SourceRelationshipFooter() {
  return <div className="mt-6 border-t border-border pt-4 text-center text-[11px] text-muted-foreground sm:text-left" aria-label="問題・解説・出典の関係">
    <p>問題の原資料・公式正答の出典は、各問題・試験回の出典欄をご確認ください。</p>
    <p className="mt-2">サイトの学習用解説は原資料・公式正答とは別のものです。本サービスは各試験実施団体とは独立した非公式の学習支援サービスです。</p>
    <p className="mt-2"><Link href="/license" className="underline decoration-border hover:text-foreground">著作権・出典</Link></p>
  </div>;
}
