// Build data/questions/kankoji2/*.json from SHA-pinned transcriptions, visual overrides
// and real claude-opus-5-5 (firstParty) review receipts. Fails closed on any gate.
// Usage: node reports/kankoji2-20260926/build-data.mjs
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const here = new URL('./', import.meta.url);
const repo = new URL('../../', here);
const read = (name) => JSON.parse(readFileSync(new URL(name, here), 'utf8'));

const EDITIONS = {
  2026: {
    season: 'early',
    file: '2026-early.json',
    questionUrl: 'https://www.jctc.jp/wjctcp/wp-content/uploads/2026/06/20260608k_mondai.pdf',
    answerUrl: 'https://www.jctc.jp/wjctcp/wp-content/uploads/2026/06/20260608k_seitou.pdf',
    // Accepted review per question range; later entries override earlier ones.
    reviews: [['a', 1, 9], ['b', 10, 18], ['c', 19, 27], ['d', 28, 36], ['e', 37, 44], ['f', 45, 52], ['g35-r2', 35, 35]],
    figures: [8, 30],
    references: {},
    // Byte-level edits applied after the model review, each re-read against the source.
    manualEdits: [
      { number: 35, field: 'choiceExplanations', index: 1, from: '外側の高い圧力で扉が内側から枠に押し付けられるため', to: '外側の高い圧力で扉が枠に押し付けられるため', reason: '圧力は外側から掛かるため「内側から」は誤解を招く表現。' },
    ],
  },
  2025: {
    season: 'late',
    file: '2025-late.json',
    questionUrl: 'https://www.jctc.jp/wjctcp/wp-content/uploads/2025/11/20251117k_mondaia.pdf',
    answerUrl: 'https://www.jctc.jp/wjctcp/wp-content/uploads/2025/11/20251117k_seitou.pdf',
    reviews: [['a', 1, 9], ['b', 10, 18], ['c', 19, 27], ['d', 28, 35], ['e', 37, 44], ['f', 45, 52], ['g36-r2', 36, 36]],
    figures: [3, 8, 30],
    references: { 36: ['https://www.mlit.go.jp/gobuild/content/001967513.pdf'] },
    manualEdits: [],
  },
};

const SECTIONS = [
  [1, 6, '一般基礎（必須）'],
  [7, 23, '空調・衛生設備（選択）'],
  [24, 28, '設備機器・材料（必須）'],
  [29, 38, '施工管理法（選択）'],
  [39, 48, '法規（選択）'],
  [49, 52, '施工管理法・基礎的な能力（必須）'],
];
const sectionOf = (n) => SECTIONS.find(([a, b]) => n >= a && n <= b)[2];
const figures = read('figures.json');
const ledger = { generatedBy: 'reports/kankoji2-20260926/build-data.mjs', editions: {} };

for (const [year, ed] of Object.entries(EDITIONS)) {
  const meta = read(`meta-${year}.json`);
  const extract = read(`extract-${year}.json`);
  const segments = read(`segments-${year}.json`);
  const overrides = read(`visual-overrides-${year}.json`);
  const answers = read(`answers-${year}.json`);
  if (extract.questionSha256 !== meta.questionSha256 || extract.answerSha256 !== meta.answerSha256) throw new Error(`SHA mismatch ${year}`);
  const accepted = new Map();
  const receipts = {};
  for (const [tag, first, last] of ed.reviews) {
    const receipt = read(`evidence/opus-${year}-${tag}-receipt.json`);
    const usage = receipt.modelUsage?.['claude-opus-5-5'];
    if (receipt.exitCode !== 0 || receipt.isError || !receipt.correctModel || usage?.canonicalModel !== 'claude-opus-5-5' || usage?.provider !== 'firstParty') throw new Error(`Unaccepted receipt ${year}-${tag}`);
    if (Object.keys(receipt.modelUsage).some((k) => !k.includes('claude-opus-5-5'))) throw new Error(`Foreign model in ${year}-${tag}`);
    const review = read(`evidence/opus-${year}-${tag}-explanations.json`);
    const raw = readFileSync(new URL(`evidence/opus-${year}-${tag}-raw.json`, here));
    receipts[tag] = { rawSha256: createHash('sha256').update(raw).digest('hex'), costUsd: receipt.totalCostUsd, range: [first, last] };
    for (const item of review.questions) {
      if (item.number < first || item.number > last) continue;
      if (item.status !== 'PASS') continue;
      accepted.set(item.number, { ...item, reviewTag: tag });
    }
  }
  const questions = [];
  const holds = [];
  for (const seg of segments) {
    const n = seg.number;
    const reviewed = accepted.get(n);
    if (!reviewed) { holds.push(n); continue; }
    const q = { ...seg, ...(overrides[n] ?? {}) };
    const official = answers[String(n)];
    if (JSON.stringify(seg.officialAnswerNumbers) !== JSON.stringify(official)) throw new Error(`Official answer conflict ${year} No.${n}`);
    if (!q.stem || q.choices.length !== 4 || q.choices.some((c) => !c || /\{\{sup:|[IJ]|穐|愛/.test(c.replace(/HIVP/g, '')))) throw new Error(`Incomplete transcription ${year} No.${n}`);
    if (/\{\{sup:|穐|愛/.test(q.stem)) throw new Error(`Unchecked glyph ${year} No.${n}`);
    const explanations = [...reviewed.choiceExplanations];
    let explanation = reviewed.explanation;
    if (explanations.length !== 4 || explanations.some((v) => !v || v.trim().length < 15)) throw new Error(`Incomplete explanations ${year} No.${n}`);
    for (const edit of ed.manualEdits.filter((e) => e.number === n)) {
      if (edit.field === 'choiceExplanations') {
        if (!explanations[edit.index].includes(edit.from)) throw new Error(`Manual edit anchor missing ${year} No.${n}`);
        explanations[edit.index] = explanations[edit.index].replace(edit.from, edit.to);
      } else if (edit.field === 'explanation') {
        if (!explanation.includes(edit.from)) throw new Error(`Manual edit anchor missing ${year} No.${n}`);
        explanation = explanation.replace(edit.from, edit.to);
      }
    }
    const requiredSelections = meta.multiSelect.includes(n) ? 2 : 1;
    if (requiredSelections === 2 && official.length !== 2) throw new Error(`Two-answer question lacks two keys ${year} No.${n}`);
    const figure = ed.figures.includes(n) ? figures.find((f) => f.edition === `${year}-${ed.season}` && f.number === n) : null;
    if (ed.figures.includes(n) && !figure) throw new Error(`Missing figure ${year} No.${n}`);
    questions.push({
      number: n,
      pdfPage: seg.pdfPage,
      category: sectionOf(n),
      topic: reviewed.topic.trim() || '管工事施工管理',
      officialAnswerNumbers: official,
      requiredSelections,
      ...(meta.correctionNote?.[n] ? { officialCorrectionNote: meta.correctionNote[n] } : {}),
      question: q.stem,
      choices: q.choices,
      explanation,
      choiceExplanations: explanations,
      officialReferenceUrls: ed.references[n] ?? [],
      ...(figure ? { imageUrl: figure.publicPath } : {}),
    });
  }
  if (questions.length + holds.length !== 52) throw new Error(`Count gate ${year}`);
  const numbers = questions.map((q) => q.number);
  if (new Set(numbers).size !== numbers.length) throw new Error(`Duplicate gate ${year}`);
  const payload = {
    exam: 'kankoji2', year: Number(year), season: ed.season, session: 'gakka',
    edition: meta.edition, publishedCount: questions.length,
    questionUrl: ed.questionUrl, questionSha256: meta.questionSha256,
    answerUrl: ed.answerUrl, answerSha256: meta.answerSha256,
    questions,
  };
  mkdirSync(new URL('data/questions/kankoji2/', repo), { recursive: true });
  writeFileSync(new URL(`data/questions/kankoji2/${ed.file}`, repo), JSON.stringify(payload, null, 2) + '\n');
  ledger.editions[year] = {
    edition: meta.edition, questionSha256: meta.questionSha256, answerSha256: meta.answerSha256,
    accepted: numbers, held: holds, receipts,
    reviewByQuestion: Object.fromEntries(questions.map((q) => [q.number, accepted.get(q.number).reviewTag])),
    manualEdits: ed.manualEdits,
    canonicalQuestionsSha256: createHash('sha256').update(JSON.stringify(questions)).digest('hex'),
  };
  console.log(JSON.stringify({ year, total: questions.length, held: holds }));
}
writeFileSync(new URL('acceptance-ledger.json', here), JSON.stringify(ledger, null, 2) + '\n');
