import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { validatePrepared } from './validate.mjs';
const read = name => readFileSync(new URL(name, import.meta.url));
const e = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
export function renderPrivatePreview() {
  const gate = JSON.parse(read('gate.json'));
  const policy = JSON.parse(read('source-policy.json'));
  const ten = JSON.parse(read('addition10.json'));
  const three = JSON.parse(read('next3.json'));
  const { questions } = validatePrepared(read('addition10.json'), read('next3.json'), gate, read('evidence.json'), read('source-policy.json'), read('../pilot.json'));
  const articles = questions.map(q => {
    const table = q.table ? `<table aria-label="問25 日付と経過"><thead><tr>${q.table.header.map(h => `<th scope="col">${e(h)}</th>`).join('')}</tr></thead><tbody>${q.table.rows.map(r => `<tr>${r.dates.map((date,i) => `<td><strong>${e(date)}</strong><p>${e(r.events[i])}</p></td>`).join('')}</tr>`).join('')}</tbody></table>` : '';
    const example = q.authorCreatedExample ? `<aside><h3>独自に置いた計算例（公式与件・実測値ではありません）</h3><p>${e(q.authorCreatedExample.assumptions)}</p><pre>${e(JSON.stringify(q.authorCreatedExample.tables,null,2))}</pre></aside>` : '';
    const refs = q.primaryReferences.filter(r => q.questionNumber !== 15 || !policy.q15InactiveAsExamDateAuthorities.includes(r.name));
    const attribution = q.questionNumber >= 33 ? three.sourceAttribution : q.questionNumber <= 25 ? ten.sourceAttributionsBySet.next6 : ten.sourceAttributionsBySet.stats4;
    return `<article id="q${q.questionNumber}"><h2>問${q.questionNumber}</h2><p class="question">${e(q.question)}</p>${table}<ol>${q.choices.map((c,i) => `<li><p>${e(c)}</p><p class="reason">${e(q.choiceExplanations[i])}</p></li>`).join('')}</ol><p><strong>公式正答：${e(q.officialAnswer.join('・'))}</strong></p>${q.explanation ? `<p>${e(q.explanation)}</p>` : ''}${example}<p class="attribution">${e(attribution)}</p><details><summary>照合資料と出題時点の境界</summary><ul>${refs.map(r => `<li><a href="${e(r.url)}">${e(r.name ?? r.url)}</a>${r.actualPublisher ? `<p>${e(r.actualPublisher)}。${e(r.reuseScope)}</p>` : ''}</li>`).join('')}</ul><p>法令は確認済み対象条文だけを履歴版と照合しています。現在の全文が試験時と同一とはしていません。人口FAQは現用語の照合で、試験時の同一ページではありません。旧チェックリストは区分の確認用であり、現在の制度適格性を判定しません。</p></details></article>`;
  }).join('\n');
  return `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta name="viewport" content="width=device-width,initial-scale=1"><title>保健師112・私有prepared確認</title><style>body{font:17px/1.8 sans-serif;max-width:1100px;margin:24px auto;padding:16px;color:#17232d}article{border-top:2px solid #557;padding:24px 0}.question,.reason{white-space:pre-wrap}.reason{background:#f1f6f8;padding:12px}table{border-collapse:collapse;width:100%;font-size:14px}th,td{border:1px solid #556;padding:8px;vertical-align:top}td p{min-height:4em}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#eef3f5;padding:16px}.attribution{font-size:14px;color:#456}</style></head><body><h1>保健師112回・私有prepared確認</h1><p>追加13問60肢。既存2問と合わせ15問68肢の限定範囲です。公開承認・権利許諾・全110問／二回分完成の判定はありません。このファイルを公開ルートへ接続しません。</p>${articles}</body></html>`;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (!process.argv[2]) throw new Error('EXPLICIT_PRIVATE_OUTPUT_PATH_REQUIRED');
  writeFileSync(resolve(process.argv[2]), renderPrivatePreview(), 'utf8');
  console.log('Private preview written; public gate remains false.');
}
