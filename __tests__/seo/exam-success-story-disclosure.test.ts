import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const SOURCE = readFileSync(join(process.cwd(), "app", "[exam]", "page.tsx"), "utf8");

describe("exam hubs after fictional story retirement", () => {
  it("keeps official resources and books without fictional case links or generated personas", () => {
    expect(SOURCE).toContain("<ExamOfficialResources");
    expect(SOURCE).toContain('<section aria-label="おすすめ書籍"');
    expect(readFileSync("app/account/page.tsx", "utf8")).not.toContain("パーセンタイル");
    expect(SOURCE).not.toContain("success-stories");
    expect(SOURCE).not.toContain("successStories");
    expect(SOURCE).not.toContain("架空の学習ケース");
  });
});
