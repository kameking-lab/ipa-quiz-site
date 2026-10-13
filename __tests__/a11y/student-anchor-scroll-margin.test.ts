import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("/student free learning path", () => {
  const source = readFileSync(join(process.cwd(), "app/student/page.tsx"), "utf8");

  it("offers a named qualification search link without a defunct application anchor", () => {
    expect(source).toMatch(/<Link href="\/">\s*資格を探す\s*<\/Link>/);
    expect(source).not.toContain('href="#apply"');
    expect(source).not.toContain('id="apply"');
    expect(source).not.toContain("StudentIdUpload");
  });

  it("keeps the decorative icon out of the link's accessible name", () => {
    expect(source).toMatch(/<GraduationCap\s+aria-hidden="true"/);
    expect(source).toContain("学生証の提出や学割の申請も不要");
  });
});
