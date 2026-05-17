// Copilot RAG 評価スクリプト。
// 使い方:
//   pnpm tsx scripts/eval-copilot-rag.ts
//
// route.ts と同じパイプライン (runRAG → threshold) で評価することで、
// 「production と乖離した eval」になるのを防ぐ。

import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { GROUND_TRUTH } from "@/data/copilot-eval/groundtruth";
import { runRAG, ragMinScore } from "@/lib/copilot/rag";
import { getCorpus, resetCorpusCache } from "@/lib/copilot/corpus";
import { resetIndexCache } from "@/lib/copilot/retriever";

const TOP_K_FOR_RECALL = 5;

interface EvalRow {
  query: string;
  tag: "glossary" | "concept" | "chitchat";
  expectedIds: string[];
  retrievedTop5: string[];
  topScore: number;
  recallAt5: number;
  mrr10: number;
  cited: boolean;
}

async function evaluate(): Promise<EvalRow[]> {
  resetCorpusCache();
  resetIndexCache();
  // index 構築のウォームアップ（lazy 生成だが、計測精度のため事前に走らせる）
  getCorpus();

  const rows: EvalRow[] = [];
  const threshold = ragMinScore();
  for (const entry of GROUND_TRUTH) {
    const res = await runRAG({
      userMessage: entry.query,
      question: null,
      topK: 10,
      topN: 10,
    });

    const topIds = res.passages.map((p) => p.doc.id);
    const top5 = topIds.slice(0, TOP_K_FOR_RECALL);
    const recallAt5 =
      entry.expectedIds.length === 0
        ? 0
        : entry.expectedIds.some((id) => top5.includes(id))
          ? 1
          : 0;
    let mrr10 = 0;
    if (entry.expectedIds.length > 0) {
      for (let i = 0; i < topIds.length; i++) {
        if (entry.expectedIds.includes(topIds[i])) {
          mrr10 = 1 / (i + 1);
          break;
        }
      }
    }
    const cited = res.passages.length > 0 && res.topScore >= threshold;
    rows.push({
      query: entry.query,
      tag: entry.tag,
      expectedIds: entry.expectedIds,
      retrievedTop5: top5,
      topScore: res.topScore,
      recallAt5,
      mrr10,
      cited,
    });
  }
  return rows;
}

function summarize(rows: EvalRow[]) {
  const knowledge = rows.filter((r) => r.tag !== "chitchat");
  const chitchat = rows.filter((r) => r.tag === "chitchat");

  const recallAt5 =
    knowledge.length > 0
      ? knowledge.reduce((a, r) => a + r.recallAt5, 0) / knowledge.length
      : 0;
  const mrr =
    knowledge.length > 0
      ? knowledge.reduce((a, r) => a + r.mrr10, 0) / knowledge.length
      : 0;
  const citedKnowledge = knowledge.filter((r) => r.cited).length;
  const citationRate =
    knowledge.length > 0 ? citedKnowledge / knowledge.length : 0;
  const falsePositive =
    chitchat.length > 0
      ? chitchat.filter((r) => r.cited).length / chitchat.length
      : 0;

  return {
    total: rows.length,
    knowledgeCount: knowledge.length,
    chitchatCount: chitchat.length,
    recallAt5,
    mrr,
    citationRate,
    falsePositive,
    citedKnowledge,
  };
}

function formatResultsBlock(rows: EvalRow[]): string {
  const s = summarize(rows);
  const date = new Date().toISOString().slice(0, 10);
  const lines: string[] = [];
  lines.push(`### ${date} 評価実行`);
  lines.push("");
  lines.push(`- 総クエリ数: ${s.total}`);
  lines.push(`- 知識クエリ: ${s.knowledgeCount}`);
  lines.push(`- 雑談クエリ: ${s.chitchatCount}`);
  lines.push(`- Recall@5 (knowledge): ${(s.recallAt5 * 100).toFixed(1)} %`);
  lines.push(`- MRR@10  (knowledge): ${s.mrr.toFixed(3)}`);
  lines.push(`- Citation rate (knowledge cited): ${(s.citationRate * 100).toFixed(1)} %`);
  lines.push(`- False-positive rate (chitchat cited): ${(s.falsePositive * 100).toFixed(1)} %`);
  lines.push(`- Threshold (COPILOT_RAG_MIN_SCORE): ${ragMinScore().toFixed(2)}`);
  lines.push("");
  const fails = rows.filter((r) => r.tag !== "chitchat" && r.recallAt5 === 0);
  if (fails.length > 0) {
    lines.push(`#### Recall@5 miss サンプル (上位 ${Math.min(fails.length, 5)} 件 / 計 ${fails.length})`);
    for (const f of fails.slice(0, 5)) {
      lines.push(`- "${f.query}" → expected ${JSON.stringify(f.expectedIds)} / top5 ${JSON.stringify(f.retrievedTop5)} / topScore ${f.topScore.toFixed(2)}`);
    }
    lines.push("");
  }
  const falses = rows.filter((r) => r.tag === "chitchat" && r.cited);
  if (falses.length > 0) {
    lines.push(`#### False-positive サンプル (上位 ${Math.min(falses.length, 5)} 件 / 計 ${falses.length})`);
    for (const f of falses.slice(0, 5)) {
      lines.push(`- "${f.query}" → top5 ${JSON.stringify(f.retrievedTop5)} / topScore ${f.topScore.toFixed(2)}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

function writeResults(block: string): void {
  const path = "docs/improvements/copilot-rag.md";
  if (!existsSync(path)) {
    console.warn(`alive marker ${path} not found; skipping result append`);
    return;
  }
  const current = readFileSync(path, "utf8");
  const marker = "## Results";
  const idx = current.indexOf(marker);
  if (idx === -1) {
    writeFileSync(path, `${current}\n\n${marker}\n\n${block}\n`);
    return;
  }
  // 既存 Results セクションを置き換える
  const before = current.slice(0, idx + marker.length);
  writeFileSync(path, `${before}\n\n${block}\n`);
}

async function main(): Promise<void> {
  console.log("Running Copilot RAG eval...");
  const rows = await evaluate();
  const s = summarize(rows);

  console.log("─".repeat(48));
  console.log(`Total queries          : ${s.total}`);
  console.log(`Knowledge queries      : ${s.knowledgeCount}`);
  console.log(`Chitchat queries       : ${s.chitchatCount}`);
  console.log(`Recall@5  (knowledge)  : ${(s.recallAt5 * 100).toFixed(1)} %`);
  console.log(`MRR@10    (knowledge)  : ${s.mrr.toFixed(3)}`);
  console.log(`Citation rate          : ${(s.citationRate * 100).toFixed(1)} %`);
  console.log(`False-positive rate    : ${(s.falsePositive * 100).toFixed(1)} %`);
  console.log(`Threshold              : ${ragMinScore().toFixed(2)}`);
  console.log("─".repeat(48));

  const block = formatResultsBlock(rows);
  writeResults(block);
  console.log("Updated Results section in docs/improvements/copilot-rag.md");
}

main();
