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
