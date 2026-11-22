import type { ExamCode } from "@/lib/questions/types";
import { examLabel } from "@/lib/utils";
import { PLAN_OFFER } from "@/lib/billing/plan-offer";
import { examMetaDescription, getQuestionsByExamStrict } from "@/lib/seo/exam-meta";

export function examSearchMetadata(exam: ExamCode, count: number, coverageDescription = examMetaDescription(exam, count)) {
  const years = getQuestionsByExamStrict(exam).map(q => q.year);
  const facts = exam === "kanri" ? "各年度の法令基準日も確認できます。"
    : exam === "zoen2" ? "前期・後期の第一次検定を各回40問収録しています。" : coverageDescription;
  return formatExamSearchMetadata(examLabel(exam), count, years, facts, exam === "kanri" || exam === "zoen2");
}

/** Count distinct years represented in the corpus, including gaps between editions. */
export function formatExamSearchMetadata(name: string, count: number, years: readonly number[], coverage = "", useCoverage = false) {
  const yearCount = new Set(years).size;
  const size = (yearCount ? yearCount + "年分" : "") + count.toLocaleString("ja-JP") + "問";
  const title = name + " 過去問 " + size + "｜解説つき・無料";
  const lead = name + "の過去問を" + size + "収録。答えと解説つきで、1日" + PLAN_OFFER.freeDaily + "問まで無料です。";
  const partial = /(?:部分|一部)収録|原問|公表版/.test(coverage);
  const scope = partial || useCoverage ? coverage.split("。")[0] + "。" : "";
  const browse = "年度別・分野別に過去問を選び、解いた問題の答えと解説を読みながら復習できます。";
  const description = lead + scope + browse;
  return { title, description: description.length > 110 ? description.slice(0, 109) + "…" : description };
}
