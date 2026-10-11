import { createHash } from 'node:crypto';

export const GRADES = ['kou', 'otsu', 'hei'];
export const YEARS = [2026, 2025];
export const SUBJECT_COUNTS = { law: 16, basic: 15, technology: 27 };
const REQUIRED_ANSWERS = { law: 16, basic: 10, technology: 20 };
const CHOICES = ['1', '2', '3', '4', '5'];
const KEYS = ['ア', 'イ', 'ウ', 'エ', 'オ'];
const SHA256 = /^[a-f0-9]{64}$/;
const nonempty = value => typeof value === 'string' && value.trim().length > 0;
const fail = code => { throw new Error(code); };

export function questionIdentity(q) {
  if (!GRADES.includes(q.grade) || !YEARS.includes(q.year)) fail('OUTSIDE_LATEST_TWO_GRADE_SCOPE');
  if (!Object.hasOwn(SUBJECT_COUNTS, q.subject)) fail('INVALID_SUBJECT');
  if (!Number.isInteger(q.qNumber) || q.qNumber < 1 || q.qNumber > SUBJECT_COUNTS[q.subject]) fail('INVALID_QUESTION_NUMBER');
  return `gas-${q.grade}-${q.year}-${q.subject}-q${q.qNumber}`;
}

export function expectedIds() {
  return GRADES.flatMap(grade => YEARS.flatMap(year => Object.entries(SUBJECT_COUNTS).flatMap(([subject, count]) =>
    Array.from({ length: count }, (_, i) => questionIdentity({ grade, year, subject, qNumber: i + 1 })),
  )));
}

function fiveReasons(values, keys, code) {
  if (!values || Object.keys(values).length !== 5 || keys.some(key => !nonempty(values[key]))) fail(code);
  if (keys.some(key => /^(正しい|正解|誤り|不正解)(です)?[。.]?$/.test(values[key].trim()))) fail('CHOICE_REASON_MISSING');
}

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
    fiveReasons(q.choiceExplanations, CHOICES, 'MISSING_ALL_CHOICE_EXPLANATIONS');
    if (!CHOICES.includes(q.officialAnswerNumber)) fail('INVALID_OFFICIAL_ANSWER');
    if (q.needsReview !== true || q.publicAllowed !== false) fail('UNREVIEWED_CANDIDATE_RELEASE');
    const era = q.year - 2018;
    const base = 'https://www.jia-page.or.jp/files/user/doc/exam/';
    if (q.sourcePdfUrl !== `${base}q_${q.grade}_R${era}.pdf` || q.sourceAnswerUrl !== `${base}a_${q.grade}_R${era}.pdf`) fail('SOURCE_SITTING_OR_GRADE_MISMATCH');
    if (!q.sourceEvidence || !SHA256.test(q.sourceEvidence.questionPdfSha256) || !SHA256.test(q.sourceEvidence.answerPdfSha256) || !Number.isInteger(q.sourceEvidence.questionPage) || q.sourceEvidence.questionPage < 1) fail('MISSING_SOURCE_EVIDENCE');
    if (typeof q.hasImage !== 'boolean') fail('MISSING_FIGURE_DECISION');
    if (q.hasImage && (!Array.isArray(q.imageUrls) || !q.imageUrls.length || !Array.isArray(q.imageAltTexts) || q.imageAltTexts.length !== q.imageUrls.length || q.imageAltTexts.some(alt => !nonempty(alt)))) fail('MISSING_FIGURE_OR_ALT_TEXT');
  }
  const combined = new Set([...occupied, ...seen]);
  const missingIds = expectedIds().filter(id => !combined.has(id));
  return { expectedOriginalQuestions: 348, existingUniqueQuestions: occupied.size, candidateQuestions: seen.size, missingOriginalQuestions: missingIds.length, missingIds, semanticReview: 'SOURCE_AUTHORS_AND_LOCAL_INDEPENDENT_REVIEW' };
}

export function validateProductionPackage(raw, gate) {
  const hash = createHash('sha256').update(raw).digest('hex');
  if (gate.manifestSha256 !== hash) fail('MANIFEST_HASH_MISMATCH');
  if (gate.status !== 'USER_AUTHORIZED_DRAFT_PRODUCTION' || gate.preparationAllowed !== true || gate.runtimeRegistration !== true) fail('INVALID_DRAFT_PRODUCTION_STATE');
  if (gate.rightsPermissionEvidence !== null || gate.rightsStatus !== 'OWNER_MANAGED_NO_PERMISSION_CLAIM') fail('UNSUPPORTED_RIGHTS_CLAIM');
  if (gate.productionDeploymentPerformed !== false || gate.releaseDecisionOwner !== 'integration-owner') fail('OUTSIDE_TASK_RELEASE_SCOPE');
  const manifest = JSON.parse(raw.toString('utf8'));
  if (manifest.schemaVersion !== 2 || manifest.expectedOriginalQuestions !== 348 || manifest.expectedEssayOriginalQuestions !== 16 || manifest.expectedEssayGradeOccurrences !== 24 || JSON.stringify(manifest.latestSittings) !== JSON.stringify(YEARS)) fail('INCORRECT_SCOPE_OR_COUNT_UNIT');
  if (!Array.isArray(manifest.papers) || manifest.papers.length !== 6) fail('MISSING_GRADE_OR_SITTING');
  const seen = new Set();
  for (const paper of manifest.papers) {
    questionIdentity({ grade: paper.grade, year: paper.year, subject: 'law', qNumber: 1 });
    const id = `${paper.grade}-${paper.year}`;
    if (seen.has(id)) fail('DUPLICATE_PAPER');
    seen.add(id);
    if (paper.expectedOriginalQuestions !== 58 || paper.requiredMarkSheetAnswers !== 46 || paper.essayOriginalQuestionCount !== 4 || paper.essayOfficialAnswerPublished !== false) fail('INCORRECT_PAPER_COUNT');
    if (!Array.isArray(paper.subjects) || paper.subjects.length !== 3 || paper.subjects.some(s => s.expectedQuestions !== SUBJECT_COUNTS[s.key] || s.requiredAnswers !== REQUIRED_ANSWERS[s.key])) fail('INCORRECT_SUBJECT_COUNT');
    if (paper.questionPdfValidated !== true || paper.answerPdfValidated !== true || !SHA256.test(paper.questionPdfSha256) || !SHA256.test(paper.answerPdfSha256)) fail('UNVERIFIED_PDF');
    const ids = expectedIds().filter(qid => qid.startsWith(`gas-${paper.grade}-${paper.year}-`));
    if (JSON.stringify(paper.expectedQuestionIds) !== JSON.stringify(ids)) fail('MISSING_OR_DUPLICATE_QUESTION_IDENTITY');
  }
  if (!Array.isArray(manifest.preparedQuestions)) fail('INVALID_PREPARED_IDENTITIES');
  const identities = manifest.preparedQuestions.map(questionIdentity);
  if (new Set(identities).size !== identities.length) fail('DUPLICATE_PREPARED_IDENTITY');
  if (gate.candidateCount !== identities.length || manifest.preparedOriginalQuestions !== identities.length) fail('PREPARED_COUNT_MISMATCH');
  return { expectedOriginalQuestions: 348, preparedOriginalQuestions: identities.length, remainingOriginalQuestions: 348 - identities.length, essayOriginalQuestionCount: 16, essayGradeOccurrences: 24, manifestSha256: hash, productionDeploymentPerformed: false };
}

export function auditNativeQuestions(questions, answers, sources, figureExists = () => true) {
  const seen = new Set();
  const answerById = new Map(answers.map(q => [q.id, q]));
  const sourceByName = new Map(sources.map(s => [s.path.replaceAll('\\', '/').split('/').at(-1), s]));
  for (const q of questions) {
    const grade = q.exam?.replace(/^gas-/, '');
    const subject = q.session?.replace(/^gas-/, '');
    const identity = questionIdentity({ grade, year: q.year, subject, qNumber: q.qNumber });
    if (q.id !== identity || seen.has(identity)) fail('DUPLICATE_OR_MISMATCHED_NATIVE_IDENTITY');
    seen.add(identity);
    if (!nonempty(q.question) || !nonempty(q.explanation)) fail('MISSING_NATIVE_BODY');
    if (!q.choices || Object.keys(q.choices).length !== 5 || KEYS.some(k => !nonempty(q.choices[k]))) fail('MISSING_FIVE_NATIVE_CHOICES');
    fiveReasons(q.choiceExplanations, KEYS, 'MISSING_FIVE_NATIVE_REASONS');
    if (q.needsReview !== false || q.explanationCoverage !== 'full') fail('UNREVIEWED_NATIVE_QUESTION');
    const official = answerById.get(identity);
    if (!official || q.officialAnswerNumber !== official.officialAnswerNumber || q.answer !== KEYS[Number(official.officialAnswerNumber) - 1]) fail('OFFICIAL_ANSWER_MISMATCH');
    const era = q.year - 2018;
    const original = sourceByName.get(`q_${grade}_R${era}.pdf`);
    const correct = sourceByName.get(`a_${grade}_R${era}.pdf`);
    const base = 'https://www.jia-page.or.jp/files/user/doc/exam/';
    if (!original || !correct || q.sourceEvidence?.questionPdfSha256 !== original.sha256 || q.sourceEvidence?.answerPdfSha256 !== correct.sha256) fail('NATIVE_SOURCE_HASH_MISMATCH');
    if (q.sourcePdfUrl !== `${base}q_${grade}_R${era}.pdf` || q.sourceAnswerUrl !== `${base}a_${grade}_R${era}.pdf`) fail('NATIVE_SOURCE_URL_MISMATCH');
    if (!Number.isInteger(q.sourceEvidence.questionPage) || q.sourceEvidence.questionPage < 1 || q.sourceEvidence.questionPage > original.pages) fail('NATIVE_SOURCE_PAGE_OUT_OF_RANGE');
    if (typeof q.hasImage !== 'boolean') fail('MISSING_NATIVE_FIGURE_DECISION');
    if (q.hasImage && (!q.imageUrls?.length || q.imageUrls.length !== q.imageAltTexts?.length || q.imageUrls.some((u,i) => !u.startsWith('/questions/gas/') || u.includes('..') || !nonempty(q.imageAltTexts[i]) || !figureExists(u)))) fail('NATIVE_FIGURE_MISSING');
  }
  return { readyOriginals: seen.size, missingIds: expectedIds().filter(id => !seen.has(id)) };
}

export function auditEssays(essays, sources) {
  if (essays.length !== 16 || new Set(essays.map(q => q.id)).size !== 16 || essays.reduce((n,q) => n + q.grades.length, 0) !== 24) fail('INCORRECT_ESSAY_COUNT_UNIT');
  for (const q of essays) {
    if (!YEARS.includes(q.year) || !nonempty(q.question) || !nonempty(q.modelAnswer) || q.officialAnswerPublished !== false || q.answerKind !== 'independent-model') fail('INVALID_ESSAY_OR_OFFICIAL_ANSWER_CLAIM');
    if (!q.checkpoints?.length || q.checkpoints.some(x => !nonempty(x)) || !q.references?.length) fail('MISSING_ESSAY_LEARNING_SUPPORT');
    const grade = q.grades.length === 2 ? 'kouotsu' : 'hei';
    const name = `q_${grade}_R${q.year - 2018}-2.pdf`;
    const source = sources.find(x => x.path.replaceAll('\\', '/').split('/').at(-1) === name);
    if (!source || q.sourcePdfSha256 !== source.sha256 || q.sourcePdfUrl !== `https://www.jia-page.or.jp/files/user/doc/exam/${name}` || q.sourcePage !== 2) fail('ESSAY_SOURCE_MISMATCH');
  }
  for (const grade of GRADES) for (const year of YEARS) {
    const paper = essays.filter(q => q.grades.includes(grade) && q.year === year);
    if (paper.length !== 4 || new Set(paper.map(q => q.subject)).size !== 4) fail('MISSING_ESSAY_SUBJECT');
  }
  return { sourcePaperOriginals: 16, gradeOccurrences: 24, officialAnswerPublished: false };
}
