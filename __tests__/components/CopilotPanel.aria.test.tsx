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
});
