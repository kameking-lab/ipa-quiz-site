import test from 'node:test';
import assert from 'node:assert/strict';
import { EXPECTED, QUALIFICATION, partitionOriginals, validateBook } from './validate-automotive-drafts.mjs';

const fixture = () => {
  const question = { id: 'jidosha-2026-first-3-diesel-q01', qNumber: 1, question: '圧縮着火する燃料はどれか。',
    choices: { ア: '軽油', イ: '水', ウ: '空気', エ: '潤滑油' }, answer: 'ア', officialAnswerNumber: '1',
    explanation: '軽油を圧縮した高温空気中へ噴射し、燃焼を開始する。',
    choiceExplanations: { ア: '軽油はディーゼル機関の燃料。', イ: '水は燃料にならない。', ウ: '空気は酸素を供給する。', エ: '潤滑油は摩擦を低減する。' },
    explanationCoverage: 'full', hasImage: false, sourceFigureRequired: false, sourcePages: [2], topicTags: ['燃焼'], difficulty: 1, needsReview: false };
  return { book: { bookId: 'jaspa-2026-first-3-diesel', qualification: QUALIFICATION, fiscalYear: 2026, term: 'first', subjectCode: '3-diesel', expectedOriginals: 1, publicGo: 0, permissionVerified: false, questions: [question] },
    table: { answers: [{ qNumber: 1, answer: 'ア', officialAnswerNumber: '1', officialQuestionStatus: 'normal' }] }, receipt: { pageCount: 8 } };
};
test('written scope counts 250 and 360; oral is separate', () => {
  assert.equal(Object.values(EXPECTED['jaspa-2026-first']).reduce((a, b) => a + b), 250);
  assert.equal(Object.values(EXPECTED['jaspa-2025-second']).reduce((a, b) => a + b), 360);
  assert.equal(EXPECTED['jaspa-2025-second']['2-chassis'], 30);
});
test('publication, PR, and batch duplicates use the full original identity', () => {
  const candidates = ['same', 'same', 'published', 'pr', 'new'].map(key => ({ key }));
  const result = partitionOriginals(candidates, ['published'], ['pr']);
  assert.deepEqual(result.accepted.map(x => x.key), ['same', 'new']);
  assert.equal(result.excluded.length, 3);
});
test('a complete private original passes; incomplete options and wrong official answers fail', () => {
  const { book, table, receipt } = fixture();
  assert.equal(validateBook(book, 1, table, receipt).gradable, 1);
  delete book.questions[0].choiceExplanations['エ']; book.questions[0].answer = 'イ';
  const result = validateBook(book, 1, table, receipt);
  assert.equal(result.reviewedComplete, 0);
  assert.ok(result.issues.some(x => x.code === 'answer-mismatch'));
  assert.ok(result.issues.some(x => x.code === 'choice-explanation'));
});
test('withdrawn all-accepted original remains outside grading with all four accepted answers', () => {
  const { book, table, receipt } = fixture();
  book.questions[0].answer = ['ア', 'イ', 'ウ', 'エ']; book.questions[0].officialAnswerNumber = '全員正解'; book.questions[0].needsReview = true;
  table.answers[0] = { qNumber: 1, answer: ['ア', 'イ', 'ウ', 'エ'], officialAnswerNumber: '全員正解', officialQuestionStatus: 'withdrawn-all-accepted' };
  const result = validateBook(book, 1, table, receipt);
  assert.equal(result.reviewedComplete, 1); assert.equal(result.gradable, 0); assert.equal(result.withdrawn, 1);
});
test('a provisional OCR draft, invalid source page, or invented rights status cannot pass', () => {
  const { book, table, receipt } = fixture();
  book.permissionVerified = true; book.questions[0].question = 'OCR一次'; book.questions[0].sourcePages = [9];
  const result = validateBook(book, 1, table, receipt);
  assert.equal(result.reviewedComplete, 0);
  assert.ok(result.issues.some(x => x.code === 'source-pages'));
  assert.ok(result.issues.some(x => x.code === 'publication-gate'));
});
