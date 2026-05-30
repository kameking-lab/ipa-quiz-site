import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
  usePinnedQuickActions,
  MAX_PINNED_ACTIONS,
} from "@/lib/copilot/pinned-actions";
import type { QuickActionId } from "@/lib/ai/prompts";

/**
 * usePinnedQuickActions は AI コパイロットのクイックアクション「ピン留め」を
 * LocalStorage に永続化するフック。守る契約:
 *  - togglePin はトグル（在れば外す / 無ければ追加）。
 *  - ピンは MAX_PINNED_ACTIONS=3 で打ち止め＝上限超の追加は no-op
 *    （非ピンアクションが折り畳みビューから締め出されないため）。
 *  - canPinMore は残枠の有無、isPinned は所属判定。
 *  - マウント時に LS から読み、不正値（非文字列）は除外する。
 * 崩れると、ピンが上限を超えてデフォルト表示を覆う / 永続化が壊れる。
 */
const KEY = "ipa-quiz:copilot-pinned-actions:v1";

const A = "explain" as QuickActionId;
const B = "whyWrong" as QuickActionId;
const C = "similar" as QuickActionId;
const D = "term" as QuickActionId;

beforeEach(() => {
  window.localStorage.clear();
});

describe("usePinnedQuickActions 初期状態", () => {
  it("LS 空なら pinned=[] / canPinMore=true", () => {
    const { result } = renderHook(() => usePinnedQuickActions());
    expect(result.current.pinned).toEqual([]);
    expect(result.current.canPinMore).toBe(true);
  });

  it("マウント時に LS の既存ピンを読む（不正値は除外）", () => {
    window.localStorage.setItem(KEY, JSON.stringify([A, 123, B, null]));
    const { result } = renderHook(() => usePinnedQuickActions());
    expect(result.current.pinned).toEqual([A, B]);
  });
});

describe("usePinnedQuickActions togglePin", () => {
  it("追加→isPinned true・LS 永続化", () => {
    const { result } = renderHook(() => usePinnedQuickActions());
    act(() => result.current.togglePin(A));
    expect(result.current.pinned).toEqual([A]);
    expect(result.current.isPinned(A)).toBe(true);
    expect(JSON.parse(window.localStorage.getItem(KEY)!)).toEqual([A]);
  });

  it("同 id を再トグルで外す", () => {
    const { result } = renderHook(() => usePinnedQuickActions());
    act(() => result.current.togglePin(A));
    act(() => result.current.togglePin(A));
    expect(result.current.pinned).toEqual([]);
    expect(result.current.isPinned(A)).toBe(false);
  });
});

describe("usePinnedQuickActions 上限", () => {
  it("MAX_PINNED_ACTIONS を超える追加は no-op", () => {
    expect(MAX_PINNED_ACTIONS).toBe(3);
    const { result } = renderHook(() => usePinnedQuickActions());
    act(() => result.current.togglePin(A));
    act(() => result.current.togglePin(B));
    act(() => result.current.togglePin(C));
    expect(result.current.canPinMore).toBe(false);
    act(() => result.current.togglePin(D)); // 4 件目は弾かれる
    expect(result.current.pinned).toEqual([A, B, C]);
    expect(result.current.isPinned(D)).toBe(false);
  });

  it("上限到達後でも既存ピンの解除は可能", () => {
    const { result } = renderHook(() => usePinnedQuickActions());
    act(() => result.current.togglePin(A));
    act(() => result.current.togglePin(B));
    act(() => result.current.togglePin(C));
    act(() => result.current.togglePin(A)); // 解除
    expect(result.current.pinned).toEqual([B, C]);
    expect(result.current.canPinMore).toBe(true);
  });
});
