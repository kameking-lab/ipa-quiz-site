// Draft and independently review per-choice explanations for one batch with
// claude-opus-5-5, keeping the raw response and a receipt (model, provider, usage).
//
// Usage:
//   node generate-explanations.mjs <batchN.json> write
//       -> batchN.draft.{json,raw.json,receipt.json}   (no tools)
//   node generate-explanations.mjs <batchN.json> review <candidate.json> <tag> [refNotesDir]
//       -> batchN.<tag>.{json,raw.json,receipt.json}   (fresh session; WebFetch/WebSearch only,
//          to check laws, statistics and dates against e-Gov and ministry primary sources)
// <candidate.json> is {"questions":[{number,summary,choiceExplanations,lawSensitive}]}; only
// the questions it lists are reviewed. refNotesDir (common subjects only) holds the separate
// 社会福祉士第37回 primary-source audit notes (PR #609); they are reference data that the
// reviewer must re-check, never an approval.
import { spawn } from 'node:child_process';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [,, batchPath, mode = 'write', candidatePath, tag = 'review', refDir] = process.argv;
const batch = JSON.parse(readFileSync(batchPath, 'utf8'));
const base = batchPath.replace(/\.json$/, '');
const CLI = 'C:/Users/kanet/AppData/Roaming/npm/node_modules/@anthropic-ai/claude-code/cli-wrapper.cjs';
 // REVIEW_STRICT=1: claim-by-claim primary-source check of every law, date, statistic and attribution.
const STRICT = process.env.REVIEW_STRICT === '1';
const TIMING = '試験は令和7年2月1日・2日に実施された。解説は試験時点（令和7年2月）の法令・制度に基づく。';

const writePrompt = () => `あなたは${batch.exam}の学習解説を書く専門家です。以下は公益財団法人社会福祉振興・試験センターが公表した試験問題（原文）と公式正答です。${TIMING}公式正答は固定であり、変更・疑義の主張はしないでください（ただし正答が一意に説明できない・原文が曖昧で公式正答を確実に説明できない場合は status を HOLD にして issue に理由を書く）。
各設問について、選択肢1〜5それぞれが正答か誤りかの理由を、受験者が学べるよう具体的かつ簡潔に日本語で説明してください。
規則:
- 「適切でないもの」「誤っているもの」を選ぶ設問では、正答肢＝記述として不適切なもの、であることを混同しない。
- 各選択肢の理由は40〜160字。その肢の内容に固有の根拠（法令名・条文の趣旨・制度名・定義・人物の業績・支援技法の原則など）を書く。「正しい」「誤り」だけの理由は禁止。
- 統計値・年号・条番号・人数などは確実なものだけ書く。不確かな数値を創作しない。確実でなければ数値を書かずに大小関係・趣旨で説明する。
- 出題後の法改正や統計の更新で結論が変わり得る設問は、試験時点の制度に基づくことを明記し、lawSensitive を true にする。
- 事例問題は事例文の記述を根拠として参照する。
- 問題文・選択肢を書き換えたり要約して言い換えた「原文」を作らない（解説の中で内容に触れるのは可）。
- 閲覧していない資料を閲覧したふりをしない。URLを書かない。
- summary は設問全体の判断基準と正答の要点（60〜200字）。
出力は厳密なJSONのみ（前置き・コードフェンス禁止）:
{"questions":[{"number":1,"status":"PASS|HOLD","summary":"...","choiceExplanations":{"1":"...","2":"...","3":"...","4":"...","5":"..."},"lawSensitive":false,"issue":""}]}
設問を省略しない（${batch.questions.length}問）。

${JSON.stringify(batch, null, 1)}`;

function refNotes(numbers) {
  if (!refDir) return '';
  const sections = [];
  for (const file of readdirSync(refDir).filter((f) => f.endsWith('.md')).sort()) {
    const text = readFileSync(join(refDir, file), 'utf8');
    for (const part of text.split(/\n(?=## 問)/)) {
      const m = part.match(/^## 問(\d+)/);
      if (m && numbers.includes(Number(m[1]))) sections.push(part.trim());
    }
  }
  if (!sections.length) return '';
  return `\n【参考：社会福祉士第37回（同一問題）について別担当が行った一次資料照合メモ】
これは別レーンの作業メモで、承認ではありません。記載の数値・出典はあなた自身が一次資料で確かめてから判断に使ってください。メモと草稿が食い違う場合は一次資料で決着させてください。
${sections.join('\n\n')}\n`;
}

const reviewPrompt = () => {
  const candidate = JSON.parse(readFileSync(candidatePath, 'utf8'));
  const numbers = candidate.questions.map((q) => q.number);
  const scoped = { ...batch, questions: batch.questions.filter((q) => numbers.includes(q.number)) };
  return `あなたは${batch.exam}の解説を査読する独立レビュアーです（解説の執筆者とは別のセッション）。${TIMING}以下の「問題と公式正答」と「解説草稿」を照合し、各設問を判定してください。
判定基準:
(1) 各選択肢の正誤判定が公式正答と一致しているか。「適切でないもの」を選ぶ設問で正誤が逆転していないか。
(2) 理由に事実誤り・創作された数値や年号・根拠のない断定がないか。法令・制度・統計・年号・人物の業績に関する記述は、WebFetch/WebSearch で一次資料を確認する。法令は e-Gov 法令検索（https://laws.e-gov.go.jp/ 。本文は API https://laws.e-gov.go.jp/api/1/lawdata/<法令ID> で取得できる）、制度・統計は厚生労働省・内閣府・総務省・法務省・こども家庭庁等の公式資料を優先する。試験時点（令和7年2月）の条文・制度で判断し、その後の改正があれば lawSensitive が true か確認する。
(3) 各肢の理由がその肢固有の内容か。
(4) 一次資料で確認できない数値・年号は、削るか確実な表現に改める FIX にする。
判定: 問題がなければ PASS。誤り・根拠のない断定があれば FIX とし、fixes に修正後の文（その肢の理由全文、または summary 全文、lawSensitive の真偽）を入れる。公式正答を一次資料と原文から一意に説明できない（原文が曖昧、正答の根拠が確認できない）場合は HOLD とし problems に理由を書く。些末な文体の好みでは FIX にしない。
evidence には、実際に閲覧して確認した一次資料の URL と確認した内容を挙げる（閲覧していない URL を書かない）。一次資料を要しない設問（事例の読解・支援技法の原則など）は空配列でよい。${STRICT ? `
【厳格照合】この回は主張単位の照合です。summary と各肢の理由に含まれる法令名・条番号・条文の趣旨・制度の要件や実施主体・年号・統計値・人名とその業績を一つずつ列挙し、一次資料（法令は e-Gov の条文、制度・統計は所管府省の公式資料、理論・人物は原著または公的機関・学会の資料）で確認してください。確認できた主張は evidence に URL と確認内容を書き、確認できない主張は削除するか確実な一般的表現に改める FIX にしてください。前回の査読で PASS だったことは判断材料にしないでください。` : ''}
出力は厳密なJSONのみ（前置き・コードフェンス禁止）:
{"questions":[{"number":1,"status":"PASS|FIX|HOLD","problems":"","fixes":{"summary":"(必要時のみ)","1":"(必要時のみ)","lawSensitive":true},"evidence":[{"url":"https://...","checked":"..."}]}]}
設問を省略しない（${numbers.length}問）。
${refNotes(numbers)}
【問題と公式正答】
${JSON.stringify(scoped, null, 1)}

【解説草稿】
${JSON.stringify(candidate, null, 1)}`;
};

// The model sometimes appends prose after the JSON object; keep the first balanced object.
function parseResult(stdout) {
  let raw = {}; try { raw = JSON.parse(stdout); } catch {}
  let text = String(raw.result ?? '').trim();
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced && !text.startsWith('{')) text = fenced[1].trim();
  text = text.slice(Math.max(0, text.indexOf('{')));
  let depth = 0, inString = false, escaped = false, end = -1;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === '"') inString = false;
    } else if (ch === '"') inString = true;
    else if (ch === '{') depth += 1;
    else if (ch === '}' && --depth === 0) { end = i + 1; break; }
  }
  let parsed = {}; try { parsed = JSON.parse(end > 0 ? text.slice(0, end) : text); } catch (e) { parsed = { parseError: String(e) }; }
  return { raw, parsed };
}

if (mode === 'reparse') {
  // node generate-explanations.mjs <batchN.json> reparse <tag>: rebuild <tag>.json from the kept raw stream.
  const out = `${base}.${candidatePath}`;
  const { parsed } = parseResult(readFileSync(`${out}.raw.json`, 'utf8'));
  const receipt = JSON.parse(readFileSync(`${out}.receipt.json`, 'utf8'));
  Object.assign(receipt, { reparsedAt: new Date().toISOString(), questionCount: parsed.questions?.length ?? null,
    statuses: parsed.questions?.map((q) => [q.number, q.status]) ?? null });
  writeFileSync(`${out}.receipt.json`, JSON.stringify(receipt, null, 2) + '\n');
  writeFileSync(`${out}.json`, JSON.stringify(parsed, null, 2) + '\n');
  console.log(JSON.stringify({ out, n: receipt.questionCount, err: parsed.parseError ?? null }));
  process.exit(0);
}

const isReview = mode === 'review';
const prompt = isReview ? reviewPrompt() : writePrompt();
const out = isReview ? `${base}.${tag}` : `${base}.draft`;
const startedAt = new Date().toISOString();
const args = [CLI, '-p', '--model', 'claude-opus-5-5', '--output-format', 'json', '--no-session-persistence',
  ...(isReview
    ? ['--tools', 'WebFetch,WebSearch', '--allowedTools', 'WebFetch,WebSearch']
    : ['--tools', '', '--permission-mode', 'plan'])];
const child = spawn(process.execPath, args, { stdio: ['pipe', 'pipe', 'pipe'], windowsHide: true });
let stdout = '', stderr = '';
child.stdout.on('data', (d) => { stdout += d; });
child.stderr.on('data', (d) => { stderr += d; });
child.on('close', (code) => {
  writeFileSync(`${out}.raw.json`, stdout);
  const { raw, parsed } = parseResult(stdout);
  const receipt = {
    startedAt, finishedAt: new Date().toISOString(), mode, tag: isReview ? tag : 'draft',
    batch: batchPath.split(/[\\/]/).pop(), candidate: isReview ? candidatePath.split(/[\\/]/).pop() : null,
    referenceNotes: isReview && refDir ? 'reports/sssc-shakai37-20260928/independent-review-*.md @ f802f78329f49cf067f9087ad75aab4561e06e90 (PR #609)' : null,
    strict: isReview ? STRICT : null,
    requestedModel: 'claude-opus-5-5', tools: isReview ? ['WebFetch', 'WebSearch'] : [],
    exitCode: code, isError: raw.is_error ?? null, numTurns: raw.num_turns ?? null,
    modelUsage: raw.modelUsage ?? null, stderr: stderr.slice(0, 2000),
    questionCount: parsed.questions?.length ?? null,
    statuses: parsed.questions?.map((q) => [q.number, q.status]) ?? null,
  };
  writeFileSync(`${out}.receipt.json`, JSON.stringify(receipt, null, 2) + '\n');
  writeFileSync(`${out}.json`, JSON.stringify(parsed, null, 2) + '\n');
  console.log(JSON.stringify({ out, code, n: receipt.questionCount, err: parsed.parseError ?? null }));
});
child.stdin.end(prompt);
