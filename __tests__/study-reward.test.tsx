import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RewardCorner, StudyRewardCorner } from "@/components/home/StudyRewardCorner";
import { LS_KEYS } from "@/lib/storage/keys";
import { recordStudyReward, rewardTheme, type StudyReward } from "@/lib/study-reward";

const reward: StudyReward = { id: "one", scope: "library:diver", questionId: "q1", label: "潜水士", theme: "swim" };
beforeEach(() => {
  localStorage.clear(); sessionStorage.clear();
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

describe("truthful reward and motion controls", () => {
  it("maps only exact codes, with neutral fallback", () => {
    expect(rewardTheme("library:潜水士")).toBe("swim");
    expect(rewardTheme("潜水士")).toBe("rest");
    expect(rewardTheme("library:潜水士養成")).toBe("rest");
    expect(rewardTheme("fp3")).toBe("coins");
    expect(rewardTheme("ap")).toBe("code");
    expect(rewardTheme("denko2")).toBe("light");
    expect(rewardTheme("unknown")).toBe("rest");
  });
  it("never announces an answer for an idle visit", () => {
    render(<RewardCorner reward={null} showIdle />);
    expect(screen.queryByText("1問、回答しました。")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", {name:"動きを見る"})).not.toBeInTheDocument();
  });
  it("does not replay on mount/reload; runs on a new answer and stops at six seconds", () => {
    vi.useFakeTimers();
    const { container, rerender } = render(<RewardCorner reward={reward} />);
    expect(container.querySelector("section")).toHaveAttribute("data-moving", "false");
    rerender(<RewardCorner reward={reward} playbackToken={1} />);
    expect(container.querySelector("section")).toHaveAttribute("data-moving", "true");
    act(() => vi.advanceTimersByTime(6000));
    expect(container.querySelector("section")).toHaveAttribute("data-moving", "false");
  });
  it("keeps stop preference across questions and close/reopen", () => {
    const {container, rerender} = render(<RewardCorner reward={reward} />);
    fireEvent.click(screen.getByRole("button", {name:"動きを見る"}));
    fireEvent.click(screen.getByRole("button", {name:"動きを止める"}));
    rerender(<RewardCorner reward={{...reward,id:"two"}} />);
    expect(container.querySelector("section")).toHaveAttribute("data-moving", "false");
    fireEvent.click(screen.getByRole("button", {name:"チワワのひと休みを閉じる"}));
    expect(container.querySelector("section")).toBeNull();
    fireEvent.click(screen.getByRole("button", {name:"チワワのひと休みを開く"}));
    expect(container.querySelector("section")).toHaveAttribute("data-moving", "false");
    expect(JSON.parse(localStorage.getItem(LS_KEYS.studyRewardPreferences)!)).toEqual({closed:false,paused:true});
  });
  it("respects reduced motion even for explicit playback", () => {
    vi.stubGlobal("matchMedia", vi.fn(() => ({ matches:true, addEventListener:vi.fn(), removeEventListener:vi.fn() })));
    const {container} = render(<RewardCorner reward={reward} />);
    expect(screen.getByRole("button", {name:"動きを見る"})).toBeDisabled();
    expect(container.querySelector("section")).toHaveAttribute("data-moving", "false");
  });
  it.each(["before", "after"])("plays the first real submission with reveal %s notification", order => {
    const questionId = `live-answer-${order}`;
    function AnswerHarness() {
      const [answered,setAnswered] = useState(false);
      return <><button onClick={() => {
        if (order === "before") setAnswered(true);
        recordStudyReward({scope:"quiz:ip",questionId,exam:"ip",label:"ITパスポート"});
        if (order === "after") setAnswered(true);
      }}>回答</button><StudyRewardCorner scope="quiz:ip" questionId={questionId} answered={answered} /></>;
    }
    const {container} = render(<AnswerHarness />);
    fireEvent.click(screen.getByRole("button",{name:"回答"}));
    expect(container.querySelector("section")).toHaveAttribute("data-moving","true");
  });
  it("starts only for a real notification, never back navigation, exam switch, reset or restored mount", () => {
    const {container, rerender, unmount} = render(<StudyRewardCorner scope="quiz:fe" questionId="back-regression" answered={false} />);
    expect(container.querySelector("section")).toBeNull();
    act(() => { recordStudyReward({scope:"quiz:fe", questionId:"back-regression", exam:"fe", label:"基本情報"}); });
    rerender(<StudyRewardCorner scope="quiz:fe" questionId="back-regression" answered />);
    // Explicit answer renders the reward; playback itself is tested below with
    // a notification while the answered UI is present.
    fireEvent.click(screen.getByRole("button", {name:"動きを見る"}));
    rerender(<StudyRewardCorner scope="quiz:fe" questionId="next-unanswered" answered={false} />);
    expect(container.querySelector("section")).toBeNull();
    rerender(<StudyRewardCorner scope="quiz:fe" questionId="back-regression" answered />);
    expect(container.querySelector("section")).toHaveAttribute("data-moving","false");
    rerender(<StudyRewardCorner scope="quiz:ap" questionId="back-regression" answered />);
    expect(container.querySelector("section")).toBeNull();
    rerender(<StudyRewardCorner scope="quiz:fe" questionId="back-regression" answered={false} />);
    expect(container.querySelector("section")).toBeNull();
    unmount();
    const restored = render(<StudyRewardCorner scope="quiz:fe" questionId="back-regression" answered />);
    expect(restored.container.querySelector("section")).toHaveAttribute("data-moving","false");
    act(() => { recordStudyReward({scope:"quiz:fe",questionId:"new-live",exam:"fe",label:"基本情報"}); });
    restored.rerender(<StudyRewardCorner scope="quiz:fe" questionId="new-live" answered />);
    expect(restored.container.querySelector("section")).toHaveAttribute("data-moving","false");
  });
  it("deduplicates repeated submissions, persists in the tab and never changes progress keys", async () => {
    vi.resetModules();
    const store = await import("@/lib/study-reward");
    localStorage.setItem(LS_KEYS.premium, "unchanged");
    localStorage.setItem(LS_KEYS.xpState, "unchanged");
    const input = {scope:"quiz:ap",questionId:"ap-q1",exam:"ap",label:"応用情報"};
    expect(store.getStudyReward()).toBeNull();
    expect(store.recordStudyReward(input)).toBe(true);
    expect(store.recordStudyReward(input)).toBe(false);
    vi.resetModules();
    const reloaded = await import("@/lib/study-reward");
    expect(reloaded.getStudyReward()?.questionId).toBe("ap-q1");
    expect(reloaded.recordStudyReward(input)).toBe(false);
    expect(localStorage.getItem(LS_KEYS.premium)).toBe("unchanged");
    expect(localStorage.getItem(LS_KEYS.xpState)).toBe("unchanged");
    expect(localStorage.getItem(LS_KEYS.history)).toBeNull();
  });
});
