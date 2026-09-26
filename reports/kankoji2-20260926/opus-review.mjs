// Real claude-opus-5-5 review of SHA-pinned, visually checked 2級管工事 transcriptions.
// Usage: node opus-review.mjs <year> <group> <first> <last> [round]
// Writes opus-<year>-<group>[-rN]-{raw,receipt,explanations}.json next to this script.
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { parseReviewResult } from './parse-result.mjs';

const here = new URL('./', import.meta.url);
const [year, group, firstArg, lastArg, round] = process.argv.slice(2);
const first = Number(firstArg), last = Number(lastArg);
if (!year || !group || !first || !last) throw new Error('usage: <year> <group> <first> <last> [round]');
const meta = JSON.parse(readFileSync(new URL(`meta-${year}.json`, here), 'utf8'));
const source = JSON.parse(readFileSync(new URL(`segments-${year}.json`, here), 'utf8'));
const overrides = JSON.parse(readFileSync(new URL(`visual-overrides-${year}.json`, here), 'utf8'));
const notes = round ? JSON.parse(readFileSync(new URL(`review-notes-${year}-${group}-${round}.json`, here), 'utf8')) : {};
const subset = source.filter(q => q.number >= first && q.number <= last).map(q => {
  const checked = { ...q, ...(overrides[q.number] ?? {}) };
  return {
    number: q.number,
    pdfPage: q.pdfPage,
    question: checked.stem,
    choices: checked.choices,
    officialAnswerNumbers: q.officialAnswerNumbers,
    requiredSelections: q.officialAnswerNumbers.length > 1 && meta.multiSelect?.includes(q.number) ? q.officialAnswerNumbers.length : 1,
    visualDescription: checked.visualDescription,
    officialCorrectionNote: meta.correctionNote?.[q.number],
    reviewerNote: notes[q.number],
  };
});
const prompt = `あなたは${meta.edition}教材の厳格な査読者兼解説執筆者。入力は公式問題PDF SHA256 ${meta.questionSha256} から抽出し原本画像で目視照合した本文と、公式正答PDF SHA256 ${meta.answerSha256} の正解番号（officialAnswerNumbers）。公式正解番号を変更しない。requiredSelections が2の設問は「二つ選べ」形式で、officialAnswerNumbers の二肢が両方とも正解（どちらか一方だけでは得点にならない）。requiredSelections が1で officialAnswerNumbers が2つある設問は、実施機関が訂正によりどちらも正解とした設問であり、その事情を説明する。各肢の正誤理由を、設問が「適当でないもの」「正しいもの」「誤っているもの」「定められていないもの」等のいずれかを読んで正しく説明する。正解肢が事実誤りの場合に「正しい」と言わない。図が必要なのに visualDescription がない、数式の上付き文字が欠けた、選択肢または設問に抽出欠落がある場合は、その設問をHOLDし、作り話で補わない。技術基準や法令の数値・条番号を確信なく推測しない（確信が持てない条番号は書かない）。公式正答と説明が衝突した場合はHOLD。入力PDF以外の資料を実際に閲覧したかのようには述べない。reviewerNote がある設問は、その指摘を検討して反映する。選択肢はサイト画面で原本の肢1〜4をそれぞれア・イ・ウ・エと表示するため、解説文中で他の肢を名指しするときはア・イ・ウ・エを使う（原本の番号で「肢1」等と書かない）。ツールやファイル書き込みは使わず、最終回答の本文として厳密なJSONのみを出力する。形式: {"questions":[{"number":1,"status":"PASS|HOLD","topic":"10字程度の分野名","explanation":"正答の理由を含む総括。2〜3文","choiceExplanations":["肢1の具体的理由","肢2の具体的理由","肢3の具体的理由","肢4の具体的理由"],"issue":"HOLDの理由。PASSなら空文字"}],"globalIssues":[]}。各肢理由は冒頭を「適当。」「不適当。」（設問が正誤を問う形なら「正しい。」「誤り。」）等で始め、教材として意味がある具体性にし、同じ定型文を繰り返さない。対象の全設問を一件も省略しない。入力:\n${JSON.stringify(subset, null, 2)}`;
const cli = 'C:/Users/kanet/AppData/Roaming/npm/node_modules/@anthropic-ai/claude-code/cli-wrapper.cjs';
const args = [cli, '-p', '--model', 'claude-opus-5-5', '--output-format', 'json', '--tools', '', '--permission-mode', 'plan', '--no-session-persistence'];
const tag = `opus-${year}-${group}${round ? `-${round}` : ''}`;
writeFileSync(new URL(`${tag}-prompt.txt`, here), prompt);
const startedAt = new Date().toISOString();
const child = spawn(process.execPath, args, { cwd: here, stdio: ['pipe', 'pipe', 'pipe'], windowsHide: true });
let stdout = '', stderr = '';
child.stdout.on('data', d => stdout += d);
child.stderr.on('data', d => stderr += d);
child.on('close', code => {
  writeFileSync(new URL(`${tag}-raw.json`, here), stdout);
  let raw = {}; try { raw = JSON.parse(stdout); } catch {}
  const parsed = parseReviewResult(raw.result) ?? {};
  const usage = raw.modelUsage ?? {};
  const correctModel = Object.keys(usage).some(key => key.includes('claude-opus-5-5')) && Object.keys(usage).every(key => key.includes('claude-opus-5-5') || key.includes('haiku'));
  const receipt = { startedAt, finishedAt: new Date().toISOString(), requestedModel: 'claude-opus-5-5', provider: 'firstParty', exitCode: code, isError: raw.is_error ?? null, modelUsage: usage, totalCostUsd: raw.total_cost_usd ?? null, correctModel, stderr, questionNumbers: parsed.questions?.map(q => q.number) ?? null, statuses: parsed.questions?.map(q => [q.number, q.status]) ?? null, globalIssues: parsed.globalIssues ?? null };
  writeFileSync(new URL(`${tag}-receipt.json`, here), JSON.stringify(receipt, null, 2) + '\n');
  if (correctModel && code === 0 && !raw.is_error && parsed.questions) writeFileSync(new URL(`${tag}-explanations.json`, here), JSON.stringify(parsed, null, 2) + '\n');
  console.log(JSON.stringify({ tag, exitCode: code, correctModel, statuses: receipt.statuses, globalIssues: receipt.globalIssues, models: Object.keys(usage) }));
});
child.stdin.end(prompt);
