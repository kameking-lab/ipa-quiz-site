import { describe, it, expect, beforeEach } from "vitest";
import {
  getCoupon,
  ensureCouponForStreak,
  markRedeemed,
  clearCoupon,
  describeCoupon,
  type CouponState,
} from "@/lib/motivation/coupon";
import { LS_KEYS } from "@/lib/storage/keys";

/**
 * coupon.ts は 30 日連続学習マイルストーン到達時のプレミアム 1 週間無料クーポン
 * 発行ロジック（ゲーミフィケーション）。発行は peak>=30 ゲートと冪等性に依存し、
 * 崩れると未達ユーザーへの誤発行や毎回再発行（コード入れ替わり）が起きる。
 * コード生成は Math.random だが書式 STREAK30-[8文字] は決定的に検証できる。
 */
beforeEach(() => {
  window.localStorage.clear();
});

describe("ensureCouponForStreak", () => {
  it("peak<30 では発行しない（current/longest とも 29 以下）", () => {
    const r = ensureCouponForStreak(29, 29);
    expect(r.state).toBeNull();
    expect(r.newlyIssued).toBe(false);
    expect(getCoupon()).toBeNull();
  });

  it("longest が 30 に達していれば current が低くても発行する（peak=max）", () => {
    const r = ensureCouponForStreak(3, 30);
    expect(r.newlyIssued).toBe(true);
    expect(r.state).not.toBeNull();
  });

  it("発行コードは STREAK30- + 32進サブセット 8 文字", () => {
    const r = ensureCouponForStreak(30, 30);
    expect(r.state?.code).toMatch(/^STREAK30-[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{8}$/);
    expect(r.state?.redeemed).toBe(false);
    expect(r.state?.source).toBe("streak-30");
  });

  it("冪等: 既発行があれば再発行せず同一コードを返す（newlyIssued=false）", () => {
    const first = ensureCouponForStreak(30, 45);
    const second = ensureCouponForStreak(99, 99);
    expect(second.newlyIssued).toBe(false);
    expect(second.state?.code).toBe(first.state?.code);
  });
});

describe("getCoupon / read 検証", () => {
  it("未発行なら null", () => {
    expect(getCoupon()).toBeNull();
  });

  it("プレフィックス不正な保存値は null として弾く", () => {
    window.localStorage.setItem(
      LS_KEYS.premiumCoupon,
      JSON.stringify({ code: "WRONG-12345678", redeemed: false }),
    );
    expect(getCoupon()).toBeNull();
  });

  it("破損 JSON は null（fail-soft）", () => {
    window.localStorage.setItem(LS_KEYS.premiumCoupon, "{not json");
    expect(getCoupon()).toBeNull();
  });
});

describe("markRedeemed / clearCoupon", () => {
  it("markRedeemed で redeemed=true に更新される", () => {
    ensureCouponForStreak(30, 30);
    expect(getCoupon()?.redeemed).toBe(false);
    markRedeemed();
    expect(getCoupon()?.redeemed).toBe(true);
  });

  it("未発行で markRedeemed しても何も起きない（no-op）", () => {
    markRedeemed();
    expect(getCoupon()).toBeNull();
  });

  it("clearCoupon で削除される", () => {
    ensureCouponForStreak(30, 30);
    clearCoupon();
    expect(getCoupon()).toBeNull();
  });
});

describe("describeCoupon", () => {
  it("コードを含む案内文を生成する", () => {
    const c: CouponState = {
      code: "STREAK30-ABCD2345",
      issuedAt: 0,
      redeemed: false,
      source: "streak-30",
    };
    expect(describeCoupon(c)).toContain("STREAK30-ABCD2345");
    expect(describeCoupon(c)).toContain("プレミアム1週間無料");
  });
});
