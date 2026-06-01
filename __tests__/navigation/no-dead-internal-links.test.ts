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

/**
 * ブログ本文（data/blog）の markdown リンクも同じ 404 を量産しうる。
 * 旗艦＝午後AI採点の「論述添削」CTA が markdown で `](/essay/pm)` のように単数形
 * 試験インデックスへ張られていたが、その route は実在せず（実在は `/essays/<exam>` と
 * `/essay/<exam>/<questionId>`）全て 404 だった。app/ だけを走査する上のガードでは
 * 検出できないため、ブログ本文も走査して bare な単数形 essay 索引リンクを禁止する。
 */
const DATA_BLOG_DIR = join(process.cwd(), "data", "blog");

describe("no dead /essay/<exam> markdown links in blog content", () => {
  // markdown 形式 `](/essay/pm)` または `](/essay/pm#anchor)` のみ検出。
  // 深リンク `](/essay/pm/q1)` と 複数形 `](/essays/pm)`、bare `](/essay)` は対象外。
  const bareEssayMd = /\]\(\/essay\/[a-z]{2}(?:#[^)]*)?\)/;

  it("no blog body links to a bare /essay/<exam> index", () => {
    const offenders = walk(DATA_BLOG_DIR).filter((file) =>
      bareEssayMd.test(readFileSync(file, "utf8")),
    );
    expect(offenders).toEqual([]);
  });

  it("the regex actually catches the old broken pattern (non-vacuous)", () => {
    expect(bareEssayMd.test("[PM 論述添削](/essay/pm)")).toBe(true);
    expect(bareEssayMd.test("[サンプル](/essay/pm#sample-answers)")).toBe(true);
    // 正しい行先・深リンク・bare はマッチしないこと。
    expect(bareEssayMd.test("[PM 論述添削](/essays/pm)")).toBe(false);
    expect(bareEssayMd.test("[設問](/essay/pm/q1)")).toBe(false);
    expect(bareEssayMd.test("[論述添削](/essay)")).toBe(false);
  });
});
