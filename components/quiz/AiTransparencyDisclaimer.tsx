import Link from "next/link";
import { Sparkles, ExternalLink, Info } from "lucide-react";
import { ipaSourceLabel, isPdfDocumentUrl } from "@/lib/exam-config";

interface Props {
  lastUpdatedISO: string;
  lastUpdatedJa: string;
  sourcePdfUrl: string;
  answerPdfUrl: string;
  sourceAttribution?: string;
}

/**
 * Single compact "AI生成" badge that reveals the full disclosure (error
 * caveat, IPA-official verification note, last-updated date, source/answer
 * PDFs, transparency link) in a tap/click popover. Replaces the previous
 * three stacked layers under the explanation. Implemented as a native
 * <details> disclosure: no extra dependency, keyboard- and screen-reader-
 * accessible, taps to open and taps the badge again to close, and the links
 * inside stay focusable.
 */
export function AiTransparencyDisclaimer({
  lastUpdatedISO,
  lastUpdatedJa,
  sourcePdfUrl,
  answerPdfUrl,
  sourceAttribution,
}: Props) {
  return (
    <details open className="group mt-4 rounded-xl border border-border bg-muted/20 p-3 text-xs">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-1 font-medium text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background [&::-webkit-details-marker]:hidden">
        <Sparkles className="h-3 w-3 text-primary" aria-hidden="true" />
        解説・公式出典について
        <Info className="h-3 w-3 opacity-60" aria-hidden="true" />
      </summary>
      <div
        role="group"
        aria-label="AI生成の解説に関する詳細"
        className="mt-3 space-y-2 leading-relaxed text-muted-foreground"
      >
        <p>
          解説は学習支援用に作成したもので、試験実施機関による公式解説ではありません。
          事実誤認・選択肢の取り違え・最新法令の反映漏れ等を含む可能性があるため、
          重要な判断は必ずリンク先の公式資料でご確認ください。
        </p>
        <p>
          最終更新:{" "}
          <time dateTime={lastUpdatedISO} className="font-medium text-foreground">
            {lastUpdatedJa}
          </time>
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <a
            href={sourcePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-fit items-center gap-1 font-medium text-foreground underline decoration-border underline-offset-4 transition hover:decoration-primary"
          >
            {isPdfDocumentUrl(sourcePdfUrl) ? "公式問題PDF" : "公式問題の公開ページ"}（{ipaSourceLabel(sourcePdfUrl, "question")}）
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
          <a
            href={answerPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1 font-medium text-foreground underline decoration-border underline-offset-4 transition hover:decoration-primary"
          >
            {isPdfDocumentUrl(answerPdfUrl) ? "公式正答PDF" : "公式正答の公開ページ"}（{ipaSourceLabel(answerPdfUrl, "answer")}）
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
        {sourceAttribution && <p>{sourceAttribution}</p>}
        <p>
          検証プロセス・誤り報告フローは{" "}
          <Link href="/transparency" className="font-medium underline">
            運営透明性レポート
          </Link>
          で公開しています。
        </p>
      </div>
    </details>
  );
}
