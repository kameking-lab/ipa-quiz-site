import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * 内部リンク切れの回帰ガード。
 *
 * 通知設定 UI（NotificationSettings）は実際には /settings に描画されるが、
 * 試験ハブページ（app/[exam]/page.tsx）が一時 /account/notifications（page.tsx
 * 不在＝404）へリンクしており、indexable ページからの内部リンク切れになっていた。
 * このルートが page.tsx を持たない限り、どの app 配下からもリンクしないことを保証する。
 */
const APP_DIR = join(process.cwd(), "app");

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (entry.endsWith(".tsx") || entry.endsWith(".ts")) out.push(full);
  }
  return out;
}

describe("no dead internal links to /account/notifications", () => {
  it("the /account/notifications route has no page.tsx (it lives at /settings)", () => {
    expect(existsSync(join(APP_DIR, "account/notifications/page.tsx"))).toBe(false);
    expect(existsSync(join(APP_DIR, "settings/page.tsx"))).toBe(true);
  });

  it("no app file links href to the non-existent /account/notifications route", () => {
    const offenders = walk(APP_DIR).filter((file) =>
      /href=["'`]\/account\/notifications/.test(readFileSync(file, "utf8")),
    );
    expect(offenders).toEqual([]);
  });
});

/**
 * 旗艦CTA（高度試験ハブの「AI論述添削で午後対策」）が単数形の試験インデックス
 * `/essay/<exam>` にリンクしていたが、その route には page.tsx が無く（実在するのは
 * `/essay/<exam>/<questionId>` と複数形 `/essays/<exam>` のみ）5区分すべてで 404 死リンク
 * ＝旗艦導線が壊れ内部404を量産していた。正しい入口は試験別午後AI採点 `/<exam>/afternoon`
 * とサンプル `/essays/<exam>`。この回帰ガードは「単数形 essay の試験インデックスへの
 * bare リンクを誰も張らない」ことを保証する（`/essay/<exam>/<qid>` 深リンクは許可）。
 */
describe("no dead internal links to the (non-existent) /essay/<exam> index", () => {
  it("the singular /essay/[exam] index route has no page.tsx", () => {
    expect(existsSync(join(APP_DIR, "essay/[exam]/page.tsx"))).toBe(false);
    // 実在する深リンク先と複数形インデックスは残っていること（誤検知の裏取り）。
    expect(existsSync(join(APP_DIR, "essay/[exam]/[questionId]/page.tsx"))).toBe(true);
    expect(existsSync(join(APP_DIR, "essays/[exam]/page.tsx"))).toBe(true);
  });

  it("no app file links to a bare /essay/<exam> index (deeper /essay/<exam>/<qid> is fine)", () => {
    // href に直接書かれた bare な単数形 essay 試験インデックスのみを検出する。
    // 末尾が ` または # ? " ' で閉じる＝後続パスが無い＝404 インデックスリンク。
    // `/essay/${x}/...` のような深リンクや、コメント中の言及は対象外。
    const bareEssayIndex =
      /href=\{?["'`]\/essay\/(?:\$\{[^}]+\}|[a-z]{2})(?:[#?][^"'`]*)?["'`]/;
    const offenders = walk(APP_DIR).filter((file) =>
      bareEssayIndex.test(readFileSync(file, "utf8")),
    );
    expect(offenders).toEqual([]);
  });
});
