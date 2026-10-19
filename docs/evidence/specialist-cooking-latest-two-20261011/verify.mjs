import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

const folder = import.meta.dirname;
const manifest = JSON.parse(readFileSync(resolve(folder, 'source-manifest.json'), 'utf8'));
const candidate = JSON.parse(readFileSync(resolve(folder, 'r6-nihon-answer-text-unverified.json'), 'utf8'));
const archived = JSON.parse(readFileSync(resolve(folder, 'archived-source-discovery.json'), 'utf8'));
const receipt = JSON.parse(readFileSync(resolve(folder, 'archived-SOURCE-PACKET-HANDOFF.json'), 'utf8'));
const unique = (items, label) => assert.equal(new Set(items).size, items.length, `${label}: duplicate key`);

unique(manifest.editions.map(item => item.key), 'editions');
unique(manifest.documents.map(item => item.key), 'document identities');
unique(manifest.documents.map(item => item.url), 'URLs');
assert.equal(manifest.editions.length, 12);
assert.equal(manifest.documents.length, 24);
assert.equal(manifest.scopes.latestTwoSittings.editionKeys.length, 6);
assert.equal(manifest.scopes.latestTwoPerSubject.editionKeys.length, 12);
assert.equal(manifest.scopes.latestTwoSittings.requiredQuestionCount, null);
assert.equal(manifest.totals.requiredOriginalCount, null);
assert.equal(manifest.fullTaskCompleted, false);
assert.equal(manifest.sourceReady, false);
assert.equal(manifest.publicRegistrationRequested, false);
assert.equal(manifest.rights.permissionAsserted, false);
assert.equal(manifest.rights.permissionReceipt, null);

for (const subject of ['sushi', 'chugoku', 'kyushoku', 'nihon', 'seiyo', 'men']) {
  const editions = manifest.editions.filter(item => item.subjectCode === subject);
  assert.equal(editions.length, 2);
  assert.deepEqual(editions.map(item => item.fiscalYear).sort(), ['sushi', 'chugoku', 'kyushoku'].includes(subject) ? [2025, 2026] : [2024, 2025]);
}
for (const edition of manifest.editions) {
  assert.equal(edition.originalQuestionCount, null);
  assert.deepEqual(edition.completedQuestionNumbers, []);
  assert.equal(edition.fullChoiceExplanations, 0);
  assert.equal(edition.figuresVerified, false);
  assert.equal(edition.state, 'material-hold');
  for (const role of ['question', 'answer']) {
    const document = manifest.documents.find(item => item.key === edition[`${role}Document`]);
    assert.ok(document);
    assert.equal(document.editionKey, edition.key);
    assert.equal(document.role, role);
  }
}
const inherited = new Set(receipt.failedFetchesAsReported.map(item => item.url));
assert.equal(inherited.size, 12);
for (const document of manifest.documents) {
  assert.ok(document.url.startsWith('https://chouri-ggc.or.jp/cms/wp-content/uploads/'));
  assert.equal(document.statusCode, 403);
  assert.equal(document.verified, false);
  assert.equal(document.retryAllowedByThisPacket, false);
  assert.equal(document.localPdf, null);
  assert.equal(document.sha256, null);
  assert.equal(document.pdfBytesSaved, 0);
  if (inherited.has(document.url)) assert.equal(document.status, 'inherited-http403-hold');
}
for (const edition of archived.editions) {
  for (const subject of edition.subjects) {
    assert.ok(manifest.documents.some(item => item.role === 'question' && item.url === subject.questionPdfUrl));
    assert.ok(manifest.documents.some(item => item.role === 'answer' && item.url === subject.answerPdfUrl));
  }
}
for (const item of manifest.archivedProvenance) {
  const bytes = readFileSync(resolve(folder, item.file));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), item.sha256);
}
assert.equal(candidate.rows.length, 60);
assert.deepEqual(candidate.rows.map(item => item.qNumber), Array.from({ length: 60 }, (_, index) => index + 1));
assert.ok(candidate.rows.every(item => ['正', '誤'].includes(item.extractedCircledValue)));
assert.equal(candidate.visualVerified, false);
assert.equal(candidate.registrationAllowed, false);
assert.equal(candidate.completedOriginals, 0);
assert.equal(candidate.screenshotStatus, 403);

// A source packet must not introduce a qualification or unsupported license in runtime data.
const repoRoot = resolve(folder, '../../..');
for (const path of ['data/questions/index.ts', 'lib/questions/types.ts', 'lib/qualifications/catalog.ts']) {
  const text = readFileSync(resolve(repoRoot, path), 'utf8');
  assert.ok(!/chori-gino-kentei|専門調理師/.test(text), `Unexpected runtime registration in ${path}`);
}
console.log(JSON.stringify({ status: 'pass', uniqueEditions: 12, uniqueDocuments: 24, inheritedDenialsPreserved: 12, provisionalAnswerRows: 60, requiredOriginalCount: null, sourceReadyOriginals: 0, runtimeRegistration: 0 }));
