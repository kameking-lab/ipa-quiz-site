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
          解説本文は Google Gemini を用いて、IPA 公式問題と公式解答を入力に再生成しています。
        </li>
        <li>
          AI 生成のため、用語の言い換えや細部の表現に誤りが含まれる可能性があります。
        </li>
        <li>
          各問題には IPA 公式 PDF へのリンクを必ず併記しています。最終確認は公式資料でお願いします。
        </li>
        <li>
          誤りに気付いた場合は、各問題ページ下部のフィードバックから報告できます。
        </li>
      </ul>
      <p className="mt-3 text-[11px]">
        運営方針の詳細は{" "}
        <Link href="/transparency" className="font-medium underline">
          運営透明性レポート
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
