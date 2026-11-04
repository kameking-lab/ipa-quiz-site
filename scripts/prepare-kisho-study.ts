import fs from 'node:fs';
import { KISHO_PRIVATE_QUESTIONS, KISHO_SOURCE_MANIFEST } from '../lib/kisho-private';
import { KISHO_CURRENT_SOURCE_URLS, KISHO_QUESTIONS } from '../data/questions/kisho';
import publicAssets from '../data/questions/kisho/public-assets.json';

// Server/build-time projection. Never ship the immutable staging JSON to the public reader.
const questions = KISHO_PRIVATE_QUESTIONS.map(item => {
  const { raw, source, fields } = item;
  const academic = KISHO_QUESTIONS.find(q => q.id === raw.id);
  return { source, fields: fields.map(({ raw: field, source: fieldSource }) => ({
    source: fieldSource, raw: { questionId: field.questionId, field: field.field, path: field.path,
      prompt: field.prompt, officialAnswer: field.officialAnswer, explanation: field.explanation },
  })), raw: academic ?? {
    id: raw.id, exam: raw.exam, session: raw.session, qNumber: raw.qNumber, type: raw.type,
    question: raw.question, answer: raw.answer, explanation: raw.explanation,
    modelAnswer: raw.modelAnswer, scoringCriteria: raw.scoringCriteria,
    sourcePdfUrl: KISHO_CURRENT_SOURCE_URLS[source.round], sourceAnswerUrl: KISHO_CURRENT_SOURCE_URLS[source.round],
    license: raw.license,
  } };
});
const assets = KISHO_SOURCE_MANIFEST.assets.map(asset => {
  const current = publicAssets.find(a => a.assetId === asset.assetId)!;
  const { sourcePdf, physicalPage, kind, assetId } = asset;
  return { assetId, sourcePdf, physicalPage, kind, width: current.width, height: current.height,
    sha256: current.sha256, preparedPath: current.url, private: true };
});
const serialized = JSON.stringify({ questions, assets }, null, 2) + '\n';
if (/\b[A-Z]:[\\/]|file:\/\//i.test(serialized)) {
  const match = serialized.match(/.{0,80}(?:\b[A-Z]:[\\/]|file:\/\/).{0,120}/i);
  throw new Error(`Local path in source data: ${match?.[0]}`);
}
fs.writeFileSync('data/questions/kisho/study-data.json', serialized);
console.log(`Prepared ${questions.length} public reader questions and ${assets.length} assets`);
