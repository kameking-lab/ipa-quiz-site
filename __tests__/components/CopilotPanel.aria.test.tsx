import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// aria-controls は「実在する id」を指していなければ、SR 利用者にとって
// 関係性が壊れた dangling idref になる(WCAG 1.3.1 / ARIA 仕様)。
// CopilotPanel には actionsOpen ポップアップと quickActions リストの2つの
// disclosure があり、それぞれ aria-controls を持つ。過去にポップアップ側が
// id を欠き aria-controls="copilot-actions-popup" が dangling だった回帰を防ぐ。
describe("CopilotPanel — aria-controls の参照整合性", () => {
  const source = readFileSync(
    join(process.cwd(), "components/copilot/CopilotPanel.tsx"),
    "utf8",
  );

  const collect = (re: RegExp): string[] => {
    const out: string[] = [];
    let m: RegExpExecArray | null;
    while ((m = re.exec(source)) !== null) out.push(m[1]);
    return out;
  };

  it("全ての aria-controls が同ファイル内の id で解決できる", () => {
    const controls = collect(/aria-controls="([^"]+)"/g);
    const ids = new Set(collect(/\sid="([^"]+)"/g));

    expect(controls.length).toBeGreaterThan(0);
    for (const target of controls) {
      expect(ids.has(target), `aria-controls="${target}" の対象 id が存在しない`).toBe(
        true,
      );
    }
  });

  // アクションポップアップ(copilot-actions-popup)は aria-label="その他の操作" を
  // 持つが、role 無しの <div> では aria-label が SR にほぼ無視される(ARIA 仕様)。
  // role="group" を付けてラベルを有効化し、操作ボタン群の名前付き境界を SR に
  // 伝える。role を外すとラベルが再び dead markup に戻る回帰を防ぐ。
  // (role="menu" は矢印キー roving が前提だが未実装のため group が正しい粒度。)
  it("アクションポップアップが role=\"group\" でラベル付き境界になっている", () => {
    const popup = source.match(
      /<div\s+id="copilot-actions-popup"[\s\S]*?>/,
    )?.[0];
    expect(popup, "copilot-actions-popup の div が見つからない").toBeDefined();
    expect(popup).toContain('role="group"');
    expect(popup).toContain('aria-label="その他の操作"');
  });
});
