import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("CopilotPanel のアクセシビリティ", () => {
  const source = readFileSync(
    join(process.cwd(), "components/copilot/CopilotPanel.tsx"),
    "utf8",
  );

  // メッセージ表示領域は AI 応答が逐次追加されるストリーミング transcript で、
  // role 無しの <div> では aria-label が SR にほぼ無視される(ARIA 仕様)。隣接する
  // 可視テキストでこの領域を命名しているものは無いため、ラベルが落ちると領域名が
  // 失われる。chat ログの正準ロール role="log"(暗黙 aria-live=polite と一致)を付け
  // ラベルを有効化する。role を外すとラベルが再び dead markup に戻る回帰を防ぐ。
  it("メッセージ領域が role=\"log\" でラベル付きライブリージョンになっている", () => {
    const region = source.match(
      /<div\s+ref=\{scrollRef\}[\s\S]*?>/,
    )?.[0];
    expect(region, "scrollRef のメッセージ領域 div が見つからない").toBeDefined();
    expect(region).toContain('role="log"');
    expect(region).toContain('aria-live="polite"');
    expect(region).toContain('aria-label="AI コパイロットの応答"');
  });
});
