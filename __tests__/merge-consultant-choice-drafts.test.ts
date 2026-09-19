// @vitest-environment node
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const roots: string[] = [];
const paperId = "cskohyo-CS20211901";
const id = `${paperId}-q1`;
const question = { id, text: "問1 誤っているものはどれか。", choiceCount: 5, correctChoice: 3, answerAuthority: "official" };
const valid = {
  sourceHash: createHash("sha256").update(question.text).digest("hex"),
  correctChoice: 3,
  summary: "各選択肢の記述を判断し、誤っている記述を正答として選びます。",
  choices: [1, 2, 3, 4, 5].map((number) => ({
    number,
    verdict: number === 3 ? "correct" : "incorrect",
    reason: `選択肢${number}について、記述された具体的な条件と根拠規定を照合して、この問題における判定理由を説明します。`,
  })),
  sources: [{ title: "労働安全衛生法", url: "https://laws.e-gov.go.jp/law/347AC0000000057" }],
};

function runFixture(draft: unknown, existing: unknown = {}) {
  const root = mkdtempSync(join(tmpdir(), "consultant-choice-merge-test-"));
  roots.push(root);
  const data = join(root, "data", "exam-library");
  mkdirSync(join(root, "scripts"), { recursive: true });
  mkdirSync(join(data, "papers"), { recursive: true });
  mkdirSync(join(data, "choice-explanation-drafts"), { recursive: true });
  copyFileSync(join(process.cwd(), "scripts", "merge-consultant-choice-drafts.mjs"), join(root, "scripts", "merge-consultant-choice-drafts.mjs"));
  writeFileSync(join(data, "papers", `${paperId}.json`), JSON.stringify([question]));
  writeFileSync(join(data, "choice-explanation-drafts", "fixture.json"), JSON.stringify(draft));
  writeFileSync(join(data, "choice-explanations.json"), JSON.stringify(existing));
  writeFileSync(join(data, "coverage-contract.json"), JSON.stringify({ structuredChoiceExplanations: { requiredPaperIds: [] } }));
  const result = spawnSync(process.execPath, [join(root, "scripts", "merge-consultant-choice-drafts.mjs"), "--write"], { encoding: "utf8" });
  return {
    status: result.status,
    report: JSON.parse(result.stdout),
    output: JSON.parse(readFileSync(join(data, "choice-explanations.json"), "utf8")),
    contract: JSON.parse(readFileSync(join(data, "coverage-contract.json"), "utf8")),
  };
}

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe("consultant choice draft publication gate", () => {
  it("publishes a verified complete paper and requires its coverage", () => {
    const result = runFixture({ [id]: valid });
    expect(result.status).toBe(0);
    expect(result.output[id]).toEqual(valid);
    expect(result.contract.structuredChoiceExplanations.requiredPaperIds).toEqual([paperId]);
  });

  it("rejects duplicate evidence without changing the publication or contract", () => {
    const result = runFixture({ [id]: { ...valid, sources: [valid.sources[0], valid.sources[0]] } });
    expect(result.status).toBe(1);
    expect(result.report.accepted).toBe(0);
    expect(result.report.completedPapers).toEqual([]);
    expect(result.report.errors.join(" ")).toContain("URLが重複");
    expect(result.output).toEqual({});
    expect(result.contract.structuredChoiceExplanations.requiredPaperIds).toEqual([]);
  });

  it("does not promote an unreviewed existing overlay solely because its ID exists", () => {
    const result = runFixture({}, { [id]: { ...valid, sourceHash: "0".repeat(64) } });
    expect(result.report.completedPapers).toEqual([]);
    expect(result.contract.structuredChoiceExplanations.requiredPaperIds).toEqual([]);
  });

  it.each([
    { ...valid, sources: [{ title: "裸のドメイン", url: "https://go.jp/" }] },
    { ...valid, sources: [{ title: "空白付き", url: " https://www.mhlw.go.jp/example" }] },
    { ...valid, summary: "根拠は[外部資料](https://example.com/unsafe)にあります。" },
    {
      ...valid,
      choices: valid.choices.map((choice) => choice.number === 1
        ? { ...choice, reason: `${choice.reason} https://example.com/unsafe` }
        : choice),
    },
  ])("rejects sources or embedded links the runtime loader would reject", (candidate) => {
    const result = runFixture({ [id]: candidate });
    expect(result.status).toBe(1);
    expect(result.report.accepted).toBe(0);
    expect(result.output).toEqual({});
  });
});
