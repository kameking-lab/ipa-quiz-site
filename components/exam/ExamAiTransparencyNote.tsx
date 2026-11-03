import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function ExamAiTransparencyNote() {
  return (
    <section
      aria-label="AI 解説の透明性について"
      className="mb-8 rounded-2xl border border-amber-500/30 bg-amber-50/50 p-5 text-sm text-amber-900 shadow-sm dark:border-amber-500/40 dark:bg-amber-950/20 dark:text-amber-100"
    >
      <div className="mb-2 flex items-center gap-2">
        <ShieldCheck className="h-4 w-4" />
        <h2 className="text-base font-bold tracking-tight">
          AI 解説の作り方と限界
        </h2>
      </div>
      <ul className="ml-1 list-disc space-y-1 pl-4 text-xs leading-relaxed">
        <li>
          解説本文はAIの支援を用いて作成した学習用の独自解説です。公式問題・正答の照合と、解説内容の確認は別の工程です。
        </li>
        <li>
          確認範囲は問題・実施回で異なります。全件の人による確認や専門家監修を保証していません。誤りや最新制度の反映漏れが含まれる可能性があります。
        </li>
        <li>
          各問題には、対応する公式資料へのリンクを併記しています。最終確認は試験実施団体の公式資料でお願いします。
        </li>
        <li>
          誤りに気付いた場合は、各問題ページ下部のフィードバックから報告できます。
        </li>
      </ul>
      <p className="mt-3 text-[11px]">
        運営方針の詳細は{" "}
        <Link href="/transparency#static-explanations" className="font-medium underline">
          静的解説の確認範囲・訂正手順
        </Link>
        ・
        <Link href="/operator" className="font-medium underline">
          運営者情報
        </Link>
        をご覧ください。
      </p>
    </section>
  );
}
