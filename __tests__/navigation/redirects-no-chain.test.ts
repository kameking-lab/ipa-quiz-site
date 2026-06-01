import { describe, expect, it } from "vitest";

import nextConfig from "../../next.config";

/**
 * next.config の 301 リダイレクト回帰ガード。
 *
 * 削除済みページの 404 を掃除するため redirects() に 301 を足していくが、
 * リダイレクト先がさらに別のリダイレクト元だと「301 → 301 → …」の連鎖になり
 * クロール資産を無駄に消費する（最悪ループ）。各 destination のパス部が
 * いずれの source とも一致しないことを保証し、連鎖・自己ループを禁止する。
 *
 * あわせて、明示的に掃除した代表ルートが意図どおりの行先を持つことも固定する
 * （削除されたら落ちる）。
 */
describe("next.config redirects", () => {
  it("has no chained or self-referential redirects", async () => {
    const redirects = await nextConfig.redirects!();

    for (const r of redirects) {
      // destination のパス部とクエリキーを取り出す
      const [destPath, destQuery = ""] = r.destination.split("#")[0].split("?");
      const destKeys = new Set(
        destQuery
          .split("&")
          .filter(Boolean)
          .map((kv) => kv.split("=")[0]),
      );

      // 同じパスを source に持つリダイレクトが、この destination のクエリ状態で
      // 実際に発火するか（= 連鎖するか）を判定する。
      const wouldChain = redirects.some((s) => {
        if (s.source !== destPath) return false;
        // `missing` クエリ条件: 指定キーが dest に存在すれば source は発火しない
        const missing = (s.missing ?? []).filter((m) => m.type === "query");
        if (missing.some((m) => m.key && destKeys.has(m.key))) return false;
        // `has` クエリ条件: 指定キーが dest に無ければ source は発火しない
        const has = (s.has ?? []).filter((h) => h.type === "query");
        if (has.some((h) => h.key && !destKeys.has(h.key))) return false;
        return true;
      });

      expect(
        wouldChain,
        `redirect "${r.source}" → "${r.destination}" の行先が別のリダイレクト元として発火し連鎖する`,
      ).toBe(false);
    }
  });

  it("301s the retired /testimonials to /success-stories", async () => {
    const redirects = await nextConfig.redirects!();
    const entry = redirects.find((r) => r.source === "/testimonials");
    expect(entry).toBeDefined();
    expect(entry!.destination).toBe("/success-stories");
    expect(entry!.permanent).toBe(true);
  });
});
