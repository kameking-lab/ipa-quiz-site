// Copilot RAG インデックスの構築・統計ダンプ用スクリプト。
// Vercel ランタイムでは route.ts の lazy build がインデックスを保持するため、
// オンディスクの artifact は出力しない（メモリ常駐で十分小さい）。
// 本スクリプトは「インデックスが想定通り構築できるか」「コーパスサイズ」を
// ローカルで確認するためのもの。
//
// 使い方:
//   pnpm tsx scripts/build-copilot-index.ts

import { getCorpus, resetCorpusCache } from "@/lib/copilot/corpus";
import { buildIndex } from "@/lib/copilot/retriever";

function fmtDur(ms: number): string {
  if (ms < 1) return `${(ms * 1000).toFixed(0)}μs`;
  if (ms < 1000) return `${ms.toFixed(1)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

function main(): void {
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
  console.log(`  unique terms      : ${index.postings.size}`);
  console.log(`  avg doc length    : ${index.avgDocLen.toFixed(1)} tokens`);
  console.log(`  total tokens      : ${totalTokens}`);
}

main();
