// Generate per-choice study explanations for one batch with claude-opus-5-5 and
// keep the raw response plus a receipt (model, exit code, usage) next to it.
// Usage: node gen_expl.mjs <batch.json> <mode: write|review> [draft.json]
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const [,, batchPath, mode = 'write', draftPath] = process.argv;
const batch = JSON.parse(readFileSync(batchPath, 'utf8'));
const base = batchPath.replace(/\.json$/, '');

const writePrompt = `あなたは${batch.exam}の学習解説を書く専門家です。以下は公益財団法人社会福祉振興・試験センターが公表した試験問題（原文）と公式正答です。公式正答は固定であり、変更・疑義の主張はしないでください（ただし明らかな矛盾があれば status を HOLD にして issue に理由を書く）。
各設問について、選択肢1〜5それぞれが正答か誤りかの理由を、受験者が学べるよう具体的かつ簡潔に日本語で説明してください。
規則:
- 「適切でないもの」「誤っているもの」を選ぶ設問では、正答肢＝記述として不適切なもの、であることを混同しない。
- 各選択肢の理由は40〜160字。その肢の内容に固有の根拠（制度名・定義・人物の業績・介護技術の原則など）を書く。「正しい」「誤り」だけの理由は禁止。
- 統計値・年号・条番号・人数などは確実なものだけ書く。不確かな数値を創作しない。
- 出題後の法改正や統計の更新で結論が変わり得る設問は、試験時点の制度に基づくことを明記し、lawSensitive を true にする。
- 事例問題は事例文の記述を根拠として参照する。
- 問題文・選択肢を書き換えたり要約して言い換えた「原文」を作らない（解説の中で内容に触れるのは可）。
- 閲覧していない資料を閲覧したふりをしない。URLを書かない。
- summary は設問全体の判断基準と正答の要点（60〜200字）。
出力は厳密なJSONのみ（前置き・コードフェンス禁止）:
{"questions":[{"number":1,"status":"PASS|HOLD","summary":"...","choiceExplanations":{"1":"...","2":"...","3":"...","4":"...","5":"..."},"lawSensitive":false,"issue":""}]}
設問を省略しない（${batch.questions.length}問）。

${JSON.stringify(batch, null, 1)}`;

const reviewPrompt = () => {
  const draft = JSON.parse(readFileSync(draftPath, 'utf8'));
  return `あなたは${batch.exam}の解説を査読する独立レビュアーです。以下の「問題と公式正答」と「解説草稿」を照合し、各設問を判定してください。
判定基準: (1) 各選択肢の正誤判定が公式正答と一致しているか (2) 理由に事実誤り・創作された数値や年号・根拠のない断定がないか (3) 「適切でないもの」を選ぶ設問で正誤が逆転していないか (4) 各肢の理由がその肢固有の内容か。
問題があれば status を FIX とし、fixes に修正後の文（その肢の理由全文、または summary 全文）を入れてください。問題がなければ PASS。些末な文体の好みでは FIX にしない。
出力は厳密なJSONのみ:
{"questions":[{"number":1,"status":"PASS|FIX","problems":"","fixes":{"summary":"(必要時のみ)","1":"(必要時のみ)"}}]}
設問を省略しない（${batch.questions.length}問）。

【問題と公式正答】
${JSON.stringify(batch, null, 1)}

【解説草稿】
${JSON.stringify(draft, null, 1)}`;
};

const prompt = mode === 'review' ? reviewPrompt() : writePrompt;
const out = mode === 'review' ? `${base}.review` : `${base}.draft`;
const startedAt = new Date().toISOString();
const args = ['C:/Users/kanet/AppData/Roaming/npm/node_modules/@anthropic-ai/claude-code/cli-wrapper.cjs',
  '-p', '--model', 'claude-opus-5-5', '--output-format', 'json', '--tools', '',
  '--permission-mode', 'plan', '--no-session-persistence'];
const child = spawn(process.execPath, args, { stdio: ['pipe', 'pipe', 'pipe'], windowsHide: true });
let stdout = '', stderr = '';
child.stdout.on('data', (d) => { stdout += d; });
child.stderr.on('data', (d) => { stderr += d; });
child.on('close', (code) => {
  writeFileSync(`${out}.raw.json`, stdout);
  let raw = {}; try { raw = JSON.parse(stdout); } catch {}
  let text = String(raw.result ?? '').trim().replace(/^```(?:json)?\s*/, '').replace(/```\s*$/, '');
  let parsed = {}; try { parsed = JSON.parse(text); } catch (e) { parsed = { parseError: String(e) }; }
  const receipt = {
    startedAt, finishedAt: new Date().toISOString(), mode, batch: batchPath.split(/[\\/]/).pop(),
    requestedModel: 'claude-opus-5-5', exitCode: code, isError: raw.is_error ?? null,
    modelUsage: raw.modelUsage ?? null, stderr: stderr.slice(0, 2000),
    questionCount: parsed.questions?.length ?? null,
    statuses: parsed.questions?.map((q) => [q.number, q.status]) ?? null,
  };
  writeFileSync(`${out}.receipt.json`, JSON.stringify(receipt, null, 2) + '\n');
  writeFileSync(`${out}.json`, JSON.stringify(parsed, null, 2) + '\n');
  console.log(JSON.stringify({ out, code, n: receipt.questionCount, err: parsed.parseError ?? null }));
});
child.stdin.end(prompt);
