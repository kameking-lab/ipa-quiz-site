import { describe, expect, it } from "vitest";
import { emptyPetCloudState, localPetCloudEnvelope } from "@/lib/pet/v1/cloud-merge";
import type { PetCloudEnvelope } from "@/lib/pet/v1/cloud-merge";
import { checkPetCloudUpdate, PET_CLOUD_LIMITS } from "@/lib/pet/server/cloud-validation";
import { DAY, studied, T0 } from "./cloud-fixtures";

const device = "device-aaaaaaaa";
const envelope = (questions = ["q1", "q2"], owner = "user:alice") =>
  localPetCloudEnvelope(studied(owner, "ap", questions), emptyPetCloudState(), device, T0);
const edit = (value: PetCloudEnvelope, change: (copy: PetCloudEnvelope) => void) => { const copy = structuredClone(value); change(copy); return copy; };

describe("cloud copy validation", () => {
  it("accepts a real study copy and canonicalizes it", () => {
    const result = checkPetCloudUpdate(envelope(), "alice", null, T0);
    expect(result.ok).toBe(true);
    if (result.ok) expect(JSON.parse(result.serialized).document.ownerScope).toBe("user:alice");
  });
  it("refuses another account's copy and malformed shapes", () => {
    expect(checkPetCloudUpdate(envelope(), "mallory", null, T0)).toEqual({ ok: false, reason: "owner_mismatch" });
    for (const bad of [null, "x", { format: "kakomon-pet-cloud" }, edit(envelope(), copy => { copy.document.profiles[0].growth = -1; }),
      edit(envelope(), copy => { (copy.document.profiles[0] as { growth: unknown }).growth = "9"; }),
      edit(envelope(), copy => { copy.meta = {}; }),
      edit(envelope(), copy => { copy.meta.ap.growth = { "bad id!": 6 }; }),
      edit(envelope(), copy => { copy.document.profiles[0].name = "x".repeat(25); })])
      expect(checkPetCloudUpdate(bad, "alice", null, T0)).toMatchObject({ ok: false, reason: "invalid_document" });
    expect(checkPetCloudUpdate(edit(envelope(), copy => { copy.document.profiles[0].name = "ポ\u0007チ"; }), "alice", null, T0))
      .toEqual({ ok: false, reason: "invalid_document" });
  });
  it("refuses device-only state", () => {
    const local = studied("user:alice", "ap", ["q1"]);
    expect(checkPetCloudUpdate(edit(envelope(), copy => { copy.document.events = local.events; }), "alice", null, T0))
      .toEqual({ ok: false, reason: "device_state" });
  });
  it("refuses growth that is not backed by counters or by study traces", () => {
    expect(checkPetCloudUpdate(edit(envelope(), copy => { copy.document.profiles[0].growth += 1; }), "alice", null, T0))
      .toEqual({ ok: false, reason: "implausible_growth" });
    expect(checkPetCloudUpdate(edit(envelope(), copy => { copy.document.profiles[0].growth = 100_000; copy.meta.ap.growth = { [device]: 100_000 }; }), "alice", null, T0))
      .toEqual({ ok: false, reason: "implausible_growth" });
    expect(checkPetCloudUpdate(edit(envelope(), copy => { copy.document.profiles[0].bond = 5; copy.meta.ap.bond = { [device]: 5 }; }), "alice", null, T0))
      .toEqual({ ok: false, reason: "implausible_bond" });
  });
  it("refuses timestamps and study days in the future", () => {
    const future = T0 + 3 * DAY;
    expect(checkPetCloudUpdate(edit(envelope(), copy => { copy.document.profiles[0].questions[0].lastRewardedAt = future; }), "alice", null, T0))
      .toEqual({ ok: false, reason: "future_time" });
    expect(checkPetCloudUpdate(edit(envelope(), copy => { copy.meta.ap.nameAt = future; }), "alice", null, T0))
      .toEqual({ ok: false, reason: "future_time" });
    expect(checkPetCloudUpdate(edit(envelope(), copy => { copy.document.profiles[0].learningDays = ["2026-11-09"]; }), "alice", null, T0))
      .toEqual({ ok: false, reason: "future_time" });
  });
  it("refuses rollbacks against the stored copy", () => {
    const current = envelope(["q1", "q2", "q3"]);
    expect(checkPetCloudUpdate(envelope(["q1", "q2"]), "alice", current, T0)).toEqual({ ok: false, reason: "rollback" });
    const other = localPetCloudEnvelope(studied("user:alice", "takken", ["t1"]), emptyPetCloudState(), device, T0);
    expect(checkPetCloudUpdate(other, "alice", current, T0)).toEqual({ ok: false, reason: "rollback" });
    expect(checkPetCloudUpdate(envelope(["q1", "q2", "q3", "q4"]), "alice", current, T0).ok).toBe(true);
  });
  it("caps how much one update may add", () => {
    const many = edit(envelope(), copy => {
      const template = copy.document.profiles[0].questions[0];
      copy.document.profiles[0].questions = Array.from({ length: PET_CLOUD_LIMITS.newQuestionsPerUpdate + 1 }, (_, index) => ({ ...template, questionId: `q${index}` }));
    });
    expect(checkPetCloudUpdate(many, "alice", null, T0)).toEqual({ ok: false, reason: "increase_too_large" });
  });
});
