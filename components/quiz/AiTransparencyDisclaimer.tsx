import { ExternalLink } from "lucide-react";
import { isPdfDocumentUrl } from "@/lib/exam-config";

interface Props {
  lastUpdatedISO?: string;
  lastUpdatedJa?: string;
  sourcePdfUrl: string;
  answerPdfUrl: string;
  sourceAttribution?: string;
}

/** Compact official-source links under the explanation (CLAUDE.md §8). */
export function AiTransparencyDisclaimer({
  sourcePdfUrl,
  answerPdfUrl,
  sourceAttribution,
}: Props) {
  const linkClass = "inline-flex min-h-11 w-fit items-center gap-1 font-medium text-foreground underline decoration-border underline-offset-4 transition hover:decoration-primary";
  return (
    <div className="mt-4 text-xs text-muted-foreground">
      <div className="flex flex-wrap gap-x-4">
        <a href={sourcePdfUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {isPdfDocumentUrl(sourcePdfUrl) ? "公式問題（PDF）" : "公式問題"}
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
        <a href={answerPdfUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {isPdfDocumentUrl(answerPdfUrl) ? "公式正答（PDF）" : "公式正答"}
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      </div>
      {sourceAttribution && <p>{sourceAttribution}</p>}
    </div>
  );
}
