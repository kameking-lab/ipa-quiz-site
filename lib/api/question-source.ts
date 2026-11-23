import { getSafePdfUrl } from "@/lib/exam-config";
import type { Question } from "@/lib/questions/types";

export function publicQuestionSource(q: Question) {
  if (!q.sourceArchiveUrl) return { sourcePdfUrl: getSafePdfUrl(q.sourcePdfUrl) };
  return {
    sourcePdfUrl: q.sourcePdfUrl,
    sourceArchiveUrl: q.sourceArchiveUrl,
    sourceAnswerUrl: q.sourceAnswerUrl,
    sourceAnswerArchiveUrl: q.sourceAnswerArchiveUrl,
  };
}
