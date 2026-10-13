import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("Public tables and retired essay demo", () => {
  it("keeps column associations for the public keyword statistics table", () => {
    const source = readFileSync(join(process.cwd(), "app/stats/page.tsx"), "utf8");
    expect(source.match(/<th scope="col"/g) ?? []).toHaveLength(3);
  });

  it("routes the withdrawn original grading demo to official papers", () => {
    const source = readFileSync(join(process.cwd(), "app/demo/essay-grading/page.tsx"), "utf8");
    expect(source).toContain('redirect("/essay")');
    expect(source).not.toContain("<table");
    expect(source).not.toContain("EssayEditor");
  });
});
