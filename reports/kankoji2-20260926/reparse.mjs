// Re-derive receipt/explanations from an existing raw CLI output (no new model call).
import { readFileSync, writeFileSync } from 'node:fs';
import { parseReviewResult } from './parse-result.mjs';
const tag = process.argv[2];
const here = new URL('./', import.meta.url);
const raw = JSON.parse(readFileSync(new URL(`${tag}-raw.json`, here), 'utf8'));
const receipt = JSON.parse(readFileSync(new URL(`${tag}-receipt.json`, here), 'utf8'));
const parsed = parseReviewResult(raw.result);
if (!parsed) throw new Error('no JSON');
Object.assign(receipt, { questionNumbers: parsed.questions.map(q => q.number), statuses: parsed.questions.map(q => [q.number, q.status]), globalIssues: parsed.globalIssues ?? [], reparsedFromRaw: true });
writeFileSync(new URL(`${tag}-receipt.json`, here), JSON.stringify(receipt, null, 2) + '\n');
if (receipt.correctModel && receipt.exitCode === 0 && !receipt.isError) writeFileSync(new URL(`${tag}-explanations.json`, here), JSON.stringify(parsed, null, 2) + '\n');
console.log(JSON.stringify({ tag, statuses: receipt.statuses, globalIssues: receipt.globalIssues }));
