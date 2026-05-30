import { describe, it, expect } from "vitest";
import {
  getRecommendedPath,
  ATTRIBUTE_OPTIONS,
} from "@/lib/onboarding/recommended-paths";
import type { UserAttribute } from "@/lib/onboarding/types";

// recommended-paths.ts はオンボーディングの属性別おすすめ学習パス（初学者/経験者/直前期）を
// 返す純関数。各ステップの href がオンボーディング導線の遷移先になるため、exam 補間や
// ルートのタイポは導線切れ（404）に直結する。崩れたら落ちる契約として現挙動を回帰固定する。

const ATTRS: UserAttribute[] = ["beginner", "experienced", "last-minute"];

describe("getRecommendedPath", () => {
  it("選んだ属性をそのまま返し、3属性で異なるタイトルになる", () => {
    const titles = new Set(ATTRS.map((a) => getRecommendedPath(a, "ap").title));
    expect(titles.size).toBe(3);
    for (const a of ATTRS) {
      expect(getRecommendedPath(a, "ap").attribute).toBe(a);
    }
  });

  it("各属性は4ステップ・全ステップが必須フィールドを満たす", () => {
    for (const a of ATTRS) {
      const path = getRecommendedPath(a, "fe");
      expect(path.steps).toHaveLength(4);
      for (const step of path.steps) {
        expect(step.href.startsWith("/")).toBe(true);
        expect(step.label.length).toBeGreaterThan(0);
        expect(step.description.length).toBeGreaterThan(0);
        expect(step.estMin).toBeGreaterThan(0);
      }
    }
  });

  it("exam コードを href とラベルへ正しく補間する", () => {
    const beginner = getRecommendedPath("beginner", "sg");
    expect(beginner.steps[0].href).toBe(
      "/quiz?mode=random&exam=sg&limit=3",
    );
    expect(beginner.steps[2].href).toBe("/sg");
    expect(beginner.steps[2].label).toContain("SG");

    const experienced = getRecommendedPath("experienced", "ap");
    expect(experienced.steps[0].href).toBe("/mock-exam?exam=ap");
    expect(experienced.steps[2].href).toBe("/quiz?mode=review&exam=ap");

    const lastMinute = getRecommendedPath("last-minute", "ip");
    expect(lastMinute.steps[0].href).toBe("/mock-exam?exam=ip&full=true");
  });

  it("既知 attribute 以外は last-minute（フォールバック）相当の構成", () => {
    // 型外の値でもフォールバック分岐が安定して4ステップを返すことを固定
    const path = getRecommendedPath(
      "unknown" as UserAttribute,
      "ap",
    );
    expect(path.steps).toHaveLength(4);
    expect(path.title).toContain("直前期");
  });
});

describe("ATTRIBUTE_OPTIONS", () => {
  it("3属性をラベル/blurb 付きで網羅する", () => {
    expect(ATTRIBUTE_OPTIONS.map((o) => o.value)).toEqual(ATTRS);
    for (const o of ATTRIBUTE_OPTIONS) {
      expect(o.label.length).toBeGreaterThan(0);
      expect(o.blurb.length).toBeGreaterThan(0);
    }
  });
});
