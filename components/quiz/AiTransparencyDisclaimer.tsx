import { ExternalLink } from "lucide-react";
import { getOfficialAnswerPdfUrl, getSafePdfUrl, ipaSourceLabel, isPdfDocumentUrl } from "@/lib/exam-config";
import { questionReferenceLabel } from "@/lib/questions/reference-label";
import type { Question } from "@/lib/questions/types";

export function AiTransparencyDisclaimer({ question }: { question: Question }) {
  const sourceUrl = getSafePdfUrl(question.sourcePdfUrl);
  const sourceLabel = isPdfDocumentUrl(sourceUrl) ? "公式問題PDF" : "公式問題の公開ページ";
  const documentLabel = ipaSourceLabel(sourceUrl, "question");
  const answerUrl = getOfficialAnswerPdfUrl(question.sourcePdfUrl, question.sourceAnswerUrl);
  const separateAnswer = answerUrl !== sourceUrl;
  const references = [...new Set(question.officialReferenceUrls)].filter(
    (url) => url !== sourceUrl && url !== question.sourcePdfUrl && url !== answerUrl && url !== question.sourceAnswerUrl,
  );

  return (
    <div id="question-source" role="group" aria-label="出典" className="mt-4 scroll-mt-20 text-xs text-muted-foreground">
      <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 font-medium underline underline-offset-4">
        {sourceLabel}{documentLabel === "問題PDF" ? "" : `（${documentLabel}）`}
        <ExternalLink className="h-3 w-3" aria-hidden="true" />
      </a>
      {question.sourceAttribution && <p>{question.sourceAttribution}</p>}
      {(separateAnswer || references.length > 0) && (
        <details className="mt-2">
          <summary className="min-h-11 cursor-pointer py-3">出典の詳細</summary>
          <ul className="space-y-2">
            {separateAnswer && (
              <li>
                <a href={answerUrl} target="_blank" rel="noopener noreferrer" className="underline">
                  {isPdfDocumentUrl(answerUrl) ? "公式正答PDF" : "公式正答の公開ページ"}
                </a>
              </li>
            )}
            {references.map((url) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="underline">
                  {questionReferenceLabel(question, url)}
                </a>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
