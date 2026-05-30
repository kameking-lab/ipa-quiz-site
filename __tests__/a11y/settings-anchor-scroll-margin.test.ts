import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// /settings はページ上部に専用のセクション内ナビ（href="#appearance" 等の8リンク）を
// 持つが、各セクション見出し（SectionTitle の id 付き div）に scroll-margin が無いと、
// SiteHeader（sticky top-0・約64px）の下に見出しが隠れて着地する（アンカー跳躍の実害）。
// codebase 既定（about/transparency/admin の scroll-mt-20、/q の scrollMarginTop）に揃えて
// SectionTitle に scroll-mt-20 を付与した回帰を防ぐ（source-read ガード）。
describe("/settings セクションアンカー — sticky header 下に隠れない", () => {
  const source = readFileSync(
    join(process.cwd(), "app/settings/page.tsx"),
    "utf8",
  );

  it("SectionTitle の id 付き div が scroll-mt-20 を持つ", () => {
    // id={id} を載せる SectionTitle のコンテナ div が scroll-mt を持つこと
    expect(source).toMatch(/className="mb-3 flex scroll-mt-20 items-center gap-3" id=\{id\}/);
  });

  it("セクション内ナビの各リンク先 id が実在のセクションとして定義されている", () => {
    // SECTIONS の各 id（href="#${s.id}" のリンク先）が <SectionTitle id="..."> で実在すること
    const sectionIds = [
      "appearance",
      "character",
      "quiz-options",
      "notifications",
      "exam-schedule",
      "history",
      "cloud-sync",
      "api-keys",
    ];
    for (const id of sectionIds) {
      expect(source).toContain(`id="${id}"`);
    }
  });
});
