import { describe, expect, it } from "vitest";

import { FP3_QUESTIONS } from "@/data/questions/fp3";
import ledger from "@/docs/evidence/fp3-2026-may/acceptance-ledger.json";
import manifest from "@/docs/evidence/fp3-2026-may/manifest.json";

describe("FP3 2026 May first verified batch", () => {
  it("publishes only official academic Q1–10 with individual option reasons", () => {
    const rows = FP3_QUESTIONS.filter((question) => question.year === 2026);
    expect(rows.map((question) => question.qNumber)).toEqual(Array.from({ length: 10 }, (_, index) => index + 1));
    expect(ledger.acceptedAcademic).toBe(10);
    expect(ledger.acceptedPractical).toBe(0);
    expect(ledger.rows).toHaveLength(10);
    for (const [index, question] of rows.entries()) {
      expect(question.answer).toBe(ledger.rows[index]?.officialAnswer);
      expect(ledger.rows[index]?.status).toBe("accepted");
      expect(ledger.rows[index]?.sourcePdfSha256).toBe(manifest.files.gakka.sha256);
      expect(Object.keys(question.choiceExplanations ?? {}).sort()).toEqual(["ア", "イ"]);
      expect(question.lawReferenceDate).toBe("2025-04-01");
      expect(question.needsReview).toBe(false);
      expect(question.sourcePdfUrl).toBe(manifest.files.gakka.url);
    }
  });
});
