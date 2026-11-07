import { writeFileSync } from "node:fs";
import { ALL_QUESTIONS } from "../data/questions";
import { isPracticeReadyQuestion, isPlaceholderExplanation } from "../lib/questions/filter";
import { getAvailableExams, getQuestionsByExamStrict, groupByCategory } from "../lib/seo/exam-meta";
import { questionPagePath } from "../lib/seo/question-url";
import { getSitemapQuestions } from "../lib/seo/sitemap-pagination";

const ready = ALL_QUESTIONS.filter(isPracticeReadyQuestion);
const categories = getAvailableExams().flatMap(exam => groupByCategory(getQuestionsByExamStrict(exam)).map(c => ({
  path: `/${exam}/topic/${encodeURIComponent(c.category)}`,
  count: c.count,
})));
const answerOnly = ready.filter(q => /^\s*(?:正解|正答|答え)\s*(?:は|[:：])?\s*[「『(（]?[アイウエオカキクケコ\d、,・\s]+[」』)）]?(?:です)?[。.\s]*$/u.test(q.explanation));
const shortest = [...ready].sort((a, b) => a.explanation.length - b.explanation.length).slice(0, 40).map(q => ({
  path: questionPagePath(q), explanation: q.explanation, choiceReasons: q.choiceExplanations,
  explanationSections: q.explanationSections,
}));
const result = {
  scope: "Common question registry and its category routes; lengths are triage signals, not Google thresholds or semantic accuracy review. Dedicated registries are outside these counts.",
  registered: ALL_QUESTIONS.length, practiceReady: ready.length,
  placeholders: ALL_QUESTIONS.filter(isPlaceholderExplanation).length,
  excludedByReadiness: ALL_QUESTIONS.length - ready.length,
  canonicalSitemapQuestions: getSitemapQuestions().length,
  explanationLengthBuckets: [50, 100, 200].map(under => ({ under, count: ready.filter(q => q.explanation.trim().length < under).length })),
  explanationAndSupplementLengthBuckets: [50, 100, 200].map(under => ({ under, count: ready.filter(q =>
    [q.explanation, ...Object.values(q.choiceExplanations ?? {}), ...(q.explanationSections ?? []).map(section => section.text)].join("").trim().length < under).length })),
  answerOnly: answerOnly.map(q => ({path: questionPagePath(q), explanation: q.explanation})),
  categories: { total: categories.length, singleton: categories.filter(c => c.count === 1), multiple: categories.filter(c => c.count > 1).length },
  shortest,
};
writeFileSync(process.argv[2] ?? "reports/adk-20261104/corpus.json", JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify({ ...result, shortest: undefined, categories: {...result.categories, singleton: result.categories.singleton.length}}));
