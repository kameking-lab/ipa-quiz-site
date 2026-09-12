import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const data = path.join(root, 'data/exam-library');
const drafts = path.join(root, 'logs/safety-explanations-complete');
const read = (file) => JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
const questions = new Map(fs.readdirSync(path.join(data, 'papers')).filter(f => f.endsWith('.json'))
  .flatMap(f => read(path.join(data, 'papers', f))).map(q => [q.id, q]));
const explanations = read(path.join(data, 'explanations.json'));
const errors = [];
const accepted = new Map();
for (const file of fs.readdirSync(drafts).filter(f => f.endsWith('.accepted.json'))) {
  const batch = read(path.join(drafts, file));
  const input = read(path.join(drafts, file.replace('.accepted.json', '.input.json')));
  const expected = new Set(input.map(q => q.id));
  if (Object.keys(batch).length !== expected.size || Object.keys(batch).some(id => !expected.has(id))) errors.push(`${file}: input/output IDs differ`);
  for (const [id, text] of Object.entries(batch)) {
    const q = questions.get(id);
    const source = input.find(row => row.id === id);
    if (!q || !source || q.text !== source.text || q.correctChoice !== source.correctChoice || q.answerAuthority !== source.answerAuthority) errors.push(`${id}: source changed`);
    if (typeof text !== 'string' || text.trim().length < 120 || /準備中|今後追加|解説を作成できません/.test(text)) errors.push(`${id}: insufficient explanation`);
    if (accepted.has(id) && accepted.get(id) !== text) errors.push(`${id}: competing drafts require review`);
    accepted.set(id, text);
  }
}
if (errors.length) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exitCode = 1;
} else {
  for (const [id, text] of accepted) explanations[id] = text;
  // Human/agent editorial corrections are separate from raw model drafts and
  // intentionally take precedence after their question identities are checked.
  for (const file of fs.readdirSync(drafts).filter(f => /^qa-.*-fixes\.json$/.test(f))) {
    for (const [id, text] of Object.entries(read(path.join(drafts, file)))) {
      if (!questions.has(id) || typeof text !== 'string' || text.trim().length < 120) throw new Error(`Invalid reviewed correction: ${file}/${id}`);
      explanations[id] = text;
    }
  }
  const missing = [...questions.keys()].filter(id => !Object.hasOwn(explanations, id));
  const result = { ok: true, questions: questions.size, explanations: Object.keys(explanations).length, acceptedDrafts: accepted.size, missing };
  // --write is deliberately explicit: this is the only publication-file writer
  // used after concurrent generation. No worker writes to that file.
  if (process.argv.includes('--write')) fs.writeFileSync(path.join(data, 'explanations.json'), `${JSON.stringify(explanations, null, 2)}\n`);
  console.log(JSON.stringify(result, null, 2));
  if (process.argv.includes('--require-complete') && missing.length) process.exitCode = 1;
}
