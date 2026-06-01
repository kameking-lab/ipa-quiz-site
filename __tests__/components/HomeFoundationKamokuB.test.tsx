import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { HomeFoundationKamokuB } from "@/components/home/HomeFoundationKamokuB";
import { getBlogPostBySlug } from "@/data/blog";

// 土台＝基本情報 科目B（アルゴリズム・擬似言語）への導線をホーム高オーソリティ面に
// SSR 出力する。旗艦 HomeFlagshipEssay と対称の「一目で分かる」入口で、トップページ
// から土台ピラーへのクローラブル内部リンクにもなる。リンク先が存在しないと新規404に
// なるため、ホームの href と土台ピラーの blog slug の整合を「崩れたら落ちる」形で pin。
const FOUNDATION_PILLAR_SLUG = "fe-kamoku-b-taisaku";

describe("HomeFoundationKamokuB — 土台=科目B のホーム導線", () => {
  it("土台ピラー /blog/fe-kamoku-b-taisaku へのリンクを SSR 出力する", () => {
    render(<HomeFoundationKamokuB />);
    const link = screen.getByRole("link", { name: /科目B 完全対策を読む/ });
    expect(link).toHaveAttribute("href", `/blog/${FOUNDATION_PILLAR_SLUG}`);
  });

  it("リンク先の土台ピラー blog slug が実在する（新規404を作らない）", () => {
    expect(getBlogPostBySlug(FOUNDATION_PILLAR_SLUG)?.slug).toBe(
      FOUNDATION_PILLAR_SLUG,
    );
  });
});
