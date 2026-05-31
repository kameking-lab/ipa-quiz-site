import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// /settings の保存トースト（設定トグル操作時の「保存しました」等）は role="status"
// aria-live="polite" の live region を持つが、以前は {toast && (<div role="status" …>)}
// と「文言が出るときに region 自体も初めて DOM 挿入される」条件付きマウントだった。
// この形だと SR は live region の変化を捕捉できず読み上げが不確実になる
// （S7 で EmailLeadCapture に対して同型を修正済の WCAG 4.1.3 Status Messages 違反）。
// region を常設し中身（toast 文言）だけ出し入れする gold-standard（ShareButtons 慣用）へ
// 是正した回帰を防ぐ。条件付きマウントへ戻すと本テストが落ちる（崩れたら落ちる検証）。
describe("/settings 保存トースト — 常設 live region で確実に通知される", () => {
  const source = readFileSync(
    join(process.cwd(), "app/settings/page.tsx"),
    "utf8",
  );

  it("role=status / aria-live=polite の live region が存在する", () => {
    expect(source).toContain('role="status"');
    expect(source).toContain('aria-live="polite"');
  });

  it("live region が toast 条件（{toast &&）の外（前）に常設されている", () => {
    const statusIdx = source.indexOf('role="status"');
    const toastGateIdx = source.indexOf("{toast &&");
    expect(statusIdx).toBeGreaterThan(-1);
    expect(toastGateIdx).toBeGreaterThan(-1);
    // 常設 region が条件付き分岐より前に置かれていること（region 自体は常にマウント）。
    expect(statusIdx).toBeLessThan(toastGateIdx);
  });
});
