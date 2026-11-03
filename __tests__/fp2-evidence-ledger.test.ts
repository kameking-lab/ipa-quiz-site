import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("FP2 evidence ledger", () => {
  it("matches the published academic and practical corpus", () => {
    const ledger = read("docs/QUALIFICATION_EXPANSION_LEDGER.md");
    const status = read("docs/evidence/fp2-two-year/STATUS.md");
    const evidence = read("docs/evidence/QUALIFICATION_SOURCE_EVIDENCE.md");

    expect(ledger).toContain("学科300問＋実技200問");
    expect(ledger).not.toContain("| 金融 | FP2級 | 日本FP協会 | 出典明記・加工明記で申請不要 | 取込可能 | 0問 |");
    expect(status).toContain("全240問をクイズ画面へ公開");
    expect(status).not.toContain("まだクイズ画面には追加していない");
    expect(evidence).toContain("## 2級ファイナンシャル・プランニング技能検定");
    expect(evidence).toContain("https://www.jafp.or.jp/exam/mohan/files/exam_riyou.pdf");
    expect(evidence).toContain("問1〜10は既存パイロット");
  });

  it("stores completed model receipts without overstating the audited range", () => {
    const receipt = JSON.parse(read("docs/evidence/fp2-coverage-audit-20260926.json"));

    expect(receipt.claudeIndependentReview).toMatchObject({
      requestedModel: "claude-opus-5-5",
      resolvedModel: "claude-opus-5-5",
      provider: "firstParty",
      terminalReason: "completed",
    });
    expect(receipt.claudeIndependentReview.outputTokens).toBeGreaterThan(0);
    expect(receipt.antigravityIndependentReview.status).toBe("SUCCESS");
    expect(receipt.antigravityIndependentReview.totalTokens).toBeGreaterThan(0);
    expect(receipt.antigravityIndependentReview.remainingScopeNote).toContain("Q1-Q10");
  });
});
