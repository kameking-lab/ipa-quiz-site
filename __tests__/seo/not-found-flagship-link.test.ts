import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("404 recovery through genuine official papers", () => {
  const source = readFileSync(join(process.cwd(), "app/not-found.tsx"), "utf8");

  it("links to the official papers hub", () => {
    expect(source).toContain('href="/essay"');
  });

  it("describes the material without offering unavailable grading", () => {
    expect(source).toMatch(/IPA[^\n]*公式[^\n]*過去問/);
    expect(source).not.toContain("午後論述のAI採点");
    expect(source).not.toContain('href="/essays');
  });
});
