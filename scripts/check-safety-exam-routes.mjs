import fs from 'node:fs';
const base = process.env.EXAM_TEST_BASE_URL || 'http://localhost:3128';
const catalog = JSON.parse(fs.readFileSync('data/exam-library/official-catalog.json', 'utf8'));
const pending = [...catalog];
const results = [];
async function worker() {
  while (pending.length) {
    const entry = pending.shift();
    const path = `/e-learning/exams/${entry.id}`;
    const page = await fetch(base + path, { signal: AbortSignal.timeout(30000) });
    const html = await page.text();
    const paper = JSON.parse(fs.readFileSync(`data/exam-library/papers/${entry.id}.json`, 'utf8'));
    const image = await fetch(base + paper[0].images[0], { signal: AbortSignal.timeout(30000) });
    const bytes = Buffer.from(await image.arrayBuffer());
    const canonical = html.includes(`rel="canonical" href="https://www.kakomon-ai.jp${path}"`);
    const ok = page.status === 200 && canonical && image.status === 200 && bytes.toString('ascii', 8, 12) === 'WEBP';
    results.push({ id: entry.id, status: page.status, canonical, imageStatus: image.status, ok });
  }
}
await Promise.all([worker(), worker(), worker()]);
const report = { observedAt: new Date().toISOString(), base, count: results.length, ok: results.every(r => r.ok), failures: results.filter(r => !r.ok) };
console.log(JSON.stringify(report, null, 2));
if (!report.ok) process.exitCode = 1;
