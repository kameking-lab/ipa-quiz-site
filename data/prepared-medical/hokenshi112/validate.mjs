import { createHash } from 'node:crypto';
export function validatePilot(raw, gate) {
  const hash = createHash('sha256').update(raw).digest('hex');
  if (hash !== gate.candidateSha256) throw new Error('CANDIDATE_HASH_MISMATCH');
  const data = JSON.parse(raw.toString('utf8'));
  if (data.publicAllowed !== false || gate.publicAllowed !== false) throw new Error('UNAPPROVED_RELEASE');
  if (data.round !== 112 || data.session !== 'am' || data.questions.length !== 2) throw new Error('UNREVIEWED_SCOPE');
  const ids = new Set();
  for (const q of data.questions) {
    if (!gate.targetQuestionIds.includes(q.id) || ids.has(q.id)) throw new Error('UNREVIEWED_ID');
    ids.add(q.id);
    if (!q.question || q.choices.length !== 4 || q.choiceExplanations.length !== 4 || q.choiceExplanations.some(x => !x.trim())) throw new Error('MISSING_CHOICE_EXPLANATION');
    if (q.officialAnswer.length !== 1 || !Number.isInteger(q.officialAnswer[0]) || q.officialAnswer[0] < 1 || q.officialAnswer[0] > 4) throw new Error('INVALID_ANSWER');
    if (!q.primaryReferences?.length || q.needsReview !== true) throw new Error('MISSING_PRIMARY_OR_FINAL_HOLD');
  }
  if (gate.independentTranscriptionStatus !== 'PASS_TARGET2_ONLY' || gate.independentAllChoiceReviewStatus !== 'PASS_TARGET8_CHOICES_ONLY') throw new Error('INDEPENDENT_REVIEW_MISSING');
  if (!/^[a-f0-9]{64}$/.test(gate.independentPrimaryReviewSha256)) throw new Error('REVIEW_RECEIPT_MISSING');
  return { candidateSha256: hash, questionCount: data.questions.length, choiceExplanationCount: 8, publicAllowed: false, remainingFinalGate: gate.rootFinalAstraReview === null ? 'ROOT_FINAL_ASTRA_REVIEW_NULL' : 'ROOT_PUBLICATION_AUTHORIZATION_REQUIRED' };
}
