import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
const origin = process.argv[2] ?? 'http://127.0.0.1:3052';
assert.equal(new URL(origin).hostname, '127.0.0.1');
const results = [];
for (const [path, expected, init] of [
  ['/api/health', 200],
  ['/api/cron/health-check', 503],
  ['/api/email', 401, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' }],
]) {
  const response = await fetch(new URL(path, origin), { ...init, redirect: 'manual' });
  assert.equal(response.status, expected, path);
  const securityHeaders = ['strict-transport-security', 'x-content-type-options', 'x-frame-options', 'referrer-policy', 'permissions-policy', 'content-security-policy'];
  for (const key of securityHeaders) assert.ok(response.headers.get(key), `${path}: ${key}`);
  results.push({ path, status: response.status, securityHeaders });
}
const response = await fetch(new URL('/sitemap/exams.xml', origin));
assert.equal(response.status, 200);
const sitemap = await response.text();
for (const code of ['kenchikushi1', 'khk-kagaku', 'sekou-1kenchiku', 'khk-kikai-kou', 'khk-kikai-otsu', 'khk-reito-1', 'khk-reito-2', 'khk-reito-3']) {
  assert.ok(sitemap.includes(`/${code}</loc>`), code);
}
results.push({ path: '/sitemap/exams.xml', status: 200, releaseQualifications: 8 });
writeFileSync('reports/int5-20261104/http-receipt.json', JSON.stringify({ status: 'PASS', origin, results }, null, 2) + '\n');
console.log('HTTP boundaries and eight sitemap qualifications: PASS');
