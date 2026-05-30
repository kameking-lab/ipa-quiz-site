import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// /student の「学割を申請する」リンク（href="#apply"）が跳躍する申請フォーム Card に
// scroll-margin が無いと、SiteHeader（sticky top-0・約64px）の下にカード見出しが
// 隠れて着地する（アンカー跳躍の実害）。codebase 既定の scroll-mt-20 を付与した
// 回帰を防ぐ（source-read ガード）。
describe("/student 学割申請アンカー — sticky header 下に隠れない", () => {
  const source = readFileSync(
    join(process.cwd(), "app/student/page.tsx"),
    "utf8",
  );

  it("href=\"#apply\" のリンク先 Card が scroll-mt-20 を持つ", () => {
    // 跳躍リンクが存在すること
    expect(source).toContain('href="#apply"');
    // リンク先の Card(id="apply") が scroll-mt-20 を持つこと
    expect(source).toMatch(/id="apply" className="[^"]*scroll-mt-20[^"]*"/);
  });
});
