import { readFileSync, writeFileSync } from 'node:fs';
for (const group of ['a', 'f']) {
  const base = new URL(`opus-${group}`, import.meta.url);
  const raw = JSON.parse(readFileSync(new URL(`opus-${group}-raw.json`, import.meta.url), 'utf8'));
  const body = raw.result.replace(/^```json\s*/, '').replace(/\s*```\s*$/, '');
  const parsed = JSON.parse(body);
  writeFileSync(new URL(`opus-${group}-explanations.json`, import.meta.url), JSON.stringify(parsed, null, 2) + '\n');
  const receipt = JSON.parse(readFileSync(new URL(`opus-${group}-receipt.json`, import.meta.url), 'utf8'));
  receipt.questionNumbers = parsed.questions.map(q => q.number);
  receipt.statuses = parsed.questions.map(q => [q.number, q.status]);
  receipt.globalIssues = parsed.globalIssues;
  receipt.parsedFromMarkdownFence = true;
  writeFileSync(new URL(`opus-${group}-receipt.json`, import.meta.url), JSON.stringify(receipt, null, 2) + '\n');
  console.log(group, parsed.questions.length, parsed.questions.filter(q => q.status === 'HOLD').map(q => q.number));
}
