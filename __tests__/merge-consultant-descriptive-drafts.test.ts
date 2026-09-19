// @vitest-environment node
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const roots: string[] = [];
const questionId = "cskohyo-CS20211910-q1";

function runFixture(text: string) {
  const root = mkdtempSync(join(tmpdir(), "consultant-descriptive-merge-test-"));
  roots.push(root);
  const data = join(root, "data", "exam-library");
  mkdirSync(join(root, "scripts"), { recursive: true });
  mkdirSync(join(data, "papers"), { recursive: true });
  mkdirSync(join(data, "explanation-drafts"), { recursive: true });
  copyFileSync(
    join(process.cwd(), "scripts", "merge-consultant-descriptive-drafts.mjs"),
    join(root, "scripts", "merge-consultant-descriptive-drafts.mjs"),
  );
  writeFileSync(join(data, "papers", "fixture.json"), JSON.stringify([{
    id: questionId,
    answerAuthority: "descriptive",
  }]));
  writeFileSync(join(data, "explanation-drafts", "fixture.json"), JSON.stringify({ [questionId]: text }));
  writeFileSync(join(data, "explanations.json"), JSON.stringify({ preserved: "既存の公開済み解説" }));

  const result = spawnSync(
    process.execPath,
    [join(root, "scripts", "merge-consultant-descriptive-drafts.mjs"), "--write"],
    { encoding: "utf8" },
  );
  return {
    status: result.status,
    report: JSON.parse(result.stdout),
    output: JSON.parse(readFileSync(join(data, "explanations.json"), "utf8")),
  };
}

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe("consultant descriptive draft publication gate", () => {
  it("rejects a substantial draft that has no government-primary-source link", () => {
    const text = "模範解答として必要な判断手順、計算過程、結論を具体的に説明します。".repeat(6);
    const result = runFixture(text);

    expect(result.status).toBe(1);
    expect(result.report.ok).toBe(false);
    expect(result.report.errors).toContain(
      `fixture.json/${questionId}: 政府一次資料への根拠リンクがありません`,
    );
    expect(result.output).toEqual({ preserved: "既存の公開済み解説" });
  });
});
