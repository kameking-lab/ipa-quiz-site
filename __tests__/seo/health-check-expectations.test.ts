import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
  ALL_REQUIRED_200_ROUTES,
  GONE_410_ROUTES,
  INTENTIONAL_404_ROUTES,
  expectedRouteStatuses,
} from "@/lib/seo/expected-routes";

// 日次ヘルスチェックが「恒久削除ルートは 404 のはず」と見続けていたため、
// 実装が 410 Gone を返すようになったあとも毎回 2 件の不一致を出し、cron が
// 常時 503 を返していた。常に失敗する監視は本物の障害と区別がつかず、
// Slack を設定した瞬間に毎日の誤警報になる。期待値と実装を固定する。

describe("ヘルスチェックの期待ステータス", () => {
  it("恒久削除ルート（/pricing・/commerce）は 410 を期待する", () => {
    const statuses = expectedRouteStatuses();
    for (const path of GONE_410_ROUTES) {
      const entry = statuses.find((s) => s.path === path);
      expect(entry, `${path} が監視対象に含まれていない`).toBeDefined();
      expect(entry?.expected, `${path} は 410 Gone を返す`).toBe(410);
    }
  });

  it("純・意図的 404（/tokutei・/checkout）は 404 を期待する", () => {
    const statuses = expectedRouteStatuses();
    for (const path of INTENTIONAL_404_ROUTES) {
      expect(statuses.find((s) => s.path === path)?.expected).toBe(404);
    }
  });

  it("410 と 404 を同じ集合に混ぜない（混ぜると片方が必ず不一致になる）", () => {
    const gone = new Set<string>(GONE_410_ROUTES);
    for (const path of INTENTIONAL_404_ROUTES) {
      expect(gone.has(path)).toBe(false);
    }
  });

  it("主要ページは 200 を期待し、削除ルートは 200 集合に混ざらない", () => {
    expect(ALL_REQUIRED_200_ROUTES).toContain("/");
    expect(ALL_REQUIRED_200_ROUTES).toContain("/ap");
    for (const path of [...GONE_410_ROUTES, ...INTENTIONAL_404_ROUTES]) {
      expect(ALL_REQUIRED_200_ROUTES).not.toContain(path);
    }
  });

  it("監視対象は重複しない（同じパスを二重に叩かない）", () => {
    const paths = expectedRouteStatuses().map((s) => s.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("cron ルートは期待値を自前で持たず、共有定義から引く", () => {
    // ルート側に 404/410 をベタ書きし直すと、また実装とズレて常時失敗に戻る。
    const src = readFileSync(
      join(process.cwd(), "app/api/cron/health-check/route.ts"),
      "utf8",
    );
    expect(src).toMatch(/expectedRouteStatuses/);
    expect(src).not.toMatch(/EXPECTED_404_ROUTES\s*=/);
  });

  it("E2E スモークの 410/404 の分類と食い違わない", () => {
    // 監視（cron）と検証（E2E）が別々の真実を持つと、片方だけ直って
    // もう片方が誤警報を出し続ける。
    const spec = readFileSync(
      join(process.cwd(), "tests/e2e/smoke-routes.spec.ts"),
      "utf8",
    );
    for (const path of GONE_410_ROUTES) {
      expect(spec).toContain(`"${path}"`);
    }
    expect(spec).toMatch(/GONE_410_ROUTES\s*=\s*\["\/pricing",\s*"\/commerce"\]/);
  });
});
