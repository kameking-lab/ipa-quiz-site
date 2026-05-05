import Link from "next/link";
import { Sparkles } from "lucide-react";

export function AiTransparencyDisclaimer() {
  return (
    <details className="mt-3 rounded-xl border border-border bg-muted/30 text-xs text-muted-foreground">
      <summary className="cursor-pointer list-none px-3 py-2 [&::-webkit-details-marker]:hidden">
        <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
          <Sparkles className="h-3 w-3 text-primary" />
          この解説は AI 生成です（詳細）
        </span>
      </summary>
      <div className="space-y-1.5 px-3 pb-3 leading-relaxed">
        <p>
          解説テキストは Google Gemini に IPA 公式の問題文・公式解答を入力して生成しました。
          人間によるレビューを行ったものと、未レビューのものが混在します。
        </p>
        <p>
          AI は事実誤認・選択肢の取り違え・最新法令の反映漏れ等を含む可能性があります。
          重要な判断は必ず IPA 公式 PDF または最新の参考書でご確認ください。
        </p>
        <p>
          解説の検証プロセス・誤り報告フローは{" "}
          <Link href="/transparency" className="font-medium underline">
            運営透明性レポート
          </Link>
          で公開しています。
        </p>
      </div>
    </details>
  );
}
