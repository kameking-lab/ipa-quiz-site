import { createHash } from 'node:crypto';

const GRADES = ['kou', 'otsu', 'hei'];
const YEARS = [2026, 2025];
const SUBJECT_COUNTS = { law: 16, basic: 15, technology: 27 };
const REQUIRED_ANSWERS = { law: 16, basic: 10, technology: 20 };
const GRADE_LABELS = { kou: '甲種', otsu: '乙種', hei: '丙種' };
const CHOICES = ['1', '2', '3', '4', '5'];
const SHA256 = /^[a-f0-9]{64}$/;
const nonempty = (value) => typeof value === 'string' && value.trim().length > 0;
const fail = (code) => { throw new Error(code); };

function validateSubjects(subjects) {
  if (!Array.isArray(subjects) || subjects.length !== 3 || new Set(subjects.map(s => s.key)).size !== 3 || subjects.some(s => !Object.hasOwn(SUBJECT_COUNTS, s.key) || s.expectedQuestions !== SUBJECT_COUNTS[s.key] || s.requiredAnswers !== REQUIRED_ANSWERS[s.key])) fail('INCORRECT_SUBJECT_COUNT');
}

/** 科目ごとに問番号が再び1になるため、科目もidentityに含める。 */
export function questionIdentity(q) {
  if (!GRADES.includes(q.grade) || !YEARS.includes(q.year)) fail('OUTSIDE_LATEST_TWO_GRADE_SCOPE');
  if (!Object.hasOwn(SUBJECT_COUNTS, q.subject)) fail('INVALID_SUBJECT');
  if (!Number.isInteger(q.qNumber) || q.qNumber < 1 || q.qNumber > SUBJECT_COUNTS[q.subject]) fail('INVALID_QUESTION_NUMBER');
  return `gas-${q.grade}-${q.year}-${q.subject}-q${q.qNumber}`;
}

function expectedIds() {
  return GRADES.flatMap(grade => YEARS.flatMap(year => Object.entries(SUBJECT_COUNTS).flatMap(([subject, count]) =>
    Array.from({ length: count }, (_, i) => questionIdentity({ grade, year, subject, qNumber: i + 1 })),
  )));
}

/** 後続の保存原稿を機械検査する。構造検査は正答・解説の意味的査読を代替しない。 */
export function auditPreparedCandidates(candidates, existing = []) {
  if (!Array.isArray(candidates) || !Array.isArray(existing)) fail('INVALID_CANDIDATE_LIST');
  const occupied = new Set(existing.map(questionIdentity));
  if (occupied.size !== existing.length) fail('DUPLICATE_EXISTING_IDENTITY');
  const seen = new Set();
  for (const q of candidates) {
    const identity = questionIdentity(q);
    if (seen.has(identity)) fail('DUPLICATE_CANDIDATE_IDENTITY');
    if (occupied.has(identity)) fail('ALREADY_PRESENT_IN_MAIN_OR_PR');
    seen.add(identity);
    if (q.id !== identity) fail('ID_METADATA_MISMATCH');
    if (!nonempty(q.question) || !nonempty(q.explanation)) fail('MISSING_QUESTION_OR_EXPLANATION');
    if (!q.choices || Object.keys(q.choices).length !== 5 || CHOICES.some(key => !nonempty(q.choices[key]))) fail('MISSING_FIVE_CHOICES');
    if (!q.choiceExplanations || Object.keys(q.choiceExplanations).length !== 5 || CHOICES.some(key => !nonempty(q.choiceExplanations[key]))) fail('MISSING_ALL_CHOICE_EXPLANATIONS');
    if (!CHOICES.includes(q.officialAnswerNumber)) fail('INVALID_OFFICIAL_ANSWER');
    if (q.needsReview !== true || q.publicAllowed !== false) fail('UNREVIEWED_CANDIDATE_RELEASE');
    const era = q.year - 2018;
    const base = 'https://www.jia-page.or.jp/files/user/doc/exam/';
    if (q.sourcePdfUrl !== `${base}q_${q.grade}_R${era}.pdf` || q.sourceAnswerUrl !== `${base}a_${q.grade}_R${era}.pdf`) fail('SOURCE_SITTING_OR_GRADE_MISMATCH');
    if (!q.sourceEvidence || !SHA256.test(q.sourceEvidence.questionPdfSha256) || !SHA256.test(q.sourceEvidence.answerPdfSha256) || !Number.isInteger(q.sourceEvidence.questionPage) || q.sourceEvidence.questionPage < 1) fail('MISSING_SOURCE_EVIDENCE');
    if (typeof q.hasImage !== 'boolean') fail('MISSING_FIGURE_DECISION');
    if (q.hasImage && (!Array.isArray(q.imageUrls) || !q.imageUrls.length || q.imageUrls.some(url => !nonempty(url)) || !Array.isArray(q.imageAltTexts) || q.imageAltTexts.length !== q.imageUrls.length || q.imageAltTexts.some(alt => !nonempty(alt)))) fail('MISSING_FIGURE_OR_ALT_TEXT');
  }
  const combined = new Set([...occupied, ...seen]);
  const missingIds = expectedIds().filter(id => !combined.has(id));
  return { expectedOriginalQuestions: 348, existingUniqueQuestions: occupied.size, candidateQuestions: seen.size, missingOriginalQuestions: missingIds.length, missingIds, publicAllowed: false, semanticReview: 'NOT_PERFORMED_BY_STRUCTURAL_AUDIT' };
}

/** 現行パッケージはsource-only HOLD。フラグ変更を承認や完成とみなさない。 */
export function validateHeldPackage(raw, gate) {
  const hash = createHash('sha256').update(raw).digest('hex');
  if (gate.manifestSha256 !== hash) fail('MANIFEST_HASH_MISMATCH');
  if (gate.status !== 'OFFICIAL_INDEX_TERMS_SOURCE_ONLY_HOLD_NO_EXPLANATIONS' || gate.rightsStatus !== 'HOLD_PROVIDER_PERMISSION_REQUIRED') fail('SOURCE_ONLY_HOLD_CHANGED');
  if (gate.publicAllowed !== false || gate.preparationAllowed !== false || gate.runtimeRegistration !== false || gate.rightsPermissionEvidence !== null) fail('SOURCE_ONLY_GATE_CHANGED');
  if (gate.candidateCount !== 0 || gate.questionPdfDownloads !== 0) fail('SOURCE_ONLY_CONTENT_INSERTED');
  if (!gate.sourceOnlyLedger || gate.sourceOnlyLedger.approvedRank !== 16 || !SHA256.test(gate.sourceOnlyLedger.sha256) || !nonempty(gate.sourceOnlyLedger.preservedNextStep)) fail('MISSING_LEGACY_HOLD_EVIDENCE');
  const manifest = JSON.parse(raw.toString('utf8'));
  if (manifest.schemaVersion !== 1 || manifest.publicAllowed !== false || !Array.isArray(manifest.preparedQuestions) || manifest.preparedQuestions.length !== 0) fail('SOURCE_ONLY_CONTENT_INSERTED');
  if (manifest.expectedOriginalQuestions !== 348 || manifest.expectedEssayOriginalQuestions !== null || JSON.stringify(manifest.latestSittings) !== JSON.stringify(YEARS)) fail('INCORRECT_SCOPE_OR_COUNT_UNIT');
  validateSubjects(manifest.subjects);
  if (!Array.isArray(manifest.papers) || manifest.papers.length !== 6) fail('MISSING_GRADE_OR_SITTING');
  const paperIds = new Set();
  const allIds = [];
  for (const paper of manifest.papers) {
    questionIdentity({ grade: paper.grade, year: paper.year, subject: 'law', qNumber: 1 });
    const paperId = `${paper.grade}-${paper.year}`;
    if (paperIds.has(paperId)) fail('DUPLICATE_PAPER');
    paperIds.add(paperId);
    if (paper.expectedOriginalQuestions !== 58 || paper.requiredMarkSheetAnswers !== 46 || paper.validatedPreparedQuestions !== 0 || paper.publicQuestionsObserved !== 0 || paper.questionPdfValidated !== false || paper.answerPdfValidated !== false || paper.essayOriginalQuestionCount !== null || paper.essayOfficialAnswerPublished !== false) fail('INCORRECT_PAPER_COMPLETION');
    validateSubjects(paper.subjects);
    if (paper.gradeLabel !== GRADE_LABELS[paper.grade] || paper.officialYearLabel !== `令和${paper.year - 2018}年度`) fail('PAPER_LABEL_MISMATCH');
    const ids = expectedIds().filter(id => id.startsWith(`gas-${paper.grade}-${paper.year}-`));
    if (JSON.stringify(paper.expectedQuestionIds) !== JSON.stringify(ids)) fail('MISSING_OR_DUPLICATE_QUESTION_IDENTITY');
    const era = paper.year - 2018;
    const base = 'https://www.jia-page.or.jp/files/user/doc/exam/';
    const essayGrade = paper.grade === 'hei' ? 'hei' : 'kouotsu';
    if (paper.questionPdfUrl !== `${base}q_${paper.grade}_R${era}.pdf` || paper.answerPdfUrl !== `${base}a_${paper.grade}_R${era}.pdf` || paper.essayPdfUrl !== `${base}q_${essayGrade}_R${era}-2.pdf`) fail('SOURCE_SITTING_OR_GRADE_MISMATCH');
    allIds.push(...paper.expectedQuestionIds);
  }
  if (allIds.length !== 348 || new Set(allIds).size !== 348) fail('DUPLICATE_OR_MISSING_SCOPE');
  return { status: gate.status, expectedOriginalQuestions: 348, preparedOriginalQuestions: 0, publicOriginalQuestions: 0, remainingOriginalQuestions: 348, essayOriginalQuestionCount: null, permissionEvidence: null, publicAllowed: false, manifestSha256: hash };
}
