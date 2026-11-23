import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { StudyRewardCorner } from "@/components/home/StudyRewardCorner";
import { recordStudyReward } from "@/lib/study-reward";
import { LS_KEYS } from "@/lib/storage/keys";
import { monthlyFixture } from "@/__tests__/billing/monthly-fixture";
import { emptyPetProfiles, newPetProfile, petProfileStorageKey, serializePetProfileDocument } from "@/lib/pet/v1/profile";
import * as ownership from "@/lib/sync/ownership";

beforeEach(() => {
  localStorage.clear(); sessionStorage.clear();
  vi.spyOn(ownership, "readSyncAccount").mockResolvedValue(null);
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches:false, addEventListener:vi.fn(), removeEventListener:vi.fn() })));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

it.each(["trial", "paid", "refunded"] as const)("reward playback and dismissal preserve %s billing facts and server grant", async state => {
  const f = await monthlyFixture();
  if (state !== "trial") await f.send();
  if (state === "refunded") {
    f.observation.payments[0].refunds.re_full = { id:"re_full", amount:980, state:"succeeded" };
    await f.send("evt_full_refund");
  }
  const grant = await f.service.grant("alice", "gate-probe");
  const status = await f.service.status("alice", f.checkout.orderId);
  expect(status.entitled).toBe(state === "paid");
  expect(grant.kind).toBe(state === "paid" ? "pass" : "trial");
  const before = structuredClone(f.account());
  // A client preference or reward must never manufacture paid server access.
  localStorage.setItem(LS_KEYS.premium, "true");
  localStorage.setItem(LS_KEYS.history, "preserved-history-sentinel");
  localStorage.setItem(LS_KEYS.petLearning, "preserved-legacy-pet-sentinel");
  // Rest is available for an existing pet. Loading the view must preserve it byte-for-byte.
  const doc = emptyPetProfiles("guest", "Asia/Tokyo");
  doc.profiles.push(newPetProfile("guest", "fe"));
  localStorage.setItem(petProfileStorageKey("guest"), serializePetProfileDocument(doc));
  const profiles = () => Object.keys(localStorage).filter(key => key.startsWith(LS_KEYS.petProfilesPrefix)).sort().map(key => [key, localStorage.getItem(key)]);
  const profilesBefore = profiles();
  const scope = "quiz:fe", questionId = `question-${state}`;
  render(<StudyRewardCorner scope={scope} questionId={questionId} />);
  await waitFor(() => expect(screen.getByRole("button", {name:"ひと休み"})).toBeEnabled());
  act(() => { recordStudyReward({scope,questionId,exam:"fe",label:"基本情報技術者"}); });
  // Quiz scopes now render the v1 child; the legacy visual notification does
  // not manufacture learning progress or paid access in that child.
  expect(screen.queryByText("1問、回答しました。")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", {name:"ひと休み"}));
  expect(screen.getByText("のんびり、ひと休み。")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", {name:"動きを止める"}));
  fireEvent.click(screen.getByRole("button", {name:"チワワのひと休みを閉じる"}));
  fireEvent.click(screen.getByRole("button", {name:"チワワのひと休みを開く"}));
  expect(await f.service.status("alice", f.checkout.orderId)).toEqual(status);
  expect(await f.service.grant("alice", "gate-probe")).toEqual(grant);
  expect(f.account()).toEqual(before);
  expect(localStorage.getItem(LS_KEYS.premium)).toBe("true");
  expect(localStorage.getItem(LS_KEYS.history)).toBe("preserved-history-sentinel");
  expect(localStorage.getItem(LS_KEYS.petLearning)).toBe("preserved-legacy-pet-sentinel");
  expect(profiles()).toEqual(profilesBefore);
});
