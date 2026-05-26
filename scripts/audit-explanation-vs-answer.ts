/**
 * Audit every question for explanations that contradict their own answer key.
 *
 * Phase 11 / F-1: the empirical review found AP 2025春 問1's explanation openly
 * disputing the official answer. This scans the full corpus heuristically and
 * writes a report. Two categories:
 *   - dispute        : explanation hedges/argues against the official answer (high confidence)
 *   - stated-mismatch: explanation states a different 正解 letter (advisory)
 *
 * Usage: pnpm tsx scripts/audit-explanation-vs-answer.ts [--report]
 *
 * Note: this is a heuristic pass. A future AI pass (Gemini, the only AI use
 * approved for this task) can deepen coverage, but the heuristic catches the
 * known failure class without an API key.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

import { ALL_QUESTIONS } from "@/data/questions";
import {
  checkExplanationConsistency,
  type ConsistencyFinding,
} from "@/lib/questions/explanation-consistency";

function main(): void {
  const findings: ConsistencyFinding[] = [];
  for (const q of ALL_QUESTIONS) {
    findings.push(...checkExplanationConsistency(q));
  }

  const disputes = findings.filter((f) => f.kind === "dispute");
  const mismatches = findings.filter((f) => f.kind === "stated-mismatch");

  console.log(`Scanned ${ALL_QUESTIONS.length} questions.`);
  console.log(`  dispute        : ${disputes.length}`);
  console.log(`  stated-mismatch: ${mismatches.length}`);

  if (process.argv.includes("--report")) {
    const lines: string[] = [
      "# 解説 vs 公式正解 整合性監査 (2026-05-26)",
      "",
      `走査対象: ${ALL_QUESTIONS.length} 問`,
      `- dispute（解説が公式正解を否定／留保）: **${disputes.length}** 件`,
      `- stated-mismatch（解説が別の「正解は◯」を明言・要確認）: **${mismatches.length}** 件`,
      "",
      "## dispute（高確度・要修正）",
      "",
      ...(disputes.length === 0
        ? ["(なし)"]
        : disputes.map((f) => `- \`${f.id}\` — ${f.reason}`)),
      "",
      "## stated-mismatch（advisory・人手確認）",
      "",
      ...(mismatches.length === 0
        ? ["(なし)"]
        : mismatches.map((f) => `- \`${f.id}\` — ${f.reason}`)),
      "",
    ];
    mkdirSync("logs", { recursive: true });
    const out = join("logs", "explanation-answer-conflicts-2026-05-26.md");
    writeFileSync(out, lines.join("\n"), "utf8");
    console.log(`Report written: ${out}`);
  }

  // Non-zero exit if any high-confidence dispute remains (CI-friendly).
  if (disputes.length > 0) process.exitCode = 1;
}

main();
