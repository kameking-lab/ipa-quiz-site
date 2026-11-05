import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "../data/questions";
import { getQuestionsForExam } from "../lib/questions/get-questions";
import { questionPagePath } from "../lib/seo/question-url";
import { isPracticeReadyQuestion } from "../lib/questions/filter";
import type { ExamCode } from "../lib/questions/types";
import scope from "../reports/int7-20261105/release-scope.json";

async function main() {
  const baseline = JSON.parse(readFileSync("reports/int5-20261104/count-audit.json", "utf8")) as {rows: {code: ExamCode; practiceCount: number}[]};
  for (const row of baseline.rows) assert.equal(QUESTIONS_BY_EXAM[row.code]?.filter(isPracticeReadyQuestion).length, row.practiceCount, `inherited ${row.code}`);
  const rows = [];
  for (const [code, meta] of Object.entries(scope)) {
    const questions = QUESTIONS_BY_EXAM[code as ExamCode]!;
    assert.equal(questions.length, meta.exercises);
    assert.deepEqual(await getQuestionsForExam(code as ExamCode), questions);
    const sample = questions.find(q => q.hasImage) ?? questions[0];
    const variants = [sample, ...questions.filter(q => q.type === "descriptive").slice(0, 1), ...questions.filter(q => (q.requiredSelections ?? 1) > 1).slice(0, 1)];
    rows.push({code, name: meta.name, count: questions.length, samples: [...new Map(variants.map(q => [q.id, q])).values()].map(q => ({id:q.id, url:questionPagePath(q), quizUrl:`/quiz?mode=year&exam=${code}&year=${q.year}&season=${q.season}&session=${q.session}&question=${q.id}`, imageUrls:q.imageUrls ?? [], type:q.type}))});
  }
  const result = {inheritedExams: baseline.rows.length, inheritedCountsUnchanged: true, totalPublishedQuestions: ALL_QUESTIONS.length, additionalExercises: rows.reduce((n,r) => n+r.count,0), rows};
  writeFileSync("reports/int7-20261105/runtime-audit.json", JSON.stringify(result,null,2)+"\n");
  console.log(JSON.stringify({inheritedExams:baseline.rows.length, total:ALL_QUESTIONS.length, additional:result.additionalExercises}));
}
main().catch(error => {console.error(error);process.exitCode=1;});
