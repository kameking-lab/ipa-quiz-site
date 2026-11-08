// Copilot RAG インデックスの構築・統計ダンプ用スクリプト。
//
// `--write` を付けると generated/copilot/ に索引・検索文書・問題（分割）を書き出す。
// `pnpm build` はこれを next build の前に実行し、Vercel の /api/copilot 関数に
// 同梱する（next.config.ts の outputFileTracingIncludes）。実行時はこれを読むだけなので、
// 冷えたサーバでも全問題データの読み込みと索引の組み立て（合わせて十数秒）を待たずに済む。
// ファイルが無い場合、実行時は従来どおりデータ本体から組み立てる（結果は同じ）。
//
// 使い方:
//   pnpm copilot:index            # 統計だけ表示
//   pnpm copilot:index --write    # 索引を書き出す（pnpm build が自動で実行）

import { rmSync } from "node:fs";
import { join } from "node:path";
import { getCorpus, resetCorpusCache } from "@/lib/copilot/corpus";
import { buildIndex } from "@/lib/copilot/retriever";
import { corpusFingerprint } from "@/lib/copilot/index-artifact";
import {
  COPILOT_PREBUILT_DIR,
  openPrebuiltCopilotSource,
  writePrebuiltCopilotFiles,
} from "@/lib/copilot/source-prebuilt";
import { getAllQuestions } from "@/lib/questions/load";

function fmtDur(ms: number): string {
  if (ms < 1) return `${(ms * 1000).toFixed(0)}μs`;
  if (ms < 1000) return `${ms.toFixed(1)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

function main(): void {
  const write = process.argv.includes("--write");
  resetCorpusCache();
  const t0 = performance.now();
  const docs = getCorpus();
  const t1 = performance.now();
  const index = buildIndex(docs);
  const t2 = performance.now();

  const questionDocs = docs.filter((d) => d.kind === "question").length;
  const glossaryDocs = docs.filter((d) => d.kind === "glossary").length;
  const totalTokens = index.docLen.reduce((a, b) => a + b, 0);

  console.log("Copilot RAG index summary");
  console.log("─".repeat(48));
  console.log(`  corpus build      : ${fmtDur(t1 - t0)}`);
  console.log(`  index build       : ${fmtDur(t2 - t1)}`);
  console.log(`  total docs        : ${docs.length}`);
  console.log(`    - questions     : ${questionDocs}`);
  console.log(`    - glossary      : ${glossaryDocs}`);
  console.log(`  unique terms      : ${index.termIds.size}`);
  console.log(`  postings          : ${index.postingDocs.length}`);
  console.log(`  avg doc length    : ${index.avgDocLen.toFixed(1)} tokens`);
  console.log(`  total tokens      : ${totalTokens}`);

  if (!write) return;

  const t3 = performance.now();
  const questions = getAllQuestions();
  const fingerprint = corpusFingerprint(docs);
  const root = process.cwd();
  rmSync(join(root, COPILOT_PREBUILT_DIR), { recursive: true, force: true });
  const { bytes } = writePrebuiltCopilotFiles(root, questions, index, fingerprint);
  const t4 = performance.now();

  // 書いた物を本番と同じ経路で読み戻し、データ本体からの組み立てと一致することを確かめる。
  // 一致しなければ消して失敗させる（ビルドを止める）。消した場合でも実行時は従来の経路で動く。
  try {
    const source = openPrebuiltCopilotSource(root);
    if (!source) throw new Error("prebuilt manifest unreadable");
    const restored = source.index();
    if (!sameIndex(index, restored)) throw new Error("index mismatch");
    for (let i = 0; i < docs.length; i++) {
      const a = docs[i];
      const b = restored.docs[i];
      if (a.id !== b.id || a.kind !== b.kind || a.title !== b.title || a.url !== b.url ||
        JSON.stringify(a.meta) !== JSON.stringify(b.meta) || a.text !== b.text || b.textLength !== a.text.length) {
        throw new Error(`doc mismatch at ${i} (${a.id})`);
      }
    }
    for (const q of questions) {
      if (JSON.stringify(source.getQuestion(q.id)) !== JSON.stringify(q)) throw new Error(`question mismatch ${q.id}`);
    }
  } catch (err) {
    rmSync(join(root, COPILOT_PREBUILT_DIR), { recursive: true, force: true });
    throw err;
  }
  const t5 = performance.now();
  console.log(`  questions         : ${questions.length}`);
  console.log(`  write             : ${fmtDur(t4 - t3)}`);
  console.log(`  verify            : ${fmtDur(t5 - t4)}`);
  console.log(`  wrote             : ${COPILOT_PREBUILT_DIR}/ (${(bytes / 1024 / 1024).toFixed(1)} MB)`);
}

function sameIndex(a: ReturnType<typeof buildIndex>, b: ReturnType<typeof buildIndex>): boolean {
  if (a.termIds.size !== b.termIds.size || a.avgDocLen !== b.avgDocLen) return false;
  for (const [term, id] of a.termIds) if (b.termIds.get(term) !== id) return false;
  const eq = (x: Uint32Array, y: Uint32Array) => x.length === y.length && x.every((v, i) => v === y[i]);
  return eq(a.offsets, b.offsets) && eq(a.postingDocs, b.postingDocs) &&
    eq(a.postingTfs, b.postingTfs) && eq(a.docLen, b.docLen);
}

main();
