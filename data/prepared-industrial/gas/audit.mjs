import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { auditPreparedCandidates, auditNativeQuestions, auditEssays, validateProductionPackage, GRADES } from './validate.mjs';

const folder = dirname(fileURLToPath(import.meta.url));
const root = resolve(folder, '../../..');
const json = p => JSON.parse(readFileSync(p, 'utf8'));
const packageAudit = validateProductionPackage(readFileSync(resolve(folder, 'manifest.json')), json(resolve(folder, 'gate.json')));
const candidates = json(resolve(folder, 'candidates.json'));
const sources = json(resolve(folder, 'official-sources.json'));
const questions = GRADES.flatMap(g => json(resolve(root, `data/questions/gas/${g}/ready.json`)));
const nativeAudit = auditNativeQuestions(questions, json(resolve(folder, 'official-answers.json')), sources, url => existsSync(resolve(root, `public${url}`)));
const essays = auditEssays(json(resolve(root, 'data/questions/gas/essays.json')), sources);
const candidateAudit = auditPreparedCandidates(candidates);
if (packageAudit.preparedOriginalQuestions !== nativeAudit.readyOriginals || candidates.length !== nativeAudit.readyOriginals) throw new Error('RUNTIME_AND_MANIFEST_COUNT_MISMATCH');
if (process.argv.includes('--complete') && nativeAudit.missingIds.length) throw new Error(`INCOMPLETE_LATEST_TWO: ${nativeAudit.missingIds.length}`);
console.log(JSON.stringify({ ...packageAudit, candidateAudit, nativeAudit, essays }, null, 2));
