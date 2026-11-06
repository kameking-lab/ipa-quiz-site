import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ipaSourceLabel, isPdfDocumentUrl } from "@/lib/exam-config";

interface Props {
  lastUpdatedISO?: string;
  lastUpdatedJa?: string;
  sourcePdfUrl: string;
  answerPdfUrl: string;
  sourceAttribution?: string;
}

/**
 * Compact official-source block under the explanation (CLAUDE.md §8):
 * the official question/answer links with their publisher label, the
 * per-question attribution and one link to the explanation policy.
 */
export function AiTransparencyDisclaimer({
  sourcePdfUrl,
  answerPdfUrl,
  sourceAttribution,
}: Props) {
  const linkClass = "inline-flex min-h-11 w-fit items-center gap-1 font-medium text-foreground underline decoration-border underline-offset-4 transition hover:decoration-primary";
  return (
    <div role="group" aria-label="AI生成の解説に関する詳細" className="mt-4 text-xs text-muted-foreground">
      <div className="flex flex-wrap gap-x-4">
        <a href={sourcePdfUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {isPdfDocumentUrl(sourcePdfUrl) ? "公式問題PDF" : "公式問題の公開ページ"}（{ipaSourceLabel(sourcePdfUrl, "question")}）
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
        <a href={answerPdfUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {isPdfDocumentUrl(answerPdfUrl) ? "公式正答PDF" : "公式正答の公開ページ"}（{ipaSourceLabel(answerPdfUrl, "answer")}）
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
        <Link href="/transparency#static-explanations" className={linkClass}>静的解説の確認方針</Link>
      </div>
      {sourceAttribution && <p>{sourceAttribution}</p>}
    </div>
  );
}
