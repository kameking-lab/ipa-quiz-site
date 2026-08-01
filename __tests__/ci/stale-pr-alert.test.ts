import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// 209 ファイル規模の PR が 58 日オープンのまま本番へ出ていない、という滞留が
// 実際に起きた。気づく仕組みそのものが消える・退化することを防ぐ。

const WORKFLOW = join(process.cwd(), ".github/workflows/stale-pr-alert.yml");

describe("長期滞留 PR の週次チェック", () => {
  const src = readFileSync(WORKFLOW, "utf8");

  it("定期実行される（手動起動だけでは気づく仕組みにならない）", () => {
    expect(src).toMatch(/schedule:/);
    expect(src).toMatch(/cron:\s*"0 0 \* \* 1"/);
  });

  it("Slack が未設定でも Issue で気づける（通知先が無いと黙って無効化される）", () => {
    expect(src).toMatch(/SLACK_WEBHOOK_URL != ''/);
    expect(src).toMatch(/SLACK_WEBHOOK_URL == ''/);
    expect(src).toMatch(/gh issue create/);
    expect(src).toMatch(/gh issue edit/);
  });

  it("滞留が解消したら Issue を閉じる（消えない通知は無視されるようになる）", () => {
    expect(src).toMatch(/gh issue close/);
  });

  it("PR タイトルをシェルへ式展開しない（タイトル経由の注入を防ぐ）", () => {
    // 本文はファイル経由で受け渡す。${{ }} は式展開がシェル実行前のテキスト
    // 置換なので、タイトルにヒアドキュメントの終端子を仕込まれると脱出できる。
    expect(src).not.toMatch(/\$\{\{\s*steps\.collect\.outputs\.body/);
    expect(src).toMatch(/stale-body\.md/);
  });

  it("Issue に必要な権限だけを与える", () => {
    expect(src).toMatch(/issues:\s*write/);
    expect(src).toMatch(/contents:\s*read/);
  });
});
