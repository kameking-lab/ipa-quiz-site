import { writeFileSync } from "node:fs";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { BATCH1_QUESTIONS } from "@/data/questions/batch1";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { filterQuestions, isPracticeReadyQuestion } from "@/lib/questions/filter";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { getIndexableQuestions } from "@/lib/seo/sitemap-pagination";
import { questionPagePath } from "@/lib/seo/question-url";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { PE_FIRST_CATALOG } from "@/lib/exam-library/pe-first-catalog";
import { loadPeFirstPaper } from "@/lib/exam-library/pe-first";
import type { ExamCode } from "@/lib/questions/types";
import { nativeBQuestionIssue } from "@/lib/questions/native-b";
import { numericQuestionIssue } from "@/lib/questions/numeric";
import { hasUnrenderableContent } from "@/lib/questions/content-quality";

export async function auditBatch1() {
  const published = QUALIFICATION_CATALOG.filter(entry => entry.status === "live" && entry.examCode);
  const directory = getHomeDirectory().flatMap(domain => [...domain.featured, ...domain.compact]);
  const indexable = new Set(getIndexableQuestions().map(q => q.id));
  const failures: string[] = [];
  const rows = [];
  for (const entry of published) {
    const code = entry.examCode!;
    const sync = QUESTIONS_BY_EXAM[code] ?? [];
    const lazy = await getQuestionsForExam(code);
    const practice = filterQuestions(lazy, { mode: "year", exam: code });
    const ids = (questions: typeof sync) => questions.map(q => q.id).sort().join("\n");
    if (ids(sync.filter(isPracticeReadyQuestion)) !== ids(practice)) failures.push(`${code}: sync/lazy practice mismatch`);
    if (new Set(sync.map(q => q.id)).size !== sync.length) failures.push(`${code}: duplicate IDs`);
    const paths = practice.map(q => questionPagePath(q));
    if (new Set(paths).size !== paths.length) failures.push(`${code}: duplicate question URLs`);
    const periodCounts: Record<string, number> = {};
    for (const q of practice) {
      const key = `${q.year}-${q.season}/${q.session}`;
      periodCounts[key] = (periodCounts[key] ?? 0) + 1;
    }
    rows.push({ code, name: entry.shortName, sourceCount: lazy.length, practiceCount: practice.length,
      indexableCount: practice.filter(q => indexable.has(q.id)).length,
      directory: directory.some(item => item.href === `/${code}`), periodCounts,
      firstUrl: paths[0], summary: entry.reuseSummary });
    const rejected = lazy.filter(q => !isPracticeReadyQuestion(q));
    if (rejected.length) writeFileSync(`reports/int1b-20261104/rejected-${code}.json`, JSON.stringify(rejected.map(q => ({ id: q.id, native: nativeBQuestionIssue(q), numeric: numericQuestionIssue(q), unrenderable: hasUnrenderableContent(q), needsReview: q.needsReview, question: q.question })), null, 2));
  }
  for (const [code, source] of Object.entries(BATCH1_QUESTIONS)) {
    if (rows.find(row => row.code === code)?.practiceCount !== source!.length) failures.push(`${code}: projected manuscript count differs from practice`);
  }
  const pe = PE_FIRST_CATALOG.map(entry => {
    const questions = loadPeFirstPaper(entry.id);
    if (!questions || questions.length !== entry.questionCount) failures.push(`${entry.id}: native paper count mismatch`);
    return { id: entry.id, subject: entry.subject, count: questions?.length ?? 0,
      scored: questions?.filter(q => !q.referenceOnly && q.answerAuthority === "official" && q.correctChoice !== null).length ?? 0 };
  });
  const allIds = ALL_QUESTIONS.map(q => q.id);
  if (new Set(allIds).size !== allIds.length) failures.push("Global duplicate question IDs");
  const result = { generatedAt: new Date().toISOString(), rows, pe, total: ALL_QUESTIONS.length, failures };
  writeFileSync("reports/int1b-20261104/count-audit.json", JSON.stringify(result, null, 2) + "\n");
  return result;
}
