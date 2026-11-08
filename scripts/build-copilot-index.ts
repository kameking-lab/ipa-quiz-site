// Copilot RAG インデックスの構築・統計ダンプ用スクリプト。
//
// `--write` を付けると generated/copilot-index.bin に索引を書き出す。
// `pnpm build` はこれを next build の前に実行し、Vercel の /api/copilot 関数に
// 同梱する（next.config.ts の outputFileTracingIncludes）。実行時は読むだけになるので、
// 冷えたサーバでも索引の組み立て（以前は数秒〜十数秒）を待たずに済む。
// ファイルが無い・古い場合、実行時は従来どおり組み立てる（結果は同じ）。
//
// 使い方:
//   pnpm copilot:index            # 統計だけ表示
//   pnpm copilot:index --write    # 索引を書き出す（pnpm build が自動で実行）

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { getCorpus, resetCorpusCache } from "@/lib/copilot/corpus";
import { buildIndex } from "@/lib/copilot/retriever";
import {
  COPILOT_INDEX_RELATIVE_PATH,
  deserializeIndex,
  serializeIndex,
} from "@/lib/copilot/index-artifact";

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
  const bytes = serializeIndex(index);
  const t4 = performance.now();
  // 書いた物がそのまま読めて同じ索引になることを、書き出し前に確かめる。
  const restored = deserializeIndex(bytes, docs);
  const t5 = performance.now();
  if (!restored || !sameIndex(index, restored)) {
    throw new Error("copilot index round-trip mismatch; refusing to write");
  }
  const out = join(process.cwd(), COPILOT_INDEX_RELATIVE_PATH);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, bytes);
  console.log(`  serialize         : ${fmtDur(t4 - t3)}`);
  console.log(`  load (verify)     : ${fmtDur(t5 - t4)}`);
  console.log(`  wrote             : ${COPILOT_INDEX_RELATIVE_PATH} (${(bytes.length / 1024 / 1024).toFixed(1)} MB)`);
}

function sameIndex(a: ReturnType<typeof buildIndex>, b: ReturnType<typeof buildIndex>): boolean {
  if (a.termIds.size !== b.termIds.size || a.avgDocLen !== b.avgDocLen) return false;
  for (const [term, id] of a.termIds) if (b.termIds.get(term) !== id) return false;
  const eq = (x: Uint32Array, y: Uint32Array) => x.length === y.length && x.every((v, i) => v === y[i]);
  return eq(a.offsets, b.offsets) && eq(a.postingDocs, b.postingDocs) &&
    eq(a.postingTfs, b.postingTfs) && eq(a.docLen, b.docLen);
}

main();
