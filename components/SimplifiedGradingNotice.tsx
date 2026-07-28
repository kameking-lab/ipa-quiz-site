import { AlertTriangle } from "lucide-react";

/**
 * AI 採点が使えず簡易判定にフォールバックしたことを利用者に開示する。
 *
 * AI 応答の解析に失敗すると、サーバは字数・記入状況だけから機械的に出した
 * 得点を返す。HTTP 200 かつ AI プロバイダ名のままなので、開示しないと
 * 「AI が採点した結果」と区別がつかない。見た目は AfternoonDisclaimer と
 * 同じ amber の注意ブロックに揃える（新規デザインを作らない）。
 */
export function SimplifiedGradingNotice() {
  return (
    <div
      role="note"
      aria-label="簡易判定に関するお知らせ"
      className="flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-100"
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <p>
        <strong>⚠️ これは AI 採点ではなく「簡易判定」です。</strong>
        AI からの採点結果を取得できなかったため、解答の記入状況（字数など）だけから
        機械的に算出した得点を表示しています。
        <strong>記述内容そのものは評価していません。</strong>
        時間を置いて再度採点すると、AI 採点を受けられる場合があります。
      </p>
    </div>
  );
}
