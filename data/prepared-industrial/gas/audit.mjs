import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateHeldPackage, auditPreparedCandidates } from './validate.mjs';

const folder = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(resolve(folder, 'manifest.json'));
const gate = JSON.parse(readFileSync(resolve(folder, 'gate.json'), 'utf8'));
const args = process.argv.slice(2);
let result = validateHeldPackage(raw, gate);
if (args.length) {
  if (args.length > 2) throw new Error('Usage: node audit.mjs [candidate.json] [existing-main-and-pr-identities.json]');
  const candidates = JSON.parse(readFileSync(resolve(args[0]), 'utf8'));
  const existing = args[1] ? JSON.parse(readFileSync(resolve(args[1]), 'utf8')) : [];
  result = { ...result, candidateStructuralAudit: auditPreparedCandidates(candidates, existing) };
}
console.log(JSON.stringify(result, null, 2));
