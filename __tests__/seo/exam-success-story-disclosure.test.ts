import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const SOURCE = readFileSync(join(process.cwd(), "app", "[exam]", "page.tsx"), "utf8");
const DISCLOSURE = "実在の合格者の証言ではなく、学習上の判断例を示す架空ケースです。";

describe("試験ハブの架空学習ケース表示", () => {
  it("架空の注記を書籍欄ではなく学習ケース節内に表示する", () => {
    const booksStart = SOURCE.indexOf('<section aria-label="おすすめ書籍"');
    const casesStart = SOURCE.indexOf('<section aria-label="架空の学習ケース"');
    const disclosureAt = SOURCE.indexOf(DISCLOSURE);

    expect(booksStart).toBeGreaterThan(-1);
    expect(casesStart).toBeGreaterThan(booksStart);
    expect(disclosureAt).toBeGreaterThan(casesStart);
    expect(SOURCE.slice(booksStart, casesStart)).not.toContain(DISCLOSURE);
  });
});
