import type { ExamCode } from "@/lib/questions/types";
import { examLabel } from "@/lib/utils";
import { PLAN_OFFER } from "@/lib/billing/plan-offer";
import { examMetaDescription, getQuestionsByExamStrict } from "@/lib/seo/exam-meta";

/** Search copy is separate from the longer, qualification-specific on-page guide. */
export function examSearchMetadata(exam: ExamCode, count: number, coverageDescription = examMetaDescription(exam, count)) {
  const countLabel = count.toLocaleString("ja-JP");
  // Preserve scope qualifications rather than implying complete official papers.
  const preserveCoverage = /(?:部分|一部)収録/.test(coverageDescription) || exam === "chosashi";
  const title = `${examLabel(exam)} 過去問 ${preserveCoverage ? "収録" : "全"}${countLabel}問｜無料・解説つき`;
  // These complete papers also carry edition and legal-date scope in their existing summary.
  if (preserveCoverage || exam === "kanri" || exam === "zoen2") {
    return { title, description: `問題と解説を無料で確認。${coverageDescription}` };
  }
  const years = getQuestionsByExamStrict(exam).map(q => q.year);
  const first = years.length ? Math.min(...years) : null;
  const last = years.length ? Math.max(...years) : null;
  const range = first === null ? "掲載済み" : first === last ? `${first}年度` : `${first}〜${last}年度`;
  const description = `${examLabel(exam)}の過去問を全${countLabel}問収録。${range}の問題を年度別・分野別に選び、正答と解説を無料で確認できます。1日${PLAN_OFFER.freeDaily}問から演習し、疑問はAIに質問できます。`;
  return { title, description };
}
