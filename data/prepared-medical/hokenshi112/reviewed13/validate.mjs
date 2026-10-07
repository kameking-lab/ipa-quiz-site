import { createHash } from 'node:crypto';
const hash = raw => createHash('sha256').update(raw).digest('hex');
const sort = value => Array.isArray(value) ? value.map(sort) : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(k => [k, sort(value[k])])) : value;
const ids = [9,12,15,20,22,25,29,30,31,32,33,34,35].map(n => `hokenshi-112-am-q${n}`);
export function validatePrepared(additionRaw, nextRaw, gate, evidenceRaw, policyRaw, baselineRaw) {
  const bindings = [[additionRaw, gate.addition10Sha256], [nextRaw, gate.next3Sha256], [evidenceRaw, gate.evidenceSha256], [policyRaw, gate.sourcePolicySha256], [baselineRaw, gate.baselinePilotSha256]];
  if (bindings.some(([raw, expected]) => !/^[a-f0-9]{64}$/.test(expected ?? '') || hash(raw) !== expected)) throw new Error('ARTIFACT_HASH_MISMATCH');
  for (const key of ['publicAllowed','rootPublicationAuthorization','liveLearningEnabled','registryEnabled','routeEnabled','whole110Complete','twoRoundsComplete']) {
    if (gate[key] !== false) throw new Error('PRIVATE_GATE_REQUIRED');
  }
  if (gate.rightsPermissionPass !== null || gate.exactIntegrationIndependentReview !== null || gate.renderedTableMathReview !== null) throw new Error('UNAPPROVED_GATE_PROMOTION');
  const ten = JSON.parse(additionRaw.toString('utf8'));
  const three = JSON.parse(nextRaw.toString('utf8'));
  const baseline = JSON.parse(baselineRaw.toString('utf8'));
  const evidence = JSON.parse(evidenceRaw.toString('utf8'));
  const policy = JSON.parse(policyRaw.toString('utf8'));
  for (const data of [ten, three]) {
    if (data.publicAllowed !== false || data.round !== 112 || data.session !== 'am' || data.examDate !== '2026-02-13') throw new Error('UNREVIEWED_EXAM_SCOPE');
  }
  if (ten.questions.length !== 10 || three.questions.length !== 3 || baseline.questions.length !== 2) throw new Error('COUNT_BOUNDARY');
  if (JSON.stringify(baseline.questions.map(q => q.id)) !== JSON.stringify(['hokenshi-112-am-q2','hokenshi-112-am-q8'])) throw new Error('BASELINE_SCOPE_CHANGED');
  const questions = [...ten.questions, ...three.questions];
  if (JSON.stringify(questions.map(q => q.id)) !== JSON.stringify(ids) || JSON.stringify(gate.targetIds) !== JSON.stringify(ids)) throw new Error('DUPLICATE_UNREVIEWED_OR_MISSING_ID');
  const choiceCount = questions.reduce((n, q) => n + q.choices.length, 0);
  if (choiceCount !== 60 || gate.expectedAdditionalQuestions !== 13 || gate.expectedAdditionalChoices !== 60 || gate.reviewedTotalWithExisting !== 15 || gate.reviewedTotalChoicesWithExisting !== 68) throw new Error('COUNT_BOUNDARY');
  for (const q of questions) {
    if (!q.question?.trim() || (q.explanation !== undefined && !q.explanation.trim()) || q.choiceExplanations.length !== q.choices.length || q.choiceExplanations.some(s => !s.trim())) throw new Error('MISSING_FULL_CHOICE_EXPLANATION');
    const binding = evidence.questionBindings.find(row => row.id === q.id);
    if (!binding || binding.questionObjectSha256 !== hash(JSON.stringify(sort(q)))) throw new Error('UNREVIEWED_QUESTION_TRANSFORMATION');
    if (!q.officialAnswer.length || q.officialAnswer.some(n => !Number.isInteger(n) || n < 1 || n > q.choices.length) || new Set(q.officialAnswer).size !== q.officialAnswer.length || q.officialAnswer.length !== binding.answerCount) throw new Error('INVALID_OFFICIAL_ANSWER');
    if (q.needsReview !== true || !q.primaryReferences?.length) throw new Error('SOURCE_OR_FINAL_HOLD_MISSING');
  }
  const table = questions.find(q => q.questionNumber === 25).table;
  if (table.header.length !== 7 || table.rows.length !== 2 || table.rows.some(r => r.dates.length !== 7 || r.events.length !== 7)) throw new Error('Q25_TABLE_MISSING');
  if (JSON.stringify(policy.q15InactiveAsExamDateAuthorities) !== JSON.stringify(['q15-basic-plan-index.html','q15-basic-plan.pdf','q15-hospital-index.html'])) throw new Error('POST_EXAM_SOURCE_REACTIVATED');
  if (evidence.rightsPermissionPass !== null || evidence.publicAllowed !== false || evidence.whole110Complete !== false || evidence.twoRoundsComplete !== false) throw new Error('UNREVIEWED_RIGHTS_OR_WHOLE_SCOPE');
  return { questions, additionalQuestionCount: 13, additionalChoiceCount: 60, totalPrivateQuestionCount: 15, totalPrivateChoiceCount: 68, publicAllowed: false };
}
