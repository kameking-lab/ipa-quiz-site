// Supplemental checks without a test runner. Requires TypeScript (optional argv[2]).
const ts = require(process.argv[2] || 'typescript');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../..');
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function(request, ...rest) {
  return originalResolve.call(this, request.startsWith('@/') ? path.join(root, request.slice(2)) : request, ...rest);
};
require.extensions['.ts'] = (module, filename) => {
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    fileName: filename,
  }).outputText;
  module._compile(code, filename);
};
(async () => {
  const { DENKI2_QUESTIONS: questions } = require(path.join(root, 'data/questions/denki2/index.ts'));
  const { isExamPublished, getQualificationByExamCode } = require(path.join(root, 'lib/qualifications/catalog.ts'));
  const { getQuestionsForExam } = require(path.join(root, 'lib/questions/get-questions.ts'));
  const { EXAM_CONFIGS, ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES } = require(path.join(root, 'lib/exam-config.ts'));
  assert.equal(questions.length, 124);
  assert.equal(new Set(questions.map(q => q.id)).size, 124);
  assert.equal(questions.filter(q => q.hasImage).length, 21);
  assert.equal(questions.reduce((n,q) => n + Object.keys(q.choiceExplanations).length,0), 504);
  for (const q of questions) {
    assert.ok(q.choices[q.answer]);
    assert.deepEqual(Object.keys(q.choices), Object.keys(q.choiceExplanations));
    assert.equal(q.sourcePdfUrl,q.sourceAnswerUrl);
    assert.equal(Object.keys(q.choices).length,q.qNumber>=37 && q.qNumber<=40 ? 5:4);
  }
  assert.equal(isExamPublished('denki2'), false);
  assert.equal(getQualificationByExamCode('denki2').slug, 'sekou-2denki');
  assert.equal(ALL_QUIZ_EXAM_CODES.includes('denki2'),false);
  assert.equal(ALL_EXAM_CODES.includes('denki2'),false);
  assert.equal(EXAM_CONFIGS.denki2.sessions[0].expectedQuestions,62);
  assert.deepEqual(await getQuestionsForExam('denki2'), []);
  console.log('PASS: 124 question adapters, 504 choices/explanations, 21 image records, catalog/config/lazy-loader publication gates');
})().catch(e => { console.error(e); process.exitCode=1; });
