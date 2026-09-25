import { describe, expect, it } from "vitest";

import { FP3_QUESTIONS } from "@/data/questions/fp3";
import ledger from "@/docs/evidence/fp3-2026-may/acceptance-ledger.json";
import manifest from "@/docs/evidence/fp3-2026-may/manifest.json";
import practical2026 from "@/data/questions/fp3/practical-2026-05.json";

describe("FP3 2026 May complete verified sets", () => {
  it("publishes all official academic and practical questions with individual option reasons", () => {
    const rows = FP3_QUESTIONS.filter((question) => question.year === 2026);
    expect(rows.map((question) => question.qNumber)).toEqual(Array.from({ length: 60 }, (_, index) => index + 1));
    expect(ledger.acceptedAcademic).toBe(60);
    expect(ledger.acceptedPractical).toBe(20);
    expect(ledger.rows).toHaveLength(80);
    for (const [index, question] of rows.entries()) {
      expect(question.answer).toBe(ledger.rows[index]?.officialAnswer);
      expect(ledger.rows[index]?.status).toBe("accepted");
      expect(ledger.rows[index]?.sourcePdfSha256).toBe(manifest.files.gakka.sha256);
      expect(Object.keys(question.choiceExplanations ?? {}).sort()).toEqual(index < 30 ? ["ア", "イ"] : ["ア", "イ", "ウ"]);
      expect(question.lawReferenceDate).toBe("2025-04-01");
      expect(question.needsReview).toBe(false);
      expect(question.sourcePdfUrl).toBe(manifest.files.gakka.url);
    }
    for (const row of ledger.rows.slice(60)) {
      expect(row.status).toBe("accepted");
      expect(row.sourcePdfSha256).toBe(manifest.files.jitsugiQuestion.sha256);
      expect(row.sourceAnswerPdfSha256).toBe(manifest.files.jitsugiAnswer.sha256);
    }
    expect(ledger.rows.filter((row) => row.resolutionReceipt).map((row) => `${row.section}-${row.number}`).sort())
      .toEqual(["gakka-20", "gakka-35", "jitsugi-2"]);
    const cashFlow = practical2026["202605"].questions[1];
    expect(cashFlow.stem).toContain("キャッシュフロー表は下の原典画像に掲載");
    expect(cashFlow.stem).toContain("※変動率が記載されている各項目");
    expect(cashFlow.stem).not.toContain("給与収入(本人) 1%");
    expect(cashFlow.panels[0]?.url).toBe("/fp3/practical/202605/q02-table.webp");
  });
});
