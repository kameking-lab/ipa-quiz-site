import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("フッター SNS リンク", () => {
  const source = readFileSync(join(process.cwd(), "app/layout.tsx"), "utf8");

  it("凍結したXアカウントへのリンクやメタ情報を表示しない", () => {
    expect(source).not.toContain("kakomon_ai_jp");
    expect(source).not.toMatch(/https:\/\/(?:x|twitter)\.com\//);
  });

  it("廃止したnoteの記事導線を表示しない", () => {
    expect(source).not.toContain("TrackedNoteLink");
    expect(source).not.toContain("NOTE_PROFILE_URL");
  });
});
