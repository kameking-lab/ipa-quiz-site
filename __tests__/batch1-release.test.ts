import { describe, it, expect } from "vitest";
import { auditBatch1 } from "@/scripts/audit-batch1";
import scope from "@/reports/int1b-20261104/release-scope.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getChoiceKeys } from "@/lib/questions/answers";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { shuffleChoices } from "@/lib/questions/filter";
import type { ExamCode } from "@/lib/questions/types";

describe("batch 1 complete public registry", () => {
  it("matches sync, lazy, practice, URL and native paper coverage", async () => {
    const report = await auditBatch1();
    expect(report.failures).toEqual([]);
    expect(scope.rows).toHaveLength(71);
    for (const row of scope.rows) {
      const actual = row.nativePapers.length
        ? report.pe.filter(paper => new Set<string>(row.nativePapers).has(paper.id)).reduce((sum, paper) => sum + paper.scored, 0)
        : row.codes.reduce((sum, code) => sum + Object.entries(report.rows.find(entry => entry.code === code)!.periodCounts)
          // This release includes R06 in addition to the original R08/R07 receipt.
          .filter(([period]) => code !== "yamaguchi-seika" || /^(2024|2025|2026)-/.test(period))
          .filter(([period]) => !row.session || period.endsWith(`/${row.session}`)).reduce((count, [, value]) => count + value, 0), 0);
      // 初回出荷の記録は保持し、今回の公開補充分を加算する。
      const additions: Record<string, number> = { "biru-kan": 180, "yamaguchi-seika": 66 };
      const replenished = row.codes.reduce((sum, code) => sum + (additions[code] ?? 0), 0);
      expect(actual, row.name).toBe(row.expected + replenished);
      for (const code of row.codes) {
        for (const question of (QUESTIONS_BY_EXAM[code as ExamCode] ?? []).filter(isPracticeReadyQuestion)) {
          if (question.type === "multiple-choice") expect(getChoiceKeys(question.choices).length, question.id).toBe(Object.keys(question.choices ?? {}).length);
          if (question.officialAnswerNumber !== undefined) expect(shuffleChoices(question), question.id).toBe(question);
          if (code.startsWith("keiryoshi")) expect(question.year).toBe(2025);
        }
      }
    }
    expect(report.rows.find(row => row.code === "energy-kanri")?.practiceCount).toBe(837);
  });
});
