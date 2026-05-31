import { describe, it, expect, beforeEach } from "vitest";
import {
  readUserContext,
  recordHomepageVisit,
  resetUserContext,
  USER_CONTEXT_LS_KEY,
} from "@/lib/storage/user-context";

/**
 * user-context.ts はパーソナライズ済みホームのための訪問履歴。
 * recordHomepageVisit は visitCount を 1 ずつ増やし lastVisitAt を更新して
 * 書込み後の状態を返す（純粋な単調増加カウンタ）。resetUserContext は
 * ストレージを消し既定（visitCount=0・lastVisitAt=null）に戻す。
 * migrate-key.test.ts が移行/既定マージを担うため、ここは増分とリセットを固定。
 */
beforeEach(() => {
  window.localStorage.clear();
});

describe("recordHomepageVisit", () => {
  it("初回は visitCount=1・lastVisitAt が ISO 文字列で stamp される", () => {
    const r = recordHomepageVisit();
    expect(r.visitCount).toBe(1);
    expect(typeof r.lastVisitAt).toBe("string");
    expect(() => new Date(r.lastVisitAt as string).toISOString()).not.toThrow();
  });

  it("呼ぶたびに visitCount が単調増加し、永続化される", () => {
    recordHomepageVisit();
    recordHomepageVisit();
    const third = recordHomepageVisit();
    expect(third.visitCount).toBe(3);
    // 返り値と再読込が一致（書込み後の状態を返す契約）
    expect(readUserContext().visitCount).toBe(3);
  });

  it("返り値は書込み後の状態と一致する", () => {
    const r = recordHomepageVisit();
    expect(readUserContext()).toEqual(r);
  });
});

describe("resetUserContext", () => {
  it("既定（visitCount=0・lastVisitAt=null）に戻す", () => {
    recordHomepageVisit();
    recordHomepageVisit();
    expect(readUserContext().visitCount).toBe(2);
    resetUserContext();
    expect(readUserContext()).toEqual({ visitCount: 0, lastVisitAt: null });
    expect(window.localStorage.getItem(USER_CONTEXT_LS_KEY)).toBeNull();
  });
});
