import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// /settings の各トグルは Radix <Switch>（中身のない <button role="switch">）で、
// インラインの aria-label を持たない。アクセシブルネームは SettingRow が
// 可視ラベル <p id={labelId}> を cloneElement で aria-labelledby に注入することだけで
// 成立する（WCAG 4.1.2 Name, Role, Value）。この配線が外れると 7 個の Switch が
// 全て「名前なし」になり SR 利用者が用途を把握できないが、現状これを守るテストが無い。
// NotificationSettings(インライン aria-label) は別テストでガード済だが、SettingRow 経由の
// settings ページ群は未ガードのため、配線契約を source-read で固定する（崩れたら落ちる）。
describe("/settings Switch — SettingRow 経由のアクセシブルネーム配線", () => {
  const source = readFileSync(
    join(process.cwd(), "app/settings/page.tsx"),
    "utf8",
  );

  it("SettingRow が useId で生成した labelId を可視ラベル <p> の id に載せる", () => {
    expect(source).toMatch(/const labelId = useId\(\)/);
    expect(source).toMatch(/<p id=\{labelId\}/);
  });

  it("SettingRow が子要素(Switch)へ aria-labelledby={labelId} を cloneElement で注入する", () => {
    // 配線の要：この cloneElement が外れると settings ページの全 Switch が無名になる。
    expect(source).toMatch(
      /cloneElement\(\s*children\s*,\s*\{\s*"aria-labelledby":\s*labelId\s*\}\s*\)/,
    );
  });

  it("settings ページの各 Switch はインライン aria-label を持たない（SettingRow に依存）", () => {
    // インライン aria-label を持つ Switch が現れたら、この前提（SettingRow 依存）が崩れる合図。
    // 各 <Switch 開始位置から十分なウィンドウ（タグ全体を覆う 200 字）を切り出し、
    // タグ内に aria-label が無いことを確認する。<Switch> は onCheckedChange の `=>` を含むため
    // `[^>]` ベースの正規表現は使わず、固定長ウィンドウで判定する。
    // `<Switch` の後に空白が続く実際の JSX 開始タグのみを対象にする
    // （コメント中の `<Switch>` は `>` が続くため除外される）。
    const segments = source
      .split("<Switch")
      .slice(1)
      .filter((seg) => /^\s/.test(seg));
    expect(segments.length).toBeGreaterThanOrEqual(7);
    for (const seg of segments) {
      // タグの末尾 "/>" までを切り出す（self-closing。属性内に "/>" は出現しない）。
      const tagBody = seg.slice(0, seg.indexOf("/>"));
      // "aria-label=" を検査（"aria-labelledby" を誤検出しないよう "=" まで含める）。
      expect(tagBody).not.toContain("aria-label=");
    }
  });
});
