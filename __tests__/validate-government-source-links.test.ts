// @vitest-environment node
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const roots: string[] = [];

function validate(records?: Record<string, unknown>) {
  let root = process.cwd();
  if (records) {
    root = mkdtempSync(join(tmpdir(), "government-links-test-"));
    roots.push(root);
    mkdirSync(join(root, "scripts"), { recursive: true });
    mkdirSync(join(root, "data", "exam-library"), { recursive: true });
    copyFileSync(join(process.cwd(), "scripts", "validate-government-source-links.mjs"),
      join(root, "scripts", "validate-government-source-links.mjs"));
    writeFileSync(join(root, "data", "exam-library", "explanations.json"), JSON.stringify(records));
  }
  const result = spawnSync(process.execPath,
    [join(root, "scripts", "validate-government-source-links.mjs"), "--skip-live"], { encoding: "utf8" });
  return { status: result.status, report: JSON.parse(result.stdout) };
}

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe("government source URL audit", () => {
  it("rejects malformed URLs in prose and structured sources instead of silently ignoring or repairing them", () => {
    const result = validate({
      descriptive: "参考 https:/laws.e-gov.go.jp/law/347AC0000000057",
      structured: {
        summary: "参照 https:www.mhlw.go.jp/example",
        choices: [{ reason: "参照 http://www.mhlw.go.jp/example" }],
        sources: [{ url: "https:///www.mhlw.go.jp/example" }],
      },
    });
    expect(result.status).toBe(1);
    expect(result.report.references).toBe(4);
    expect(result.report.errors).toHaveLength(4);
  });

  it("audits every published and draft explanation without malformed or non-government links", () => {
    const result = validate();
    expect(result.status).toBe(0);
    expect(result.report.ok).toBe(true);
    expect(result.report.references).toBeGreaterThan(0);
  });
});
