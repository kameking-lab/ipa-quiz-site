import { QUESTIONS_BY_EXAM } from "../data/questions/index";
import type { ExamCode, Question } from "../lib/questions/types";

/** Run before claiming that a qualification has two complete, explained official rounds. */
function argument(name: string): string | undefined {
  return process.argv.find((value) => value.startsWith(`--${name}=`))?.slice(name.length + 3);
}

const exam = argument("exam") as ExamCode | undefined;
const expectedCount = Number(argument("expected-per-round"));
const rounds = process.argv.filter((value) => value.startsWith("--round=")).map((value) => value.slice(8));

if (!exam || !QUESTIONS_BY_EXAM[exam] || !Number.isInteger(expectedCount) || expectedCount < 1 || rounds.length < 2 || new Set(rounds).size !== rounds.length) {
  console.error("Usage: pnpm exec tsx scripts/verify-two-round-coverage.ts --exam=kanri --expected-per-round=50 --round=2024-annual --round=2025-annual");
  process.exit(2);
}

const questions: Question[] = QUESTIONS_BY_EXAM[exam] ?? [];
const errors: string[] = [];

for (const round of rounds) {
  const paper = questions.filter((question) => `${question.year}-${question.season}` === round);
  if (paper.length !== expectedCount) errors.push(`${round}: ${paper.length}/${expectedCount}問`);
  const ids = new Set(paper.map((question) => question.id));
  if (ids.size !== paper.length) errors.push(`${round}: 問題IDが重複`);
  for (const question of paper) {
    const keys = Object.keys(question.choices ?? {});
    const complete = keys.length >= 2 && keys.every((key) => {
      const explanation = question.choiceExplanations?.[key as keyof typeof question.choiceExplanations];
      return typeof explanation === "string" && explanation.trim().length > 0;
    });
    if (!complete || question.explanationCoverage !== "full" || question.needsReview !== false) {
      errors.push(`${question.id}: 全選択肢解説または査読状態が未完了`);
    }
    if (!question.sourcePdfUrl.startsWith("https://") || !question.sourceAnswerUrl?.startsWith("https://") || !question.officialAnswerNumber) {
      errors.push(`${question.id}: 公式問題・正答の出典が不足`);
    }
  }
}

if (errors.length) {
  for (const error of errors) console.error(error);
  process.exit(1);
}
console.log(`${exam}: ${rounds.join(" + ")} = ${rounds.length * expectedCount}問、全肢解説・出典・査読状態を確認`);
