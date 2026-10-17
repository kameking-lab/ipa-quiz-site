import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const source = readFileSync(join(process.cwd(), "app/[exam]/page.tsx"), "utf8");

describe("exam hub afternoon guidance", () => {
  it("sends visitors to the IPA source guide without advertising independent grading", () => {
    expect(source).toContain("IPA 公式の午後過去問を確認");
    expect(source).toContain("`/${code}/afternoon`");
    expect(source).not.toContain("AIで論述を添削");
  });
});
